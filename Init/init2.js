const User = require("../models/User");
const Folder = require("../models/Folder");
const Note = require("../models/Note");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/Notes")
  .then(() => console.log(`success connect to DB`))
  .catch((err) => console.log(err));

let user = new User();
User.findOne().then((doc) => {
  user = doc;
  console.log(user);
});
console.log(`user > ${user}`);

const folders = [
  new Folder({
    name: "folder6",
    user: "65a922ede86b2b8648a423e7",
  }),
];

var done = 0;
for (var i = 0; i < folders.length; i++) {
  folders[i]
    .save()
    .then((doc) => {
      console.log(doc);
      done++;
      if (done === folders.length) {
        mongoose.disconnect();
      }
    })
    .catch((err) => {
      console.error(err);
      done++;
    });
}
