/*==================================
* Strech Image 
==================================*/
function zc_stretch() {
    var windowWidth = window.innerWidth;

    // Apply stretch logic only if the window width is greater than 1921px
    if (windowWidth < 1921) {
        document.querySelectorAll(".row .zc_stretch-element-inside-column").forEach(function (element) {
            console.log('hello');
            var row = element.closest(".row");
            var cols = element.closest('[class^="col-"]');
            var colsHeight = cols.offsetHeight;

            var rect = element.getBoundingClientRect();
            var rowRect = row.getBoundingClientRect();
            var colsRect = cols.getBoundingClientRect();

            var elementLeft = rect.left;
            var elementRight = rect.right;
            var rowLeft = rowRect.left + (parseFloat(getComputedStyle(row).paddingLeft) || 0);
            var rowRight = windowWidth - rowRect.right + (parseFloat(getComputedStyle(row).paddingRight) || 0);

            var colsLeft = colsRect.left;
            var colsRight = windowWidth - colsRect.right;

            var styles = {
                "marginLeft": "0px",
                "marginRight": "0px"
            };

            if (Math.round(rowLeft) === Math.round(colsLeft)) {
                var marginLeft = parseFloat(getComputedStyle(element).marginLeft) || 0;
                styles.marginLeft = (marginLeft - elementLeft) + "px";
            }

            if (Math.round(rowRight) === Math.round(colsRight)) {
                var marginRight = parseFloat(getComputedStyle(element).marginRight) || 0;
                styles.marginRight = (marginRight - (windowWidth - elementRight)) + "px";
            }

            Object.assign(element.style, styles);
        });
    } else {
        // Reset styles when width is 1920px or below
        document.querySelectorAll(".row .zc_stretch-element-inside-column").forEach(function (element) {
            element.style.marginLeft = "";
            element.style.marginRight = "-315px";
        });
    }
}
zc_stretch();
window.addEventListener('resize', zc_stretch);

/*==================================
* Sicky Headaer
==================================*/
window.addEventListener("scroll", function () {
    const scrollBar = window.scrollY;
    const headers = document.querySelectorAll(".header-sticky");

    headers.forEach(header => {
        if (scrollBar > 150) {
            header.classList.add("sticky-on");
        } else {
            header.classList.remove("sticky-on");
        }
    });
});

/*==================================
* Banner Carousel
==================================*/
var zcFeedbackSlide = new Swiper(".zc_feedback_slider", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    navigation: {
        nextEl: ".feedback-button-next",
        prevEl: ".feedback-button-prev",
    },
    autoplay: {
        delay: 3100,
        disableOnInteraction: false,
    },
    breakpoints: {
        480: {
            slidesPerView: 1,
            spaceBetween: 15
        },
        576: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        768: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        992: {
            slidesPerView: 2,
            spaceBetween: 24
        },
    }
});

/*==================================
* Zn Brand Carousel
==================================*/
var znBrandCarousel = new Swiper('.zn_brand_swipper ', {
    loop: true,
    slidesPerView: 2,
    spaceBetween: 15,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    breakpoints: {
        480: {
            slidesPerView: 2,
            spaceBetween: 15
        },
        576: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 20
        },
        992: {
            slidesPerView: 4,
            spaceBetween: 20
        },
        1300: {
            slidesPerView: 5,
            spaceBetween: 30
        }
    }
});
/*==================================
* Banner Carousel
==================================*/
var hrBanner03Slide = new Swiper('.hero_bnner03_Slide', {
    loop: true,
    effect: 'fade',
    autoplay: {
        delay: 3500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".zc3_hero_pagin",
        clickable: true,
    },
});

/*==================================
* Brand Carousel
==================================*/
var zc3BrandSlide = new Swiper('.zc3_brand_slider', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 15,
    autoplay: {
        delay: 3100,
        disableOnInteraction: false,
    },
    breakpoints: {
        480: {
            slidesPerView: 2,
            spaceBetween: 15
        },
        576: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 20
        },
        992: {
            slidesPerView: 4,
            spaceBetween: 20
        },
        1280: {
            slidesPerView: 5,
            spaceBetween: 30
        }
    }
});

/*==================================
* Hover Toggle Class
==================================*/
document.querySelectorAll('.collection_single').forEach(function (element) {
    element.addEventListener('mouseenter', function () {
        element.classList.add('active');
        element.parentNode.querySelectorAll('.collection_single').forEach(function (sibling) {
            if (sibling !== element) {
                sibling.classList.remove('active');
            }
        });
    });

    element.addEventListener('mouseleave', function () {
        element.classList.remove('active');
        document.querySelector('.active_item').classList.add('active');
    });
});

