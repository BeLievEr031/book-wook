import express from "express"
import { validateLoginUser, validateRegisterUser, validateReqQuery, validateUpdateUser } from "../middleware/validator.js";
import { deleteUser, fetchUser, login, refreshToken, register, updateUser, verifyAccount } from "../controller/user.controller.js";
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
userRouter.route("/:id").put(validateUpdateUser, admin, updateUser)
userRouter.route("/:id").delete(admin, deleteUser)





export default userRouter;