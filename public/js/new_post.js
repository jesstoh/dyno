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
            },
        },
        onChipAdd: function () {
            $("#tags").val(JSON.stringify(instances.chipsData));
        },
        onChipDelete: function () {
            $("#tags").val(JSON.stringify(instances.chipsData));
        },
    });

});
