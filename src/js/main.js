const msnry = new Masonry('.stories__items', {
    itemSelector: '.stories-item',
    gutter: 40,
    horizontalOrder: true,
    // columnWidth: 440
});

const accordion = () => {
    // if (window.innerWidth > 767) return;
    document.querySelectorAll('.js-accordion .accordion__header').forEach((el) => {
        el.addEventListener('click', function() {

            const self = el.closest('.accordion__item').classList.contains('is-active');
            const $btn = el.querySelector('.button-arrow');

            // document.querySelectorAll('.accordion__item').forEach((el) => {
            //     // console.log(el)
            //     const $btn = el.querySelector('.button-arrow');
            //     el.classList.remove('is-active');
            //     $btn.classList.toggle('button-arrow--down')
            //     $btn.classList.toggle('button-arrow--up')
            //     $btn.classList.toggle('button-arrow--filled')
            // })
            
            // if (self) return;

            $btn.classList.toggle('button-arrow--down')
            $btn.classList.toggle('button-arrow--up')
            $btn.classList.toggle('button-arrow--filled')

            el.closest('.accordion__item').classList.toggle('is-active');
        })
    })
}

document.addEventListener("DOMContentLoaded", () => {

    accordion();

    IMask(document.querySelector('.js-mask-phone'), {
          mask: '+{7} (000) 000-00-00'
    })
})