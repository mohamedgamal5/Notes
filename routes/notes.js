var express = require("express");
var router = express.Router();
const User = require("../models/User");
const Folder = require("../models/Folder");
const Note = require("../models/Note");

router.get("/", async (req, res, next) => {
  res.render("noteContent", { isAuth: req.isAuthenticated() });
});

router.get("/note/:id", async (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect("/users/signin");
    return;
  }
  var note = new Note();
  await Note.findOne({ _id: req.params.id })
    .then((doc) => {
      note = doc;
    })
    .catch((err) => {
      console.log(`err =>${err}`);
    });
  res.render("noteContent", {
    title: "Notes",
    note: note,
    isAuth: req.isAuthenticated(),
  });
});

const options = { day: "2-digit", month: "2-digit", year: "numeric" };

router.post("/update/:id", async (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect("/users/signin");
    return;
  }
  console.log("req.body");
  console.log(req.body);
  await Note.updateOne(
    { _id: req.params.id },
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
        body: req.body.body,
        createAt: new Date(),
      },
    }
  )
    .then((doc) => {
      console.log(`updated${doc}`);
    })
    .catch((err) => {
      console.log(`erreor>>>>>>>${err}`);
    });
  var note = new Note();
  await Note.findOne({ _id: req.params.id })
    .then((doc) => {
      note = doc;
    })
    .catch((err) => {
      console.log(`err =>${err}`);
    });
  res.redirect("/folders/folder/" + note.folder);
});

router.get("/create/:id", async (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect("/users/signin");
    return;
  }
  var note = new Note({
    title: "",
    description: "",
    body: "",
    folder: req.params.id,
  });
  console.log(`new :${note}`);
  note
    .save()
    .then(() => {})
    .catch((err) => {
      console.error(err);
    });
  res.render("noteContent", {
    title: "Notes",
    note: note,
    isAuth: req.isAuthenticated(),
  });
});

router.get("/delete/:id", async (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect("/users/signin");
    return;
  }
  var folderId;
  await Note.findOne({ _id: req.params.id }).then((doc) => {
    folderId = doc.folder;
    console.log(`Id=>${folderId}`);
  });

  await Note.deleteOne({ _id: req.params.id }).then((doc) => {
    console.log(`success delete`);

    console.log(`Id=>${doc}`);
  });
  console.log(folderId);
  res.redirect("/folders/folder/" + folderId);
});

module.exports = router;
