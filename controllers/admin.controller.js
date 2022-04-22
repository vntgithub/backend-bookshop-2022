const Admin = require('../models/admin.model');
const User = require('../models/user.model')
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const RefreshToken = require('../models/refreshToken.model');

module.exports = {
    login: async (req, res) => {
        const { username, password } = req.body
        let admin = await Admin.findOne({ username: username, password: md5(password) })
        if (admin) {
            delete admin.password
            accessToken = jwt.sign({ userId: admin["_id"] }, process.env.TOKEN_SECRET_KEY, { expiresIn: '1d' })
            refreshToken = jwt.sign({ userId: admin["_id"] }, process.env.REFRESH_TOKEN_SECRET_KEY)
            RefreshToken.create(refreshToken)
            res.json({ admin, accessToken, refreshToken })
        } else {
            res.status(400).send("Username or password is wrong!")
        }
    },
    loginByToken: async (req, res) => {
        const adminId = req.user.userId;
        let admin = await Admin.findById(adminId)
        if (admin) {
            delete admin.password
            res.json({ admin })
        } else {
            res.status(400).send("Token is wrong")
        }

    }

}