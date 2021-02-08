const models = require('../models');
const Book = models.Book;

exports.insertBook = async (req, res) => {
    if (req.body.title && req.body.author) {
        try {
            const book = await Book.findOne({title: req.body.title, author: req.body.author});
            if(!book) {
                const newBook = new Book({
                    title: req.body.title,
                    author: req.body.author,
                });
                await newBook.save();
                return res.status(201).json(newBook);
            }
            return res.status(409).send({message:'This book already exists !'});
        } catch (e) {
            return res.status(500).end();
        }
    }
    return res.status(400).end();
};

exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        if (books) {
            return res.status(200).json(books);
        }
        return res.status(400).send({message: "Bad Request !"});
    } catch (e) {
        return res.status(500).send({message: "Internal Server Error: " + e.message});
    }
};

