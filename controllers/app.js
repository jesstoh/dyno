// DEPENDENCIES
const express = require("express");
const apps = express.Router();
const User = require("../models/users.js");
const Post = require("../models/posts.js");
const isAuthenticated = require("./helper.js").isAuthenticated;
const formatDate = require("./helper.js").formatDate;

// ROUTES
apps.get("/", (req, res) => {
    if (req.session.currentUser) {
        res.redirect("/home");
    } else {
        res.render("index.ejs");
    }
});

// Index get - home page when logged in (showing all posts)
apps.get("/home", isAuthenticated, (req, res) => {
    Post.find()
        .sort({ _id: -1 })
        .exec((err, posts) => {
            posts.forEach((post) => {
                post.created = formatDate(post.createdAt);
            });
            res.render("app/index.ejs", {
                currentUser: req.session.currentUser,
                posts,
                query: {},
            });
        });
});

// Index get - posts of all following users
apps.get("/following", isAuthenticated, (req, res) => {
    Post.find({ author: { $in: req.session.currentUser.following } })
        .sort({ _id: -1 })
        .exec((err, posts) => {
            posts.forEach((post) => {
                post.created = formatDate(post.createdAt);
            });
            res.render("app/posts/index.ejs", {
                currentUser: req.session.currentUser,
                posts,
                query: {},
            });
        });
});

// Index - showing search result
apps.get("/search", isAuthenticated, (req, res) => {
    // If search input is empty string, redirect to home
    if (!req.query.q.trim()) {
        res.redirect("/home");
    }

    // Create query parameter and regex pattern to ignore case
    const query = { [req.query.cat]: new RegExp(req.query.q, "i") };
    Post.find(query)
        .sort({ _id: -1 })
        .exec((err, posts) => {
            posts.forEach((post) => {
                post.created = formatDate(post.createdAt);
            });
            res.render("app/index.ejs", {
                currentUser: req.session.currentUser,
                posts,
                query: req.query,
            });
        });
});

// Index - showing search result of following
apps.get("/search/following", isAuthenticated, (req, res) => {
    // If search input is empty string, redirect to home
    if (!req.query.q.trim()) {
        res.redirect("/following");
    }

    // Create query parameter and regex pattern to ignore case
    Post.find({
        author: { $in: req.session.currentUser.following },
        [req.query.cat]: new RegExp(req.query.q, "i"),
    })
        .sort({ _id: -1 })
        .exec((err, posts) => {
            posts.forEach((post) => {
                post.created = formatDate(post.createdAt);
            });
            res.render("app/posts/index.ejs", {
                currentUser: req.session.currentUser,
                posts,
                query: req.query,
            });
        });
});

// apps.get("/back", (req, res) => {
//     res.redirect("back");
// });

apps.get("/dummy", (req, res) => {
    res.render("users/edit.ejs");
});

module.exports = apps;
