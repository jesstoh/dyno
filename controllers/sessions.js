// DEPENDENCIES
const express = require("express");
const sessions = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/users.js");

// ROUTES

// New get - login page
sessions.get("/login", (req, res) => {
    res.render("sessions/new.ejs")
})




module.exports = sessions;