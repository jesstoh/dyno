$(() => {
    // Data from post
    tagArray = JSON.parse(tagArray);
    
    // Function to convert tag array to chip data
    const tagToChip = (arr) => {
        const chipArr = [];
        for (const tag of arr) {
            chipArr.push({ tag: tag });
        }
        return chipArr;
    };
    const chipArr = tagToChip(tagArray);

    $('#tags').val(JSON.stringify(chipArr));

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
        data: chipArr,
        onChipAdd: function () {
            $("#tags").val(JSON.stringify(instances.chipsData));
        },
        onChipDelete: function () {
            $("#tags").val(JSON.stringify(instances.chipsData));
        },
    });

});
