const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/user.routes");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/users", userRoutes);






module.exports = app;