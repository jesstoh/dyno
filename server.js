//DEPENDENCIES
const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const db = mongoose.connection;
const methodOverride = require("method-override");
const bcrypt = require("bcrypt");
const session = require("express-session");
const path = require("path");
const isAuthenticated = require("./controllers/helper.js").isAuthenticated;

const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/dyno";

// MIDDLEWARE
// body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// static files
app.use(express.static(path.join(__dirname, "public")));
// session
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
    })
);
// method-override
app.use(methodOverride("_method"));

// CONTROLLERS
// user
const userController = require("./controllers/users.js");
app.use(userController);
// session
const sessionController = require("./controllers/sessions.js");
app.use(sessionController);
// app
const appController = require("./controllers/app.js");
app.use(appController);
// posts
const postController = require("./controllers/posts.js");
app.use(postController);

//MONGOOSE CONNECTION
mongoose.connect(mongoURI, { useNewUrlParser: true });
db.on("error", (err) => console.log(err.message, "is Mongod not running?"));
db.on("connected", () => console.log("mongo connected"));
db.on("disconnected", () => console.log("mongo disconnected"));
db.once("open", () => console.log("connected to mongo"));

// ROUTES

// MIDDLEWARE
// Redirect if routes do not exist
app.use("*", (req, res) => {
    res.redirect("/");
})

//SERVER CONNECTION
app.listen(port, () => {
    console.log("Listening at port", port);
});
