var express = require("express");
const User = require("../models/User");
const Folder = require("../models/Folder");
const Note = require("../models/Note");
const { check, validationResult } = require("express-validator");
var router = express.Router();
const passport = require("passport");

let CUser = new User();
/* GET users listing. */
router.get("/", async (req, res, next) => {
  await User.findOne().then((doc) => {
    CUser = doc;
  });
  await Folder.find({ user: CUser._id }).then((doc) => {
    console.log(`folders ${doc}`);
  });
});

router.get("/signup", notSignin, (req, res, next) => {
  var messageError = req.flash("signupError");
  res.render("user/signup.hbs", {
    messageError: messageError,
    isAuth: req.isAuthenticated(),
  });
});
router.post(
  "/signup",
  [
    check("email").not().isEmpty().withMessage("Please enter ur Email"),
    check("email").isEmail().withMessage("Please enter valid email"),
    check("password").not().isEmpty().withMessage("Please enter ur password"),
    check("password")
      .isLength({ min: 5, max: 10 })
      .withMessage("length between 5:10"),
    check("confirm-password").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("confirm-password not match with password");
      }
      return true;
    }),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    var validationMsg = [];
    if (!errors.isEmpty()) {
      for (var i = 0; i < errors.errors.length; i++) {
        validationMsg.push(errors.errors[i].msg);
      }
      req.flash("signupError", validationMsg);
      res.redirect("signup");
      return;
    }
    next();
  },
  passport.authenticate("local-signup", {
    session: false,
    successRedirect: "/",
    failureRedirect: "signup",
    failureMessage: true,
  })
);

router.get("/signin", notSignin, (req, res, next) => {
  var messageError = req.flash("signinError");
  //console.log(req.csrfToken());
  res.render("user/signin.hbs", {
    messageError: messageError,
    isAuth: req.isAuthenticated(),
  });
});

router.post(
  "/signin",
  [
    check("email").not().isEmpty().withMessage("Please enter ur Email"),
    check("email").isEmail().withMessage("Please enter valid email"),
    check("password").not().isEmpty().withMessage("Please enter ur password"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("length more than 4 char"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    var validationMsg = [];
    if (!errors.isEmpty()) {
      for (var i = 0; i < errors.errors.length; i++) {
        validationMsg.push(errors.errors[i].msg);
      }
      req.flash("signinError", validationMsg);
      res.redirect("signin");
      return;
    }
    next();
  },
  passport.authenticate("local-signin", {
    successRedirect: "/folders",
    failureRedirect: "signin",
    failureFlash: true,
  })
);

router.get("/logout", isSignin, (req, res, next) => {
  req.logOut((err) => {
    res.send(err);
  });
  res.redirect("signin");
});

function isSignin(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect("signin");
    return;
  }
  next();
}

function notSignin(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect("/");
    return;
  }
  next();
}

module.exports = router;
