const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
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
        // validate: {
        //   validator: function(v) {
        //     return /\d{3}-\d{3}-\d{4}/.test(v);
        //   },
        //   message: props => `${props.value} is not a valid phone number!`
        // },
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
        },
        country: {
          type: String,
          required: [true, "Country required"]
        }
      }
    },
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
          type: Number,
          min: [2018, "Graduation year is in the past"]
        }
      }
    },
    products: {
      rotations: {
        types: {
          type: Array,
          default: []
        },
        services: {
          type: Array,
          default: []
        }
      },
      usmle_prep: {
        type: Array,
        default: []
      }
    }
  },
  { timestamps: true }
);

// AUTOMATICALLY ENCRYPTS PASSWORDS BEFORE ADDING THEM TO DB
// Cannot use arrow function here as we need "this" keyword
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
//
//
//
//
//
//
// SAVES GRADUATION MONTH AS TEXT
// userSchema.pre("save", function(next) {
//   let { month } = this.education.graduation;
//   switch (month) {
//     case "01":
//       month = "jan";
//       break;
//     case "02":
//       month = "feb";
//       break;
//     case "03":
//       month = "mar";
//       break;
//     case "04":
//       month = "apr";
//       break;
//     case "05":
//       month = "may";
//       break;
//     case "06":
//       month = "jun";
//       break;
//     case "07":
//       month = "jul";
//       break;
//     case "08":
//       month = "aug";
//       break;
//     case "09":
//       month = "sep";
//       break;
//     case "10":
//       month = "oct";
//       break;
//     case "11":
//       month = "nov";
//       break;
//     case "12":
//       month = "dec";
//       break;
//     default:
//       month = "unknown";
//   }
//   next();
// });
//
//
//
//
//
//
// ADDS AN "isValidPassword" METHOD TO SCHEMA IN ORDER TO COMPARE PASSWORDS
userSchema.methods.isValidPassword = async function(password) {
  try {
    // Returns a boolean based on if the passwords match
    return await bcrypt.compare(password, this.personal.password);
  } catch (error) {
    throw new Error(error);
  }
};

// Virtual schema for full name
// userSchema
//   .virtual("fullName")
//   .get(function() {
//     const { firstName, lastName } = this.personal.name;
//     return firstName + " " + lastName;
//   })
//   .set(function(v) {
//     // let { firstName, lastName } = this.personal.name;
//     this.personal.name.firstName = v.substr(0, v.indexOf(" "));
//     this.personal.name.lastName = v.substr(v.indexOf(" ") + 1);
//   });

module.exports = UserModel = mongoose.model("user", userSchema);
