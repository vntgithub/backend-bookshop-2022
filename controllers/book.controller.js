const Book = require('../models/book.model')
const Admin = require('../models/admin.model')

module.exports = {
    create: async (req, res) => {
        const book = await Book.create({ ...req.body })
            .catch(err => res.status(400).send({ err: err }))
        res.json({ book: book })
    },
    update: async (req, res) => {
        const book = await Book.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
            .catch(err => res.status(400).send({ err: err }))
        res.json({ book: book })
    },
    delete: async (req, res) => {
        Book.findByIdAndDelete(req.query.id)
            .catch(err => res.status(400).send({ err: err }))
        res.json("Deleted")
    },
    getBooks: async (req, res) => {
        const page = req.query.page
        const search = req.query.search
        const category = req.query.category
        pattern = {}
        if (search)
            pattern.name = { $regex: new RegExp(".*" + search.toLowerCase() + ".*", "i") }
        if (category) pattern.category = category


        const books = await Book.find(pattern)
            .skip(page * 20)
            .limit(20)
        res.json(books)
    }
}