// DEPENDENCIES
const express = require("express");
const apps = express.Router();
const User = require("../models/users.js");
const Post = require("../models/posts.js");
const isAuthenticated = require("./helper.js").isAuthenticated;
const formatDate = require("./helper.js").formatDate;
const postsDisplay = require("./helper.js").postsDisplay;
const seedPosts = require("../models/seed_posts.js"); //Seed of posts
const pageLimit = 12; // Number of posts to show before showing next batch while scrolling

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
    postsDisplay({}, "app/index.ejs", {}, pageLimit, Post, req, res);
});

// Index get - posts of all following users
apps.get("/following", isAuthenticated, (req, res) => {
    // Number of post to skip
    const queryIn = { author: { $in: req.session.currentUser.following } };

    postsDisplay(queryIn, "app/posts/index.ejs", {}, pageLimit, Post, req, res);
});

// Index - showing search result
apps.get("/search", isAuthenticated, (req, res) => {
    // If search input is empty string, redirect to home
    if (!req.query.q.trim()) {
        res.redirect("/home");
    }

    // Create query parameter and regex pattern to ignore case
    const queryIn = { [req.query.cat]: new RegExp(req.query.q, "i") };

    postsDisplay(
        queryIn,
        "app/index.ejs",
        req.query,
        pageLimit,
        Post,
        req,
        res
    );
});

// Index - showing search result of following
apps.get("/search/following", isAuthenticated, (req, res) => {
    // If search input is empty string, redirect to home
    if (!req.query.q.trim()) {
        res.redirect("/following");
    }


    let queryIn;
    let queryRegex = new RegExp(req.query.q, "i");

    if (req.query.cat === "author") {
        const processed = req.session.currentUser.following.filter(
            (followingUser) => {
                return queryRegex.test(followingUser);
            }
        );
        queryIn = { author: { $in: processed } };
    } else {
        queryIn = {
            author: { $in: req.session.currentUser.following },
            [req.query.cat]: queryRegex,
        };
    }

    postsDisplay(
        queryIn,
        "app/posts/index.ejs",
        req.query,
        pageLimit,
        Post,
        req,
        res
    );
});

// Seeding
apps.get("/seed/newposts", (req, res) => {
    Post.create(seedPosts, (err, createdPosts) => {
        console.log(createdPosts);
        res.redirect("/");
    });
});

module.exports = apps;
