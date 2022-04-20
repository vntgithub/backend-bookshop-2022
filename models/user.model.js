const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, index: true, unique: true },
    password: String,
    name: String,
    urlimg: String,
    address: String,
    phonenumber: String
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;