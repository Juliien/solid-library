const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    author: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Book', BookSchema);

