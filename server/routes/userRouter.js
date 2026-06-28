import express from "express";
import userController from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/allUsers", userController.getAllUsers);
userRouter.get("/userProfile", userController.getUserProfile);
userRouter.post("/logIn", userController.logIn);
userRouter.post("/signUp", userController.signUp);
userRouter.put("/updateUserProfile", userController.updateUserProfile);
userRouter.delete("/deleteUserProfile", userController.deleteUserProfile);

export default userRouter;
