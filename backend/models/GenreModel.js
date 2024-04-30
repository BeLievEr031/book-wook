import mongoose from "mongoose";

// Define Genre Schema
const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Genre name required."],
        unique: true
    },
    description: {
        type: String,
        required: [true, 'Description required.']
    }
}, {
    timestamps: true
});

// Compile Genre model from schema
const GenreModel = mongoose.model('GenreModel', genreSchema);

export default GenreModel;
