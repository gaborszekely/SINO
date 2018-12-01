/*
 * MODULES AND DEPENDENCIES
 *
 */

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
// const fs = require("fs");
// const https = require("https");
const mongoose = require("mongoose");
const passport = require("passport");
require("./config/passport")(passport);

const userRoute = require("./routes/api/user-route");
const portalRoute = require("./routes/api/portal-route");

const SocketController = require("./controllers/socket-controller");

const app = express();
const server = http.createServer(app);

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

mongoose.set("useCreateIndex", true);

mongoose
  .connect(
    process.env.MONGOLAB_URI,
    { useNewUrlParser: true }
  )
  .then(console.log(`MongoDB Connected`))
  .catch(err => console.error(err.stack));

/*
 * SOCKET.IO
 *
 */

// Instantiate socket
const io = require("socket.io")(server);

// Initialize connection
io.on("connection", socket => {
  SocketController.handleConnect(socket);

  // On chat messsage
  socket.on("message", () => {
    SocketController.handleMessage();
  });

  socket.on("SEND_MESSAGE", data => {
    io.emit("RECEIVE_MESSAGE", data);
  });

  // Show typing indicator
  socket.on("typing", () => {
    SocketController.handleTyping();
  });

  // On private message
  socket.on("pm", () => {
    SocketController.handlePM();
  });

  socket.on("error", err => {
    console.log("received error from client:", client.id);
    console.error(err.stack);
  });

  // On disconnect
  socket.on("disconnect", () => {
    SocketController.handleDisconnect();
  });
});

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
server.listen(port, () => console.log(`Server started on Port ${port}...`));
