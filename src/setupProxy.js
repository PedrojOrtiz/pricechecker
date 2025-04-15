const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/sistema/api',
        createProxyMiddleware({
            target: 'https://api.contifico.com',
            changeOrigin: true,
            onProxyReq: (proxyReq, req) => {
                proxyReq.setHeader('Authorization', process.env.REACT_APP_CONTIFICO_API_KEY);
            },
        })
    );
};