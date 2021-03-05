$(() => {
    // INFINITE SCROLLING

    let page = 1; // Declare current page
    const $postContainer = $(".post-container>.row");

    // Define url prefix for search, home, following route
    let urlPrefix;
    if (window.location.href.includes("search")) {
        // search route prefix
        urlPrefix = window.location + "&page=";
    } else {
        // home & following route prefixes
        urlPrefix = window.location + "?page=";
    }

    // Event listener when scroll to bottom
    $(window).on("scroll", (event) => {
        // When end of window scroll
        if (
            $(window).innerHeight() + $(window).scrollTop() + 30 >
            $("body").innerHeight()
        ) {
            page++; //Increase page number each time scroll to bottom of page

            // Fetching next data
            $.ajax({
                url: urlPrefix + page,
            }).then((data) => {
                console.log(data.posts);
                // Only render to front end if there is data fetched from database
                if (data.posts) {
                    data.posts.forEach((post) => {
                        const $newPost = $("<div>").addClass("col s12 m6 xl4");
                        const $newCard = $("<div>").addClass(
                            "card hoverable medium post-card"
                        );
                        const $cardImage = $("<div>").addClass("card-image");
                        const $cardContent = $("<div>").addClass(
                            "card-content"
                        );
                        if (post.img) {
                            $cardImage.css("--img", `url(${post.img})`);
                            $cardImage.html(
                                `<img src=${post.img} class="materialboxed">`
                            );
                        } else {
                            $cardImage.css(
                                "--img",
                                `url(${
                                    post.video.slice(post.video.length - 3) +
                                    "jpg"
                                })`
                            );
                            $cardImage.html(`
                            <div class="video-container materialboxed">                                    
                                <video src=${post.video} width="100%" controls></video>
                           </div>`);
                        }

                        $newCard.append($cardImage);

                        $cardContent.html(`<a href="/posts/${post._id}" class="post-link"></a>

                        <span>${post.likes.length} Likes</span>
                        <span class="right">by <a href="/users/${post.author}">${post.author}</a></span><br>`);

                        const $dateSpan = $("<span>").addClass(
                            "grey-text date-text"
                        );
                        if (post.created > 1) {
                            $dateSpan.text(`${post.created} Days Ago`);
                        } else if (post.created === 1) {
                            $dateSpan.text("1 Day Ago");
                        } else {
                            $dateSpan.text("today");
                        }

                        $cardContent.append($dateSpan);

                        if (post.location) {
                            const $locationSpan = $(
                                `<span class="right"><i class="material-icons location-icon">location_on</i>${post.location}</span><br>`
                            );
                            $cardContent.append($locationSpan);
                        }

                        $cardContent.append(
                            `<p class="truncate">${post.description}</p>`
                        );

                        if (post.tags.length > 0) {
                            const tagString = "#" + post.tags.join(", #");
                            $cardContent.append(
                                `<span>${tagString}</span><br>`
                            );
                        }

                        $newCard.append($cardContent);

                        $newPost.append($newCard);
                        $postContainer.append($newPost);

                        $cardContent.on("click", (event) => {
                            window.location = $(event.currentTarget)
                                .find(".post-link")
                                .attr("href");
                        });
                    });
                    $(".materialboxed").materialbox();
                }
            });
        }
    });
});
