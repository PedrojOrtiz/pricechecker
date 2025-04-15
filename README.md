# 💲 Price Checker for Commerce Companies using Contifico

A mini React.js-based application that enables **commerce businesses** to check and compare product prices directly from **Contifico (Siigo)**, an accounting and billing platform used widely in Latin America.

---

## 🚀 Tech Stack

- **Frontend:** React.js
- **State Management:** Redux Toolkit
- **Language:** JavaScript

---

## 🧩 Overview

This application helps retail and commerce companies easily consult product pricing through Contifico's official API using their private **API_KEY**.

- 📦 Fetches product data from Contifico.
- 🔍 Allows real-time price checks.
- ⚡ Streamlined for local development and future production deployment.

---

## 🛡️ API Key Management

Contifico provides an `API_KEY` upon contract activation. To keep your API_KEY secure:

### ✅ Development
You can run the project locally using a proxy:

1. Place the key in a `.env` file:
    ```bash
    REACT_APP_CONTIFICO_API_KEY=your_api_key_here
    ```

2. `setupProxy.js` in the root directory is already pointing to the Contifico API URL.
3. Start the app:
    ```javascript
    app.use(
        '/sistema/api',
        createProxyMiddleware({
            target: 'https://api.contifico.com',
            changeOrigin: true,
            onProxyReq: (proxyReq, req) => {
                proxyReq.setHeader('Authorization', process.env.REACT_APP_CONTIFICO_API_KEY);
            }
        })
   );
    ```

### 🔐 Production
> **IMPORTANT:** In production, you must use a **backend server** to handle API requests securely.

React does not allow secure storage of private keys in the frontend build. Any key embedded in a public build can be exposed, leading to **security breaches**.

You’ll need a backend proxy (e.g., Node.js, Express) to:
- Authenticate requests.
- Attach the API_KEY securely.
- Forward responses to the frontend.

### Example Node.js Proxy
```javascript
const contificoProxy = createProxyMiddleware({
    target: 'https://api.contifico.com',
    changeOrigin: true,
    pathFilter: ['/sistema/api', '/contifico/api'],
    secure: true,
    pathRewrite: (path, req) => {
        // Rewrite /contifico/api/... to /sistema/api/... and force trailing slash
        const rewritten = path.replace(/^\/contifico\/api/, '/sistema/api');
        return rewritten.endsWith('/') ? rewritten : rewritten.replace(/(\?.*)?$/, '/$1');
    },
    logger: console,
    on: {
        error: (error) => {
            console.error('error: ' + error);
        },
        proxyReq: (proxyReq, req) => {
            proxyReq.setHeader(
                process.env.CONTIFICO_API_KEY_NAME,
                process.env.CONTIFICO_API_KEY_VALUE
            );
            fixRequestBody(proxyReq, req);
        },
        proxyRes: (proxyRes, req, res) => {
            if (proxyRes.statusCode === 301 || proxyRes.statusCode === 302) {
                const redirectUrl = proxyRes.headers.location;
                console.warn(`[Proxy Warning] Got redirected to ${redirectUrl}, maybe use 'secure: true' and 'https' target`);
            }
        },
    },
});

```

---

## 🧪 Local Development

1. Clone the repo:
```bash
git clone https://github.com/PedrojOrtiz/pricechecker.git
