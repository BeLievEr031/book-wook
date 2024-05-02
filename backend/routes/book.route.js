import express from "express"
import { admin, auth } from "../middleware/auth.js";
import { validateAddBook, validateBookReqQuery, validateUpdateBook } from "../middleware/validator.js";
import { addBook, deleteBook, fetchBooks, updateBook } from "../controller/book.controller.js";
import cloudinary from "../config/cloudinary.js";
import path from "path"


const bookRouter = express.Router();


bookRouter.route("/").post(validateAddBook, admin, addBook)
bookRouter.route("/:id").put(validateUpdateBook, admin, updateBook)
bookRouter.route("/:id").delete(admin, deleteBook)
bookRouter.route("/").get(validateBookReqQuery, auth, fetchBooks)


export default bookRouter;