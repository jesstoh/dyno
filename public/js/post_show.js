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

    // Show and hide comment box when click on "comment text"
    $(".comment-show").on("click", () => {
        $(".main-comments-container").toggle("display");
    });

    // Instantiate modal
    $(".modal").modal();

    // Instantiate emoji-picker
    tinymce.init({
        selector: "textarea",
        forced_root_block: "",
        plugins: "emoticons autoresize",
        toolbar: "emoticons",
        toolbar_location: "bottom",
        menubar: false,
        statusbar: false,
    });

    let src = $("iframe").attr("src");
    thisPost = JSON.parse(thisPost);
    // Ajax put when current user click to like
    $(".like-icon").on("click", (event) => {
        // console.log(thisPost);
        $.ajax({
            url: `/posts/${thisPost._id}/like`,
            method: "PUT"

        }).then((data) => {
            // console.log(data);
            $(".like-qty").text(data.likes.length); // update number of like
            $(".like-icon").hide(); //Hide not yet liked icon
            $(".unlike-icon").show(); //Show "liked" icon
            // Reload iframe
            $("iframe").attr("src", src);
        })
        


    })
    


});
