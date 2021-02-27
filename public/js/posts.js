$(() => {
    $(".post-card .card-content").on("click", (event) => {
        window.location = $(event.currentTarget)
            .find(".post-link")
            .attr("href");
    });

    $(".materialboxed").materialbox();

    // Initialize select
    

    let query = JSON.parse(thisQuery);
    const catMatch = { tags: "Tag", author: "User", location: "Place" };
    console.log(query)

    if (query) {
        $("#q").val(query.q);
        $(`#cat option[value=${query.cat}]`).prop("selected", true);
    }
    $("select").formSelect();
});
