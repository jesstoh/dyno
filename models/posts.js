// DEPENDENCIES
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const postSchema = new Schema(
    {
        author: { type: String, required: true },
        // author: {type: Schema.Types.ObjectId, required: true},
        description: String,
        img: String,
        video: String,
        location: String,
        tags: [String],
        likes: [String], //use username instead of Schema.Types.ObjectId as user route is not by id
        edited: {type: Boolean, default: false},
        comments: [
            {   //Sub-document for comment
                type: new Schema(
                    {
                        user: String,
                        message: String,
                    },
                    { timestamps: true }
                ),
            },
        ],
        // comments: [{user: String, message: String}, {timestamps: true}]
    },
    { timestamps: true }
);

const Post = mongoose.model("post", postSchema);

module.exports = Post;
