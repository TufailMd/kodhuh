import express from "express";
import userRouter from "./userRouter.js";

const mainRouter = express.Router();

mainRouter.use(userRouter);

mainRouter.get("/", (req, res) => {
  res.send("Welcome");
});

export default mainRouter;
