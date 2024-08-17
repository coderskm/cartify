const mongoose = require("mongoose");

const UserModel = new mongoose.Schema({
    fullname: {
        type: String
    },
    email: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model("User", UserModel);