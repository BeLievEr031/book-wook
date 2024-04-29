import express from "express"
import { validateRegisterUser } from "../middleware/validator.js";

const userRouter = express.Router();

userRouter.route("/register").post(validateRegisterUser)

export default userRouter;