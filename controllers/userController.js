const User = require('../models/User');
const shortId = require('shortid');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

// require signin middleware
exports.requireSignIn = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: "user",
});


exports.signup = (req, res) => {
    const { firstName, lastName, email, password, phoneNo } = req.body;

    User.findOne({ email }).exec((err, user) => {
        if (err || user) return res.status(400).json({ error: "User Already Exists!" });

        let username = shortId.generate();

        const newUser = new User({ firstName, lastName, email, password, username, phoneNo });
        newUser.save((err, success) => {
            if (err) return res.status(400).json({ error: err });
            res.json({ msg: "User registration successfully." });
        });
    });
}


exports.signin = (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email }).exec((err, user) => {
        if (err || !user) return res.status(400).json({ error: "User with that email dose not exits. Please signUp" });
        // authenticate
        if (!user.authenticate(password)) return res.status(400).json({ error: "Email & password do not match" });
        // generate a new token
        let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.cookie('token', token, { expiresIn: "1d" });

        let { _id, username, firstName, lastName, email, phoneNo } = user;
        res.json({
            token,
            user: { _id, username, firstName, lastName, email, phoneNo }
        });
    });
}


exports.signout = (req, res) => {
    res.clearCookie('token');
    res.json({ msg: "SignOut successfully." });
}