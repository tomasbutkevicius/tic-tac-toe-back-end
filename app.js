const express = require("express");
const app = express();
require('dotenv/config');

const boardsRoutes = require('./routes/boardsRoutes');

app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use("/boards", boardsRoutes);

module.exports = app;