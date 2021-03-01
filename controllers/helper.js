// Middleware to check if user is logged in to access the pages
const isAuthenticated = (req, res, next) => {
    if (!req.session.currentUser) {
        res.redirect("/");
    } else {
        return next();
    }
};

const formatDate = (rawDate) => {
    let delta = Date.now() - rawDate.getTime();
    return Math.floor(delta / (1000 * 60 * 60 * 24));
};

const postsDisplay = (queryIn, viewPage, queryOut, pageLimit, Post, req, res) => {
    // Number of post to skip
    let skipNum = 0;

    // Infinite scrolling skip numbers
    if (req.query.page) {
        skipNum += (req.query.page - 1) * pageLimit;
    }

    Post.find(queryIn)
        .sort({ _id: -1 })
        .skip(skipNum)
        .limit(pageLimit)
        .exec((err, posts) => {
            posts.forEach((post) => {
                post.created = formatDate(post.createdAt);
            });
            if (skipNum === 0) {
                res.render(viewPage, {
                    currentUser: req.session.currentUser,
                    posts,
                    query: queryOut,
                    // lastPostId: posts[posts.length - 1]._id, (will throw )
                });
            } else {
                // Infinite scrolling data
                res.send({ posts });
            }
        });
};

module.exports = { isAuthenticated, formatDate, postsDisplay };
