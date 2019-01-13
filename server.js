const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const users = require("./routes/api/users");

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

// Passport middleware
app.use(passport.initialize());

// Passport configuration
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);

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
