const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
    name: String,
    author: String,
    categogy: String,
    price: Number,
    urlimg: String,
})

const Book = mongoose.model('Book', bookSchema, 'books')
module.exports = Book