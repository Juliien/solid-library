const bodyParser = require('body-parser');
const AuthController = require('../controllers').AuthController;
const AuthMiddleware = require('../middlewares').AuthMiddleware;

module.exports = function (app) {
    app.post(process.env.API_URL + '/register', bodyParser.json(), AuthController.register);
    app.post(process.env.API_URL + '/login', bodyParser.json(), AuthController.login);
    app.post(process.env.API_URL + '/logout', bodyParser.json(), AuthMiddleware.verifyToken, AuthController.logout);
    app.get(process.env.API_URL + '/user', AuthMiddleware.verifyToken, AuthController.getUser);
};