/*==================================
* Product Cart Slider
==================================*/
const sliderThumbs = new Swiper('.slider_thumbs .swiper-container', {
    direction: 'vertical',
    slidesPerView: 4,
    spaceBetween: 16,
    freeMode: true,
    breakpoints: {
        0: {
            direction: 'horizontal',
            spaceBetween: 16,
            slidesPerView: 3,
        },
        460: {
            spaceBetween: 16,
            slidesPerView: 4,
        },
        768: {
            direction: 'vertical',
        }
    }
});

const sliderImages = new Swiper('.slider_images .swiper-container', {
    direction: 'vertical',
    slidesPerView: 1,
    spaceBetween: 32,
    mousewheel: true,
    grabCursor: true,
    thumbs: {
        swiper: sliderThumbs
    },
    breakpoints: {
        0: {
            direction: 'horizontal',
        },
        768: {
            direction: 'vertical',
        }
    }
});

/*==================================
* Author Img Carousel
==================================*/
var zc3_author_carousel = new Swiper('.zc3_author_carousel', {
    loop: true,
    slidesPerView: 3,
    slidesPerGroup: 1, // Move one slide at a time
    spaceBetween: 15,
    loopFillGroupWithBlank: true,
    loopedSlides: 3,
    breakpoints: {
        480: {
            slidesPerView: 2,
            spaceBetween: 15
        },
        576: {
            slidesPerView: 3,
            spaceBetween: 30
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        992: {
            slidesPerView: 3,
            spaceBetween: 20
        },
        1280: {
            slidesPerView: 3,
            spaceBetween: 30
        }
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

/*==================================
* Author Content Carousel
==================================*/
var zc3_authorCnt_carousel = new Swiper('.zc3_authorCnt_carousel', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
        nextEl: '.zc3_author_next',
        prevEl: '.zc3_author_prev',
    },
});

// Synchronize both sliders
zc3_author_carousel.controller.control = zc3_authorCnt_carousel;
zc3_authorCnt_carousel.controller.control = zc3_author_carousel;

/*==================================
* zc3 Cagegory Tab
==================================*/
window.addEventListener("load", function () {
    var myTabs = document.querySelectorAll("ul.zc3_category_nav > li");

    function myTabClicks(tabClickEvent) {
        for (var i = 0; i < myTabs.length; i++) {
            myTabs[i].classList.remove("active");
        }
        var clickedTab = tabClickEvent.currentTarget;
        clickedTab.classList.add("active");
        tabClickEvent.preventDefault();
        var myContentPanes = document.querySelectorAll(".tab-pane");
        for (i = 0; i < myContentPanes.length; i++) {
            myContentPanes[i].classList.remove("active");
        }
        var anchorReference = clickedTab.querySelector("a");
        var activePaneId = anchorReference.getAttribute("href");
        var activePane = document.querySelector(activePaneId);
        activePane.classList.add("active");
    }
    for (var i = 0; i < myTabs.length; i++) {
        myTabs[i].addEventListener("click", myTabClicks);
    }
});

/*==================================
* zc3 Product Carousel
==================================*/
var zc3pdCarousel = new Swiper(".zc3_product_carousel", {
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
        el: ".zc3_product_pagi",
        type: "progressbar",
    },
    breakpoints: {
        480: {
            slidesPerView: 2,
            spaceBetween: 15
        },
        576: {
            slidesPerView: 1.6,
            spaceBetween: 24
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 30
        },
        992: {
            slidesPerView: 3,
            spaceBetween: 30
        },
        1280: {
            slidesPerView: 3,
            spaceBetween: 30
        }
    }
});

/*==================================
* Preloader
==================================*/
window.addEventListener('load', function () {
    var preload = document.querySelector('.zc_preloader');
    if (preload) {
        setTimeout(function () {
            preload.style.transition = 'opacity 0.5s ease';
            preload.style.opacity = '0';
            setTimeout(function () {
                preload.style.display = 'none';
            }, 500);
        }, 500); 
    }
});

/*==================================
* Scroll to top Button
==================================*/
document.addEventListener("DOMContentLoaded", function () {
    const scrollTopBtn = document.querySelector(".scroll-top-btn");

    if (scrollTopBtn) {
        window.addEventListener("scroll", function () {
            const scrollBar = window.scrollY;

            if (scrollBar > 150) {
                scrollTopBtn.style.display = "block"; // Equivalent to fadeIn()
            } else {
                scrollTopBtn.style.display = "none"; // Equivalent to fadeOut()
            }
        });

        // Scroll to top on button click
        scrollTopBtn.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth" // Smooth scrolling effect
            });
        });
    }
});


