const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const flash = require('connect-flash');

const User = require("./models/user");

require('dotenv').config();

const MONGODB_URI = process.env.MONGO_URI;

const app = express();
const store = MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions"
});

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.json());
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const adminRoutes = require('./routes/admin');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use('/images', express.static(path.join(__dirname, "images")));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: store
  })
);
app.use(flash());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use(authRoutes);
app.use(adminRoutes);
app.use(userRoutes);

app.use((req, res, next) => {
  res.status(404).render("404");
});

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    console.log("Connected!");
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => {
    console.log(err);
  });
