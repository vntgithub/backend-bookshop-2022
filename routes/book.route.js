const express = require('express')
const { getBooks } = require('../controllers/book.controller')
const router = express.Router()
const bookController = require('../controllers/book.controller')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', bookController.getBooks)
router.post('/', authMiddleware.checkToken, authMiddleware.protectedRoute, bookController.create)
router.delete('/:id', authMiddleware.checkToken, authMiddleware.protectedRoute, bookController.delete)
router.patch('/:id', authMiddleware.checkToken, authMiddleware.protectedRoute, bookController.update)


module.exports = router