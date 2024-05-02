import express from "express"
import { admin, auth } from "../middleware/auth.js"
import { validateAddGenre, validateGenreReqQuery, validateUpdateGenre } from "../middleware/validator.js";
import { addGenre, deleteGenre, fetchGenre, updateGenre } from "../controller/genre.controller.js";
const genreRouter = express.Router();

genreRouter.route("/").post(validateAddGenre, admin, addGenre)
genreRouter.route("/:id").put(validateUpdateGenre, admin, updateGenre)
genreRouter.route("/:id").delete(admin, deleteGenre)
genreRouter.route("/").get(validateGenreReqQuery,auth, fetchGenre)

export default genreRouter;