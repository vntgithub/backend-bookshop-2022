const md5 = require('md5');
const User = require('../models/user.model');
const Admin = require('../models/admin.model')
const jwt = require('jsonwebtoken');
const RefreshToken = require('../models/refreshToken.model');

module.exports = {
    login: async (req, res) => {
        const username = req.body.username;
        const password = md5(req.body.password);
        let user = await User.findOne({ username: username, password: password })
        if (user) {
            const accessToken = jwt.sign({ userId: user["_id"] }, process.env.TOKEN_SECRET_KEY, { expiresIn: '1d' })
            const refreshToken = jwt.sign({ userId: user["_id"] }, process.env.REFRESH_TOKEN_SECRET_KEY)
            RefreshToken.create({ refreshToken: refreshToken, userId: user["_id"] })
            delete user._doc.password;
            res.json({ user, accessToken, refreshToken })
        } else {
            res.status(400).send("Username or password is worng!")
        }

    },
    loginByToken: async (req, res) => {
        const userId = req.user.userId;
        const user = await User.findById(userId)
        if (user) {
            delete user._doc.password;
            res.json({ user });
        } else {
            res.json('Token is wrong!');
        }
    },
    create: async (req, res) => {
        const data = { ...req.body, password: md5(req.body.password) };

        user = await User.create(data).catch(error => res.status(400).send("Username already exists"));

        if (user) {
            delete user._doc.password;
            res.json(user)
        }

    },
    update: async (req, res) => {
        const idUserNeedUpdate = req.params.id
        const userId = req.user.userId
        if (idUserNeedUpdate != userId) res.status(403).send("Forbidden")
        const dataUpdate = { ...req.body };

        let user = await User.findByIdAndUpdate(idUserNeedUpdate, dataUpdate, { new: true })
            .catch(err => res.status(400).send("Somethings wrong!"));
        if (user) {
            delete user._doc.password;
            res.json(user)
        }

    },
    getUsers: async (req, res) => {
        const { page } = req.query
        const users = await User.find({})
            .skip(page * 15)
            .limit(15)

        const count = await User.countDocuments()
        res.json({ users, count: Math.floor(count / 15) })
    },
    delete: async (req, res) => {
        const userId = req.params.id
        const user = await User.findByIdAndDelete(userId)
        if (user)
            res.json("Deleted!")
        else
            res.status(400).send("User not found")
    }
}