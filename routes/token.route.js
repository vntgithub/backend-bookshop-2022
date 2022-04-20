const express = require('express')
const tokenController = require('../controllers/token.controller')
const router = express.Router();

router.post("/", tokenController.create)
router.delete("/", tokenController.delete)

module.exports = router