const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  name: String,
  completed: Boolean,
  createdAt: Date
});

module.exports = mongoose.model('User', usersSchema);