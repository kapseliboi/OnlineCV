
// User
{
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
}

// Project
{
  name: {
    type: String,
    required: true
  },
  texts:
  [{ text: { type: String, required: true }, position: { type: Integer, required: true } }],

  images:
  [ { url: { type: String, required: true }, description: { type: String },
    caption: { type: String }, position: { type: Integer, required: true } } ],

  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  position: { type: Integer, required: true }
}

// Why-text
{
  text: {
    type: String,
    required: true
  },
  target: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}

// Navigation-names
{
  cv: {
    type: String,
    default: "Home"
  },
  why: {
    type: String,
    default: "Why us?"
  },
  projects: {
    type: String,
    default: "Projects"
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}

// CV
{
  workhistory: [{ employer: { type: String, required: true },
                  title: { type: String, required: true },
                  timespan: [{ start: { type: Date, required: true },
                               end: { type: Date, required: true }}],
                  description: { type: String, required: true }
               }],
  personalinfo: { birthdate: { type: Date, required: true },
                  email: { type: String, required: true },
                  phonenumber: { type: String, required: true }},

  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}
