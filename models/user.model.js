const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    name: String,
    urlimg: String,
    address: String,
    phonenumber: String
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;