$(() => {
    $(".goback").on("click", () => {
        console.log("test");
        window.history.back();
    })


    $(".fixed-action-btn").floatingActionButton();

    $(".dropdown-trigger").dropdown();
    $(".sidenav").sidenav();
    
    // $(".modal").modal();

    $(".slider").slider();


    // Initialize select
    $("select").formSelect();

    // Change select option color
    $("#cat-container ul li span").addClass("blue-text");
    
})