const msnry = new Masonry('.stories__items', {
    itemSelector: '.stories-item',
    gutter: 40,
    horizontalOrder: true,
    // columnWidth: 440
});

IMask(
    document.querySelector('.js-mask-phone'),
    {
      mask: '+{7} (000) 000-00-00'
    }
)