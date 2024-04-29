import express from "express"
import { validateRegisterUser } from "../middleware/validator.js";
import { register } from "../controller/user.controller.js";

const userRouter = express.Router();

userRouter.route("/register").post(validateRegisterUser, register)

export default userRouter;