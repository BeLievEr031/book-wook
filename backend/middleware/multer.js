import multer from "multer";
import path from "path"

const storageForThumbnail = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(), '/uploads/thumbnail'))
    },
    filename: function (req, file, cb) {
        // console.log(file);
        // console.log(file.originalname.split(".")[1]);
        const ext = file.originalname.split(".")[1]
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + "." + ext)
    }
})

const uploadThumbnail = multer({ storage: storageForThumbnail })

// Define file filter function to remove invalid fields
const fileFilter = (req, file, cb) => {
    // Check if the field name is 'thumbnail' or 'images'
    console.log(454854);
    if (file.fieldname === 'thumbnail' || file.fieldname === 'images') {
        console.log(45);
        // Accept the file
        cb(null, true);
    } else {
        // Reject the file (remove invalid field)
        cb(new Error('Invalid field'), false);
    }
};

const storageForImages = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(), '/uploads/book-images'))
    },
    filename: function (req, file, cb) {
        // console.log(req.files);
        // console.log(45);
        // console.log(file.originalname.split(".")[1]);
        const ext = file.originalname.split(".")[1]
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, "book-" + file.fieldname + '-' + uniqueSuffix + "." + ext)
    }
})

const uploadImages = multer({ storage: storageForImages})
export { uploadThumbnail, uploadImages };