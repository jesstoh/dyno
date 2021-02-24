// DEPENDENCIES
const express = require("express");
const apps = express.Router();
const User = require("../models/users.js");
const Post = require("../models/posts.js");
const isAuthenticated = require("./helper.js").isAuthenticated;

// ROUTES
apps.get("/", (req, res) => {
    if (req.session.currentUser) {
        res.redirect("/home");
    } else {
        res.render("index.ejs");
    }
});

// Get home - home page when logged in (showing all posts)
apps.get("/home", isAuthenticated, (req, res) => {

    Post.find().sort({createdAt: -1}).exec((err, posts) => {
        res.render("app/index.ejs", {
            currentUser: req.session.currentUser,
            posts
        });
    })
});

apps.get("/back", (req, res) => {
    res.redirect("back");
})

module.exports = apps;
