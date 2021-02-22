// Middleware to check if user is logged in to access the pages
const isAuthenticated = (req, res, next) => {
    if (!req.session.currentUser) {
        res.redirect("/");
    } else {
        return next();
    }
};


module.exports = { isAuthenticated };
