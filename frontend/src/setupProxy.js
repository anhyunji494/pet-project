const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
      '/images',
    createProxyMiddleware({
      target: 'http://localhost:8085',	// 서버 URL or localhost:설정한포트번호
      changeOrigin: true,
    })
  );
};