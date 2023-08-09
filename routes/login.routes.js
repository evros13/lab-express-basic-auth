const { Router } = require("express");
const router = new Router();
const mongoose = require('mongoose');

const bcryptjs = require("bcryptjs");
const saltRounds = 10;

const User = require("../models/User.model");



router.get("/login", (req, res) => {
    res.render("auth/login")
})

router.post("/login", (req, res, next) => {
    const { username, password } = req.body;

    if (username === '' || password === '') {
        res.render('auth/login', {
            errorMessage: 'Please enter both and password to login.'
        });
        return;
    }

    User.findOne({ username })
        .then((user) => {
            if (!user) {
                res.render("auth/login", {
                    errorMessage: "User not found and/or incorrect password."
                })
                return;
            }
            else if (bcryptjs.compareSync(password, user.passwordHash)) {
                res.render("users/user-profile", { user });
            }
            else {
                console.log("Incorrect password. ");
                res.render('auth/login', { errorMessage: 'User not found and/or incorrect password.' });
            }
        })
        .catch(error => next(error));
});

module.exports = router;
