import mongoose from 'mongoose';

// Define Address Schema
const addressSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    street: {
        type: String,
        required: [true, "Street required."]
    },
    city: {
        type: String,
        required: [true, "City required."]
    },
    state: {
        type: String,
        required: [true, "State required."]
    },
    postalCode: {
        type: String,
        required: [true, "Postal code required."]
    },
    country: {
        type: String,
        required: [true, "Country required."]
    }
}, {
    timestamps: true
});

// Compile Address model from schema
const AddressModel = mongoose.model('AddressModel', addressSchema);

export default AddressModel;
