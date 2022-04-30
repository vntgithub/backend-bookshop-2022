const express = require('express')
const router = express.Router()
const invoiceController = require('../controllers/invoice.controller')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware.checkToken, authMiddleware.protectedRoute, invoiceController.create)
router.get('/', authMiddleware.checkToken, authMiddleware.protectedRoute, invoiceController.getUserInvoices)
router.patch('/:id', authMiddleware.checkToken, authMiddleware.protectedRouteAdmin, invoiceController.updateForAdmin)

module.exports = router