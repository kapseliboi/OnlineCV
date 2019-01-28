const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const keys = require("../../config/keys");
const validateLoginInput = require("../../validation/login");

const User = require("../../models/User");

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).json({error: "Something went wrong."});
    }
    else if (!user) {
      return res.status(401).json({error: "Username or password is incorrect"});
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (!result) {
        return res.status(401).json({error: "Username or password is incorrect"});
      }
      const payload = {
        username: user.username,
        name: user.name,
        id: user.id,
        isAdmin: user.isAdmin
      };

      jwt.sign(payload, keys.secretOrKey, {
        expiresIn: "24h"
      },
      (err, token) => {
        res.cookie("jwt", token, {httpOnly: true});
        res.json({
          success: true,
          payload: payload
        });
      });
    });
  });
});

router.post("/logout", passport.authenticate("jwt", { session:false }),
(req, res) => {
  res.clearCookie("jwt");
  res.json({ success: true });
});

router.get( "/currentuser", passport.authenticate("jwt", { session: false }),
(req, res) => {
  res.json({
    username: req.user.username,
    name: req.user.name
  });
});

router.get("/projectdata", passport.authenticate("jwt", { session: false }),
(req, res) => {
  if (!req.user.isAdmin) {
    return res.status(401).json({
      error: "Not an admin"
    });
  }
  res.json({ success: true });
});


module.exports = router;
