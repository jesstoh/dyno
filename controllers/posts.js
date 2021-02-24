// DEPENDENCIES
const express = require("express");
const posts = express.Router();
const Post = require("../models/posts.js");
const User = require("../models/users.js");
const isAuthenticated = require("./helper.js").isAuthenticated;

// ROUTES

// New get - new post form
posts.get("/posts/new", isAuthenticated, (req, res) => {
    res.render("app/posts/new.ejs", { currentUser: req.session.currentUser });
});

// Show get - show post
posts.get("/posts/:id", isAuthenticated, (req, res) => {
    Post.findById(req.params.id, (err, postFound) => {
        res.render("app/posts/show.ejs", {
            currentUser: req.session.currentUser,
            post: postFound,
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

// Update get - update post
posts.put("/posts/:id", isAuthenticated, (req, res) => {
    req.body.tags = req.body.tags.split(",");
    req.body.edited = true;
    console.log(req.body);
    Post.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, (err, updatedPost) => {
        console.log(updatedPost);
        res.redirect(`/posts/${req.params.id}`);

    })
})

// Create - create new post
posts.post("/posts", (req, res) => {
    req.body.author = req.session.currentUser.username;
    req.body.tags = req.body.tags.split(",");

    Post.create(req.body, (err, createdPost) => {
        console.log(createdPost);
        res.redirect("/home");
    });
});

module.exports = posts;
