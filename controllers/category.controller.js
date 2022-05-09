const Category = require('../models/category.model')

const categoryController = {
    getCategories: async (req, res) => {
        const categories = await Category.find()
        res.json(categories)
    },
    create: async (req, res) => {
        const categories = await Category.create(res.body).catch(err => res.status(400).send({ err: err }))
        res.json({ category: category })
    }
}

module.exports = categoryController