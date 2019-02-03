const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const csrf = require("csurf");
const cookieParser = require("cookie-parser");

const path = require("path");

const users = require("./routes/api/users");
const adminsGeneral = require("./routes/api/admins/general");
const adminsProjects = require("./routes/api/admins/projects");
const adminsApplications = require("./routes/api/admins/applicationsAndUsers");
const cv = require("./routes/api/admins/cv");

const app = express();


// Bodyparser middleware used to parse incoming request bodies
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

//DB config
const db = require("./config/keys").mongoURI;

//DB connection
// useNewUrlParser should be set if connection is able to function since
// the underlying MongoDB driver has deprecated the current connection string parser
mongoose.connect(db, {useNewUrlParser: true}, (err) => {
  if (err) {
    console.log(err);
  }
  else {
    console.log("MongoDB succesfully connected")
  }
});

app.use(cookieParser());

// Passport middleware
app.use(passport.initialize());

// Passport configuration
require("./config/passport")(passport);

app.use(csrf({ cookie: { httpOnly: true } }));

// Routes
app.use("/api/users", users);
app.use("/api/admins", adminsGeneral);
app.use("/api/admins", adminsApplications);
app.use("/api/admins/projects", adminsProjects);
app.use("/api/admins/cv", cv);


app.get("/api/csrftoken", (req, res) => {
  res.json({ csrftoken: req.csrfToken() });
});

app.use("/images", passport.authenticate("jwt", {session: false}),
express.static("images"));

// Error handling
app.use((err, req, res, next) => {
  // CSRF
  if (err.code!=="EBADCSRFTOKEN"){
    console.log(err);
    return next(err);
  }
  res.status(403).json({ error: "Form has been tampered with" });
});
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.set("views", "client/views");
  app.set("view engine", "ejs");
  app.get("/", (req, res) => {
    res.render("index");
  });
}

const port = process.env.PORT || 5000; // Setting up for possible heroku deployment


app.listen(port, () => console.log("Server up and running on port " + port + "!"));
