import express from "express"
import { validateLoginUser, validateRegisterUser, validateReqQuery } from "../middleware/validator.js";
import { fetchUser, login, refreshToken, register, verifyAccount } from "../controller/user.controller.js";
import { admin } from "../middleware/auth.js";

const userRouter = express.Router();


// User Auth routes
userRouter.route("/register").post(validateRegisterUser, register)
userRouter.route("/verification").post(verifyAccount)
userRouter.route("/login").post(validateLoginUser, login)
userRouter.route("/refresh-token").post(refreshToken)
// TODO: Forget Password route


// User management routes.
userRouter.route("/").get(validateReqQuery, admin, fetchUser)



export default userRouter;