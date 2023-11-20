
const express = require("express");
const cors = require("cors");
const bodyParser =require("body-parser")
const session =require("express-session")
const cookieParser =require("cookie-parser")
require('dotenv').config();
const app = express();
// middlewares
app.use(express.json())
app.use(cors());

const http = require("http").createServer(app);
const connectDB = require("../src/config/DB.js");

const port=process.env.PORT ;
const DB_HOST = process.env.DB_HOST

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "cbdsjkkjsdcfjkdsdncfdh",
    resave: false,
    saveUninitialized: true,
  })
);
http.listen(port, () => {
  try {
    connectDB(DB_HOST)
 
  } catch (error) {
    console.log(error);
  }
    console.info(
      `Server is running on port ${port}. Env:- ${process.env.NODE_ENV}`
    );
  });

module.exports = { app, http };