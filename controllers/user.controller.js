const md5 = require('md5');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const RefreshToken = require('../models/refreshToken.model');

module.exports = {
    login: async (req, res) => {
        const username = req.body.username;
        const password = md5(req.body.password);
        let user = await User.findOne({ username: username, password: password })
        if (user) {
            delete user.password

            const accessToken = jwt.sign({ userId: user["_id"] }, process.env.TOKEN_SECRET_KEY, { expiresIn: '1d' })
            const refreshToken = jwt.sign({ userId: user["_id"] }, process.env.REFRESH_TOKEN_SECRET_KEY)
            const doc = await RefreshToken.findOne({ userId: user["_id"], })
            RefreshToken.create({ userId: user["_id"], refreshToken: refreshToken })

            res.json({ user, accessToken, refreshToken })
        } else {
            res.status(400).send("Username or password is worng!")
        }

    },
    loginByToken: async (req, res) => {
        const userId = req.user.userId;
        user = await User.findById(userId)
        if (user) {
            delete user.password;
            res.json({ user });
        } else {
            res.json('Token is wrong!');
        }
    },
    create: async (req, res) => {
        const data = { ...req.body, password: md5(req.body.password) };

        user = await User.create(data).catch(error => res.status(400).send("Username already exists"));

        if (user) {
            delete user.password
            res.json(user)
        }

    },
    update: async (req, res) => {
        const dataUpdate = { ...req.body };
        const idUserNeedUpdate = req.params.id
        let user = await User.findByIdAndUpdate(idUserNeedUpdate, dataUpdate, { new: true })
            .catch(err => res.status(400).send("Somethings wrong!"));
        if (user) {
            delete user.password
            res.json(user)
        }

    },
    delete: async (req, res) => {
        const idUserNeedDelete = req.params.id;
        await Student.findByIdAndDelete(idUserNeedDelete)
            .then(() => res.json("Deleted!"))
            .catch(err => console.log(err))
    }
}