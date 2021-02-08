module.exports = function (app) {
    require('./auth.route')(app);
    require('./book.route')(app);
};
