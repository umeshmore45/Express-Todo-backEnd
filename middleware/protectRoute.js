const { verfiyToken } = require("../helper/jwtAythentication");
const { User } = require("../modules/userSchema");
const { sendErrorMessage } = require("../helper/sendError");
const { AppError } = require("../helper/Errorclass");
const protectRoute = async (req, res, next) => {
  if (!req.headers.authorization) {
    return sendErrorMessage(
      new AppError(401, "UnSuccessful", "Please login or signup"),
      req,
      res
    );
  }

  let jwtToken = req.headers.authorization.split(" ")[1];

  let decoded;
  try {
    decoded = await verfiyToken(jwtToken, process.env.JWT_SECRET);
  } catch (err) {
    return sendErrorMessage(
      new AppError(401, "UnSuccessful", "Invalid Token"),
      req,
      res
    );
  }
  // email
  let mail = decoded.email;

  let currentUser = await User.findOne({ email: mail });

  if (!currentUser) {
    return sendErrorMessage(
      new AppError(401, "UnSuccessful", "User not registered"),
      req,
      res
    );
  }
  // check verification
  req.currentUser = currentUser;
  // give access
  next();
};

module.exports.protectRoute = protectRoute;
