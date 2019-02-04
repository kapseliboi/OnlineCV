const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const CV = require("../../../models/CV");
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

// Only accept image files

function fileFilter(req, file, cb) {
  if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(null, true);
  }
  return cb(null, false);
}

// Multer settings

const upload = multer({ storage: multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }
}),
  fileFilter: fileFilter
}).single("avatar");

router.post("/avatar", upload, (req, res) => {
  if (req.file) {
    CV.findOneAndUpdate({owner: req.user.id}, {avatar: req.file.path},
      {upsert: true, fields: {"avatar": 1}}, (err, cv) => {
        if (err) {
          return res.status(500).json({error: "Something went wrong"});
        }
        if (cv) {
          fs.unlink(cv.avatar, err => {
            if (err) {
              console.log(err);
            }
          });
        }
        return res.json({avatar: req.file.path});
      });
  }
  else {
    return res.status(400).json({error: "Bad request"});
  }
});

router.post("/personal", (req, res) => {
  if (req.body.phone && req.body.email && req.body.description &&
  req.body.interests && req.body.github) {
    CV.updateOne({owner: req.user.id}, {phone: req.body.phone,
    email: req.body.email, description: req.body.description,
    interests: req.body.interests, github: req.body.github}, {upsert: true},
    (err, raw) => {
      if (err) {
        return res.status(500).json({error: "Something went wrong."});
      }
      return res.json({});
    })
  }
  else {
    return res.status(400).json({error: "Bad request"});
  }
});

router.post("/technology", (req, res) => {
  if (Array.isArray(req.body)) {
    CV.updateOne({owner: req.user.id}, {technologies: req.body},
    {upsert: true}, (err, raw) => {
      if (err) {
        return res.status(500).json({});
      }
      return res.json({});
    });
  }
  else {
    return res.status(400).json({error: "Bad request"});
  }
});

router.post("/language", (req, res) => {
  if (Array.isArray(req.body)) {
    CV.updateOne({owner: req.user.id}, {languages: req.body},
    {upsert: true}, (err, raw) => {
      if (err) {
        return res.status(500).json({});
      }
      return res.json({});
    });
  }
  else {
    return res.status(400).json({error: "Bad request"});
  }
});

router.post("/experience", (req, res) => {
  if (Array.isArray(req.body)) {
    CV.updateOne({owner: req.user.id}, {experience: req.body},
    {upsert: true}, (err, raw) => {
      if (err) {
        return res.status(500).json({});
      }
      return res.json({});
    });
  }
  else {
    return res.status(400).json({error: "Bad request"});
  }
});

router.post("/education", (req, res) => {
  if (Array.isArray(req.body)) {
    CV.updateOne({owner: req.user.id}, {education: req.body},
    {upsert: true}, (err, raw) => {
      if (err) {
        return res.status(500).json({});
      }
      return res.json({});
    });
  }
  else {
    return res.status(400).json({error: "Bad request"});
  }
});

module.exports = router;
