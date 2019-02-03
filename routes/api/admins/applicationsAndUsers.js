const express = require("express");
const router = express.Router();
const passport = require("passport");
const generator = require("generate-password");
const bcrypt = require("bcryptjs");

const Application = require("../../../models/Application");
const User = require("../../../models/User");

const validateRegisterInput = require("../../../validation/register");

// Admin only authentication
router.use((req, res, next) => {
  passport.authenticate("jwt", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({error: "Not authenticated"});
    }
    if (!user.isAdmin) {
      return res.status(401).json({error: "Not an admin"});
    }
    req.user = user;
    next();
  })(req, res, next);
});


// Register route
router.post("/registerUser", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ username: req.body.username }, (err, user) => {
    if (user) {
      return res.status(400).json({ username: "Username already exists." });
    }
    const newPassword = generator.generate({ length: 20, numbers: true });
    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      password: newPassword
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save( (err, user) => {
          if (err) {
            console.log(err);
          }
          else {
            res.json({ password: newPassword });
          }
        });
      });
    });
  });

});

router.post("/deleteUser", (req, res) => {
  if (req.body.username) {
    User.findOneAndRemove({username: req.body.username, isAdmin: false},
      {select: "_id"}, (err, user) => {
      if (err) {
        return res.status(500).json({error:"Something went wrong."});
      }
      else if (!user) {
        return res.status(400).json({error:"No user found"});
      }
      Application.deleteOne({target: user._id}, (err, result) => {
        if (err) {
          return res.status(500).json({error:"Something went wrong."});
        }
      });
    });
    return res.json({});
  }
});

router.post("/application", (req, res) => {
  if (!req.body.hasOwnProperty("titleMe") || !req.body.hasOwnProperty("textMe")
  || !req.body.hasOwnProperty("titleYou") || !req.body.textYou){
    return res.status(400).json({error: "Bad request"});
  }
  User.findOne({username: req.body.username}, "_id", (err, user) => {
    if (err) {
      console.log(err);
      return res.status(500).json({error: "Something went wrong."});
    }
    else if (!user) {
      return res.status(400).json({error: "User not found"});
    }
    const content = [req.body.titleMe, req.body.textMe ,req.body.titleYou,
    req.body.textYou];
    Application.updateOne({owner: req.user.id, target: user._id}, {content: content},
    {upsert: true}, (err, raw) => {
      if (err) {
        console.log(err);
        return res.status(500).json({error: "Something went wrong."});
      }
      return res.json({});
    });

  });
});

module.exports = router;
