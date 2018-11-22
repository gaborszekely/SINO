const jwt = require("jsonwebtoken");
const config = require("../config");
const UserModel = require("../models/user-model");

// JWT token generation/validation
signToken = user => {
  // const isAdmin = user._id == "5beb1603c399c63d40aceb8e" ? true : false;
  return jwt.sign(
    {
      iss: "Sino Medical",
      sub: user._id,
      name: user.fullName || "Unknown",
      admin: user._id === "5beb1603c399c63d40aceb8e" ? true : false,
      iat: new Date().getTime(), // Current Time
      exp: new Date().setDate(new Date().getDate() + 1)
    },
    config.JWT_SECRET
  );
};

exports.uploadImage = (req, res) => {
  console.log(req.file);
  // Save file path in MongoDB -> req.file.path
  res.status(200).send(req.file);
};

exports.registerUser = (req, res) => {
  // Check for existing user
  const query = { "personal.email": req.body.personal.email };
  UserModel.findOne(query, (err, user) => {
    if (err) throw err;
    if (user) {
      return res.status(403).json({ error: "User already exists!" });
    }
  });

  const newUser = new UserModel(req.body);
  newUser
    .save()
    .then(() => {
      const token = signToken(newUser);
      res.status(201).json({ token });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.loginUser = (req, res) => {
  const token = signToken(req.user);
  res.status(200).json({ token });
};

exports.validateEmail = async (req, res) => {
  try {
    if (!req.body.email) {
      res.status(500).json({ message: "Invalid body" });
    } else {
      let users = await UserModel.find({ "personal.email": req.body.email });
      res.status(200).json({ users: users.length });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    let user = await UserModel.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.updateUser = (req, res) => {
  UserModel.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: {
          firstName: req.body.name_first,
          lastName: req.body.name_last
        },
        email: req.body.email,
        address: {
          street: req.body.address_street,
          unit: req.body.address_unit,
          city: req.body.address_city,
          state: req.body.address_state,
          zip: req.body.address_zip,
          country: req.body.address_country
        },
        phone: req.body.phone,
        school: req.body.school,
        edu_status: req.body.edu_status,
        graduation: {
          month: req.body.grad_month,
          year: req.body.grad_year
        }
      }
    },
    { new: true }
  )
    .then(resp => res.status(200).json(resp))
    .catch(err => res.status(500).json(err));
};
