import express from "express"
import { admin, auth } from "../middleware/auth.js";
import { validateAddBook, validateBookReqQuery, validateCartReqQuery, validateUpdateBook } from "../middleware/validator.js";
import { addBook, addToCart, deleteBook, fetchBooks, updateBook, updateCart } from "../controller/book.controller.js";

const bookRouter = express.Router();

bookRouter.route("/").post(validateAddBook, admin, addBook)
bookRouter.route("/:id").put(validateUpdateBook, admin, updateBook)
bookRouter.route("/:id").delete(admin, deleteBook)
bookRouter.route("/").get(validateBookReqQuery, auth, fetchBooks)


// @Routes for buying.
bookRouter.route("/cart/:id").post(auth, addToCart); //Here :id refer bookid
bookRouter.route("/cart/:id").put(validateCartReqQuery, auth, updateCart); //Here :id refer Cartid
export default bookRouter;