// DEPENDENCIES
const express = require("express");
const apps = express.Router();
const User = require("../models/users.js");
const Post = require("../models/posts.js");
const isAuthenticated = require("./helper.js").isAuthenticated;
const formatDate = require("./helper.js").formatDate;
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
    // Number of post to skip
    let skipNum = 0;

    // Infinite scrolling skip numbers
    if (req.query.page) {
        skipNum += (req.query.page - 1) * pageLimit;
    }

    Post.find()
        .sort({ _id: -1 })
        .skip(skipNum)
        .limit(pageLimit)
        .exec((err, posts) => {
            if (err) {
                console.log("error message", err.message);
            } else {
                posts.forEach((post) => {
                    post.created = formatDate(post.createdAt);
                });
                if (skipNum === 0) {
                    res.render("app/index.ejs", {
                        currentUser: req.session.currentUser,
                        posts,
                        query: {},
                        // lastPostId: posts[posts.length - 1]._id, (will throw )
                    });
                } else {
                    // Infinite scrolling data
                    res.send({ posts });
                }
            }
        });
});

// Index get - posts of all following users
apps.get("/following", isAuthenticated, (req, res) => {
    // Number of post to skip
    let skipNum = 0;
    if (req.query.page) {
        skipNum += (req.query.page - 1) * pageLimit;
    }

    Post.find({ author: { $in: req.session.currentUser.following } })
        .sort({ _id: -1 })
        .skip(skipNum)
        .limit(pageLimit)
        .exec((err, posts) => {
            posts.forEach((post) => {
                post.created = formatDate(post.createdAt);
            });
            if (skipNum === 0) {
                res.render("app/posts/index.ejs", {
                    currentUser: req.session.currentUser,
                    posts,
                    query: {},
                });
            } else {
                res.send({ posts });
            }
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

    // Define number of document to skip for infinite scrolling
    let skipNum = 0;
    if (req.query.page) {
        skipNum += (req.query.page - 1) * pageLimit;
    }

    Post.find(query)
        .sort({ _id: -1 })
        .skip(skipNum)
        .limit(pageLimit)
        .exec((err, posts) => {
            posts.forEach((post) => {
                post.created = formatDate(post.createdAt);
            });
            if (skipNum === 0) {
                res.render("app/index.ejs", {
                    currentUser: req.session.currentUser,
                    posts,
                    query: req.query,
                });
            } else {
                res.send({ posts });
            }
        });
});

// Index - showing search result of following
apps.get("/search/following", isAuthenticated, (req, res) => {
    // If search input is empty string, redirect to home
    if (!req.query.q.trim()) {
        res.redirect("/following");
    }

    // Define number of document to skip for infinite scrolling
    let skipNum = 0;
    if (req.query.page) {
        skipNum += (req.query.page - 1) * pageLimit;
    }

    // Create query parameter and regex pattern to ignore case
    Post.find({
        author: { $in: req.session.currentUser.following },
        [req.query.cat]: new RegExp(req.query.q, "i"),
    })
        .sort({ _id: -1 })
        .skip(skipNum)
        .limit(pageLimit)
        .exec((err, posts) => {
            posts.forEach((post) => {
                post.created = formatDate(post.createdAt);
            });

            if (skipNum === 0) {
                res.render("app/posts/index.ejs", {
                    currentUser: req.session.currentUser,
                    posts,
                    query: req.query,
                });
            } else {
                res.send({ posts });
            }
        });
});

// Seeding
apps.get("/seed/newposts", (req, res) => {
    Post.create(seedPosts, (err, createdPosts) => {
        console.log(createdPosts);
        res.redirect("/");
    });
});

module.exports = apps;
