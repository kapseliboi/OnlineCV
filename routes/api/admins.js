const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const generator = require("generate-password");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const Project = require("../../models/Project");
const Application = require("../../models/Application");
const User = require("../../models/User");
const Headers = require("../../models/Headers");
const parseForm = require("../../utils/parseForm");
const validateRegisterInput = require("../../validation/register");

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

function fileFilter(req, file, cb) {
  if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(null, true);
  }
  return cb(null, false);
}

const upload = multer({ storage: multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }
}),
  fileFilter: fileFilter
}).any();

router.post("/projects/create", upload, (req, res) => {
  var countPromise = Project.countDocuments({ owner: req.user.id }).exec();

  const {content, imgURLs} = parseForm(req);

  countPromise.then((count) => {
    const newProject = new Project({
      title: req.body.title,
      content: content,
      owner: req.user.id,
      position: count
    });
    newProject.save((err, project) => {
      if (err) {
        return res.status(400).json(err);
      }
      else {
        res.json({success: true, imgURLs: imgURLs});
      }
    });
  }).catch( err => {
    if (err) {
      console.log(err);
      return res.status(500).json({error: "Something went wrong, please try again later."});
    }
  });
});

router.post("/projects/update", upload, (req, res) => {
  if (req.body.removedImg){
    if (Array.isArray(req.body.removedImg)){
      for (var i = 0; i < req.body.removedImg.length; i++){
        fs.unlink(req.body.removedImg[i], err => {
          console.log(err);
        });
      }
    }
    else {
      fs.unlink(req.body.removedImg, err => {
        console.log(err);
      });
    }
  }

  const {content, imgURLs} = parseForm(req);

  Project.updateOne({position: req.body.index, owner: req.user.id},
    {title: req.body.title, content: content}, (err, raw) => {
      if (err) {
        return res.status(500).json({error: "Something went wrong, please try again."});
      }
      res.json({success: true, imgURLs: imgURLs});
    });
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
    Headers.findOne({owner: req.user.id}, "-_id")
    ]).then( ([projects, users, headers]) => {
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
      headers: headers
    });
  }).catch( err => {
    console.log(err);
    return res.status(500).json({error: "Something went wrong."});
  });
});

router.post("/projects/moveUp", (req, res) => {
  Project.findOne({position: req.body.index, owner: req.user.id}, (err, project) => {
    if (err || !project) {
      console.log(err);
      console.log(project);
      return res.status(500).json({error: "Something went wrong."});
    }
    Project.findOne({position: req.body.index-1, owner: req.user.id},
      (err2, project2) => {
      if (err2 || !project2) {
        console.log(err2);
        return res.status(500).json({error: "Something went wrong."});
      }
      project2.position = req.body.index;
      project.position = req.body.index-1;
      project2.save();
      project.save();
      return res.json();
    });
  });

});

router.post("/projects/moveDown", (req, res) => {
  Project.findOne({position: req.body.index, owner: req.user.id}, (err, project) => {
    if (err || !project) {
      return res.status(500).json({error: "Something went wrong."});
    }
    Project.findOne({position: req.body.index+1, owner: req.user.id},
      (err2, project2) => {
      if (err2 || !project2) {
        return res.status(500).json({error: "Something went wrong."});
      }
      project2.position = req.body.index;
      project.position = req.body.index+1;
      project2.save();
      project.save();
      return res.json();
    });
  });

});

router.post("/projects/delete", (req, res) => {
  Project.findOne({position: req.body.index, owner: req.user.id}, (err, project) => {
    if (err) {
      return res.status(500).json({error: "Something went wrong."});
    }
    else if (!project) {
      return res.status(400).json({error: "Project wasn't found."});
    }
    else {
      for (var i=0; i < project.content.length; i++){
        if (project.content[i].type === "image") {
          fs.unlink(project.content[i].url, err => {
            console.log(err);
          });
        }
      }
      project.delete();
    }
    Project.updateMany({position: {$gt: req.body.index}, owner: req.user.id},
      {$inc: {position: -1}},
      (err) => {
      if (err) {
        return res.status(500).json({error: "Something went wrong."});
      }
      return res.json();
    });
  });
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
