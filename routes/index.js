var express = require("express");
var router = express.Router();
const User = require("../models/User");
const Folder = require("../models/Folder");
const Note = require("../models/Note");

/* GET home page. */
router.get("/", function (req, res, next) {
  // User.find().then((doc) => {
  //   console.log(`Cuser${doc}`);
  // });

  console.log(`Cuser${req.user}`);
  console.log(`is Auth${req.isAuthenticated()}`);

  res.render("index", { title: "Notes", isAuth: req.isAuthenticated() });
});

// router.get("/folders/delete/:id", function (req, res, next) {
//   // User.find().then((doc) => {
//   //   console.log(`Cuser${doc}`);
//   // });

//   console.log(`delete2`);
// });

module.exports = router;
