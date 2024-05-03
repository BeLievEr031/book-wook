import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
        default: 'Pending'
    },
    addressid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AddressModel"
    },
    products: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "BookModel"
    },
    totalPrice: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
})

const OrderModel = mongoose.model("OrderModel", orderSchema)
export default OrderModel;

