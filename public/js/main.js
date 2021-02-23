$(() => {
    $(".goback").on("click", () => {
        console.log("test");
        window.history.back();
    })


    $('.fixed-action-btn').floatingActionButton();
    

    
})