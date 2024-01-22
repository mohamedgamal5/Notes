const User = require("../models/User");
const Folder = require("../models/Folder");
const Note = require("../models/Note");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/Notes")
  .then(() => console.log(`success connect to DB`))
  .catch((err) => console.log(err));

// u 65a922ede86b2b8648a423e7
//f1 65a92da594836fad3005d29b
//f2 65a92dc89721b7815f262b18
const notes = [
  new Note({
    title: "Note1.1",
    description: "<<note1.1>>",
    body: "note1.1>>>>>note1.1>>>>>note1.1>>>>>note1.1>>>>>note1.1",
    folder: "65a92da594836fad3005d29b",
  }),
  new Note({
    title: "Note1.2",
    description: "<<note1.2>>",
    body: "note1.2>>>>>note1.2>>>>>note1.2>>>>>note1.2>>>>>note1.2",
    folder: "65a92da594836fad3005d29b",
  }),
  new Note({
    title: "Note2.1",
    description: "<<note2.1>>",
    body: "note2.1>>>>>note2.1>>>>>note2.1>>>>>note2.1>>>>>note2.1",
    folder: "65a92dc89721b7815f262b18",
  }),
];

var done = 0;
for (var i = 0; i < notes.length; i++) {
  notes[i]
    .save()
    .then((doc) => {
      console.log(doc);
      done++;
      if (done === notes.length) {
        mongoose.disconnect();
      }
    })
    .catch((err) => {
      console.error(err);
      done++;
    });
}
