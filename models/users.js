//DEPENDENCIES
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const userSchema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        img: String, //url of profile photo
        // followers: [Schema.Types.ObjectId],
        // following: [Schema.Types.ObjectId],
        followers: [String],
        following: [String],
        email: String, //Optional(to expand the feature)
        bio: String,
        location: String,
        armSpan: Number //Optional (to expand for future feature)
    },
    { timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
