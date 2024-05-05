import express from "express"
import { validateAddAddress, validateUpdateAddress } from "../middleware/validator.js";
import {auth} from "../middleware/auth.js"
import { addAddress, deleteAddress, fetchAddress, updateAddress } from "../controller/address.controller.js";
const addressRouter = express.Router();


addressRouter.route("/").post(validateAddAddress,auth,addAddress)
addressRouter.route("/:id").put(validateUpdateAddress,auth,updateAddress)
addressRouter.route("/:id").delete(auth,deleteAddress)
addressRouter.route("/").get(auth,fetchAddress)


export default addressRouter;