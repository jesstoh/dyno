$(() => {
    // Initiate chips
    const elems = document.querySelector(".chips");
    const instances = M.Chips.init(elems, {
        placeholder: "Add a tag, enter",
        secondaryPlaceholder: "+ tag",
        autocompleteOptions: {
            data: {
                betaHelp: null,
                outdoor: null,
                send: null,
                flash: null,
                dyno: null,
                "heel hook": null,
                overhang: null,
                news: null,
                video: null
            },
        },
        onChipAdd: function () {
            $("#tags").val(JSON.stringify(instances.chipsData));
        },
        onChipDelete: function () {
            $("#tags").val(JSON.stringify(instances.chipsData));
        },
    });


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
});
