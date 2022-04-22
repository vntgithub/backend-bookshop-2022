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
        let searchObject
        if (search)
            searchObject = { $regex: new RegExp(".*" + search.toLowerCase() + ".*", "i") }
        else
            searchObject = true
        const category = req.query.category || true
        const books = await Book.find({ name: searchObject, category: category })
            .skip(page * 20)
            .limit(20)
        res.json(books)
    }
}