$(() => {
    // Show comment box when click on comment icon
    $("#comment").on("click", () => {
        
        $(".comment-box").toggle("display");
    });

    // Hide comment box when click on cancel button
    $("#cancel-button").on("click", (event) => {
        // Prevent refreshing and submit when clicking on cancel button
        event.preventDefault();
        $("textarea").val(""); //empty text in comment box
        $(".comment-box").hide("slow");

    });

    $(".comment-show").on("click", () => {
        $(".main-comments-container").toggle("display");
    })

    $(".modal").modal();
});
