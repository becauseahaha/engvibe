if (window.innerWidth >= 768) {
    const msnry = new Masonry(".stories__items", {
        itemSelector: ".stories-item",
        columnWidth: ".stories-item--width",
        gutter: ".stories-item--gap",
        horizontalOrder: true,
        percentPosition: true,
    });
}

const forms = () => {
    const $forms = document.querySelectorAll(".js-mail-form");

    $forms.forEach(($form) => {
        const $submit = $form.querySelector(".js-submit");

        $submit.addEventListener("click", (e) => {
            e.preventDefault();

            $form.dataset.errors = 0;

            const $phone = $form.querySelector('input[name="phone"]');
            const $name = $form.querySelector('input[name="name"]');
            const $email = $form.querySelector('input[name="email"]');

            if ($phone) {
                if ($phone.value.length == 0) {
                    $phone.classList.add("is-error");
                    $form.dataset.errors++;
                } else {
                    $phone.classList.remove("is-error");
                }
            }
            if ($name) {
                if ($name.value.length == 0) {
                    $name.classList.add("is-error");
                    $form.dataset.errors++;
                } else {
                    $name.classList.remove("is-error");
                }
            }
            if ($email) {
                if ($email.value.length == 0) {
                    $email.classList.add("is-error");
                    $form.dataset.errors++;
                } else {
                    $email.classList.remove("is-error");
                }
            }

            if ($form.dataset.errors > 0) {
                $form.querySelector(".js-warning").style.display = "block";
                return;
            } else {
                $form.querySelector(".js-warning").style.display = "none";
            }

            const formData = new FormData($form);

            fetch("/mailer.php", {
                method: "POST",
                body: formData,
            })
                .then(function (serverPromise) {
                    return serverPromise.json();
                })
                .then(function (data) {
                    if (data.error) {
                        alert(data.error);
                        return false;
                    }
                    alert("Сообщение отправлено");
                });
        });
    });
};

function resetSurvey() {
    // const $box = document.getElementById('survey');
    // if (!$box) return;
    // $box.dataset.step = 1;
    // $box.querySelectorAll('input').forEach(element => {
    //     element.checked = false
    // });
}

const survey = () => {
    let step = 1;
    let steps_total;
    let i = 1;
    let is_last = false;

    const $box = document.getElementById("survey");
    if (!$box) return;

    const $steps = $box.querySelector(".js-survey-steps");
    const $progress = $box.querySelector(".js-survey-progress");

    steps_total = $steps.querySelectorAll(".js-survey-step").length;

    const $prev = $box.querySelector(".js-survey-prev");
    const $next = $box.querySelector(".js-survey-next");

    function showResult() {
        hidePopup("popup-test");
        showPopup("popup-survey-result-1");
    }

    function showStep(step) {
        const $form = $box.querySelector(
            '.js-survey-step[data-step="' + step + '"]'
        );
        if (!$form) return;

        is_last = step == steps_total;

        $steps.querySelectorAll(".js-survey-step").forEach((element) => {
            element.classList.remove("is-active");
            element.style.opacity = 0;
        });
        $form.classList.add("is-active");
        setTimeout(() => {
            $form.style.opacity = 1;
        }, 0);

        i = 1;
        $progress
            .querySelectorAll(".survey__progress-step")
            .forEach((element) => {
                if (i <= step) {
                    element.classList.add("is-active");
                } else {
                    element.classList.remove("is-active");
                }
                i++;
            });
    }

    i = 1;
    $steps.querySelectorAll(".js-survey-step").forEach((element) => {
        element.querySelectorAll("input").forEach((radio) => {
            radio.addEventListener("change", function () {
                $next.disabled = false;
            });
        });

        const div = document.createElement("div");
        div.classList.add("survey__progress-step");
        if (i == 1) {
            div.classList.add("is-active");
        }
        $progress.appendChild(div);

        i++;
    });

    $prev.addEventListener("click", function (e) {
        step--;
        showStep(step);
        $next.disabled = false;
        if (step == 1) {
            $prev.style.display = "none";
        }
        $prev.innerHTML = "Шаг " + (step - 1);
        $next.innerHTML = "Шаг " + (step + 1);
    });
    $next.addEventListener("click", function (e) {
        step++;
        if (!is_last) {
            showStep(step);
        } else {
            showResult();
        }
        $prev.style.display = "block";
        $next.disabled = true;
        $prev.innerHTML = "Шаг " + (step - 1);
        if (!is_last) {
            $next.innerHTML = "Шаг " + (step + 1);
        } else {
            $next.innerHTML = "Отправить";
        }
    });
};

