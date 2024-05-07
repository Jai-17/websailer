const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const User = require("./models/user");

const MONGODB_URI =
  "mongodb+srv://don:9707wxj6D2jP5PQC@cluster0.alvwa88.mongodb.net/websailer?retryWrites=true&w=majority&appName=Cluster0";

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
const adminController = require('./controllers/admin');
const isAuth = require('./middleware/is-auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use('/images', express.static(path.join(__dirname, "images")));
app.use(
  session({
    secret: "mainhoondon",
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

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
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
