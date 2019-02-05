const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

const keys = require("../../../config/keys");
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

// Cloudinary settings
cloudinary.config({
  cloud_name: keys.cloudinaryName,
  api_key: keys.cloudinaryKey,
  api_secret: keys.cloudinarySecret
});

// Only accept image files
function fileFilter(req, file, cb) {
  if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(null, true);
  }
  return cb(null, false);
}

// Multer settings

const upload = multer({ storage: cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "cv",
  allowedFormats: ["jpg", "jpeg", "gif", "png"]
}),
  fileFilter: fileFilter
}).any();


router.post("/create", upload, (req, res) => {
  var countPromise = Project.countDocuments({ owner: req.user.id }).exec();

  const {content, imgURLs, imgIDs} = parseForm(req);

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
        res.json({imgURLs: imgURLs, imgIDs: imgIDs});
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
  var {content, imgURLs, imgIDs} = parseForm(req);

  Project.findOneAndUpdate({position: req.body.index, owner: req.user.id},
  {title: req.body.title, content: content}, {fields: {"content": 1}}, (err, project) => {
      if (err) {
        return res.status(500).json({error: "Something went wrong, please try again."});
      }
      if (!project) {
        return res.status(400).json({error: "Project was not found."});
      }
      res.json({success: true, imgURLs: imgURLs, imgIDs: imgIDs});

      var oldImgURLs = [];
      for (var h=0; h < project.content.length; h++) {
        if (project.content[h].type === "image") {
          oldImgURLs.push({id: project.content[h].imgID, url: project.content[h].url});
        }
      }
      // Sort the arrays and find out which image has been removed or if any
      imgIDs.sort();
      oldImgURLs.sort((a,b) => (a.url > b.url) ? 1 : ((b.url > a.url) ? -1 : 0));
      var i = 0;
      var j = 0;
      var removedImgs = [];
      while(i < imgIDs.length && j < oldImgURLs.length) {
        if (imgIDs[i] < oldImgURLs[j].id) {
          i++;
        }
        else if (oldImgURLs[j].id < imgIDs[i]) {
          removedImgs.push(oldImgURLs[j].id);
          j++;
        }
        else {
          i++;
          j++;
        }
      }
      // If new imageIDs ran out before old ones
      while (j < oldImgURLs.length) {
        removedImgs.push(oldImgURLs[j].id);
        j++;
      }
      for (var k=0; k < removedImgs.length; k++) {
        cloudinary.v2.uploader.destroy(removedImgs[k], (err2, result) => {
          if (err2) {
            console.log(err2);
          }
        });
      }
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
          cloudinary.v2.uploader.destroy(project.content[i].imgID, (err, result) => {
            if (err) {
              console.log(err);
            }
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
  }).catch(
    err => {
      console.log(err);
    }
  );
});

module.exports = router;
