const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email adddress."]
  }
});

module.exports = SubscriptionModel = mongoose.model(
  "subscription",
  subscriptionSchema
);
