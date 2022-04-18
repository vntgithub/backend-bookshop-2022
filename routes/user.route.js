const express = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/login', userController.login);
router.post('/loginbytoken',
    authMiddleware.checkToken,
    authMiddleware.protectedRoute,
    userController.loginByToken);
router.post('/add', userController.add);
// router.put('/update', userController.update);

router.get('/checkusername/:username', userController.checkUsername);
// router.post('/getbyarrayid', userController.getNameCodeByArrId);

module.exports = router;