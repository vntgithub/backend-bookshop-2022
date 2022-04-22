const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminSchema = new Schema({
    username: String,
    password: String,
    img: String
})

const Admin = mongoose.model('Admin', adminSchema, 'admins')
module.exports = Admin;