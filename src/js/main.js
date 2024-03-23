if (window.innerWidth > 768) {
    const msnry = new Masonry('.stories__items', {
        itemSelector: '.stories-item',
        columnWidth: '.stories-item--width',
        gutter: '.stories-item--gap',
        horizontalOrder: true,
        // percentPosition: true
    });
}

const accordion = () => {
    // if (window.innerWidth > 767) return;
    document.querySelectorAll('.js-accordion .accordion__header').forEach((el) => {
        el.addEventListener('click', function() {

            const self = el.closest('.accordion__item').classList.contains('is-active');
            const $btn = el.querySelector('.button-arrow');

            document.querySelectorAll('.accordion__item').forEach((el) => {
                // console.log(el)
                const $btn = el.querySelector('.button-arrow');
                el.classList.remove('is-active');
                $btn.classList.toggle('button-arrow--down')
                $btn.classList.toggle('button-arrow--up')
                $btn.classList.toggle('button-arrow--filled')
            })
            
            if (self) return;

            $btn.classList.toggle('button-arrow--down')
            $btn.classList.toggle('button-arrow--up')
            $btn.classList.toggle('button-arrow--filled')

            el.closest('.accordion__item').classList.toggle('is-active');
        })
    })
}


function hidePopup(id) {
    let popup = document.getElementById(id)
        ? document.getElementById(id)
        : this.closest(".popup");

    if (popup.dataset.processing && popup.dataset.processing == true) return;
    popup.dataset.processing = true;

    if (popup.classList.contains("is-shown")) {
        popup.addEventListener(
            "transitionend",
            (e) => {
                popup.style.display = "none";
                popup.dataset.processing = false;
            },
            {
                once: true,
            }
        );
        popup.classList.remove("is-shown");
        document.body.classList.remove("no-scroll");
    }
}

function showPopup(id) {
    let popup = document.getElementById(id);

    if (popup.dataset.processing && popup.dataset.processing == true) return;
    popup.dataset.processing = true;

    if (popup.classList.contains("is-shown") == false) {

        if (popup.dataset.file) {
            var xhr= new XMLHttpRequest();
            xhr.open('GET', popup.dataset.file, true);
            xhr.onreadystatechange= function() {
                if (this.readyState!==4) return;
                if (this.status!==200) return;
                popup.querySelector('.popup-window').innerHTML= this.responseText;
            };
            xhr.send();
        }

        popup.style.display = "flex";
        setTimeout(function () {
            popup.classList.add("is-shown");
            document.body.classList.add("no-scroll");
            popup.dataset.processing = false;
        }, 1);
    }
}


document.addEventListener("DOMContentLoaded", () => {

    accordion();

    IMask(document.querySelector('.js-mask-phone'), {
            mask: '+{7} (000) 000-00-00'
    })

    document.querySelectorAll(".popup").forEach((el) => {
        el.addEventListener("click", function (e) {
            if (e.target == el) {
                hidePopup(e.target.id);
            }
        });
    });
    document.querySelectorAll(".js-popup-hide").forEach((el) => {
        el.addEventListener("click", hidePopup.bind(el));
    });
    document.querySelectorAll(".js-popup-show").forEach((el) => {
        el.addEventListener("click", (e) => {
            e.preventDefault();
            showPopup(el.dataset.target, el.dataset);
        });
    });
})