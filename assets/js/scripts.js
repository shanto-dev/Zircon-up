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
* Banner Carousel
==================================*/
var hrBanner03Slide = new Swiper('.hero_bnner03_Slide', {
    loop: true,
    effect: 'fade',
    autoplay: {
        delay: 3100,
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
* zc3 Brand Text Slider
==================================*/
var textSide = new Swiper(".zc3_text_slider", {
    spaceBetween: 150,
    slidesPerView: 'auto',
    loop: false,
    slidesPerViewFit: false,
    roundLengths: 'false',
    centeredSlides: true,
    loop: true,
    autoplay: {
        delay: 1,
        disableOnInteraction: false,
    },
    speed: 3500,
});

// Stop and start autoplay on hover
var slides = document.querySelectorAll(".zc3_text_slider .swiper-slide");
slides.forEach(function (slide) {
    slide.addEventListener("mouseenter", function () {
        textSide.autoplay.stop(); // Stop autoplay on hover
    });
    slide.addEventListener("mouseleave", function () {
        textSide.autoplay.start(); // Restart autoplay on mouse leave
    });
});

/*==================================
* Header Search Open
==================================*/
document.addEventListener("DOMContentLoaded", function () {
    const searchOpen = document.querySelector(".zc_headerSrc-open");
    const searchForm = document.querySelector(".zc_search_form");
    const searchClose = document.querySelector(".zc_search_form .close");

    if (searchOpen && searchForm && searchClose) {
        searchOpen.addEventListener("click", function () {
            searchForm.classList.add("active");
        });

        searchClose.addEventListener("click", function () {
            searchForm.classList.remove("active");
        });
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
    const menuToggler = document.querySelector(".zc3_header-toggle");
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