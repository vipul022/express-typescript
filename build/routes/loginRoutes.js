"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var router = express_1.Router();
exports.router = router;
router.get('/login', function (req, res) {
    res.send("\n    <form method=\"Post\">\n    <div>\n      <lebel>Email</lebel>\n      <input type=\"email\" name=\"email\" />\n    </div>\n    <div>\n      <lebel>Password</lebel>\n      <input type=\"password\" name=\"password\" />\n    </div>\n  <button>Submit</button>\n    </form>\n  ");
});
router.post('/login', function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    // !added type guard
    if (email) {
        res.send(email);
    }
    else {
        res.send('Email is invalid!');
    }
});
