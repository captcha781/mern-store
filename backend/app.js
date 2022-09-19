// Environment Imports
require("dotenv").config();

// Primary Imports
const express = require("express");
const mongoose = require("mongoose");

// Secondary Imports
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

// Route Specifications
const adminRoutes = require("./Routes/Admin")

// Intializations
const app = express();

// Global Middlewares
const store = new MongoDBStore({
  url: process.env.MONGODB_CONNECT_STRING,
  collections: "sessions",
});
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SIGN_SECRET,
    cookie: {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 5 * 1000,
    },
    store: store,
    saveUninitialized: false,
    resave: false,
    name: "biscuit",
  })
);
app.use("/admin", adminRoutes)

app.use((req,res) => {
  console.log(req.headers);
})

mongoose.connect(process.env.MONGODB_CONNECT_STRING, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  app.listen(process.env.LISTEN_PORT, () => {
    console.log(
      "The server listens in the port",
      process.env.LISTEN_PORT,
      "..."
    );
  });
});
