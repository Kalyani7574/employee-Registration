const mongoose = require('mongoose');

const User = new mongoose.Schema({
name: String,
email: String,
password: String,
date: Date
 });

module.exports = mongoose.model('user2', User);             //user2 is table name