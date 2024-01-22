var express = require("express");
var router = express.Router();
const User = require("../models/User");
const Folder = require("../models/Folder");
const Note = require("../models/Note");
const { check, validationResult } = require("express-validator");

router.get("/", async (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect("users/signin");
    return;
  }

  var folders;
  await Folder.find({ user: req.user._id })
    .then((doc) => {
      folders = doc;
    })
    .catch((err) => {
      console.log(`err =>${err}`);
    });

  var foldersGrid = [];
  var colGrid = 3;
  folders = Object.values(folders);
  for (var i = 0; i < folders.length; i += colGrid) {
    foldersGrid.push(folders.slice(i, i + colGrid));
  }
  res.render("folders", {
    title: "Notes",
    folders: foldersGrid,
    isAuth: req.isAuthenticated(),
  });
});

router.get("/folder/:id", async (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect("/users/signin");
    return;
  }

  var notes;
  await Note.find({ folder: req.params.id })
    .sort({ createAt: -1 })
    .then((doc) => {
      notes = doc;
    })
    .catch((err) => {
      console.log(`err =>${err}`);
    });

  var notesGrid = [];
  var colGrid = 3;
  notes = Object.values(notes);
  for (var i = 0; i < notes.length; i += colGrid) {
    notesGrid.push(notes.slice(i, i + colGrid));
  }
  // console.log(notesGrid);
  res.render("notes", {
    title: "Notes",
    notes: notesGrid,
    folderId: req.params.id,
    isAuth: req.isAuthenticated(),
  });
});

router.get("/delete/:id", async (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect("/users/signin");
    return;
  }

  Folder.deleteOne({ _id: req.params.id }).then(() => {
    console.log(`success delete`);
  });

  //   var foldersGrid = [];
  //   var colGrid = 2;
  //   folders = Object.values(folders);
  //   for (var i = 0; i < folders.length; i += colGrid) {
  //     foldersGrid.push(folders.slice(i, i + colGrid));
  //   }
  res.redirect("/folders");
});

router.post("/create", async (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect("/users/signin");
    return;
  }
  var name = req.body.folderName;
  const folder = new Folder({
    name: name,
    user: req.user._id,
  });

  folder
    .save()
    .then((doc) => {
      console.log(doc);
    })
    .catch((err) => {
      console.log(`err creat=>${err}`);
    });
  res.redirect("/folders");
});

router.post("/update/:id", async (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect("/users/signin");
    return;
  }
});

module.exports = router;
