const { Router } = require("express");
const router = new Router();

const bcryptjs = require("bcryptjs");
const saltRounds = 10;

const User = require("../models/User.model");

router.get("/sign-up", (req, res) => {
  res.render("auth/signup");
});

router.post("/sign-up", (req, res, next) => {
    const {username, password} = req.body;
  
    bcryptjs
      .genSalt(saltRounds)
      .then((salt) => bcryptjs.hash(password, salt))
      .then((hashedPassword) => {
        return User.create({
          username,
          email,
          passwordHash: hashedPassword
        });
      })
      .catch((error) => next(error));
  });


module.exports = router;
