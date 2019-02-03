const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");

const Project = require("../../../models/Project");
const Application = require("../../../models/Application");
const User = require("../../../models/User");
const Headers = require("../../../models/Headers");
const CV = require("../../../models/CV");
const parseForm = require("../../../utils/parseForm");

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


router.get("/startdata", (req, res) => {

  var resData = {user: req.user};


  Promise.all([
    Project.find({owner: req.user.id}, "-_id content title").sort("position"),
    User.aggregate().match({
      isAdmin: false
    }).lookup({
      from: "applications",
      let: {
        id: "$_id"
      },
      pipeline: [
        {$match: {
          $expr: {
            $and:[
              {$eq: [mongoose.Types.ObjectId(req.user.id), "$owner"]},
              {$eq: ["$target", "$$id"]}
            ]
          }
        }}
      ],
      as: "application"
    }).unwind({
      path: "$application",
      preserveNullAndEmptyArrays: true
    }).project({
      "_id": 0,
      "name": 1,
      "username": 1,
      "application": 1
    }),
    Headers.findOne({owner: req.user.id}, "-_id cv applications projects"),
    CV.findOne({owner: req.user.id}, "-_id -owner")
  ]).then( ([projects, users, headers, cv]) => {
      for (var i = 0; i < users.length; i++) {
        if (users[i].hasOwnProperty("application")) {
          delete users[i].application._id;
          delete users[i].application.target;
          delete users[i].application.owner;
          delete users[i].application.__v;
        }
      }
    return res.json({
      projects: projects,
      users: users,
      user: req.user,
      headers: headers,
      cv: cv
    });
  }).catch( err => {
    console.log(err);
    return res.status(500).json({error: "Something went wrong."});
  });
});




router.post("/headers", (req, res) => {
  var headers = {owner: req.user.id};
  if (req.body.hasOwnProperty("cv")) {
    headers.cv = req.body.cv;
  }
  if (req.body.hasOwnProperty("projects")) {
    headers.projects = req.body.projects;
  }
  if (req.body.hasOwnProperty("applications")) {
    headers.applications = req.body.applications;
  }
  Headers.updateOne({owner: req.user.id}, headers, {upsert: true}, (err, raw) => {
    if (err) {
      console.log(err);
      return res.status(500).json({error: "Something went wrong."});
    }
    return res.json({});
  });
});

module.exports = router;
