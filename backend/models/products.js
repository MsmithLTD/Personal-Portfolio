const mongoose = require('mongoose');

const Encrypt = require('../encrypt/encrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username Required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email Required"]
    },
    password: {
        type: String,
        required: [true, "Password Required"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastlogin: Date
});

userSchema.pre('save', async function(next){
    //THIS SCOPE: User Object
    this.password = await Encrypt.encryptPass(this.password);
    next();
});

userSchema.methods.validatePass = async function(plain){
    return await Encrypt.validatePassword(plain, this.password);
}

module.exports = mongoose.model("UserModel", userSchema, "Users");

