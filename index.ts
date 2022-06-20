import "reflect-metadata";
import "dotenv/config";

import express, { NextFunction, Request, Response } from "express";
import {
  createProxyMiddleware,
  Filter,
  Options,
  RequestHandler,
} from "http-proxy-middleware";

const app = express();

app.use(
  "/",
  createProxyMiddleware({
    target: "http://localhost:5555/secret",
    changeOrigin: true,
    onProxyReq: function onProxyReq(proxyReq, req, res) {
      proxyReq.setHeader(
        "x-auth-token",
        "be155166-0ddc-46a8-8cd0-6378e9fad11a"
      );
    },
    onProxyRes: function onProxyRes(proxyRes, req, res) {
      console.log(JSON.stringify(proxyRes.headers, null, 2));
      delete proxyRes.headers["injection-token"];
      console.log(JSON.stringify(proxyRes.headers, null, 2));
    },
    onError: function onError(err, req, res) {
      console.log(err);
    },
  })
);

app.listen(4444, () => {
  console.log("Server listen on port 4444");
});
