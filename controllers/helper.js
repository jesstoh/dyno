// Middleware to check if user is logged in to access the pages
const isAuthenticated = (req, res, next) => {
    if (!req.session.currentUser) {
        res.redirect("/");
    } else {
        return next();
    }
};

// Formate date to display as human readable
const formatDate = (rawDate) => {
    let delta = Date.now() - rawDate.getTime();
    return Math.floor(delta / (1000 * 60 * 60 * 24));
};

// Function to process data for display posts routes
const postsDisplay = (
    queryIn,
    viewPage,
    queryOut,
    pageLimit,
    Post,
    req,
    res
) => {
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
                    // lastPostId: posts[posts.length - 1]._id, (will throw error if _id doesn't exist)
                });
            } else {
                // Infinite scrolling data
                res.send({ posts });
            }
        });
};

// Convert array of tag data created from chips to array of tag string
const chipToTag = (str) => {
    const chipArr = JSON.parse(str);
    const tags = [];
    for (const tagObj of chipArr) {
        tags.push(tagObj.tag);
    }
    return tags;
};

module.exports = { isAuthenticated, formatDate, postsDisplay, chipToTag };
