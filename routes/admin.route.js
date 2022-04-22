const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin.controller')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/login', adminController.login)
router.post('/loginByToken', authMiddleware.checkToken, authMiddleware.protectedRoute, adminController.loginByToken)

module.exports = router