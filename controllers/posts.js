// DEPENDENCIES
const express = require("express");
const posts = express.Router();
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const Post = require("../models/posts.js");
const User = require("../models/users.js");
const isAuthenticated = require("./helper.js").isAuthenticated;
const formatDate = require("./helper.js").formatDate;
const chipToTag = require("./helper.js").chipToTag;

// CONFIG
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ROUTES
// New get - new post form
posts.get("/posts/new", isAuthenticated, (req, res) => {
    res.render("app/posts/new.ejs", { currentUser: req.session.currentUser });
});

// Show get - show post
posts.get("/posts/:id", isAuthenticated, (req, res) => {
    Post.findById(req.params.id, (err, foundPost) => {
        foundPost.comments.reverse();
        foundPost.comments.forEach((comment) => {
            comment.created = formatDate(comment.createdAt);
        });

        foundPost.created = formatDate(foundPost.createdAt);
        // console.log(foundPost)
        res.render("app/posts/show.ejs", {
            currentUser: req.session.currentUser,
            post: foundPost,
        });
    });
});

// Index get - show like list
posts.get("/posts/:id/like", isAuthenticated, (req, res) => {
    Post.findById(req.params.id, (err, foundPost) => {
        res.render("users/index.ejs", {
            currentUser: req.session.currentUser,
            users: foundPost.likes,
        });
    });
});

// Edit get - form to edit post
posts.get("/posts/:id/edit", isAuthenticated, (req, res) => {
    Post.findById(req.params.id, (err, foundPost) => {
        // Check if current user is author of the post before displaying form
        if (req.session.currentUser.username === foundPost.author) {
            res.render("app/posts/edit.ejs", {
                currentUser: req.session.currentUser,
                post: foundPost,
            });
        } else {
            res.redirect("/");
        }
    });
});

// Update put - update post
posts.put("/posts/:id", isAuthenticated, (req, res) => {
    // req.body.tags = req.body.tags.split(",");
    req.body.tags = chipToTag(req.body.tags);
    req.body.edited = true;
    console.log(req.body);
    Post.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true },
        (err, updatedPost) => {
            console.log(updatedPost);
            res.redirect(`/posts/${req.params.id}`);
        }
    );
});

// Update put - like post
posts.put("/posts/:id/like", isAuthenticated, (req, res) => {
    Post.findByIdAndUpdate(
        req.params.id,
        { $push: { likes: req.session.currentUser.username } },
        { new: true },
        (err, updatedPost) => {
            // console.log(updatedPost);
            res.send(updatedPost);
        }
    );
});

// Update put - unlike post
posts.put("/posts/:id/unlike", isAuthenticated, (req, res) => {
    Post.findByIdAndUpdate(
        req.params.id,
        { $pull: { likes: req.session.currentUser.username } },
        { new: true },
        (err, updatedPost) => {
            // console.log(updatedPost);
            res.send(updatedPost);
        }
    );
});

// Create - create new post
// posts.post("/posts", (req, res) => {
//     req.body.author = req.session.currentUser.username;
//     req.body.tags = chipToTag(req.body.tags); // Convert chips to tag array
//     // console.log(req.body.tags)
//     // console.log(req.body);

//     Post.create(req.body, (err, createdPost) => {
//         console.log(createdPost);
//         res.redirect(`/posts/${createdPost._id}`);
//     });
// });

posts.post("/posts", upload.single("media"), (req, res) => {
    req.body.author = req.session.currentUser.username;
    req.body.tags = chipToTag(req.body.tags); // Convert chips to tag array

    // Upload file to cloudinary
    cloudinary.uploader.upload(
        req.file.path,
        {
            resource_type: "auto",
        },
        (err, result) => {
            if (result.resource_type === "image") {
                req.body.img = result.url;
            } else if (result.resource_type === "video") {
                req.body.video = result.url;
            } else {
                res.redirect("/posts/new")
            }
            Post.create(req.body, (err, createdPost) => {
                console.log(createdPost);
                res.redirect(`/posts/${createdPost._id}`);
            });
        }
    );


    console.log("OK");
});

// Create post - create new comment
posts.post("/posts/:id/comment", isAuthenticated, (req, res) => {
    req.body.user = req.session.currentUser.username;
    console.log(req.body);
    Post.findByIdAndUpdate(
        req.params.id,
        { $push: { comments: req.body } },
        { new: true },
        (err, updatedPost) => {
            console.log(updatedPost);
            res.redirect("back");
        }
    );
});

// Delete post
posts.delete("/posts/:id", isAuthenticated, (req, res) => {
    Post.findByIdAndDelete(req.params.id, () => {
        res.redirect("/home");
    });
});

module.exports = posts;
