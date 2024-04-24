const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
    }),
  )
  app.use(
    createProxyMiddleware({
      target: 'https://accounts.google.com/o/oauth2/v2/auth',
      changeOrigin: true,
    }),
  )
}
