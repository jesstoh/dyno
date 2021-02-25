$(() => {
    // Show comment box when click on comment icon
    $("#comment").on("click", () => {
        $(".comment-box").show();
    });

    // Hide comment box when click on cancel button
    $("#cancel-button").on("click", (event) => {
        // Prevent refreshing and submit when clicking on cancel button
        event.preventDefault();
        $("textarea").val(""); //empty text in comment box
        $(".comment-box").hide();

    });
});
