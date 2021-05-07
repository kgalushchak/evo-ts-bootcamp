const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app
    .use(
      '/redux',
      createProxyMiddleware({
        target: 'http://localhost:5000',
        changeOrigin: false,
      })
    );
  app.use(
    '/log',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: false,
    })
  );
};
