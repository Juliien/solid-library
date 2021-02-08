
module.exports = function (app) {
    app.get('/', (req, res) => {
        return res.status(200).json({"word":"Hello!"});
    });
};
