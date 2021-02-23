$(() => {

    $(".fixed-action-btn").floatingActionButton();
    $('.chips').material_chip();
  $('.chips-initial').material_chip({
    data: [{
      tag: 'Apple',
    }, {
      tag: 'Banana',
    }, {
      tag: 'Mango',
    }],
  });
  $('.chips-placeholder').material_chip({
    placeholder: 'Enter tag Name',
     secondaryPlaceholder: '+Tag',
  });

})