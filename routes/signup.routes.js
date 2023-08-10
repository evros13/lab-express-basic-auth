const express = require('express');
const User = require('../models/User.model');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const mongoose = require('mongoose')


// Setting the signup page for the user to create its account
router.get("/sign-up", (req, res) => {
    res.render("auth/signup");
});


// Setting the profile page for the uesr to access its information (if there is an active session)
router.get("/user-profile", (req, res) => {
    console.log(req.session.currentUser);
    res.render('users/user-profile', {userInSession: req.session.currentUser})
})


// Setting the requirements for the user to be able to create a valid account to be stored in the DB and re-directing accordingly
router.post("/sign-up", (req, res, next) => {
    const {username, password} = req.body;

    if (!username || !password) {
        res.render('auth/signup', { errorMessage: 'All fields are mandatory. Please provide your username and password.' });
        return;
    }

    bcryptjs
        .genSalt(saltRounds)
        .then(salt => bcryptjs.hash(password, salt))
        .then(hashedPassword => {
            return User.create({
                username,
                passwordHash: hashedPassword
            })
        })
        .then(userFromDB => {
          console.log('Newly created user is: ', userFromDB);
          res.redirect("/user-profile");
        })
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.status(500).render('auth/signup', { errorMessage: error.message });
            } else {
                next(error);
            }
        });
});


module.exports = router;