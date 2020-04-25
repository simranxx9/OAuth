const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name:String,
    userId:String,
    thumbnail:String,
})

const User = mongoose.model('user',Schema);

module.exports = User;