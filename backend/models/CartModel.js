import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel"
    },
    items: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "CartItemModel"
    },
    status: {
        type: String,
        enum: ["Pending", "Delivered", "Cancled"],
        default: "Pending"
    }
}, {
    timestamps: true
})

// if first product is added to cart, then cart is created
// Cart limit 100 products.

// if cart is full, then user can't add more products.

// cartSchema.pre("save",())
const CartModel = mongoose.model("CartModel",cartSchema)
export default CartModel;