/*
 * MODULES AND DEPENDENCIES
 *
 */

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const https = require("https");
const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
const passport = require("passport");
require("./config/passport")(passport);

const userRoute = require("./routes/api/user-route");
const portalRoute = require("./routes/api/portal-route");

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

// Passport
app.use(passport.initialize());

// Image uploads folder
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

/*
 * ROUTES
 *
 */

// Health Check
app.get("/check", (req, res) => {
  res.status(200).json({ message: "Connection working" });
});

app.use("/api/users", userRoute);
app.use("/api/portal", portalRoute);

// LISTEN FOR SERVER
const port = process.env.PORT || 5001;

// https
//   .createServer(
//     {
//       key: fs.readFileSync("./config/https/server.key"),
//       cert: fs.readFileSync("./config/https/server.cert")
//     },
//     app
//   )
//   .listen(port, () => console.log(`HTTP Server started on Port ${port}...`));
app.listen(port, () => console.log(`Server started on Port ${port}...`));
