if (process.env.NODE_ENV === "production") {
  module.exports = {
    mongoURI: process.env.MONGO,
    secretOrKey: process.env.SECRET,
    cloudinaryName: process.env.CLOUDNAME,
    cloudinaryKey: process.env.CLOUDKEY,
    cloudinarySecret: process.env.CLOUDSECRET
  };
}
else {
  const keys = require("./truekeys");
  module.exports = {
    mongoURI: keys.mongoURI,
    secretOrKey: keys.secretOrKey,
    cloudinaryName: keys.cloudinaryName,
    cloudinaryKey: keys.cloudinaryKey,
    cloudinarySecret: keys.cloudinarySecret
  };
}
