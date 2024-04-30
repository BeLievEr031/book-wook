import { types } from "joi";
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    genreid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GenreModel"
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
        types: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Compile Book model from schema
const BookModel = mongoose.model('Book', bookSchema);

export default BookModel;
