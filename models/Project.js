const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema ({
  title: {
    type: String,
    required: true
  },

  content: {
    type: Array,
    required: true
  },

  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  position: { type: Number, required: true }
});

module.exports = Project = mongoose.model("Project", projectSchema);
