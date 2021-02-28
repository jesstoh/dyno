// DEPENDENCIES
const express = require("express");
const apps = express.Router();
const User = require("../models/users.js");
const Post = require("../models/posts.js");
const isAuthenticated = require("./helper.js").isAuthenticated;
const formatDate = require("./helper.js").formatDate;
const seedPosts = require("../models/seed_posts.js"); //Seed of posts
const pageLimit = 9; // Number of posts to show before showing next batch while scrolling

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
        .limit(pageLimit)
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

// Index get - home page With infinite scrolling
// apps.get("/home", isAuthenticated, (req, res) => {
//     // Number of post to skip
//     let skipNum = 0;
//     if (req.query.page) {
//         skipNum += (req.query.page - 1) * pageLimit;
//     }

//     Post.find()
//         .sort({ _id: -1 })
//         .skip(skipNum)
//         .limit(pageLimit)
//         .exec((err, posts) => {
//             if (err) {
//                 console.log("error message", err.message);
//             } else {
//                 posts.forEach((post) => {
//                     post.created = formatDate(post.createdAt);
//                 });
//                 res.render("app/index.ejs", {
//                     currentUser: req.session.currentUser,
//                     posts,
//                     query: {},
//                     // lastPostId: posts[posts.length - 1]._id, (will throw )
//                 });
//             }
//         });
// });

// Home Page Scrolling route
apps.get("/home/scroll", isAuthenticated, (req, res) => {
    // Number of post to skip
    let skipNum = 0;
    if (req.query.page) {
        skipNum += (req.query.page - 1) * pageLimit;
    }

    Post.find()
        .sort({ _id: -1 })
        .skip(skipNum)
        .limit(pageLimit)
        .exec((err, posts) => {
            posts.forEach((post) => {
                post.created = formatDate(post.createdAt);
            });
            res.send({ posts });
        });
});

// Scrolling route for following posts
apps.get("/following/scroll", isAuthenticated, (req, res) => {
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
            res.send({ posts });
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

// Seeding
apps.get("/seed/newposts", (req, res) => {
    Post.create(seedPosts, (err, createdPosts) => {
        console.log(createdPosts);
        res.redirect("/");
    });
});

module.exports = apps;
