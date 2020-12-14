const { verfiyToken } = require("../helper/jwtAythentication");
const { User } = require("../modules/userSchema");

const protectRoute = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.send("Not Valid User");
  }
  // if headers are there

  let jwtToken = req.headers.authorization.split(" ")[1];

  let decoded;
  try {
    decoded = await verfiyToken(jwtToken, process.env.JWT_SECRET);
  } catch (err) {
    return res.send("Not Valid User");
  }
  // email
  let mail = decoded.email;

  let currentUser = await User.findOne({ email: mail });

  if (!currentUser) {
    return res.send("Not Valid User");
  }
  // check verification
  req.currentUser = currentUser;
  // give access
  next();
};

module.exports.protectRoute = protectRoute;
