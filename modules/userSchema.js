const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const uniqid = require("uniqid");

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      default: uniqid(),
    },

    email: {
      type: String,
      required: [true, "Required"],
      validate: {
        validator: function () {
          const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(String(this.email).toLowerCase());
        },
        message: "invalid Email",
      },
    },

    password: {
      type: String,
      required: [true, "Password is Required"],
      validate: {
        validator: function () {
          const re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
          return re.test(this.password);
        },
        message: "Invalid Password",
      },
    },
  },
  {
    timestamps: true,
  }
);

// userSchema.method.generateHash = async function () {
//   let salt = await bcrypt.genSalt(10);
//   let hash = await bcrypt.hash(this.password, salt);
//   console.log("hash", hash);
//   return hash;
// };

userSchema.pre("save", async function (next) {
  let salt = await bcrypt.genSalt(10);
  let hash = await bcrypt.hash(this.password, salt);
  this.password = await hash;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports.User = User;
