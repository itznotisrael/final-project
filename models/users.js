const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    /*animeTitle: { type: String, required: true },      // The anime the memory is from
    emotion: { type: String, required: true },        // Hype, Heartbreak, Wholesome, Philosophical, Trauma
    memoryText: { type: String, required: true },     // User's memory or description
    createdAt: { type: Date, default: Date.now }*/      // Timestamp of submission
    animeTitle: String,
    emotion: String,
    memoryText:String
});

module.exports = mongoose.model('User', usersSchema);