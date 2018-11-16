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

// @route     POST api/portal/getUserEvents
// @desc      Login Page
// @access    Public
router.get("/getUserEvents", (req, res) => {
  res.status(200).json([
    {
      id: 1,
      name: "2019 USMLE Registration Deadline",
      date: "2019-Jan-6",
      location: "N/A",
      important: true,
      completed: false,
      description: "This is the deadline to register for the USMLE in 2019.",
      user_notes: "Double-check details before registering!",
      user_added: false
    },
    {
      id: 2,
      name: "2019 Residency Match Deadline",
      date: "2019-Feb-31",
      location: "N/A",
      important: true,
      completed: false,
      description: "This is the deadline to register for the residency match.",
      user_notes: "Double-check details before registering!",
      user_added: false
    },
    {
      id: 3,
      name: "USMLE Phase 3 Test Prep",
      date: "2019-4-1",
      location: "N/A",
      important: true,
      completed: false,
      description: "Start date for Phase 3 exam prep.",
      user_notes: "",
      user_added: false
    }
  ]);
});

module.exports = router;
