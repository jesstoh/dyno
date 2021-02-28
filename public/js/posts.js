$(() => {
    $(".post-card .card-content").on("click", (event) => {
        window.location = $(event.currentTarget)
            .find(".post-link")
            .attr("href");
    });

    $(".materialboxed").materialbox();

    let query = JSON.parse(thisQuery);
    console.log(query);

    if (query) {
        $("#q").val(query.q);
        $(`#cat option[value=${query.cat}]`).prop("selected", true);
    }
    // Initialize select
    $("select").formSelect();

    // Change select option color
    $(".cat-select ul li span").addClass("blue-text");


    // Event listener when scroll to bottom
    $(window).on("scroll", event => {

        if (($(window).innerHeight() + $(window).scrollTop() + 30) > $("body").innerHeight()) {
            console.log("end of page")
        }
    })



});
