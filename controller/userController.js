const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { User } = require("../modules/userSchema");
const { genrateToken } = require("../helper/jwtAythentication");
const { json } = require("express");

const userSignUp = (req, res, next) => {
  let newTask = new User({
    email: req.body.email,
    password: req.body.password,
  });

  newTask
    .save()
    .then((users) => {
      res.send("Successfully SignUp");
    })
    .catch((err) => {
      console.log(err);
    });
};

const userLogIn = async (req, res, next) => {
  try {
    let result = await bcrypt.compare(
      req.body.password,
      req.currentUser._doc.password
    );

    let jwttoken = await genrateToken(
      { email: req.currentUser._doc.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    console.log(jwttoken);
    res.cookie("jwt", jwttoken);
    res.status(200).json({
      status: "Successful",
      data: [
        {
          jwt: jwttoken,
        },
      ],
    });

    if (!result) {
      return res.send("incorect password");
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports.userSignUp = userSignUp;
module.exports.userLogIn = userLogIn;
