import asyncHandler from "express-async-handler";
import CartItemModel from "../models/CartItemModel.js"
import BookModel from "../models/BookModel.js"
import OrderModel from "../models/OrderModel.js"
import ApiResponse from "../utils/ApiResponse.js"
import createError from "http-errors";

const placeOrder = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    const { cartItem } = req.body;

    if (!cartItem && typeof cartItem !== "object" && cartItem.length === 0) {
        return next(createError(422, "Cartitem required."))
    }

    // Check if the cart items are valid
    const cart = await CartItemModel.find({ $and: [{ _id: { $in: cartItem }, userid: _id }, { status: "CART" }] })

    if (cart.length === 0) {
        return next(createError(404, "Cart is empty"))
    }

    // Now check for the stocks
    const orderItems = [];
    let totalPrice = 0;

    await Promise.all(cart.map(async (item) => {
        const book = await BookModel.findById(item.bookid);
        if (book.quantity >= item.quantity) {
            // Now update the stock
            book.quantity = book.quantity - item.quantity;
            item.status = "ORDER";
            orderItems.push(item._id);
            totalPrice += item.quantity * book.price; // Accumulate totalPrice
            await book.save(); // Uncomment if you want to save changes to the book
            await item.save();
        }
    }));


    const newOrder = {
        userid: _id,
        products: orderItems,
        totalPrice
    }

    const order = await OrderModel.create(newOrder)
    res.status(200).json(new ApiResponse(true, "Order placed", order))
})

const cancleOrder = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    const { id } = req.params;
    if (!id) {
        return next(createError(422, "Order id required!!"))
    }

    const order = await OrderModel.findOne({ userid: _id, _id: id, status: { $in: ["Pending", "Processing"] } });
    if (!order) {
        return next(createError(404, "Invalid order."))
    }

    const products = order.products;
    const cartItems = await CartItemModel.find({ $and: [{ _id: { $in: products }, userid: _id }, { status: "ORDER" }] })
    if (!cartItems) {
        return next(createError(404, "Invalid order."))
    }

    cartItems.map(async (item) => {
        const book = await BookModel.findById(item.bookid)
        book.quantity += item.quantity;
        item.status = "CANCLE";
        await book.save();
        await item.save();
    })

    order.status = "Cancle";
    await order.save();

    res.status(200).json(new ApiResponse(true, "Order cancled", order))
}
)

const fetchOrder = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    const { type, id, limit, page } = req.query;

    let order = null;
    if (type === "all") {
        order = await OrderModel.find({ userid: _id }).populate({
            path: "products",
            model: "CartItemModel",
            select: "quantity",
            populate: {
                path: "bookid",
                model: "BookModel",
                select: "title description price author genre rating",
                populate: {
                    path: "genreid",
                    model: "GenreModel",
                    select: "name"
                }
            }
        }).limit(limit).skip((page - 1) * limit).select("status")
    } else if (type === "single") {
        order = await OrderModel.findOne({ userid: _id, _id: id }).populate({
            path: "products",
            model: "CartItemModel",
            select: "quantity",
            populate: {
                path: "bookid",
                model: "BookModel",
                select: "title description price author genre rating",
                populate: {
                    path: "genreid",
                    model: "GenreModel",
                    select: "name"
                }
            }
        }).select("status")
    }

    res.status(200).json(new ApiResponse(true, "Order fetched successfully.", order))
})

const updateOrder = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;
    const statusValues = ['Pending', 'Processing', 'Shipped', 'Delivered', "Cancle"];
    if (!status || !statusValues.includes(status)) {
        return next(createError(422, "Invalid status."));
    }

    if (!id) {
        return next(createError(422, "Order id required for update."))
    }

    const order = await OrderModel.findByIdAndUpdate(id, { ...req.body }, { new: true, runValidators: true });
    if (!order) {
        return next(createError(404, "Invalid order."))
    }
    // TODO: Socket.io integration
    res.status(200).json(new ApiResponse(true, "Order updated successfully.", order))

})
export { placeOrder, cancleOrder, fetchOrder, updateOrder };