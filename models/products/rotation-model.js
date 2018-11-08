const mongoose = require("mongoose");

const rotationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide title"]
    },
    location: {
      city: {
        type: String,
        required: [true, "Please provide city"],
        default: "Denver"
      },
      state: {
        type: String,
        required: [true, "Please provide state"],
        default: "CO"
      },
      country: {
        type: String,
        required: [true, "Please provide country"],
        default: "United States"
      }
    },
    dates: {
      start: {
        type: Date,
        required: [true, "Please provide start date"]
      },
      end: {
        type: Date,
        required: [true, "Please provide end date"]
      }
    },
    duration: {
      type: Number,
      required: [true, "Please provide duration in weeks"]
    },
    preceptors: {
      type: Array,
      required: [true, "Please provide preceptor(s)"],
      default: []
    },
    facility: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = RotationModel = mongoose.model("rotation", rotationSchema);
