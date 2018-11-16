const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userEventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter an event title"]
  },
  date: {
    type: Date,
    default: Date.now
  },
  location: {
    type: String
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
    default: true
  }
});

const userSchema = new mongoose.Schema(
  {
    // PERSONAL DETAILS
    personal: {
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
        required: [true, "Email number required"],
        unique: true
      },
      password: {
        type: String,
        required: [true, "Password required"]
      },
      isValidated: {
        type: Boolean,
        default: false
      },
      tosAccepted: {
        type: Boolean,
        required: true,
        default: false
      },
      gender: {
        type: String,
        required: [true, "Gender required"],
        enum: ["male", "female", "other"]
      },
      dob: {
        type: String,
        // validate: {
        //   validator: function(v) {
        //     return /\d{2}\/\d{2}\/\d{4}/.test(v);
        //   },
        //   message: props => `${props.value} is not a valid date!`
        // },
        required: [true, "DOB required"]
      },
      phone: {
        type: String,
        required: [true, "Phone number required"]
      },
      address: {
        street: {
          type: String,
          required: [true, "Street Name required"]
        },
        city: {
          type: String,
          required: [true, "City required"]
        },
        state: {
          type: String
        },
        zip: {
          type: Number
          // min: [1000, "Please enter a valid zipcode"]
        },
        country: {
          type: String,
          required: [true, "Country required"]
        }
      }
    },

    // EDUCATION-RELATED
    education: {
      school: {
        type: String
      },
      school_country: {
        type: String
      },
      edu_status: {
        type: String,
        enum: ["graduate", "student"]
      },
      edu_type: {
        type: String,
        enum: ["MD", "PA", "NP", "dentist", "other"]
      },
      graduation: {
        month: {
          type: Number,
          enum: [01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12]
        },
        year: {
          type: Number
        }
      }
    },

    // PORTAL-RELATED
    portal: {
      events: {
        type: Array,
        default: []
      },
      userEvents: [userEventSchema]
    },

    // PRODUCTS-RELATED
    products: {
      rotations: {
        type: Array,
        default: []
      },
      usmle_prep: {
        type: Array,
        default: []
      }
    }
  },
  { timestamps: true }
);

// AUTOMATICALLY ENCRYPTS PASSWORD BEFORE ADDING
userSchema.pre("save", async function(next) {
  try {
    // Generate salt
    const salt = await bcrypt.genSalt(10);
    // Generate hash (salt+hash)
    const passwordHash = await bcrypt.hash(this.personal.password, salt);
    // Replace original password with hashed version
    this.personal.password = passwordHash;
    next();
  } catch (error) {
    next(error);
  }
});

// ADDS METHOD TO SCHEMA TO COMPARE PASSWORDS
userSchema.methods.isValidPassword = async function(password) {
  try {
    return await bcrypt.compare(password, this.personal.password);
  } catch (error) {
    throw new Error(error);
  }
};

// Virtual schema for full name
userSchema
  .virtual("fullName")
  .get(function() {
    const { firstName, lastName } = this.personal.name;
    return firstName + " " + lastName;
  })
  .set(function(v) {
    // let { firstName, lastName } = this.personal.name;
    this.personal.name.firstName = v.substr(0, v.indexOf(" "));
    this.personal.name.lastName = v.substr(v.indexOf(" ") + 1);
  });

module.exports = UserModel = mongoose.model("user", userSchema);
