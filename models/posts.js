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
    likes: [String], //use username instead of Schema.Types.ObjectId as user route is not by id
    comments: [{userId: Schema.Types.ObjectId, user: String, message: String}]
  },
  { timestamps: true }
);

const Post = mongoose.model("post", postSchema);

module.exports = Post;