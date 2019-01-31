const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const headersSchema = new Schema ({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  cv: {
    type: String,
    default: "CV"
  },
  projects: {
    type: String,
    default: "Projects"
  },
  applications: {
    type: String,
    default: "Application"
  }
});

module.exports = Headers = mongoose.model("Headers", headersSchema);
