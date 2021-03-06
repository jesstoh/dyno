// DEPENDENCIES
const express = require("express");
const users = express.Router();
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const User = require("../models/users.js");
const Post = require("../models/posts.js");
const bcrypt = require("bcrypt");
const isAuthenticated = require("./helper.js").isAuthenticated;

// CONFIG
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
        { $push: { following: req.params.name } },
        { new: true },
        (err, updatedUser) => {
            req.session.currentUser = updatedUser; //Update user detail in current session
            User.findOneAndUpdate(
                { username: req.params.name },
                { $push: { followers: currentUser.username } },
                { new: true },
                (err, followingUser) => {
                    // console.log(followingUser)
                    res.redirect("back");
                }
            );
        }
    );
});

// Update put - unfollow other user
users.put("/users/:name/unfollow", (req, res) => {
    const currentUser = req.session.currentUser;
    const user = req.params.name;
    User.findOneAndUpdate(
        { username: currentUser.username },
        { $pull: { following: req.params.name } },
        { new: true },
        (err, updatedUser) => {
            req.session.currentUser = updatedUser; //Update user detail in current session
            User.findOneAndUpdate(
                { username: req.params.name },
                { $pull: { followers: currentUser.username } },
                { new: true },
                (err, followingUser) => {
                    // console.log(followingUser)
                    res.redirect("back");
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
            // console.log(req.session.currentUser.following.includes(foundUser.username));
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

// Index get - show follower list
users.get("/users/:name/followers", isAuthenticated, (req, res) => {
    User.findOne({ username: req.params.name }, (err, foundUser) => {
        res.render("users/index.ejs", {
            currentUser: req.session.currentUser,
            users: foundUser.followers,
        });
    });
});

// Index get - show following list
users.get("/users/:name/following", isAuthenticated, (req, res) => {
    User.findOne({ username: req.params.name }, (err, foundUser) => {
        res.render("users/index.ejs", {
            currentUser: req.session.currentUser,
            users: foundUser.following,
        });
    });
});

// Edit get - user profile edit page route
users.get("/accounts/edit", isAuthenticated, (req, res) => {
    // res.send(req.session.currentUser);
    User.findById(req.session.currentUser._id, (err, foundUser) => {
        // res.send(req.session.currentUser);
        console.log(foundUser);
        res.render("users/edit.ejs", { currentUser: req.session.currentUser });
    });
});

// Update - update user profile
// users.put("/users", isAuthenticated, (req, res) => {
//     User.findByIdAndUpdate(
//         req.session.currentUser._id,
//         {
//             $set: {
//                 img: req.body.img,
//                 bio: req.body.bio,
//                 email: req.body.email,
//                 location: req.body.ctr,
//             },
//         },
//         { new: true },
//         (err, updatedUser) => {
//             console.log(updatedUser);
//             req.session.currentUser = updatedUser;
//             res.redirect(`/users/${req.session.currentUser.username}`);
//         }
//     );
// });

// Update - update user profile
users.put("/users", isAuthenticated, upload.single("img"), (req, res) => {
    if (req.file) {
        cloudinary.uploader.upload(
            req.file.path,
            {
                resource_type: "image",
            },
            (err, result) => {
                User.findByIdAndUpdate(
                    req.session.currentUser._id,
                    {
                        $set: {
                            img: result.url,
                            bio: req.body.bio,
                            email: req.body.email,
                            location: req.body.ctr,
                        },
                    },
                    { new: true },
                    (err, updatedUser) => {
                        console.log(updatedUser);
                        req.session.currentUser = updatedUser;
                        res.redirect(
                            `/users/${req.session.currentUser.username}`
                        );
                    }
                );
            }
        );
    } else {

        User.findByIdAndUpdate(
            req.session.currentUser._id,
            {
                $set: {
                    bio: req.body.bio,
                    email: req.body.email,
                    location: req.body.ctr,
                },
            },
            { new: true },
            (err, updatedUser) => {
                console.log(updatedUser);
                req.session.currentUser = updatedUser;
                res.redirect(
                    `/users/${req.session.currentUser.username}`
                );
            }
        );
    }
});

module.exports = users;