/*==================================
* Mobile Menu
==================================*/
document.addEventListener("DOMContentLoaded", function () {
    const menuToggler = document.querySelector(".zc3_header-toggle, .zn_header-toggle");
    const closeButton = document.querySelector(".zc_mobile-menu .close");
    const mobileMenu = document.querySelector(".zc_mobile-menu");

    if (menuToggler) {
        menuToggler.addEventListener("click", function () {
            mobileMenu.classList.add("active");
        });
    }

    if (closeButton) {
        closeButton.addEventListener("click", function () {
            mobileMenu.classList.remove("active");
        });
    }

    document.querySelectorAll(".zc_mobile-menu ul li.has-submenu i").forEach(function (icon) {
        icon.addEventListener("click", function () {
            const submenu = this.nextElementSibling;
            if (submenu) {
                submenu.style.display = submenu.style.display === "none" ? "block" : "none";
            }
            this.classList.toggle("icon-rotate");
        });
    });

    document.addEventListener("mouseup", function (e) {
        if (mobileMenu && !mobileMenu.contains(e.target) && e.target !== mobileMenu) {
            mobileMenu.classList.remove("active");
        }
    });
});

/*==================================
* Coupon announcement
==================================*/
document.addEventListener("DOMContentLoaded", function () {
    const closeButton = document.querySelector(".zc_announce_close");
    if (closeButton) {
        closeButton.addEventListener("click", function () {
            document.querySelector(".zc_coupon_announce").classList.add("off");
        });
    }
});

/*==================================
* Best Selling Product Tab
==================================*/
function openFeatured(evt, featurName) {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(featurName).style.display = "block";
    evt.currentTarget.className += " active";
}

/*==================================
* Product Quentity
==================================*/
if (document.querySelectorAll(".quantity").length > 0) {
    document.querySelectorAll(".ptPlus").forEach(function (button) {
        button.addEventListener('click', function () {
            var input = this.previousElementSibling;
            var vals = parseInt(input.value, 10);
            vals += 1;
            input.value = vals;
            var event = new Event('change');
            input.dispatchEvent(event);
            return false;
        });
    });

    document.querySelectorAll(".ptMinus").forEach(function (button) {
        button.addEventListener('click', function () {
            var input = this.nextElementSibling;
            var vals = parseInt(input.value, 10);
            if (vals > 1) {
                vals -= 1;
            }
            input.value = vals;
            var event = new Event('change');
            input.dispatchEvent(event);
            return false;
        });
    });
}

/*==================================
* Hero Swipper
==================================*/
var swiper = new Swiper('.zn_hero_slider', {
    loop: true,
    autoplay: {
        delay: 3400,
        disableOnInteraction: false,
    },
    effect: 'fade',
    slidesPerView: 1,
    spaceBetween: 30,
});

/*==================================
* ZN Testimonial Carousel
==================================*/
var znFeaturedPd = new Swiper('.zn_featured_pd_carousel', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    autoplay: {
        delay: 2400,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: '.zn_featuredPd_next',
        prevEl: '.zn_featuredPd_prev',
    },
    breakpoints: {

        400: {
            spaceBetween: 15,
            slidesPerView: 1.3
        },
        480: {
            spaceBetween: 15,
            slidesPerView: 1.3
        },
        576: {
            spaceBetween: 15,
            slidesPerView: 1.7
        },
        768: {
            spaceBetween: 20,
            slidesPerView: 1.4
        },
        992: {
            spaceBetween: 20,
            slidesPerView: 2
        },
        1300: {
            spaceBetween: 30,
            slidesPerView: 3
        }
    }
});

/*==================================
* Testimonial Carousel
==================================*/
var zntestimSwiper = new Swiper('.zn_testimonial-swipper', {
    loop: true,
    // autoplay: {
    //     delay: 3000,
    //     disableOnInteraction: false,
    // },
    slidesPerView: 1,
    spaceBetween: 30,
    breakpoints: {
        480: {
            spaceBetween: 15,
            slidesPerView: 1
        },
        576: {
            spaceBetween: 15,
            slidesPerView: 1
        },
        768: {
            spaceBetween: 20,
            slidesPerView: 2
        },
        992: {
            spaceBetween: 20,
            slidesPerView: 2
        },
        1300: {
            spaceBetween: 30,
            slidesPerView: 3
        }
    }
});


/*==================================
* Data Background Set
==================================*/
document.querySelectorAll('[data-background]').forEach(function (element) {
    const backgroundUrl = element.getAttribute('data-background');
    element.style.backgroundImage = `url(${backgroundUrl})`;
});


