const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const csrf = require("csurf");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const compression = require("compression");

const path = require("path");

const users = require("./routes/api/users");
const adminsGeneral = require("./routes/api/admins/general");
const adminsProjects = require("./routes/api/admins/projects");
const adminsApplications = require("./routes/api/admins/applicationsAndUsers");
const cv = require("./routes/api/admins/cv");

const app = express();

app.use(helmet());

if (process.env.NODE_ENV === "production") {
  app.use(compression());
  app.use((req, res, next) => {
    if (!req.secure) {
      var secureUrl = "https://" + req.headers["host"] + req.url;
      res.writeHead(301, {"Location": secureUrl});
      return res.end();
    }
    next();
  });
}

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
express.static(path.join(__dirname, "images")));

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
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.use(express.static(path.join(__dirname, "admin", "build")));

  app.get("/admin/*",
  (req, res, next) => {
    passport.authenticate("jwt", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({error: "Not authenticated"});
      }
      if (!user.isAdmin) {
        return res.status(401).json({error: "Not an admin"});
      }
      req.user = user;
      next();
    })(req, res, next);},

    (req, res) => {
    res.sendFile(path.join(__dirname, "admin", "build", "index.html"));
  });
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000; // Setting up for possible heroku deployment


app.listen(port, () => console.log("Server up and running on port " + port + "!"));
