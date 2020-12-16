const mongoose = require("mongoose");
const { AppError } = require("../helper/Errorclass");
const { sendErrorMessage } = require("../helper/sendError");
const { User } = require("../modules/userSchema");

const confromPassword = (req, res, next) => {
  if (req.body.password !== req.body.confirmPassword) {
    return sendErrorMessage(
      new AppError(401, "UnSuccessful", "Password Don't Match"),
      req,
      res
    );
  }
  next();
};

const emailUnique = async (req, res, next) => {
  const finduser = await User.findOne({ email: req.body.email });
  if (finduser) {
    return sendErrorMessage(
      new AppError(401, "UnSuccessful", "All Ready User"),
      req,
      res
    );
  }
  next();
};

const isUserRegister = async function (req, res, next) {
  const finduser = await User.findOne({ email: req.body.email });

  if (!finduser) {
    return sendErrorMessage(
      new AppError(401, "UnSuccessful", "Not Registred"),
      req,
      res
    );
  }

  req.currentUser = { ...finduser };
  next();
};

module.exports.isUserRegister = isUserRegister;
module.exports.emailUnique = emailUnique;
module.exports.confirmPassword = confromPassword;
