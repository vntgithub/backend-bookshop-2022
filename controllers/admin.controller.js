const Admin = require('../models/admin.model');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const RefreshToken = require('../models/refreshToken.model');

module.exports = {
    login: async (req, res) => {
        const { username, password } = req.body
        let admin = await Admin.findOne({ username: username, password: md5(password) })
        if (admin) {
            delete admin._doc.password
            accessToken = jwt.sign({ adminId: admin["_id"] }, process.env.TOKEN_SECRET_KEY, { expiresIn: '1d' })
            refreshToken = jwt.sign({ adminId: admin["_id"] }, process.env.REFRESH_TOKEN_SECRET_KEY)
            RefreshToken.create({ refreshToken: refreshToken })
            res.json({ admin, accessToken, refreshToken })
        } else {
            res.status(400).send("Username or password is wrong!")
        }
    },
    loginByToken: async (req, res) => {
        const adminId = req.user.adminId;
        let admin = await Admin.findById(adminId)
        if (admin) {
            delete admin._doc.password
            res.json({ admin })
        } else {
            res.status(400).send("Token is wrong")
        }

    }

}