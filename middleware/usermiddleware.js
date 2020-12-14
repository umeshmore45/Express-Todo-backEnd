const mongoose = require("mongoose");
const { User } = require("../modules/userSchema");

const isUserRegister = async function (req, res, next) {
  const finduser = await User.findOne({ email: req.body.email });

  if (!finduser) {
    return res.send("Not Valid User ");
  }

  req.currentUser = { ...finduser };
  next();
};

module.exports.isUserRegister = isUserRegister;
