module.exports = parseForm = (req) => {
  var content = [];
  var imgIndex = 0;
  var textIndex = 0;
  var imgURLs = [];

  // If we have multiple images or text objects
  if (Array.isArray(req.body.type)){
    for (var i = 0; i < req.body.type.length; i++) {
      if (req.body.type[i] === "image") {
        // If we have multiple images
        if (Array.isArray(req.body.description)){
          if (req.body.url[imgIndex] !== "null") {
            content.push({
              type: req.body.type[i],
              description: req.body.description[imgIndex],
              caption: req.body.caption[imgIndex],
              url: req.body.url[imgIndex]
            });
            imgURLs.push(req.body.url[imgIndex]);
          }
          else {
            content.push({
              type: req.body.type[i],
              description: req.body.description[imgIndex],
              caption: req.body.caption[imgIndex],
              url: req.files[imgIndex].path
            });
            imgURLs.push(req.files[imgIndex].path);
          }
          imgIndex++;
        }
        // Single image and at least one text object
        else {
          if (req.body.url !== "null") {
            content.push({
              type: req.body.type[i],
              description: req.body.description,
              caption: req.body.caption,
              url: req.body.url
            });
            imgURLs.push(req.body.url);
          }
          else {
            content.push({
              type: req.body.type[i],
              description: req.body.description,
              caption: req.body.caption,
              url: req.files[0].path
            });
            imgURLs.push(req.files[0].path);
          }
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
        // Single text and at least one image
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
      if (req.body.url !== "null") {
        content.push({
          type: req.body.type,
          description: req.body.description,
          caption: req.body.caption,
          url: req.body.url
        });
        imgURLs.push(req.body.url);
      }
      else {
        content.push({
          type: req.body.type,
          description: req.body.description,
          caption: req.body.caption,
          url: req.files[0].path
        });
        imgURLs.push(req.files[0].path);
      }
    }
    // Only header
    else if (req.body.type) {
      content.push({
        type: req.body.type,
        text: req.body.text
      });
    }
  }
  return {content: content, imgURLs: imgURLs};
}
