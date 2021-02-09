const models = require('../models');
const Book = models.Book;
const User = models.User;

exports.insertBook = async (req, res) => {
    if (req.body.title && req.body.author) {
        try {
            const book = await Book.findOne({title: req.body.title, author: req.body.author});
            if(!book && req.decoded.isAdmin) {
                const newBook = new Book({
                    title: req.body.title,
                    author: req.body.author,
                });
                await newBook.save();
                return res.status(201).json(newBook);
            }
            return res.status(409).json({message:'Conflict !'});
        } catch (e) {
            return res.status(500).json({message: "Internal Server Error: " + e.message});
        }
    }
    return res.status(400).json({message: "Bad Request !"});
};

exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        if (books) {
            return res.status(200).json(books);
        }
        return res.status(400).json({message: "Bad Request !"});
    } catch (e) {
        return res.status(500).json({message: "Internal Server Error: " + e.message});
    }
};

exports.borrowBook = async (req, res) => {
    if (req.body.title && req.body.author) {
        try {
            const user = await User.findOne({_id: req.decoded.id});
            const book = await Book.findOne({title: req.body.title,
                author: req.body.author, isAvailable: true});
            if (user && user.borrowed.length < 4 && book) {
                await User.updateOne({_id: user._id}, {$push: {borrowed: book}});
                await Book.updateOne({_id: book._id}, {$set: {isAvailable: false}});

                return res.status(204).end();
            }
            return res.status(400).json({message: "Bad Request !"});
        } catch (e) {
            return res.status(500).json({message: "Internal Server Error: " + e.message});
        }
    }
    return res.status(400).json({message: "Bad Request !"});
};

exports.returnBook = async (req, res) => {
    if (req.body.title && req.body.author) {
        try {
            const user = await User.findOne({_id: req.decoded.id});
            const book = await Book.findOne({title: req.body.title,
                author: req.body.author, isAvailable: false});
            if (user && book && user.borrowed.includes(book._id)) {
                await User.updateOne({_id: user._id}, {$pull: {borrowed: book._id}});
                await Book.updateOne({_id: book._id}, {$set: {isAvailable: true}});

                return res.status(204).end();
            }
            return res.status(400).json({message: "Bad Request !"});
        } catch (e) {
            return res.status(500).json({message: "Internal Server Error: " + e.message});
        }
    }
    return res.status(400).json({message: "Bad Request !"});
};

exports.getBookById = async (req, res) => {
    if (req.params.id) {
        try {
            const book = await Book.findOne({_id: req.params.id});
            if (book) {
                return res.status(200).json(book);
            }
            return res.status(404).json({message: "Book Not Found !"});
        } catch (e) {
            return res.status(500).json({message: "Internal Server Error: " + e.message});
        }
    }
    return res.status(400).json({message: "Bad Request !"});
};

