module.exports = {
  apps: [
    {
      name: 'test-gigigo',
      script: 'server.js',
      env: {
        PORT: 3003
      },
      env_production: {
        PORT: 80
      }
    }
  ]
};
