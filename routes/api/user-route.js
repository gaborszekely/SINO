const express = require("express");
const router = express.Router();
const UserModel = require("../../models/user-model");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const config = require("../../config");
// const { validateBody, schemas } = require("../../helpers/routeHelpers");
const passportLogin = passport.authenticate("local", { session: false });
const passportVerify = passport.authenticate("jwt", { session: false });

// JWT token generation/validation
signToken = user => {
  return jwt.sign(
    {
      iss: "Sino Medical",
      sub: user._id,
      iat: new Date().getTime(), // Current Time
      exp: new Date().setDate(new Date().getDate() + 1)
    },
    config.JWT_SECRET
  );
};

// @route     POST api/
// @desc      Register New User
// @access    Public
router.post("/register", (req, res) => {
  const user = {
    name: {
      firstName: req.body.name.firstName,
      lastName: req.body.name.lastName
    },
    email: req.body.email,
    password: req.body.password, // MUST ENCRYPT FIRST!!!
    address: {
      street: req.body.address.street,
      unit: req.body.address.unit,
      city: req.body.address.city,
      state: req.body.address.state,
      zip: req.body.address.zip,
      country: req.body.address.country
    },
    phone: req.body.phone,
    school: req.body.school,
    edu_status: req.body.edu_status,
    graduation: {
      month: req.body.graduation.month,
      year: req.body.graduation.year
    }
  };

  // CHECK FOR EXISTING USER
  const query = { email: user.email };
  UserModel.findOne(query, (err, user) => {
    if (err) throw err;
    if (user) {
      return res.status(403).json({ error: "User already exists!" });
    }
  });

  // ADD USER TO DB
  const newUser = new UserModel(user);
  newUser
    .save()
    .then(() => {
      // Generate token
      const token = signToken(newUser);
      res.status(201).json({ token });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// @route     POST api/
// @desc      User Login
// @access    Private
router.post("/login", passportLogin, (req, res) => {
  const token = signToken(req.user);
  res.status(200).json({ token });
});

// SECRET ROUTE REQUIRING TOKEN
router.get("/secret", passportVerify, (req, res) => {
  res.status(200).send("I work!");
});

// @route     DELETE api/
// @desc      Description
// @access    Public/Private
router.delete("/", (req, res) => {
  //
});

module.exports = router;
