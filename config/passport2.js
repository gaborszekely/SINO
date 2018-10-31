const passport = require("passport");
const UserModel = require("../models/user-model");
const bcrypt = require("bcryptjs");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromHeader("authorization");
opts.secretOrKey = process.env.JWT_SECRET;
// opts.issuer = "accounts.examplesoft.com";
// opts.audience = "sinomedicalinstitute.com";

passport.use(
  new JwtStrategy(opts, async (payload, done) => {
    try {
      // Find user specified in token
      const user = await UserModel.findById(payload.sub);
      // If doesnt exist, handle it
      if (!user) {
        return done(null, false, { message: "User does not exist!" });
      }

      // Otherwise, return user
      done(null, user);
      // Check for errors
    } catch (error) {
      done(err, false);
    }
  })
);
