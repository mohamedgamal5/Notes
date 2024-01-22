const mongoose = require("mongoose");
const folderSchema = mongoose.Schema({
  name: {
    type: String,
  },
  // notes: {
  //   type: Array,
  // },
  createAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
});

module.exports = mongoose.model("Folder", folderSchema);
