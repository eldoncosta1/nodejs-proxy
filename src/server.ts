import "reflect-metadata";
import "dotenv/config";

import express, { json, NextFunction, Request, Response } from "express";

import routes from "routes";

const app = express();

app.use(json());

var injectToken = function (req: Request, res: Response, next: NextFunction) {
  const xAuthToken = req.headers["x-auth-token"];
  if (xAuthToken !== process.env.AUTH_TOKEN) {
    throw new Error("Unauthorized");
  }
  next();
};

app.use(injectToken);

app.use(routes);

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
