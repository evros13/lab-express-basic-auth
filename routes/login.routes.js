const express = require('express');
const User = require('../models/User.model');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const mongoose = require('mongoose')



router.get("/login", (req, res) => {
    res.render("auth/login")
})

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
                res.render("auth/login", {
                    errorMessage: "ERROR IS IN THE USER."
                })
                return;
            }
            else if (bcryptjs.compareSync(password, user.passwordHash)) {
                req.session.currentUser = user;
                res.redirect('/user-profile');
            }
            else {
                res.render('auth/login', { errorMessage: 'User not found and/or incorrect password.' });
            }
        })
        .catch(error => next(error));
});

router.post("/logout", (req, res, next) => {
    req.session.destroy(err => {
      if (err) next(err);
      res.redirect('/');
    });
  })

module.exports = router;
