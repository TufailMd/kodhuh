import express from "express";
import userController from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/allUsers", userController.getAllUsers);
userRouter.get("/userProfile/:id", userController.getUserProfile);
userRouter.post("/logIn", userController.logIn);
userRouter.post("/signUp", userController.signUp);
userRouter.put("/updateUserProfile/:id", userController.updateUserProfile);
userRouter.delete("/deleteUserProfile/:id", userController.deleteUserProfile);

export default userRouter;
