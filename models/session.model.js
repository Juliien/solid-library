const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Session', SessionSchema);
