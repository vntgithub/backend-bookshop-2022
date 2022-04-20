const express = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/login', userController.login);
router.post('/loginbytoken',
    authMiddleware.checkToken,
    authMiddleware.protectedRoute,
    userController.loginByToken);
router.post('/', userController.create);
router.patch('/:id', authMiddleware.checkToken, authMiddleware.protectedRoute, userController.update);

module.exports = router;