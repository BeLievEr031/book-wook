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

bookRouter.post('/upload', async (req, res) => {
    try {
        // Check if files were uploaded
        // console.log(req.files);
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ error: 'No files were uploaded' });
        }


        // The name of the input field (e.g., "imageFile") is used to retrieve the uploaded file
        const imageFile = req.files.thumbnail;
        console.log(imageFile);

        // // Save the uploaded file locally
        // const uploadPath = path.join(process.cwd(), 'uploads', imageFile.name);
        // console.log(uploadPath);
        // imageFile.mv(uploadPath, async (err) => {
        //     if (err) {
        //         console.error('File upload error:', err);
        //         return res.status(500).json({ error: 'File upload failed' });
        //     }

            // try {
            //     // Upload file to Cloudinary
            //     const cloudinaryResult = await cloudinary.uploader.upload(uploadPath,{folder:"book-wook"});

            //     // Cloudinary response will contain the URL of the uploaded file
            //     const imageUrl = cloudinaryResult.secure_url;

            //     // File upload successful
            //     res.status(200).json({ message: 'File uploaded successfully', imageUrl });
            // } catch (cloudinaryError) {
            //     console.error('Cloudinary upload error:', cloudinaryError);
            //     return res.status(500).json({ error: 'Cloudinary upload failed' });
            // }
        // });
        // return res.status(400).json({ error: 'No files were uploaded' });





    } catch (error) {
        console.error('File upload error:', error);
        res.status(500).json({ error: 'File upload failed' });
    }
});

export default bookRouter;