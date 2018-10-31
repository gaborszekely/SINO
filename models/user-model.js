const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      firstName: {
        type: String,
        required: [true, "First name required"]
      },
      lastName: {
        type: String,
        required: [true, "Last name required"]
      }
    },
    email: {
      type: String,
      required: [true, "User email number required"],
      unique: true
    },
    password: {
      type: String,
      required: [true, "User password required"]
    },
    isValidated: {
      type: Boolean,
      default: false
    },
    address: {
      street: {
        type: String,
        required: [true, "User address required"]
      },
      unit: {
        type: String
      },
      city: {
        type: String,
        required: [true, "User city required"]
      },
      state: {
        type: String
      },
      zip: {
        type: Number
      },
      country: {
        type: String,
        required: [true, "User country required"]
      }
    },
    phone: {
      type: String,
      // validate: {
      //   validator: function(v) {
      //     return /\d{3}-\d{3}-\d{4}/.test(v);
      //   },
      //   message: props => `${props.value} is not a valid phone number!`
      // },
      required: [true, "User phone number required"]
    },
    school: {
      type: String
    },
    edu_status: {
      type: String,
      enum: ["MD", "Graduate", "PA", "NP"]
    },
    graduation: {
      month: {
        type: String,
        enum: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ]
      },
      year: {
        type: Number,
        min: [2018, "Graduation year is in the past"]
      }
    }
  },
  { timestamps: true }
);

// Don't use arrow function here as we will need to use "this" keyword
userSchema.pre("save", async function(next) {
  try {
    // Generate salt
    const salt = await bcrypt.genSalt(10);
    // Generate hash (salt+hash)
    const passwordHash = await bcrypt.hash(this.password, salt);
    // Replace original password with hashed version
    this.password = passwordHash;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function(pass) {
  try {
    // Returns a boolean based on if the passwords match
    return await bcrypt.compare(pass, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

// Virtual schema for full name
userSchema
  .virtual("fullName")
  .get(function() {
    return this.name.firsName + " " + this.name.lastName;
  })
  .set(function(v) {
    this.name.firstName = v.substr(0, v.indexOf(" "));
    this.name.lastName = v.substr(v.indexOf(" ") + 1);
  });

module.exports = UserModel = mongoose.model("user", userSchema);
