$(() => {

    $(".post-card").on("click", (event) => {
        window.location = $(event.currentTarget).find(".post-link").attr("href")
    });


})