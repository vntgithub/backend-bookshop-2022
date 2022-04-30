const Category = require('../models/category.model')

const categoryController = {
    getCategories: async (req, res) => {
        const categories = await Category.find()
        res.json(categories)
    }
}

module.exports = categoryController