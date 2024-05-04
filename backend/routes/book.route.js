import express from "express"
import { admin, auth } from "../middleware/auth.js";
import { validateAddBook, validateBookReqQuery, validateCartReqQuery, validateFetchCartReqQuery, validateUpdateBook } from "../middleware/validator.js";
import { addBook, addToCart, deleteBook, fetchBooks, fetchCart, updateBook, updateCart } from "../controller/book.controller.js";

const bookRouter = express.Router();

bookRouter.route("/").post(validateAddBook, admin, addBook)
bookRouter.route("/:id").put(validateUpdateBook, admin, updateBook)
bookRouter.route("/:id").delete(admin, deleteBook)
bookRouter.route("/").get(validateBookReqQuery, auth, fetchBooks)


// @Routes for buying.
bookRouter.route("/cart/:id").post(auth, addToCart); //Here :id refer bookid

//Here :id refer Cartid & bookid must be provided in the query string
bookRouter.route("/cart/:id").put(validateCartReqQuery, auth, updateCart);

// @User route to fetch his/her cart
bookRouter.route("/cart").get(validateFetchCartReqQuery, auth, fetchCart);

// @Admin route to fetch all the carts




export default bookRouter;