const accordion = () => {
    document
        .querySelectorAll(".js-accordion .accordion__header")
        .forEach((el) => {
            el.addEventListener("click", function () {
                const self = el
                    .closest(".accordion__item")
                    .classList.contains("is-active");
                const $btn = el.querySelector(".button-arrow");

                if (self) return;

                document.querySelectorAll(".accordion__item").forEach((el) => {
                    const $btn = el.querySelector(".button-arrow");
                    el.classList.remove("is-active");
                    $btn.classList.add("button-arrow--down");
                    $btn.classList.remove("button-arrow--up");
                    $btn.classList.remove("button-arrow--filled");
                });

                $btn.classList.toggle("button-arrow--down");
                $btn.classList.toggle("button-arrow--up");
                $btn.classList.toggle("button-arrow--filled");

                el.closest(".accordion__item").classList.toggle("is-active");
            });
        });
};

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

const videos = () => {

    document.querySelectorAll('.video').forEach((el) => {
        el.addEventListener('click', function(e) {
            e.preventDefault();
            if (this.classList.contains('is-active') == false) {
                this.classList.add('is-active')
                this.querySelector('video').play();
            }
        })
    })

}

function showPopup(id, dataset) {
    let popup = document.getElementById(id);

    if (id != "popup-nav") hidePopup("popup-nav");
    if (id != "popup-signup-options") hidePopup("popup-signup-options");
    if (id != "popup-survey-result-1") hidePopup("popup-survey-result-1");
    if (id != "popup-lesson") hidePopup("popup-lesson");
    if (id != "popup-teacher") hidePopup("popup-teacher");

    if (id == "popup-test") {
        resetSurvey();
    }

    if (popup.dataset.processing && popup.dataset.processing == true) return;
    popup.dataset.processing = true;

    if (popup.classList.contains("is-shown") == false) {
        if (dataset.file) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", dataset.file, true);
            xhr.onreadystatechange = function () {
                if (this.readyState !== 4) return;
                if (this.status !== 200) return;
                popup.querySelector(".popup-window").innerHTML =
                    this.responseText;
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
    survey();
    forms();
    videos();

    IMask(document.querySelector(".js-mask-phone"), {
        mask: "+{7} (000) 000-00-00",
    });

    document.querySelectorAll(".popup").forEach((el) => {
        el.addEventListener("click", function (e) {
            if (e.target == el) {
                hidePopup(e.target.id);
            }
        });
    });
    document.body.addEventListener("click", function (e) {
        const $close = e.target.closest(".js-popup-hide");
        if ($close) {
            e.preventDefault();
            hidePopup.call($close);
        }

        const $show = e.target.closest(".js-popup-show");
        if ($show) {
            e.preventDefault();
            showPopup($show.dataset.target, $show.dataset);
        }
    });

    if (window.innerWidth >= 1280) {
        const swiperClients = new Swiper(".swiper-teachers", {
            slidesPerView: 4,
            spaceBetween: 40,
            // loop: true,
            navigation: {
                nextEl: ".swiper-teachers-next",
                prevEl: ".swiper-teachers-prev",
            },
        });
    }


    const $swiperSpeakPages = document.querySelector('.js-swiper-speak-pagination');
    let progress = 0;
    let realIndex;
    let slidesqty = document.querySelector('.js-swiper-speak').querySelectorAll('.swiper-slide').length;
    for (let index = 0; index < slidesqty; index++) {
        const div = document.createElement("div");
        div.classList.add("speak__card__slider-page");
        div.classList.add("js-swiper-speak-page");
        $swiperSpeakPages.appendChild(div);
    }
    const swiperClients = new Swiper(".js-swiper-speak", {
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        on: {
            autoplayTimeLeft(s, time, progress) {
                progress = Math.round((1 - progress)*100);
                $swiperSpeakPages.style.setProperty("--progress", progress  + '%');
            },
            init: function(s) {
            },
            slideChange: function(s) {
                if (s.realIndex != realIndex) {

                    $swiperSpeakPages.querySelectorAll('.js-swiper-speak-page').forEach((el) => {
                        el.classList.remove('is-active')
                    });
                    $swiperSpeakPages.querySelectorAll('.js-swiper-speak-page')[s.realIndex].classList.add('is-active');

                    realIndex = s.realIndex;
                }
            }
        },
        slidesPerView: "auto",
        spaceBetween: 20,
        loop: true,
    });
});
