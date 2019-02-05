module.exports = parseForm = (req) => {
  var content = [];
  var imgIndex = 0;
  var textIndex = 0;
  var imgURLs = [];
  var imgIDs = [];

  // If we have multiple images or text objects
  if (Array.isArray(req.body.type)){
    for (var i = 0; i < req.body.type.length; i++) {
      if (req.body.type[i] === "image") {
        // If we have multiple images
        if (Array.isArray(req.body.description)){
          // If image is already stored on server
          if (req.body.url[imgIndex] !== "null") {
            content.push({
              type: req.body.type[i],
              description: req.body.description[imgIndex],
              caption: req.body.caption[imgIndex],
              url: req.body.url[imgIndex],
              imgID: req.body.imgID[imgIndex]
            });
            imgURLs.push(req.body.url[imgIndex]);
            imgIDs.push(req.body.imgID[imgIndex]);
          }
          else {
            content.push({
              type: req.body.type[i],
              description: req.body.description[imgIndex],
              caption: req.body.caption[imgIndex],
              url: req.files[imgIndex].secure_url,
              imgID: req.files[imgIndex].public_id
            });
            imgURLs.push(req.files[imgIndex].secure_url);
            imgIDs.push(req.files[imgIndex].public_id);
          }
          imgIndex++;
        }
        // Single image and at least one text object
        else {
          // If image is already stored on server
          if (req.body.url !== "null") {
            content.push({
              type: req.body.type[i],
              description: req.body.description,
              caption: req.body.caption,
              url: req.body.url,
              imgID: req.body.imgID
            });
            imgURLs.push(req.body.url);
            imgIDs.push(req.body.imgID);
          }
          else {
            content.push({
              type: req.body.type[i],
              description: req.body.description,
              caption: req.body.caption,
              url: req.files[0].secure_url,
              imgID: req.files[0].public_id
            });
            imgURLs.push(req.files[0].secure_url);
            imgIDs.push(req.files[0].public_id);
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
      // If image is already stored on server
      if (req.body.url !== "null") {
        content.push({
          type: req.body.type,
          description: req.body.description,
          caption: req.body.caption,
          url: req.body.url,
          imgID: req.body.imgID
        });
        imgURLs.push(req.body.url);
        imgIDs.push(req.body.imgID);
      }
      else {
        content.push({
          type: req.body.type,
          description: req.body.description,
          caption: req.body.caption,
          url: req.files[0].secure_url,
          imgID: req.files[0].public_id
        });
        imgURLs.push(req.files[0].secure_url);
        imgIDs.push(req.files[0].public_id)
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
  return {content: content, imgURLs: imgURLs, imgIDs: imgIDs};
}
