const User = require("../models/User");
const Folder = require("../models/Folder");
const Note = require("../models/Note");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/Notes")
  .then(() => console.log(`success connect to DB`))
  .catch((err) => console.log(err));

const users = [
  new User({
    email: "test1@test.com",
    password: new User().hashPassword("12345"),
    name: "test1",
    folders: [
      new Folder({
        name: "folder1",
        notes: [
          new Note({
            title: "123",
            description: "qaz",
            body: "dhskajfhdsalkfjhdslfkjdshlfdksjhfdsakjhalks",
          }),
          new Note({
            title: "234",
            description: "qaz",
            body: "dhskajfhdsalkfjhdslfkjdshlfdksjhfdsakjhalks",
          }),
        ],
      }),
      new Folder({
        name: "folder2",
        notes: [
          new Note({
            title: "345",
            description: "qaz",
            body: "dhskajfhdsalkfjhdslfkjdshlfdksjhfdsakjhalks",
          }),
          new Note({
            title: "456",
            description: "qaz",
            body: "dhskajfhdsalkfjhdslfkjdshlfdksjhfdsakjhalks",
          }),
          new Note({
            title: "456",
            description: "qaz",
            body: "dhskajfhdsalkfjhdslfkjdshlfdksjhfdsakjhalks",
          }),
        ],
      }),
    ],
  }),
  new User({
    email: "test2@test.com",
    password: new User().hashPassword("12345"),
    name: "test2",
    folders: [
      new Folder({
        name: "folder1",
        notes: [
          new Note({
            title: "567",
            description: "qaz",
            body: "dhskajfhdsalkfjhdslfkjdshlfdksjhfdsakjhalks",
          }),
          new Note({
            title: "678",
            description: "qaz",
            body: "dhskajfhdsalkfjhdslfkjdshlfdksjhfdsakjhalks",
          }),
        ],
      }),
    ],
  }),
];

var done = 0;
for (var i = 0; i < users.length; i++) {
  users[i]
    .save()
    .then((doc) => {
      console.log(doc);
      done++;
      if (done === users.length) {
        mongoose.disconnect();
      }
    })
    .catch((err) => {
      console.error(err);
      done++;
    });
}
