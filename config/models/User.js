const mongoose = require('mongoose');

const Schema = mongoose.Schema

const set = {
    block: false,
    role: "user"

}

const User = new Schema({
    username: { type: String, required: true, unique: true, minlength: 3 },
    email: { type: String, required: false,},
    password: { type: String, required: true },
    postList : {type: Array},
    set: { type: Object, default: set }

}, { timestamps: true });

module.exports = mongoose.model('User', User)