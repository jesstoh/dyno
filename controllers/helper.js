// Middleware to check if user is logged in to access the pages
const isAuthenticated = (req, res, next) => {
    if (!req.session.currentUser) {
        res.redirect("/");
    } else {
        return next();
    }
};

const formatDate = rawDate => {

    let delta = Date.now() - rawDate.getTime();
    return Math.floor(delta / (1000 * 60 * 60 * 24))
}

module.exports = { isAuthenticated, formatDate };
