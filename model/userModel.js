const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNmber: {
        type: String,
        default: null
    },
    address: {
        type: String,
        default: null
    },
    profilePic: {
        type: String,
        default: null
    },
    role: {
        type: String,
        enum: ["user", "admin", "landlord"],
        default: "user"
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },
    isActive: {
        type: Boolean,
        default: true
    },


}, { timestamps: true })

const userModel = mongoose.models.user || mongoose.model("user", userSchema) 

module.exports = userModel
