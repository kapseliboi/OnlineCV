const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

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
mongoose.connect(db, {useNewUrlParser: true}).then(
  () => console.log("MongoDB succesfully connected"))
  .catch(err => console.log(err));

const port = process.env.PORT || 5000; // Setting up for possible heroku deployment

app.listen(port, () => console.log("Server up and running on port " + port + "!"));
