import express from "express"
import { admin } from "../middleware/auth.js";
import { validateAddBook, validateUpdateBook } from "../middleware/validator.js";
import { addBook, deleteBook, updateBook } from "../controller/book.controller.js";

const bookRouter = express.Router();


bookRouter.route("/").post(validateAddBook, admin, addBook)
bookRouter.route("/:id").put(validateUpdateBook, admin, updateBook)
bookRouter.route("/:id").delete(admin, deleteBook)

export default bookRouter;