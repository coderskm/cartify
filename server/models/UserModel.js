const mongoose = require("mongoose");

/* 
1. schema of user data which will be stored in database for user who registers 
2. user's fullname, email, username and password is required for registration
*/
 
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