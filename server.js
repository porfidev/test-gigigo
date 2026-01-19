import {Hono} from 'hono';
import {serve} from '@hono/node-server'
import {cors} from 'hono/cors'
import {db} from './db.js'
import {serveStatic} from "@hono/node-server/serve-static";

const PORT = Number(process.env.PORT) || 3003;
const app = new Hono();

app.use(
  '*',
  serveStatic({
    root: './'
  }),
  /*
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  })
   */
)

const examen = new Hono();

examen.post('/login', async (c) => {
  const body = await c.req.parseBody().catch(() => null);

  if (!body) {
    return c.json({ message: 'Body inválido' }, 400);
  }

  if (!body?.email || !body?.password) {
    return c.json({ message: 'Email y contraseña requeridos' }, 400);
  }

  if (body.email === 'admin@gigigo.com' && body.password === 'abcd1234') {
    return c.json({
      code: 200,
      user: {
        email: body.email,
        token: 'abcd1234'
      }
    });
  }

  return c.json(
    { message: 'Correo o contraseña incorrectos' },
    401
  );
});

examen.post('/logout', (c) => {
  return c.json({code: 200});
})

examen.get('/products', (c) => {
  const rows = db.prepare('SELECT * FROM products').all();
  return c.json({code: 200, products: rows});
})

examen.get('/products/:productId', (c) => {
  const idProduct = c.req.param('productId')
  const row = db.prepare('SELECT * FROM products WHERE id = ?').get(idProduct)
  if (!row) return c.json({message: 'Producto no encontrado'}, 404)

  return c.json({code: 200, product: row});
})

examen.post('/products', async (c) => {
  const body = await c.req.parseBody().catch(() => null);

  if (!body?.name || typeof body.name !== 'string') {
    return c.json({message: 'name requerido'}, 400)
  }
  const price = !!body.price ? body.price : 0
  const stock = !!body.price ? body.stock : 0

  const stmt = db.prepare(`
    INSERT INTO products (name, price, stock)
    VALUES (?, ?, ?)
  `)
  const result = stmt.run(body.name.trim(), price, stock)

  const created = db.prepare('SELECT * FROM products WHERE id = ?').get(result.lastInsertRowid)
  return c.json({code: 200, product: created});
})

examen.put('/products/:productId', async (c) => {
  const id = Number(c.req.param('productId'))
  if (!Number.isFinite(id)) return c.json({message: 'idProduct inválido'}, 400)

  const current = db.prepare('SELECT * FROM products WHERE id = ?').get(id)
  if (!current) return c.json({message: 'Producto no encontrado'}, 404)

  const body = await c.req.parseBody().catch(() => ({}))

  const name = typeof body.name === 'string' ? body.name.trim() : current.name
  const price = !!body.price ? body.price : current.price
  const stock = !!body.price ? body.stock : current.stock

  db.prepare(`
    UPDATE products
    SET name      = ?,
        price     = ?,
        stock     = ?,
        updatedAt = datetime('now')
    WHERE id = ?
  `).run(name, price, stock, id)

  const updated = db.prepare('SELECT * FROM products WHERE id = ?').get(id)
  return c.json({code: 200, product: updated});
})

examen.delete('/products/:productId', (c) => {
  const id = Number(c.req.param('productId'))
  if (!Number.isFinite(id)) return c.json({message: 'idProduct inválido'}, 400)

  const result = db.prepare('DELETE FROM products WHERE id = ?').run(id)
  if (result.changes === 0) return c.json({message: 'Producto no encontrado'}, 404)

  return c.json({code: 200});
})

app.route('/examen', examen)

serve({
  fetch: app.fetch,
  port: PORT,
}, (info) => console.log(`Listening on http://localhost:${info.port}`))
