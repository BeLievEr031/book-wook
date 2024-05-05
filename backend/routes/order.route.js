import express from "express"
import {auth} from "../middleware/auth.js"
import { cancleOrder, fetchOrder, placeOrder } from "../controller/order.controller.js";
import { validateFetchOrderQuery } from "../middleware/validator.js";
const orderRouter = express.Router() 

orderRouter.route("/").post(auth,placeOrder)
orderRouter.route("/:id").delete(auth,cancleOrder)

orderRouter.route("/").get(validateFetchOrderQuery,auth,fetchOrder)

export default orderRouter;