const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
    }),
  )
  app.use(
    '/o/oauth2/v2/auth',
    createProxyMiddleware({
      target: 'https://accounts.google.com',
      changeOrigin: true,
    }),
  )
}
