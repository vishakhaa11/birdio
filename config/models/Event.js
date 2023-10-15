const mongoose = require('mongoose');
const Schema = mongoose.Schema

const set = {
    block: false,
    role: "user"

}

const Event = new Schema({
    author: { type: String, required: true },
    userid: { type: String, required: true },
    file: { type: String, required: true },
    email: { type: String },
    date: { type: String },
    event: { type: String },
    location: { type: String },
    maxprice: { type: String },
    minprice: { type: String },
    set: { type: Object, default: set }

}, { timestamps: true });

module.exports = mongoose.model('Event', Event)