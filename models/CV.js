const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const CVSchema = new Schema ({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  phone: {
    type: String
  },
  email: {
    type: String
  },
  github: {
    type: String
  },
  interests: {
    type: String
  },
  avatar: {
    type: String
  },
  avatarID: {
    type: String
  },
  description: {
    type: String
  },

  experience: [{
    title: {
      type: String
    },
    employer: {
      type: String
    },
    description: {
      type: String
    },
    start: {
      type: Date
    },
    end: {
      type: Date
    }
  }],

  education: [{
    title: {
      type: String
    },
    school: {
      type: String
    },
    description: {
      type: String
    },
    start: {
      type: Date
    },
    end: {
      type: Date
    }
  }],

  languages: [{
    name: {
      type: String
    },
    description: {
      type: String
    }
  }],

  technologies: [{
    name: {
      type: String
    },
    description: {
      type: String
    }
  }]
});

module.exports = CV = mongoose.model("CV", CVSchema);
