$(() => {
    let page = 1; // Declare current page
    const $postContainer = $(".post-container>.row");

    // Event listener when scroll to bottom
    $(window).on("scroll", (event) => {
        // When end of window scroll
        if (
            $(window).innerHeight() + $(window).scrollTop() + 30 >
            $("body").innerHeight()
        ) {
            // console.log("end of page");
            page++;

            // Fetching next data
            $.ajax({
                url: window.location + "/scroll?page=" + page,
                // url: "/home/scroll?page=" + page,
            }).then((data) => {
                console.log(data.posts);

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
                            $cardImage.html(
                                `<img src=${post.img} class="materialboxed">`
                            );
                        } else {
                            $cardImage.html(`<div class="video-container materialboxed">
                                    
                            <iframe src=${post.video} frameborder="0" allowfullscreen></iframe>
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

                        const tagString = "#" + post.tags.join(", #");
                        $cardContent.append(`<p class="truncate">${post.description}</p>
                        <span>${tagString}</span><br>`);

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
