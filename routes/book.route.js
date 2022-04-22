const express = require('express')
const { getBooks } = require('../controllers/book.controller')
const router = express.Router()
const bookController = require('../controllers/book.controller')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', bookController.getBooks)

module.exports = router