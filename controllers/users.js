// DEPENDENCIES
const express = require("express");
const users = express.Router();
const User = require("../models/users.js");
const bcrypt = require("bcrypt");

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

module.exports = users;
