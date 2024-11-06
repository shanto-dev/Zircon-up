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
* Brand Carousel
==================================*/
var swiper = new Swiper('.zc3_brand_slider', {
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
            slidesPerView: 2,
            spaceBetween: 30
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 18
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
    slidesPerView :'auto',
    loop : false,
    slidesPerViewFit : false,
    roundLengths : 'false',
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




document.addEventListener("DOMContentLoaded", function () {
    // Coupon announcement
    const closeButton = document.querySelector(".zc_announce_close");
    if (closeButton) {
        closeButton.addEventListener("click", function () {
            document.querySelector(".zc_coupon_announce").classList.add("off");
        });
    }
});

// Best Selling Product
function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}


$(document).ready(function () {

    // Product Quentity
    if ($(".quantity").length > 0) {
        $(".ptPlus").on('click', function () {
            var vals = parseInt($(this).prev(".carqty").val(), 10);
            vals += 1;
            $(this).prev(".carqty").val(vals).trigger('change');
            return false;
        });
        $(".ptMinus").on('click', function () {
            var vals = parseInt($(this).next(".carqty").val(), 10);
            if (vals > 1) {
                vals -= 1;
                $(this).next(".carqty").val(vals).trigger('change');
            } else {
                $(this).next(".carqty").val(vals).trigger('change');
            }
            return false;
        });
    }

    //  Feedback Slider
    var swiper = new Swiper(".zc_feedback_slider", {
        slidesPerView: 2,
        spaceBetween: 30,
        loop: true,
        navigation: {
            nextEl: ".feedback-button-next",
            prevEl: ".feedback-button-prev",
        },
    });

    // Product Cart Slider
    const sliderThumbs = new Swiper('.slider_thumbs .swiper-container', {
        direction: 'vertical',
        slidesPerView: 4,
        spaceBetween: 16,
        freeMode: true,
        breakpoints: {
            0: {
                direction: 'horizontal',
            },
            768: {
                direction: 'vertical',
            }
        }
    });

    //10. Header Search Open
    $(".header-search-open").on("click", function () {
        $(".ur-search-form").addClass("active");
    });

    $(".ur-search-form .close").on("click", function () {
        $(".ur-search-form").removeClass("active");
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


    // Hover Toggle Class
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

});