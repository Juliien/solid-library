const jwt = require("jsonwebtoken");
const models = require('../models');
const Session = models.Session;

exports.verifyToken = async (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if (token) {
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }
        const invalidateToken = await Session.findOne({token: token});

        if(invalidateToken) {
            return res.status(403).json({message: "Forbidden! the token has expired !"});
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log(err);
                return res.status(401).json({message: "Unauthorized token !"});
            }
            req.decoded = decoded;
            next();
        });
    } else {
        return res.status(403).json({message: "No token provided !"});
    }
};
