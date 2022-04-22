const express = require('express')
const router = express.Router()
const bookController = require('../controllers/book.controller')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', bookController.getBooks)
router.post('/', authMiddleware.checkToken, authMiddleware.protectedRouteAdmin, bookController.create)
router.delete('/:id', authMiddleware.checkToken, authMiddleware.protectedRouteAdmin, bookController.delete)
router.patch('/:id', authMiddleware.checkToken, authMiddleware.protectedRouteAdmin, bookController.update)


module.exports = router