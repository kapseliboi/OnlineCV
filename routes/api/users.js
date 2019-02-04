const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const keys = require("../../config/keys");
const validateLoginInput = require("../../validation/login");

const User = require("../../models/User");
const Headers = require("../../models/Headers");
const CV = require("../../models/CV");
const Application = require("../../models/Application");
const Project = require("../../models/Project");


function startData(user, res) {
  User.findOne({isAdmin: true}, (err, admin) => {
    if (err) {
      return res.status(500).json({error: "Something went wrong"});
    }
    if (!admin) {
      return res.status(400).json({error: "No CV available"});
    }
    Promise.all([
      Headers.findOne({owner: admin._id}, "-_id cv applications projects"),
      CV.findOne({owner: admin._id}, "-_id -__v -owner -technologies._id " +
      "-languages._id -experience._id -education._id"),
      Application.findOne({owner: admin._id, target: user.id},
        "-_id content"),
      Project.find({owner: admin._id}, "-_id content title").sort("position")
    ]).then(
      ([headers, cv, application, projects]) => {
        return res.json({
          payload: {
            username: user.username,
            name: user.name,
            isAdmin: user.isAdmin
          },
          headers: headers,
          cv: cv,
          application: application ? application.content : null,
          projects: projects,
          adminName: admin.name
        });
      }).catch(
        err2 => {
          console.log(err2);
          return res.status(500).json({error: "Something went wrong"});
        }
      );

  });
}

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
      return res.status(500).json({error: "Something went wrong."});
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
        res.cookie("jwt", token, {httpOnly: true, maxAge: 86400000});
        if (user.isAdmin) {
          console.log("done");
          return res.json({payload});
        }
        return startData(user, res);

      });
    });
  });
});

router.get("/startdata", passport.authenticate("jwt", {session: false}),
(req, res) => {
  return startData(req.user, res);
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


module.exports = router;
