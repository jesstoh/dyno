// DEPENDENCIES
const express = require("express");
const posts = express.Router();
const Post = require("../models/posts.js");
const User = require("../models/users.js");
const isAuthenticated = require("./helper.js").isAuthenticated;

// ROUTES

// New get - new post form
posts.get("/posts/new", isAuthenticated, (req, res) => {
    res.render("app/posts/new.ejs", {currentUser: req.session.currentUser});
});

module.exports = posts;
