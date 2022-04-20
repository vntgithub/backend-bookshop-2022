const md5 = require('md5');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const RefreshToken = require('../models/refreshtoken.model');

module.exports = {
    login: async (req, res) => {
        const username = req.body.username;
        const password = md5(req.body.password);
        await User.findOne({ username: username, password: password })
            .then(row => {
                if (row) {
                    const user = { ...row['_doc'] }
                    delete user.password

                    const token = jwt.sign(user, process.env.TOKEN_SECRET_KEY, { expiresIn: '15s' })
                    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET_KEY)
                    RefreshToken.create({ refreshToken, userId: user['_id'] })
                    res.json({ user, token, refreshToken })
                } else {
                    res.sendStatus(400).send('Username or password is wrong');
                }
            })

    },
    loginByToken: async (req, res) => {
        const userId = req.user.userId;
        await User.findById(userId)
            .then(user => {
                if (user) {
                    const userInformation = { ...user['_doc'] };
                    delete userInformation.password;
                    res.json({
                        userInformation
                    });
                } else {
                    res.json('Token is wrong!');
                }
            })
    },

    checkUsername: async (req, res) => {
        const username = req.params.username;
        await User.findOne({ username: username })
            .then(user => {
                if (user)
                    res.json(false);
                else
                    res.json(true);
            })
            .catch(err => console.log(err))
    },
    add: async (req, res) => {
        const data = { ...req.body, password: md5(req.body.password) };

        await User.create(data)
            .then(user => {
                let userData = { ...user["_doc"] }
                delete userData.password
                res.json(userData)
            })
            .catch(err => res.sendStatus(400).send(err));
    },
    update: async (req, res) => {
        const dataUpdate = { ...req.body };
        const idUserNeedUpdate = dataUpdate['_id'];
        delete dataUpdate['_id'];
        await User.findByIdAndUpdate(idUserNeedUpdate, dataUpdate)
            .then(() => res.json('Updated!'))
            .catch(err => console.log(err));

    },
    delete: async (req, res) => {
        const idUserNeedDelete = req.params.id;
        await Student.findByIdAndDelete(idUserNeedDelete)
            .then(() => res.json("Deleted!"))
            .catch(err => console.log(err))
    }
}