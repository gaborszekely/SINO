const jwt = require("jsonwebtoken");
const UserModel = require("../models/user-model");

signToken = user => {
  return jwt.sign(
    {
      iss: "Sino Medical",
      sub: newUser.id,
      iat: new Date().getTime(), // Current Time
      exp: new Date().setDate(new Date().getDate() + 1)
    },
    process.env.JWT_SECRET
  );
};

module.exports = {
  signUp: async (req, res, next) => {
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
    const foundUser = await UserModel.findOne(query);
    if (foundUser) {
      return res.status(403).json({ error: "User already exists!" });
    }

    // ADD USER TO DB
    const newUser = new UserModel(user);
    await newUser.save();
    // Generate token
    const token = signToken(newUser);

    // Respond with token
    res.status(201).json({ token });
  },

  signIn: async (req, res, next) => {
    //
  },

  secret: async (req, res, next) => {
    //
  }
};
