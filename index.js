require('dotenv').config();
const Express = require("express");
const Mongoose = require("mongoose");
const cors = require('cors');
const routes = require('./routes');

const app = Express();

Mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(() => console.log('Connected to MongoDB!'))
    .catch(error => console.log('MongoDB Connection Error: ' + error.message));

app.use(cors());
routes(app);
app.listen(process.env.PORT, () => console.log('Server started on port :' + process.env.PORT));

module.exports = app;
