const { Router } = require("express");
const router = new Router();
const mongoose = require('mongoose');

const bcryptjs = require("bcryptjs");
const saltRounds = 10;

const User = require("../models/User.model");


router.get("/sign-up", (req, res) => {
    res.render("auth/signup");
});


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

router.get("/user-profile", (req, res) => {
    res.render('users/user-profile', {userInSession: req.session.currentUser})
})
  
 
module.exports = router;