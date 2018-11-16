const express = require("express");
const router = express.Router();
const UserModel = require("../../models/user-model");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const config = require("../../config");
const passportLogin = passport.authenticate("local", { session: false });
const passportVerify = passport.authenticate("jwt", { session: false });
const EventModel = require("../../models/portal/event-model");

// JWT token generation/validation
signToken = user => {
  const isAdmin = user._id == "5beaf724b36e070884ae7b6e" ? true : false;
  return jwt.sign(
    {
      iss: "Sino Medical",
      sub: user._id,
      name: user.fullName || "Unknown",
      admin: isAdmin || false,
      iat: new Date().getTime(), // Current Time
      exp: new Date().setDate(new Date().getDate() + 1)
    },
    config.JWT_SECRET
  );
};

// @route     POST api/portal/addGlobalEvent
// @desc      Login Page
// @access    Public
router.get("/getGlobalEvents", async (req, res) => {
  try {
    let events = await EventModel.find({});
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json(err);
  }
});

// @route     POST api/portal/addGlobalEvent
// @desc      Login Page
// @access    Public
router.post("/addGlobalEvent", (req, res) => {
  let model = new EventModel(req.body);
  model
    .save()
    .then(doc => res.status(200).json(doc))
    .catch(err => res.status(500).json(err));
});

// @route     POST api/portal/addGlobalEvent
// @desc      Login Page
// @access    Private
router.delete("/removeGlobalEvent/:id", async (req, res) => {
  try {
    let deleted = await EventModel.findByIdAndRemove(req.params.id);
    res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 5bec455840305719bcd9425b

// @route     POST api/portal/addUserEvent
// @desc      Login Page
// @access    Public
router.post("/addUserEvent", async (req, res) => {
  try {
    const updates = {
      $addToSet: {
        "portal.events": req.body.eventId
      }
    };
    const options = {
      new: true,
      fields: { "portal.events": 1 },
    };
    let update = await UserModel.findByIdAndUpdate(
      req.body.userId,
      updates,
      options
    );
    res.status(201).json(update);
  } catch (err) {
    console.error(err.stack);
    res.status(500).json(err);
  }
});

module.exports = router;
