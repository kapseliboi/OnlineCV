const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const Project = require("../../../models/Project");
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
}).any();


router.post("/create", upload, (req, res) => {
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


router.post("/update", upload, (req, res) => {
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


router.post("/moveUp", (req, res) => {
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

router.post("/moveDown", (req, res) => {
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

router.post("/delete", (req, res) => {
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

module.exports = router;
