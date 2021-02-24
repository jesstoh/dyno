$(() => {
    // Initialization of modal
    $(".modal").modal();

    // Change following button style when hover over 
    $(".following-btn").hover(
        (event) => {
            $(event.currentTarget).val("Unfollow").removeClass("blue").addClass("red");
        },
        (event) => {
            $(event.currentTarget).val("Following").removeClass("red").addClass("blue");;
        }
    );

    
});
