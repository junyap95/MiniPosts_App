const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    require: true,
  },
  hashtag: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    require: true,
  },
  URL: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now, //good practice
  },
});

module.exports = mongoose.model("posts", PostSchema);
