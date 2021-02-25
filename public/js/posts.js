$(() => {

    $(".post-card .card-content").on("click", (event) => {
        window.location = $(event.currentTarget).find(".post-link").attr("href")
    });

    $(".materialboxed").materialbox();

})