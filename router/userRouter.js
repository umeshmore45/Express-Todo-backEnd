const express = require("express");
const { userSignUp, userLogIn } = require("../controller/userController");
const {
  isUserRegister,
  emailUnique,
  confirmPassword,
} = require("../middleware/usermiddleware");

const router = express.Router();

router.route("/signup").post(confirmPassword, emailUnique, userSignUp);
router.route("/login").post(isUserRegister, userLogIn);

module.exports.router = router;
