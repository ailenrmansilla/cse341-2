const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    googleId: String,
    userName: String
});
const User = mongoose.model('user', UserSchema);

module.exports = User;