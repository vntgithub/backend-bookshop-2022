const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const RefreshToken = require('../models/refreshToken.model');

module.exports = {
    create: async (req, res) => {
        refreshToken = req.body.token
        if (refreshToken == null) return res.status(401).send("Unauthorized")

        const doc = await RefreshToken.findOne({ refreshToken: refreshToken })
        if (doc) {
            const accessToken = jwt.sign({ userId: doc.userId }, process.env.TOKEN_SECRET_KEY, { expiresIn: '1d' })
            res.json({ accessToken })
        } else {
            res.status(401).send("Unauthorized")
        }

    },
    delete: async (req, res) => {
        RefreshToken.findOneAndDelete({ refreshToken: req.body.token })
        res.status(204)
    }
}