/*==================================
* checkout toggle
==================================*/
document.querySelectorAll(".checkout-toggle-form").forEach(function (form) {
    const toggleBtn = form.querySelector(".form-toggle-btn");
    const toggleForm = form.querySelector(".toggle-form");

    if (toggleBtn && toggleForm) {
        toggleBtn.addEventListener("click", function (event) {
            event.preventDefault();
            toggleForm.classList.toggle("active");
        });
    }
});

/*==================================
* Feature Product
==================================*/
var swiper = new Swiper(".zc_featuredProduct_slides", {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    navigation: {
        nextEl: ".zcFeature-button-next",
        prevEl: ".zcFeature-button-prev",
    },
    breakpoints: {
        480: {
            slidesPerView: 2,
        },
        576: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 3,
        },
        992: {
            slidesPerView: 3,
        },
        1280: {
            slidesPerView: 4,
        }
    }
});


/*==================================
* Acordion Button 
==================================*/
document.querySelectorAll('.accordion button').forEach(button => {
    button.addEventListener('click', function () {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';

        document.querySelectorAll('.accordion button').forEach(btn =>
            btn.setAttribute('aria-expanded', 'false')
        );

        if (!isExpanded) {
            this.setAttribute('aria-expanded', 'true');
        }
    });
});


/*==================================
* Product single slider
==================================*/
var swiper = new Swiper(".product-nav-slider", {
    loop: true,
    slidesPerView: 5,
    freeMode: true,
    spaceBetween: 24,
    direction: "vertical",
    breakpoints: {
        0: {
            slidesPerView: 2,
            direction: "horizontal"
        },
        420: {
            slidesPerView: 3,
            direction: "horizontal"
        },
        767: {
            slidesPerView: 3,
            direction: "horizontal"
        },
        768: {
            slidesPerView: 5,
            direction: "vertical"
        },
        1024: {
            slidesPerView: 5,
            direction: "vertical"
        },
    },
});
var swiper2 = new Swiper(".product-main-slider-wrapper", {
    loop: true,
    thumbs: {
        swiper: swiper,
    },
});

/*==================================
* Product single slider 02
==================================*/
var swiper = new Swiper(".rtl-slider-nav", {
    loop: true,
    slidesPerView: 2,
    freeMode: true,
    spaceBetween: 24,
    direction: "vertical",
    breakpoints: {
        0: {
            slidesPerView: 2,
            direction: "horizontal"
        },
        420: {
            slidesPerView: 3,
            direction: "horizontal"
        },
        767: {
            slidesPerView: 3,
            direction: "horizontal"
        },
        768: {
            slidesPerView: 3,
            direction: "horizontal"
        },
        1024: {
            slidesPerView: 3,
            direction: "horizontal"
        },
        1199: {
            slidesPerView: 3,
            direction: "horizontal"
        },
        1200: {
            slidesPerView: 2,
            direction: "vertical",
        },
    },
});
var swiper2 = new Swiper(".rtl-slider", {
    loop: true,
    thumbs: {
        swiper: swiper,
    },
});

/*==================================
* Product single slider 03
==================================*/
var swiper = new Swiper(".product-nav-slider3", {
    loop: true,
    slidesPerView: 3,
    freeMode: true,
    spaceBetween: 24,
    direction: "vertical",
    breakpoints: {
        0: {
            slidesPerView: 2,
            direction: "horizontal"
        },
        420: {
            slidesPerView: 3,
            direction: "horizontal"
        },
        767: {
            slidesPerView: 3,
            direction: "horizontal"
        },
        991: {
            slidesPerView: 3,
            direction: "horizontal"
        },
        992: {
            slidesPerView: 3,
            direction: "vertical",
        },
    },
});
var swiper2 = new Swiper(".product-main-slider-wrapper3", {
    loop: true,
    thumbs: {
        swiper: swiper,
    },
});

/*==================================
* Feedback Slider
==================================*/
var znInnerFeedback = new Swiper(".zn_innerFeedback-slider", {
    loop: true,
    slidesPerView: 1,
    navigation: {
        nextEl: ".feedback-button-next",
        prevEl: ".feedback-button-prev",
    },
});


/*==================================
* NiceSelect 
==================================*/
document.addEventListener("DOMContentLoaded", function () {
    if (typeof NiceSelect === "undefined") {
        console.error("NiceSelect is not loaded!");
        return;
    }
    var els = document.querySelectorAll(".nice_select");
    els.forEach(function (select) {
        NiceSelect.bind(select);
    });
});

/*==================================
* Range Slider
==================================*/
window.onload = function () {
    slideOne();
    slideTwo();
};

