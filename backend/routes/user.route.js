import express from "express"
import { validateLoginUser, validateRegisterUser } from "../middleware/validator.js";
import { login, refreshToken, register, verifyAccount } from "../controller/user.controller.js";

const userRouter = express.Router();

userRouter.route("/register").post(validateRegisterUser, register)
userRouter.route("/verification").post(verifyAccount)
userRouter.route("/login").post(validateLoginUser, login)

userRouter.route("/refresh-token").post(refreshToken)


export default userRouter;