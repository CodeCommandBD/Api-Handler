const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const passport = require("passport");

// Passport configuration
require("./config/passport.config");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/users", userRoutes);
app.use(passport.initialize());

// server error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({
    status: false,
    message: "Internal Server Error",
  });
});

// route error handler
app.use((req, res, next) => {
  res.status(404).send({
    status: false,
    message: "Route not found",
  });
});

module.exports = app;
