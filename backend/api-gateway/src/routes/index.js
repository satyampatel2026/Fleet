const router = require("express").Router();

const { createProxyMiddleware } = require("http-proxy-middleware");

router.use(
  "/auth",
  createProxyMiddleware({
    target: "http://localhost:4001",
    changeOrigin: true,
  })
);

router.use(
  "/vehicles",
  createProxyMiddleware({
    target: "http://localhost:4002",
    changeOrigin: true,
  })
);

module.exports = router;