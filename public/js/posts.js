$(() => {
    $(".post-card .card-content").on("click", (event) => {
        window.location = $(event.currentTarget)
            .find(".post-link")
            .attr("href");
    });

    $(".materialboxed").materialbox();

    let query = JSON.parse(thisQuery);
    console.log(query);
    console.log(query.cat);

    if (query) {
        $("#q").val(query.q);
        $(`#cat option[value=${query.cat}]`).prop("selected", true);
    }
    // Initialize select
    $("select").formSelect();

    // Change select option color
    $("#cat-container ul li span").addClass("blue-text");


});
