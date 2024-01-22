const mongoose = require("mongoose");
const noteSchema = mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  body: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  folder: {
    type: mongoose.Schema.ObjectId,
    ref: "Folder",
    require: true,
  },
});

module.exports = mongoose.model("Note", noteSchema);
