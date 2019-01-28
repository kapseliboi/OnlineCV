const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicationSchema = new Schema ({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  target: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  content: {
    type: Array
  }

});

module.exports = Application = mongoose.model("Application", applicationSchema);
