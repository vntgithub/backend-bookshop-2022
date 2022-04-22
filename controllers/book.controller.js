const Book = require('../models/book.model')
const Admin = require('../models/admin.model')

module.exports = {
    create: async (req, res) => {
        adminId = req.user.userId
        const admin = await Admin.findById(adminId)
        if (admin) {
            const book = await Book.create({ ...req.body.book })
                .catch(err => res.status(400).send({ err: err }))
            res.json({ book: book })
        } else {
            res.status(401).send("Unauthorized")
        }
    },
    update: async (req, res) => {
        adminId = req.user.userId
        const admin = await Admin.findById(adminId)
        if (admin) {
            const book = await Book.findByIdAndUpdate(req.query.id, { ...req.body.book }, { new: true })
                .catch(err => res.status(400).send({ err: err }))
            res.json({ book: book })
        } else {
            res.status(401).send("Unauthorized")
        }
    },
    delete: async (req, res) => {
        adminId = req.user.userId
        const admin = await Admin.findById(adminId)
        if (admin) {
            Book.findByIdAndDelete(req.query.id)
                .catch(err => res.status(400).send({ err: err }))
            res.json("Deleted")
        } else {
            res.status(401).send("Unauthorized")
        }
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