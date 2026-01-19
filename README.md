# Test Gigigo – Backend Fake API

Proyecto de prueba técnica para proceso de selección en **Gigigo**.  
Consiste en un servidor backend ligero construido con **Node.js** y **Hono**, que simula autenticación, manejo de sesión y endpoints básicos, utilizando **SQLite** como almacenamiento local.

---

## 🛠️ Tecnologías utilizadas

- Node.js
- Hono
- @hono/node-server
- SQLite (better-sqlite3)

---

## 📁 Estructura del proyecto

```
.
├── server.js
├── app.js
├── modules/
│   ├── auth/
│   └── productos/
├── assets/
├── package.json
└── README.md
```

---

## 🚀 Instalación y ejecución

### 1️⃣ Clonar el repositorio

```
git clone <repo-url>
```

### 2️⃣ Instalar dependencias

```
npm install
```

### 3️⃣ Levantar el servidor

```
npm run server
```

Servidor disponible en:

```
http://localhost:3003
```

## 💻 Ejecución el servidor en remoto con PM2

```
pm2 start ecosystem.config.cjs
```

Modo Productivo
```
pm2 start ecosystem.config.cjs --env production
```
---

## 🔐 Autenticación (Fake Login)

**Endpoint:**

```
POST /login
```

### Credenciales válidas

```
Email: admin@gigigo.com
Password: abcd1234
```

### Respuesta exitosa

```json
{
  "code": 200,
  "user": {
    "email": "admin@gigigo.com",
    "token": "abcd1234"
  }
}
```

### Error

```json
{
  "message": "Correo o contraseña incorrectos"
}
```

---

## 🔒 Manejo de sesión

- Email y token se guardan en localStorage
- Rutas protegidas validan sesión
- Sin sesión válida → redirección al login

---

## 🌐 CORS

- Acepta solo el mismo origen
- Permite peticiones sin Origin (Postman, curl)
- Bloquea orígenes externos

---

## 📦 Base de datos

- SQLite con better-sqlite3
- Uso local para pruebas
- Simulación CRUD

---

## ⚠️ Notas

- Proyecto de prueba técnica
- Login y token simulados
- No productivo

---

## 👨‍💻 Autor

**porfi.dev**  
hola@porfi.dev  

---

## 📄 Licencia

ISC
