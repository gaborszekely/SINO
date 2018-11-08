const express = require("express");
const router = express.Router();
// const ProductModel = require("../../models/product-model");
// const jwt = require("jsonwebtoken");
// const passport = require("passport");
// const passportVerify = passport.authenticate("jwt", { session: false });

// @route     POST api/products/test
// @desc      Register New User
// @access    Public
router.post("/test", (req, res) => {
  res.status(200).json({ message: "Hi" });
  // const user = {
  //   name: {
  //     firstName: req.body.name.firstName,
  //     lastName: req.body.name.lastName
  //   },
  //   email: req.body.email,
  //   password: req.body.password, // MUST ENCRYPT FIRST!!!
  //   address: {
  //     street: req.body.address.street,
  //     unit: req.body.address.unit,
  //     city: req.body.address.city,
  //     state: req.body.address.state,
  //     zip: req.body.address.zip,
  //     country: req.body.address.country
  //   },
  //   phone: req.body.phone,
  //   school: req.body.school,
  //   edu_status: req.body.edu_status,
  //   graduation: {
  //     month: req.body.graduation.month,
  //     year: req.body.graduation.year
  //   }
  // };

  // // CHECK FOR EXISTING USER
  // const query = { email: user.email };
  // UserModel.findOne(query, (err, user) => {
  //   if (err) throw err;
  //   if (user) {
  //     return res.status(403).json({ error: "User already exists!" });
  //   }
  // });

  // // ADD USER TO DB
  // const newUser = new UserModel(user);
  // newUser
  //   .save()
  //   .then(() => {
  //     const token = signToken(newUser);
  //     res.status(201).json({ token });
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     res.status(500).json({ error: err });
  //   });
});

module.exports = router;
