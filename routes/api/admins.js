const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const path = require("path");

const Project = require("../../models/Project");

router.use(passport.authenticate("jwt", {session: false}));

function fileFilter(req, file, cb) {
  if (req.user && req.user.isAdmin) {
    if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(null, true);
    }
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
  if (!req.user.isAdmin) {
    return res.status(401).json({
      error: "Not an admin"
    });
  }

  var countPromise = Project.count({ owner: req.user.id }).exec();

  var content = [];
  var imgIndex = 0;
  var textIndex = 0;

  // If we have multiple images or text objects
  if (Array.isArray(req.body.type)){
    for (var i = 0; i < req.body.type.length; i++) {
      if (req.body.type[i] === "image") {
        // If we have multiple images
        if (Array.isArray(req.body.description)){
          content.push({
            type: req.body.type[i],
            description: req.body.description[imgIndex],
            caption: req.body.caption[imgIndex],
            url: req.files[imgIndex].path
          });
          imgIndex++;
        }
        // Single image but at least one text object
        else {
          content.push({
            type: req.body.type[i],
            description: req.body.description,
            caption: req.body.caption,
            url: req.files[0].path
          })
        }
      }
      else {
        // If we have multiple texts
        if (Array.isArray(req.body.text)){
          content.push({
            type: req.body.type[i],
            text: req.body.text[textIndex]
          });
          textIndex++;
        }
        // Single text but at least one image
        else {
          content.push({
            type: req.body.type[i],
            text: req.body.text
          });
        }
      }
    }
  }
  else {
    // Only one image or one text
    if (req.body.type === "image") {
      content.push({
        type: req.body.type,
        description: req.body.description,
        caption: req.body.caption,
        url: req.files[0].path
      });
    }
    else {
      content.push({
        type: req.body.type,
        text: req.body.text
      });
    }
  }
  console.log(content);
  countPromise.then((count) => {
    const newProject = new Project({
      title: req.body.title,
      content: content,
      owner: req.user.id,
      position: count
    });
    newProject.save((err, project) => {
      if (err) {
        console.log(err);
      }
      else {
        res.json({success: true});
      }
    });
  }).catch( err => {
    if (err) {
      console.log(err);
      return res.status(500).json({error: "Something went wrong, please try again later."});
    }
  });
});

router.get("/startdata", (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(401).json({
      error: "Not an admin"
    });
  }
  Project.find({owner: req.user.id}, "-_id content title").sort("position").then(
    (projects) => {

    console.log(projects);
    console.log(req.user);
    res.json({success: true, projects: projects, user: req.user});
    }
  ).catch( err => {
    if (err) {
      console.log(err);
      res.status(500).json({error: "Something went wrong, please try again later."});
    }
  });
});

router.post("/projects/moveUp", (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(401).json({
      error: "Not an admin"
    });
  }
  Project.findOne({position: req.body.index}, (err, project) => {
    if (err || !project) {
      console.log(err);
      console.log(project);
      return res.status(500).json({error: "Something went wrong."});
    }
    Project.findOne({position: req.body.index-1}, (err2, project2) => {
      if (err2 || !project2) {
        console.log("Error2");
        return res.status(500).json({error: "Something went wrong."});
      }
      project2.position = req.body.index;
      project.position = req.body.index-1;
      project2.save();
      project.save();
      return res.json({success: true});
    });
  });

});

router.post("/projects/moveDown", (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(401).json({
      error: "Not an admin"
    });
  }
  Project.findOne({position: req.body.index}, (err, project) => {
    if (err || !project) {
      return res.status(500).json({error: "Something went wrong."});
    }
    Project.findOne({position: req.body.index+1}, (err2, project2) => {
      if (err2 || !project2) {
        return res.status(500).json({error: "Something went wrong."});
      }
      project2.position = req.body.index;
      project.position = req.body.index+1;
      project2.save();
      project.save();
      return res.json({success: true});
    });
  });

});

module.exports = router;
