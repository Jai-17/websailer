const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  res.render("login");
};

exports.getSignup = (req, res, next) => {
  res.render("signup");
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.redirect("/login");
      }

      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              console.log(err);
              res.redirect("/");
            });
          }
          res.redirect("/");
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/login");
        });
    })
    .catch((err) => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email }).then((userDoc) => {
    if (userDoc) {
      // if user already exists
      res.redirect("/signup");
    }

    return bcrypt
      .hash(password, 12)
      .then((hashedPassword) => {
        const user = new User({
          name: name,
          email: email,
          password: hashedPassword,
        });
        return user.save();
      })
      .then((result) => {
        res.redirect("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
