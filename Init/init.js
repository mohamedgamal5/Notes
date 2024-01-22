const User = require("../models/User");
const Folder = require("../models/Folder");
const Note = require("../models/Note");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/Notes")
  .then(() => console.log(`success connect to DB`))
  .catch((err) => console.log(err));

// Folder.deleteMany().then(() => {
//   console.log("delete Folder");
// });
// User.deleteMany().then(() => {
//   console.log("delete user");
// });
// Note.deleteMany().then(() => {
//   console.log("delete note");
// });

const users = [
  new User({
    email: "test1@test.com",
    password: new User().hashPassword("12345"),
    name: "test1",
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
