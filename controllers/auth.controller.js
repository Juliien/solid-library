const models = require('../models');
const bCrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = models.User;
const Session = models.Session;

exports.register = async (req, res) => {
    if (req.body.username && req.body.password && req.body.key) {
        try {
            const user = await User.findOne({username: req.body.username});
            if(!user) {
                let isAdmin = false;
                if(req.body.key === process.env.LIBRARIAN_KEY) {
                    isAdmin = true;
                }
                const user = new User({
                    username: req.body.username,
                    password: bCrypt.hashSync(req.body.password, 10),
                    isAdmin: isAdmin,
                });
                await user.save();
                return res.status(201).json(user);
            }
            return res.status(409).json({message: "User: " + req.body.username + " already exists"});
        } catch (e) {
            return res.status(500).json({message: "Internal Server Error: " + e.message});
        }
    }
    return res.status(400).json({message: "Bad Request !"});
};

exports.login = async (req, res) => {
    if (req.body.username && req.body.password) {
        try {
            const user = await User.findOne({username: req.body.username});
            if (user && bCrypt.compareSync(req.body.password, user.password)) {
                const token = jwt.sign({id: user._id, isAdmin: user.isAdmin},
                    process.env.JWT_SECRET, {expiresIn: '2h'});
                await User.updateOne({_id: user.id}, {token: token});
                const loggedUser = await User.findOne({_id: user.id});
                return res.status(200).json(loggedUser);
            }
            return res.status(403).json({message: "Forbidden !"});
        } catch (e) {
            return res.status(500).json({message: "Internal Server Error: " + e.message});
        }
    }
    return res.status(400).json({message: "Bad Request !"});
};

exports.logout = async (req, res) => {
    try {
        if(req.headers) {
            let token = req.headers['x-access-token'] || req.headers['authorization'];
            if (token.startsWith('Bearer ')) {
                token = token.slice(7, token.length);
            }
            const session = new Session({token: token});
            await session.save();
            return res.status(204).end();
        }
        return res.status(403).json({message: "Forbidden !"});
    } catch (e) {
        return res.status(500).json({message: "Internal Server Error: " + e.message});
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findOne({_id: req.decoded.id});
        if (user) {
            return res.status(200).json(user);
        }
        return res.status(404).json({message: "User Not Found !"});
    } catch (e) {
        return res.status(500).json({message: "Internal Server Error: " + e.message});
    }
};
