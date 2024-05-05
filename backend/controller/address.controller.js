import asyncHandler from "express-async-handler";
import UserModel from "../models/UserModel.js";
import AddressModel from "../models/AddressModel.js";
import createError from "http-errors";

const addAddress = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    const user = await UserModel.findById(_id)
    if(user.addresses === 0){
        return next(createError(422, "You can only add 3 address!"))
    }
    const newAddress = {
        userid: _id,
        ...req.body
    }
    const address = await AddressModel.create(newAddress)
    user.addresses -= 1
    await user.save();
    res.status(200).json({
        success: true,
        message: "Address added successfully",
        address
    })

})

const updateAddress = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    const { id } = req.params
    if (!id) {
        return next(createError(422, "Address id required!"))
    }

    const address = await AddressModel.findOneAndUpdate({ _id: id, userid: _id }, { ...req.body }, { new: true, runValidators: true })
    if (!address) {
        return next(createError(404, "Invalid Address!"))
    }

    res.status(200).json({
        success: true,
        message: "Address Updated successfully",
        address
    })

})

const deleteAddress = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    const { id } = req.params;
    if (!id) {
        return next(createError(422, "Address id required!"))
    }
    const user = await UserModel.findById(_id)
    const address = await AddressModel.findOneAndDelete({ _id: id, userid: _id })
    if (!address) {
        return next(createError(404, "Invalid Address!"))
    }

    user.addresses += 1;
    await user.save();

    res.status(200).json({
        success: true,
        message: "Address Deleted successfully",
        address
    })
})

const fetchAddress = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;

    const address = await AddressModel.find({ userid: _id })
    if (!address) {
        return next(createError(404, "Invalid Address!"))
    }

    res.status(200).json({
        success: true,
        message: "Address fetched successfully",
        address
    })
})

export { addAddress, updateAddress, deleteAddress, fetchAddress };