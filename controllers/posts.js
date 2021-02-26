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
        postFound.comments.reverse();
        res.render("app/posts/show.ejs", {
            currentUser: req.session.currentUser,
            post: postFound,
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
    req.body.tags = req.body.tags.split(",");
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
posts.post("/posts", (req, res) => {
    req.body.author = req.session.currentUser.username;
    req.body.tags = req.body.tags.split(",");

    Post.create(req.body, (err, createdPost) => {
        console.log(createdPost);
        res.redirect("/home");
    });
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
    })
})

module.exports = posts;
