module.exports = parseForm = (data) => {
  var content = [];
  var imgIndex = 0;
  var textIndex = 0;

  // If we have multiple images or text objects
  if (Array.isArray(data.type)){
    for (var i = 0; i < data.type.length; i++) {
      if (data.type[i] === "image") {
        // If we have multiple images
        if (Array.isArray(data.description)){
          content.push({
            type: data.type[i],
            description: data.description[imgIndex],
            caption: data.caption[imgIndex],
            url: req.files[imgIndex].path
          });
          imgIndex++;
        }
        // Single image but at least one text object
        else {
          content.push({
            type: data.type[i],
            description: data.description,
            caption: data.caption,
            url: req.files[0].path
          })
        }
      }
      else {
        // If we have multiple texts
        if (Array.isArray(data.text)){
          content.push({
            type: data.type[i],
            text: data.text[textIndex]
          });
          textIndex++;
        }
        // Single text but at least one image
        else {
          content.push({
            type: data.type[i],
            text: data.text
          });
        }
      }
    }
  }
  else {
    // Only one image or one text
    if (data.type === "image") {
      content.push({
        type: data.type,
        description: data.description,
        caption: data.caption,
        url: req.files[0].path
      });
    }
    else if (data.type) {
      content.push({
        type: data.type,
        text: data.text
      });
    }
  }
  return content;
}
