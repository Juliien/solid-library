const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    token: {
        type: String,
        required: false,
        default: null
    },
    borrowed: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: false,
        default: []
    }]
});

module.exports = mongoose.model('User', UserSchema);