let sliderOne = document.getElementById("slider-1");
let sliderTwo = document.getElementById("slider-2");
let displayValOne = document.getElementById("range1");
let displayValTwo = document.getElementById("range2");
let minGap = 0;
let sliderTrack = document.querySelector(".slider-track");
let sliderMaxValue = document.getElementById("slider-1").max;

function slideOne() {
    if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
        sliderOne.value = parseInt(sliderTwo.value) - minGap;
    }
    displayValOne.textContent = sliderOne.value;
    fillColor();
}

function slideTwo() {
    if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
        sliderTwo.value = parseInt(sliderOne.value) + minGap;
    }
    displayValTwo.textContent = sliderTwo.value;
    fillColor();
}

function fillColor() {
    percent1 = (sliderOne.value / sliderMaxValue) * 100;
    percent2 = (sliderTwo.value / sliderMaxValue) * 100;
    sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #D0552F ${percent1}% , #D0552F ${percent2}%, #DEDEDE ${percent2}%)`;
}

/*==================================
* Split text animation
==================================*/
document.addEventListener('DOMContentLoaded', function () {
    const splitTextElements = document.querySelectorAll('.split-text');

    if (splitTextElements.length === 0) return;

    gsap.registerPlugin(SplitText);

    splitTextElements.forEach((el) => {
        // Initialize SplitText on each element
        el.split = new SplitText(el, {
            type: "lines,words,chars",
            linesClass: "tp-split-line"
        });

        // Set perspective for 3D effect
        gsap.set(el, {
            perspective: 400
        });

        // Apply initial transform based on class
        if (el.classList.contains('right')) {
            gsap.set(el.split.chars, {
                opacity: 0,
                x: "50",
                ease: "back.out"
            });
        } else if (el.classList.contains('left')) {
            gsap.set(el.split.chars, {
                opacity: 0,
                x: "-50",
                ease: "circ.out"
            });
        } else if (el.classList.contains('up')) {
            gsap.set(el.split.chars, {
                opacity: 0,
                y: "80",
                ease: "circ.out"
            });
        } else if (el.classList.contains('down')) {
            gsap.set(el.split.chars, {
                opacity: 0,
                y: "-80",
                ease: "circ.out"
            });
        }

        // Define the animation with ScrollTrigger
        el.anim = gsap.to(el.split.chars, {
            scrollTrigger: {
                trigger: el,
                start: "top 90%"
            },
            x: "0",
            y: "0",
            rotateX: "0",
            scale: 1,
            opacity: 1,
            duration: 0.4,
            stagger: 0.02
        });
    });
});

// Image reveal js
document.addEventListener('DOMContentLoaded', function () {
    const revealContainers = document.querySelectorAll('.reveal');

    revealContainers.forEach((container) => {
        const image = container.querySelector('img');

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                toggleActions: 'play none none none'
            }
        });

        tl.set(container, {
            autoAlpha: 1
        });

        if (container.classList.contains('zoom-out')) {
            tl.from(image, {
                scale: 1.4,
                duration: 1.5,
                ease: 'power2.out'
            });
        } else if (container.classList.contains('left') || container.classList.contains('right')) {
            const xPercent = container.classList.contains('left') ? -100 : 100;

            tl.from(container, {
                xPercent: xPercent,
                duration: 1.5,
                ease: 'power2.out'
            });
            tl.from(image, {
                xPercent: -xPercent,
                scale: 1,
                duration: 1.5,
                delay: -1.5,
                ease: 'power2.out'
            });
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const offerTimers = document.querySelectorAll(".zn_offer_timer");

    offerTimers.forEach((offerTimer) => {
        const offerDate = new Date(offerTimer.getAttribute("data-offer-date")).getTime();

        function updateCountdown() {
            const now = new Date().getTime();
            const timeLeft = offerDate - now;

            if (timeLeft > 0) {
                const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

                offerTimer.innerHTML = `<ul>
                    <li>${days}<span>Days</span></li>
                    <li class="zn_timerSeparator"><span>:</span></li>
                    <li>${String(hours).padStart(2, '0')}<span>Hrs</span></li>
                    <li class="zn_timerSeparator"><span>:</span></li>
                    <li>${String(minutes).padStart(2, '0')}<span>Mins</span></li>
                    <li class="zn_timerSeparator"><span>:</span></li>
                    <li>${String(seconds).padStart(2, '0')}<span>Secs</span></li>
                </ul>`;
            } else {
                offerTimer.innerHTML = "Offer Expired!";
                clearInterval(intervalId);
            }
        }

        const intervalId = setInterval(updateCountdown, 1000);
        updateCountdown();
    });
});