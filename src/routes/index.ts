import { Router } from "express";
import userRouter from "./user.routes";

const routes = Router();

routes.use("/api/users", userRouter);

export default routes;
