// DEPENDENCIES
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const postSchema = new Schema(
  {
    author: {type: Schema.Types.ObjectId, required: true},
    description: String,
    img: String,
    video: String,
    location: String,
    tags: [String],
    likes: [Schema.Types.ObjectId],
    comments: [{user: Schema.Types.ObjectId, message: String}]
  },
  { timestamps: true }
);

const Post = mongoose.model("post", postSchema);

module.exports = Post;