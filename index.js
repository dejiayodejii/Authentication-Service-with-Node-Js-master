/* eslint-disable no-undef */
const express = require('express');
const authRouter = require('./routes/auth_router');
const app = express();
const mongoose = require('mongoose');
 require('dotenv').config();



const port = process.env.PORT || 5000;


const DB = process.env.MONGO_DB

mongoose.connect(DB).then(() => console.log('connected to db')).catch((e) => { console.log(e) });

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});


app.use(express.json());
app.use(authRouter);

app.listen(port,'0.0.0.0',()=>console.log(`server started at ${port}`));