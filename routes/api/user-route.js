const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportLogin = passport.authenticate("local", { session: false });
const passportVerify = passport.authenticate("jwt", { session: false });
const multer = require("multer");

const Controllers = require("../../controllers/user-controller");

// Multer file storage
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads");
  },
  filename: (req, file, callback) => {
    callback(null, req.body.username + "_" + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    // cb(new Error("Wrong image format!"), false);
    cb(null, false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter
});

// @route     POST api/users/img
// @desc      Test Image Upload
// @access    Public
router.post("/img", upload.single("profile"), Controllers.uploadImage);

// @route     POST api/users/register
// @desc      Register New User
// @access    Public
router.post("/register", Controllers.registerUser);

// @route     POST api/users/login
// @desc      Login Page
// @access    Private
router.post("/login", passportLogin, Controllers.loginUser);

// @route     GET api/users/:id
// @desc      Fetch User Information
// @access    Private
router.get("/info/:id", passportVerify, Controllers.getUserInfo);

// @route     PUT api/users/update
// @desc      Update User Information
// @access    Private
router.put("/update/:id", passportVerify, Controllers.updateUser);

// @route     POST api/users/validate
// @desc      Validate Email Address (to check availability when registering)
// @access    Public
router.post("/validate", Controllers.validateEmail);

// @route     POST api/users/img
// @desc      Test Image Upload
// @access    Public
router.post("/subscribe", Controllers.subscribeUser);

module.exports = router;
