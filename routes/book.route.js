const bodyParser = require('body-parser');
const BookController = require('../controllers').BookController;
// const AuthMiddleware = require('../middlewares').AuthMiddleware;

module.exports = function (app) {
    app.post(process.env.API_URL + '/book', bodyParser.json(), BookController.insertBook);
    app.get(process.env.API_URL + '/books', BookController.getBooks);
};
