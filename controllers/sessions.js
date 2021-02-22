// DEPENDENCIES
const express = require("express");
const sessions = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/users.js");

// ROUTES

// New get - login page
sessions.get("/login", (req, res) => {
    res.render("sessions/new.ejs");
});

// Create post - user login
sessions.post("/login", (req, res) => {
    
    User.findOne({ username: req.body.username }, (err, foundUser) => {
        //If username does not exist
        if (!foundUser) {
            //Rendering login page with error message
            res.render("sessions/new.ejs", { username: false });
            // console.log("no user")
        } else {
            //Check if password is correct
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.currentUser = foundUser;
                res.send("password is correct");
                // console.log("success");
                //redirect to home page if password is correct
                // res.redirect("/home");
            } else {
                //Rendering login page with error message if incorrect password
                res.render("sessions/new.ejs", { password: false });
                // console.log("wrong password")
            }
        }
    });
});

module.exports = sessions;
