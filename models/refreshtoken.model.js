const mongoose = require('mongoose')
const Schema = mongoose.Schema

const refreshTokenSchema = new Schema({
    refreshToken: String,
    userID: mongoose.Types.ObjectId
})
const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema, 'refresh_tokens')
module.exports = RefreshToken