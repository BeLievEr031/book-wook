import mongoose from "mongoose";

// Define schema for cart items
const cartItemSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    },
    bookid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BookModel',
        required: true
    },
    status: {
        type: String,
        enum: ['CART', 'ORDER',"CANCLE"],
        default: 'CART'
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
});



// Define model
const CartItemModel = mongoose.model('CartItemModel', cartItemSchema);

export default CartItemModel;
