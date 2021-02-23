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

// Create - create new post
posts.post("/posts", (req, res) => {
    req.body.author = req.session.currentUser.username;
    req.body.tags = req.body.tags.split(",");
    
    Post.create(req.body, (err, createdPost) => {
        console.log(createdPost);
        res.redirect("/home");
    })
    
});

module.exports = posts;
