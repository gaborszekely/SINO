const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const config = require("../../config");
const passportVerify = passport.authenticate("jwt", { session: false });

// Mongoose Models
const UserModel = require("../../models/user-model");
const EventModel = require("../../models/portal/event-model");

// @route     POST api/portal/events/global/get
// @desc      Login Page
// @access    Public
router.get("/events/global/get", async (req, res) => {
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
router.post("/events/global/add", (req, res) => {
  let model = new EventModel(req.body);
  model
    .save()
    .then(doc => res.status(200).json(doc))
    .catch(err => res.status(500).json(err));
});

// @route     POST api/portal/events/global/remove/:id
// @desc      Login Page
// @access    Private
router.delete("/events/global/remove/:id", async (req, res) => {
  try {
    let deleted = await EventModel.findByIdAndRemove(req.params.id);
    res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json(err);
  }
});

// @route     POST api/portal/events/user/add
// @desc      Login Page
// @access    Public
router.post("/events/user/add", passportVerify, async (req, res) => {
  // Extract userId from Bearer token
  const tokenUserId = jwt.decode(req.headers.authorization.split(" ")[1]).sub;
  try {
    const updates = {
      $addToSet: {
        "portal.events": Object.getOwnPropertyNames(req.body)[0]
      }
    };
    const options = {
      new: true,
      fields: { "portal.events": 1 }
    };
    let update = await UserModel.findByIdAndUpdate(
      tokenUserId,
      updates,
      options
    );
    res.status(201).json(update);
  } catch (err) {
    console.error(err.stack);
    res.status(500).json(err);
  }
});

// @route     POST api/portal/events/user/remove
// @desc      Login Page
// @access    Public
router.delete("/events/user/remove/:id", passportVerify, async (req, res) => {
  // Check to make sure req.body.userId and userId in the Bearer token match.
  const tokenUserId = jwt.decode(req.headers.authorization.split(" ")[1]).sub;
  try {
    const updates = {
      $pull: {
        "portal.events": req.params.id
      }
    };
    const options = {
      new: true,
      fields: { "portal.events": 1 }
    };
    let update = await UserModel.findByIdAndUpdate(
      tokenUserId,
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
