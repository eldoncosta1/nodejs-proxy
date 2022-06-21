import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.send("Hello world user");
});

userRouter.get("/:id", (req, res) => {
  const id = req.params;

  res.json({
    message: id,
  });
});

export default userRouter;
