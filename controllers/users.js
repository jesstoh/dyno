// DEPENDENCIES
const express = require("express");
const users = express.Router();
const User = require("../models/users.js");
const bcrypt = require("bcrypt");

// ROUTES

// Get New - Sign Up Form
users.get("/new", (req, res) => {
  if (!req.session.currentUser) {
    res.render("users/new.ejs");
  } else {
    //If user is already logged in, redirect to home page
    res.redirect("/home");
  }
});



module.exports = users;
