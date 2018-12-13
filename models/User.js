const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a collection for user
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

module.exports = User = mongoose.model("User", userSchema);
