const mongoose = require('mongoose')
const Schema = mongoose.Schema

const invoiceSchema = new Schema({
    userId: String,
    name: String,
    phonenumber: String,
    address: String,
    date: Date,
    cart: Array,
    totalamount: Number,
    state: String
})

const Invoice = mongoose.model('Invoice', invoiceSchema, 'invoices')
module.exports = Invoice