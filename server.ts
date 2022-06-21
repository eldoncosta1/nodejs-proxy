import "reflect-metadata";
import "dotenv/config";

import express, { json, NextFunction, Request, Response } from "express";

const app = express();

app.use(json());

var injectToken = function (req: Request, res: Response, next: NextFunction) {
  const xAuthToken = req.headers["x-auth-token"];
  console.log(req.headers);
  if (xAuthToken !== process.env.AUTH_TOKEN) {
    throw new Error("Unauthorized");
  }
  next();
};

app.use(injectToken);

app.get("/secret/api", (req, res) => {
  res.send("Hello world proxy api");
});

app.get("/secret", (req, res) => {
  res.send("Hello world proxy");
});

app.get("/secret/users/:id", (req, res) => {
  const id = req.params;

  res.json({
    message: id,
  });
});

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  console.error(err.message);

  return response.status(500).json({
    status: "error",
    message: err.message ?? "Internal server error",
  });
});

app.listen(5555, () => {
  console.log("Server listen on port 5555");
});
