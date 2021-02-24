// DEPENDENCIES
const express = require("express");
const users = express.Router();
const User = require("../models/users.js");
const Post = require("../models/posts.js");
const bcrypt = require("bcrypt");
const isAuthenticated = require("./helper.js").isAuthenticated;

// ROUTES

// Get New - Sign Up Form
users.get("/signup", (req, res) => {
    if (!req.session.currentUser) {
        res.render("users/new.ejs", { taken: false });
    } else {
        //If user is already logged in, redirect to home page
        res.redirect("/home");
    }
});

// Update put - follow other user
users.put("/users/:name/follow", (req, res) => {
    const currentUser = req.session.currentUser;
    const user = req.params.name;
    User.findOneAndUpdate(
        { username: currentUser.username },
        { $push: { following: req.params.name } }, {new: true},
        (err, updatedUser) => {
            req.session.currentUser = updatedUser; //Update user detail in current session
            User.findOneAndUpdate(
                { username: req.params.name },
                { $push: { followers: currentUser.username } }, {new: true},
                (err, followingUser) => {
                    // console.log(followingUser)
                    res.redirect("/home");
                }
            );
        }
    );
});

// Post - Create new user
users.post("/signup", (req, res) => {
    // Check if username is already taken
    User.findOne({ username: req.body.username }, (err, foundUser) => {
        if (foundUser) {
            // console.log("Username is already taken.")
            res.render("users/new.ejs", { taken: true });
        } else {
            req.body.password = bcrypt.hashSync(
                req.body.password,
                bcrypt.genSaltSync(10)
            );
            User.create(req.body, (err, userCreated) => {
                req.session.currentUser = userCreated;
                // console.log(userCreated);
                // res.send("New user created");
                res.redirect("/home");
            });
        }
    });
});

// Show user - each user profile page
users.get("/users/:name", isAuthenticated, (req, res) => {
    User.findOne({ username: req.params.name }, (err, foundUser) => {
        if (foundUser) {
            if (!foundUser.img) {
                foundUser.img = "/images/logo.png";
            }
            console.log(req.session.currentUser.following.includes(foundUser.username));
            Post.find({ author: req.params.name }, (err, foundPosts) => {
                res.render("users/show.ejs", {
                    currentUser: req.session.currentUser,
                    user: foundUser,
                    posts: foundPosts,
                });
            });
        } else {
            //Redirecting if user is not in database
            res.redirect("/");
        }
    });
});

module.exports = users;
