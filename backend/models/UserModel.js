import mongoose from "mongoose";
import bcrypt from "bcrypt"
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
        index: 1,
        validate: {
            validator: function (v) {
                // Regular expression for email validation
                return /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
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
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})


userSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) return next();
        const saltRound = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, saltRound)
        this.password = hashedPassword
        next();
    } catch (error) {
        console.log("Something went wrong while hashing password!!", error);
    }

})

const UserModel = mongoose.model("UserModel", userSchema)
export default UserModel;