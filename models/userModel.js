const mongoose = require('mongoose');
const Schema =mongoose.Schema;
const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
    },
    username: {
        type: String,
        required: [true, "Please enter your username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],

        },
        phone:{
            type:Number,

        }
       
});

const User = mongoose.model("UserModel", UserSchema);

module.exports = User;
