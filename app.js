const express = require("express");
const mongoose = require("mongoose");
const app = express();
require('dotenv/config');

const boardsRoute = require('./routes/boardsRoutes');

app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use("/boards", boardsRoute);

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION,
    {useNewUrlParser: true,
    useUnifiedTopology: true}, 
    ()=>{
    console.log("connected to db");
});

app.listen(3000);