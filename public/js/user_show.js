$(() => {
    // Initialization of modal
    $(".modal").modal({
        onCloseEnd() {
            location.reload();
        }
    });

    // Change following button style when hover over
    $(".following-btn").hover(
        (event) => {
            $(event.currentTarget)
                .val("Unfollow")
                .removeClass("blue")
                .addClass("red");
        },
        (event) => {
            $(event.currentTarget)
                .val("Following")
                .removeClass("red")
                .addClass("blue");
        }
    );


    // Open up post when clicking on image/video
    $(".post-card").on("click", (event) => {
        window.location = $(event.currentTarget).find(".post-link").attr("href")
    });

    // $(".video-container iframe").on("click", (event) => {
    //     event.preventDefault();
    // })
});
