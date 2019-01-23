const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const path = require("path");

const Project = require("../../models/Project");
const parseForm = require("../../utils/parseForm");

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

  var countPromise = Project.countDocuments({ owner: req.user.id }).exec();

  const content = parseForm(req.body);

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
        const imgURLs = req.files.map( img => {
          return img.path;
        });
        res.json({success: true, imgURLS: imgURLs});
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
  if (!req.user.isAdmin) {
    return res.status(401).json({
      error: "Not an admin"
    });
  }
  const content = parseForm(req.body);
  Project.updateOne({position: req.body.index, owner: req.user.id},
    {title: req.body.title, content: content}, (err, raw) => {
      if (err) {
        return res.status(500).json({error: "Something went wrong, please try again."});
      }
      const imgURLs = req.files.map( img => {
        return img.path;
      });
      console.log("Update succesful");
      res.json({success: true, imgURLS: imgURLs});
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

    res.json({projects: projects, user: req.user});
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
      return res.json();
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
      return res.json();
    });
  });

});

router.post("/projects/delete", (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(401).json({
      error: "Not an admin"
    });
  }
  Project.deleteOne({position: req.body.index}, (err, result) => {
    if (err) {
      return res.status(500).json({error: "Something went wrong."});
    }
    else if (!result) {
      return res.status(400).json({error: "Project wasn't found."});
    }
    Project.updateMany({position: {$gt: req.body.index}}, {$inc: {position: -1}},
      (err) => {
      if (err) {
        return res.status(500).json({error: "Something went wrong."});
      }
      return res.json();
    });
  });
});

module.exports = router;
