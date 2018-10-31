const UserModel = require("../models/user-model");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");
const config = require("../config");

// SET UP JWT OPTIONS
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.JWT_SECRET;

module.exports = passport => {
  // JWT STRATEGY
  passport.use(
    new JwtStrategy(opts, async (payload, done) => {
      try {
        const user = await UserModel.findById(payload.sub);
        if (!user) {
          return done(null, false, { message: "User does not exist!" });
        }
        done(null, user);
      } catch (error) {
        done(err, false);
      }
    })
  );

  // LOCAL STRATEGY
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email"
      },
      async (email, password, done) => {
        try {
          let query = { email };
          const user = await UserModel.findOne(query);
          if (!user) {
            return done(null, false);
          }
          const isMatch = await user.isValidPassword(password);
          if (!isMatch) {
            return done(null, false, { message: "Password is incorrect" });
          }
          done(null, user);
        } catch (error) {
          done(error, false);
        }
      }
    )
  );
};
