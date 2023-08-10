const express = require('express');
const User = require('../models/User.model');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const mongoose = require('mongoose')


// Setting the login page for the user to enter its existing account
router.get("/login", (req, res) => {
    res.render("auth/login")
})


// Creating the requirements for the backend to find and match the user info entered vs the existing user info in the DB
router.post("/login", (req, res, next) => {
    const {username, password} = req.body;
    console.log(username, password)

    if (username === '' || password === '') {
        res.render('auth/login', {
            errorMessage: 'Please enter both username and password to login.'
        });
        return;
    }
    
    User.findOne({username})
        .then((user) => {
            if (!user) {
                res.render("auth/login", { errorMessage: "User not found and/or incorrect passwrord." })
                return;
            }
            else if (bcryptjs.compareSync(password, user.passwordHash)) {
                req.session.currentUser = user
                res.redirect('/user-profile')
            }
            else {
                res.render('auth/login', { errorMessage: "User not found and/or incorrect passwrord." });
            }
        })
        .catch(error => next(error));
});


// Creating the logout option for the user to manually end the session
router.post("/logout", (req, res, next) => {
    req.session.destroy(err => {
      if (err) next(err);
      res.redirect('/');
    });
})


module.exports = router;
