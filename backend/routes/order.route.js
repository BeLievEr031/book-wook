import express from "express"
import {admin, auth} from "../middleware/auth.js"
import { cancleOrder, fetchOrder, placeOrder, updateOrder } from "../controller/order.controller.js";
import { validateFetchOrderQuery } from "../middleware/validator.js";
const orderRouter = express.Router() 

orderRouter.route("/").post(auth,placeOrder)
orderRouter.route("/:id").delete(auth,cancleOrder)
orderRouter.route("/").get(validateFetchOrderQuery,auth,fetchOrder)

// @Admin route to update the order status.
orderRouter.route("/:id").put(admin,updateOrder)

export default orderRouter;