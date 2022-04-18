const md5 = require('md5');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports = {
    login: async (req, res) => {
        const username = req.body.username;
        const password = md5(req.body.password);
        await User.findOne({ username: username, password: password })
            .then(user => {
                if (user) {
                    const userInformation = { ...user['_doc'] };
                    delete userInformation.password;
                    const token = jwt.sign({
                        userId: userInformation['_id']
                    }, process.env.TOKEN_SECRET_KEY, { expiresIn: '1d' });
                    res.json({
                        userInformation,
                        token,
                    });
                } else {
                    res.json('User not found!');
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

        const newUser = new User(data);
        await User.create(newUser)
            .then(user => {
                let userData = { ...user["_doc"] }
                delete userData.password
                res.json(userData)
            })
            .catch(err => consle.log(err));
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