/*
 * MODULES AND DEPENDENCIES
 *
 */

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
const passport = require("passport");
require("./config/passport")(passport);

const userRoute = require("./routes/api/user-route");

/*
 * ENVIRONMENT VARIBLES
 *
 */

if (process.env.NODE_ENV !== "production") {
  require("dotenv/config");
}

/*
 * DATABASE CONNECTION
 *
 */

mongoose
  .connect(
    process.env.MONGOLAB_URI,
    { useNewUrlParser: true }
  )
  .then(console.log(`MongoDB Connected`))
  .catch(err => console.log(err));

/*
 * MIDDLEWARE
 *
 */

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Messages
// app.use(require("connect-flash")());
// app.use((req, res, next) => {
//   res.locals.messages = require("express-messages")(req, res);
//   next();
// });

// Passport
app.use(passport.initialize());

/*
 * ROUTES
 *
 */

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.use("/api/users", userRoute);

// LISTEN FOR SERVER
const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server started on Port ${port}...`));
