const express = require("express");
const { userSignUp, userLogIn } = require("../controller/userController");
const { isUserRegister } = require("../middleware/usermiddleware");

const router = express.Router();

router.route("/").post(userSignUp);
router.route("/login").post(isUserRegister, userLogIn);

module.exports.router = router;
