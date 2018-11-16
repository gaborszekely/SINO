const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  location: {
    type: String,
    default: "N/A"
  },
  important: {
    type: Boolean,
    default: false
  },
  completed: {
    type: Boolean,
    default: false
  },
  description: {
    type: String
  },
  user_notes: {
    type: String
  },
  user_added: {
    type: Boolean,
    default: false
  }
});

// userSchema.pre("save", function(next) {
//   // ...doSomething
//   next();
// });

// userSchema.methods.methodName = function() {};

// Virtual schema for full name
// userSchema
//   .virtual("name")
//   .get(function() {})
//   .set(function(v) {});

module.exports = EventModel = mongoose.model("event", eventSchema);
