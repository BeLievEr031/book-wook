import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
        required: [true, "Admin id Required."]
    },
    genreid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GenreModel",
        required: [true, "Book Genre Required."]
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        default: 0
    },
    isForSale: {
        type: Boolean,
        default: false
    },
    isForRent: {
        type: Boolean,
        default: false
    },
    rentalPrice: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 0,
        min: 1,
        max: 5
    },
    genre: {
        type: String,
        trim: true
    },
    thumbnail: {
        type: String,
        default: ""
    },
    photos: {
        type: [String],
        default: []
    },
    pdf: {
        type: String,
        default: ""
    },
    quantity: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Compile Book model from schema
const BookModel = mongoose.model('BookModel', bookSchema);

export default BookModel;
