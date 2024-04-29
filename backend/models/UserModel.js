import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User name required!!"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "User email required!!"],
        unique: true,
        index: 1
    },
    password: {
        type: String,
        required: [true, "User email required!!"],
        select: false
    },
    forgetToken: {
        type: String,
        default: ""
    },
    verifyToken: {
        type: String,
        default: ""
    },
    otp: {
        type: String,
        default: ""
    },
    role: {
        type: String,
        required: [true, "User Role required!!"],
        enum: ["ADMIN", "USER"],
        default: "USER"
    },
    refreshToken: {
        type: String,
        default: ""
    },
    accessToken: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
})

const UserModel = mongoose.model("UserModel", userSchema)
export default UserModel;