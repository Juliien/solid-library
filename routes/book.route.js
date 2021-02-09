const bodyParser = require('body-parser');
const BookController = require('../controllers').BookController;
const AuthMiddleware = require('../middlewares').AuthMiddleware;

module.exports = function (app) {
    app.post(process.env.API_URL + '/book', bodyParser.json(), AuthMiddleware.verifyToken, BookController.insertBook);
    app.get(process.env.API_URL + '/books', BookController.getBooks);
    app.post(process.env.API_URL + '/borrow/book', bodyParser.json(), AuthMiddleware.verifyToken, BookController.borrowBook);
    app.post(process.env.API_URL + '/return/book', bodyParser.json(), AuthMiddleware.verifyToken, BookController.returnBook);
};
