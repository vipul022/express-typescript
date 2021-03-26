"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var requireAuth = function (req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    else {
        res.status(403);
        res.send('Not Permitted');
    }
};
var router = express_1.Router();
exports.router = router;
router.get('/login', function (req, res) {
    res.send("\n    <form method=\"Post\">\n    <div>\n      <lebel>Email</lebel>\n      <input type=\"email\" name=\"email\" />\n    </div>\n    <div>\n      <lebel>Password</lebel>\n      <input type=\"password\" name=\"password\" />\n    </div>\n  <button>Submit</button>\n    </form>\n  ");
});
router.post('/login', function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    // !added type guard
    if (email && password && email === 'v@v.com' && password === 'password') {
        // !mark the person as loggedin
        req.session = { loggedIn: true };
        res.redirect('/');
    }
    else {
        res.send('Email is invalid!');
    }
});
router.get('/', function (req, res) {
    if (req.session && req.session.loggedIn) {
        // console.log("req.session,loggenIn=>", req.session.loggedIn)
        res.send("\n      <div>\n      <div>\n        <h1>You are logged in</h1>\n      </div>\n      <a href ='/logout'> Logout</a>\n      </div>\n    ");
    }
    else {
        res.send("\n    <div>\n    <div>\n      <h1>You are not logged in</h1>\n    </div>\n    <a href ='/login'> Login</a>\n    </div>\n  ");
    }
});
router.get('/logout', function (req, res) {
    console.log("req.session=>", req.session);
    req.session = undefined;
    res.redirect('/');
});
router.get('/protected', requireAuth, function (req, res) {
    res.send("Welcome to protected zone!");
});
