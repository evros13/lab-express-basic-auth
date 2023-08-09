// const { Router } = require("express");
// const router = new Router();
// const mongoose = require('mongoose');

// const bcryptjs = require("bcryptjs");
// const saltRounds = 10;

// const User = require("../models/User.model");

// router.get("/sign-up", (req, res) => {
//   res.render("auth/signup");
// });


// router.post("/sign-up", (req, res, next) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     res.render('auth/signup', { errorMessage: 'All fields are mandatory. Please provide your username and password.' });
//     return;
//   }

//   bcryptjs
//     .genSalt(saltRounds)
//     .then(salt => bcryptjs.hash(password, salt))
//     .then(hashedPassword => {
//       return User.create({
//         username,
//         passwordHash: hashedPassword
//       })
//     })
//     // .then(userFromDB => {
//     //   console.log('Newly created user is: ', userFromDB);
//     //   res.redirect("/user-profile");
//     // })
//     .catch(error => {
//       if (error instanceof mongoose.Error.ValidationError) {
//         res.status(500).render('auth/signup', { errorMessage: error.message });
//       } else {
//         next(error);
//       }
//     });
// });

// router.get("/user-profile", (req, res) => {
//   res.render('users/user-profile')
// })

// router.get("/login", (req, res) => {
//   res.render("auth/login")
// })

// router.post("/login", (req, res, next) => {
//   const {username, password} = req.body;

//   if (username === '' || password === '') {
//     res.render('auth/login', {
//       errorMessage: 'Please enter both and password to login.'
//     });
//     return;
//   }

//   User.findOne({username})
//     .then((user) => {
//       if (!user) {
//         res.render("auth/login", {
//           errorMessage: "User not found and/or incorrect password."
//         })
//         return;
//       }
//       else if (bcryptjs.compareSync(password, user.passwordHash)) {
//         res.render("users/user-profile", { user });
//       }
//       else {
//         console.log("Incorrect password. ");
//         res.render('auth/login', { errorMessage: 'User not found and/or incorrect password.' });
//       }
//     })
//     .catch(error => next(error));
// });

// module.exports = router;
