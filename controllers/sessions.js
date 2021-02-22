// DEPENDENCIES
const express = require("express");
const sessions = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/users.js");

// ROUTES

// New get - login page
sessions.get("/login", (req, res) => {
    if (!req.session.currentUser) {
        res.render("sessions/new.ejs", {
            wrongUser: false,
            wrongPassword: false,
        });
    } else {
        res.redirect("/home"); //Redirect to home page if already logged in
    }
});

// Create post - user login
sessions.post("/login", (req, res) => {
    User.findOne({ username: req.body.username }, (err, foundUser) => {
        //If username does not exist
        if (!foundUser) {
            //Rendering login page with error message
            res.render("sessions/new.ejs", {
                wrongUser: true,
                wrongPassword: false,
            });
            // console.log("no user")
        } else {
            //Check if password is correct
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.currentUser = foundUser;
                // res.send("password is correct");
                // console.log("success");
                //redirect to home page if password is correct
                res.redirect("/home");
            } else {
                //Rendering login page with error message if incorrect password
                res.render("sessions/new.ejs", {
                    wrongUser: false,
                    wrongPassword: true,
                });
                // console.log("wrong password")
            }
        }
    });
});

// Delete - log out
sessions.delete("/sessions", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
    
});

module.exports = sessions;
