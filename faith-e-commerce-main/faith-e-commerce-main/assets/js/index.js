window.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // =====================
  /// GSAP ANIMATION

  // FADE UP ANIMATION
  const fadeUp = document.querySelectorAll("section, footer");
  fadeUp &&
    fadeUp.forEach((item) => {
      const fadeUpElements = item.querySelectorAll(".fade-up");

      // Ensure fade-up elements exist and are a NodeList
      if (fadeUpElements.length > 0) {
        fadeUpElements.forEach((fadeUpElement, index) => {
          gsap.fromTo(
            fadeUpElement,
            {
              opacity: 0,
              y: 100,
              scale: 0.8, // Add a slight scaling effect
            },
            {
              // Ending values
              opacity: 1,
              y: 0,
              scale: 1, // Return to normal scale
              duration: 1.5, // Shorter duration for quicker animations
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
                start: "top center",
                toggleActions: "play none none none", // Ensures the animation runs on scroll
              },
            }
          );

          // Optional: Staggering effect for each element
          gsap.to(fadeUpElement, {
            delay: index * 0.1, // Delay each element's animation
          });
        });
      }
    });

  // IMAGE ANIMATIONS
  const imageAnimation = document.querySelectorAll(".image-animation");
  imageAnimation &&
    imageAnimation.forEach((item) => {
      // ITEM STYLING
      item.style.position = "relative";
      item.style.overflow = "hidden";

      // OVERLAY CREATION AND STYLING
      const overlay = document.createElement("div");
      overlay.classList.add("image-animation-overlay");
      item.appendChild(overlay);
      gsap.set(overlay, {
        position: "absolute",
        inset: 0,
        background: "transparent",
        borderWidth: "400px",
        borderColor: "var(--color-background)",
        borderStyle: "solid",
        zIndex: 999,
      });

      // TIMELINE ANIMATION FOR BORDER SHRINKING
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top 70%",
        },
      });

      // ANIMATE BORDER WIDTH SHRINKING
      tl.to(overlay, {
        borderWidth: 0,
        duration: 1.5,
        ease: "power2.out",
      });

      // MAKE OVERLAY INVISIBLE AFTER BORDER ANIMATION
      tl.set(overlay, {
        visibility: "hidden",
        onComplete: () => {
          overlay.style.display = "none";
        },
      });
    });

  // =====================
  // POPUP SECTION START

  // Function to handle the overlay visibility
  const handleOverlay = ({ show = false, action = () => {} }) => {
    const overlay = document.querySelector(".overlay");

    // HANDLE CLOSE OVERLAY
    const handleClose = () => {
      overlay.classList.remove("active");
      overlay.style.zIndex = "var(--overlay-z-index)";
      document.body.style.overflowY = "visible";
      document.body.style.overflowX = "hidden";
      action();
    };

    // HANDLE OPEN
    const handleOpen = () => {
      overlay.classList.add("active");
      document.body.style.overflow = "hidden";
    };

    // CONDITION
    if (show) {
      handleOpen();
    } else {
      handleClose();
    }

    overlay.addEventListener("click", () => {
      if (show) {
        handleClose();
      }
    });
  };

  // =====================
  // POPUP CLOSE SECTION

  (function () {
    const popups = document.querySelectorAll(".popup");

    popups.forEach((popup) => {
      // Get the close button and create an additional overlay close element
      const closeButton = popup.querySelector(".close-button");
      const popupClose = document.createElement("div");
      popupClose.classList.add("overlay-closer");

      // Append the overlay closer to the popup's first child element
      popup.firstElementChild.appendChild(popupClose);

      // Function to handle closing of the popup and overlay
      const handleClose = () => {
        popup.classList.remove("active");
        handleOverlay({ show: false });
      };

      // Attach event listeners for closing the popup
      popupClose.addEventListener("click", handleClose);
      closeButton.addEventListener("click", handleClose);
    });
  })();

  // =====================
  // COUNTDOWN POPUP SECTION

  (function () {
    const countDownPopup = document.getElementById("countDownPopup");
    const overlay = document.querySelector(".overlay");
    if (true && countDownPopup) {
      setTimeout(() => {
        overlay.style.zIndex = "999999";
        countDownPopup.classList.add("active");
        handleOverlay({ show: true });
      }, 2000);
    }
  })();

  // =====================
  // PRIMARY & SECONDARY BUTTON
  (function () {
    const buttons = document.querySelectorAll(
      ".primary-button, .secondary-button"
    );
    buttons &&
      buttons.forEach((item) => {
        const div = document.createElement("div");
        const span = document.createElement("span");

        item.childNodes.forEach((child) => {
          span.appendChild(child.cloneNode(true));
        });

        div.appendChild(span);
        item.appendChild(div);
      });
  })();

  // =====================
  // MOBILE MENU SECTION START
  (function () {
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileMenuCloseButton = document.getElementById("mobileMenuCloseBtn");
    const mobileMenuOpenButton = document.getElementById(
      "mobileMenuOpenButton"
    );
    const mobileMenuItems = mobileMenu.querySelectorAll(".mobile-menu-items");
    const mobileSubMenu = document.getElementById("mobileSubmenu");

    // Set initial state of the mobile menu off-screen
    gsap.set(mobileMenu, { xPercent: -110 });

    // Open Menu Function
    function openMobileMenu() {
      handleOverlay({ show: true, action: closeMobileMenu });

      // GSAP Open Timeline
      const tl = gsap.timeline();
      tl.to(mobileMenu, {
        display: "block",
        delay: 0.2,
      })
        .to(mobileMenu, {
          xPercent: 0,
          duration: 0.3,
          ease: "power4.out",
        })
        .from(mobileMenu.querySelector(".header-mobile-menu"), {
          y: -100,
          duration: 0.5,
          opacity: 0,
          ease: "back.out(1.7)",
        })
        .fromTo(
          mobileMenu.querySelectorAll(".mobile-menu-list > li"),
          { xPercent: -100, opacity: 0 },
          {
            duration: 0.6,
            opacity: 1,
            xPercent: 0,
            stagger: 0.1,
            ease: "power4.out",
          }
        )
        .from(mobileMenu.querySelector(".mobile-menu-footer"), {
          y: 100,
          duration: 0.3,
          ease: "back.out(1.7)",
          opacity: 0,
        });
    }

    // Close Menu Function
    function closeMobileMenu() {
      // GSAP Close Timeline
      const tlClose = gsap.timeline({
        onComplete: () => handleOverlay({ show: false }), // Optional: Handle overlay close
      });

      // Slide the menu off-screen
      tlClose
        .to(mobileMenu, {
          xPercent: -110,
          duration: 0.7,
          ease: "power4.in",
        })
        .set(mobileMenu, {
          display: "none",
        });
    }

    // Handle Menu Item Clicks
    function handleMenuItemClick(item) {
      item.addEventListener("click", () => {
        const tl = gsap.timeline();
        tl.to(mobileSubMenu, {
          display: "block",
        }).fromTo(
          mobileSubMenu,
          {
            xPercent: -110,
            opacity: 1,
          },
          {
            xPercent: 0,
            opacity: 1,
            duration: 0.7,
          }
        );
      });
    }

    // Handle Back Button Click on Submenu
    function handleSubMenuBackButton() {
      mobileSubMenu
        .querySelector(".mobile-submenu-back-button")
        .addEventListener("click", () => {
          const tl = gsap.timeline();
          tl.to(mobileSubMenu, {
            xPercent: -110,
            duration: 0.7,
          });
        });
    }

    // Event Listeners
    mobileMenuOpenButton.addEventListener("click", openMobileMenu);
    mobileMenuCloseButton.addEventListener("click", closeMobileMenu);
    mobileMenuItems.forEach(handleMenuItemClick);
    handleSubMenuBackButton();
  })();

  // =====================
  // SEARCH DRAWER
  (function () {
    const searchDrawer = document.getElementById("searchDrawer");
    const searchDrawerCloseBtn = document.getElementById(
      "searchDrawerCloseBtn"
    );
    const searchDrawerOpenButtons = document.querySelectorAll(
      ".search-drawer-open-button"
    );

    // Open Search Drawer Function
    function openSearchDrawer() {
      document.body.style.overflowY = "hidden";
      searchDrawer.classList.add("active");
      handleOverlay({ show: true, action: closeSearchDrawer });
    }

    // Close Search Drawer Function
    function closeSearchDrawer() {
      document.body.style.overflowY = "visible";
      searchDrawer.classList.remove("active");
      handleOverlay({ show: false });
    }

    // Event Listeners for Opening Search Drawer
    searchDrawerOpenButtons.forEach((button) => {
      button.addEventListener("click", openSearchDrawer);
    });

    // Event Listener for Closing Search Drawer
    searchDrawerCloseBtn.addEventListener("click", closeSearchDrawer);
  })();

  // =====================
  // PRODUCT QUICK VIEW POPUP SECTION START
  (function () {
    const productQuickOpenButtons = document.querySelectorAll(
      ".product-quickview-button"
    );
    const productQuickCloseButton = document.getElementById(
      "productQuickCloseButton"
    );
    const productQuickView = document.getElementById("productQuickView");

    // Function to open the quick view
    function openQuickView() {
      handleOverlay({ show: true, action: closeQuickView });
      productQuickView.classList.add("active");
    }

    // Function to close the quick view
    function closeQuickView() {
      handleOverlay({ show: false });
      productQuickView.classList.remove("active");
    }

    // Attach event listeners to open quick view buttons
    productQuickOpenButtons.forEach((button) => {
      button.addEventListener("click", openQuickView);
    });

    // Attach event listener to close quick view button
    productQuickCloseButton.addEventListener("click", closeQuickView);
  })();

  // =====================
  // CART DRAWER SECTION START
  (function () {
    const cartDrawer = document.getElementById("cartDrawer");
    const cartDrawerCloseButton = document.getElementById(
      "cartDrawerCloseButton"
    );
    const cartDrawerOpenButton = document.getElementById(
      "cartDrawerOpenButton"
    );
    const inputRange = document.getElementById("cart-drawer-deals-input-range");
    const rangeSlide = document.getElementById("cart-drawer-deals-range");
    const cardDrawerDeals = document.getElementById("cardDrawerDeals");

    // Function to open the cart drawer
    function openCartDrawer() {
      cartDrawer.classList.add("active");
      handleOverlay({ show: true, action: closeCartDrawer });

      const tl = gsap.timeline();
      tl.from(cartDrawer.querySelector(".cart-drawer-header"), {
        y: 100,
        opacity: 0,
        duration: 0.4,
        ease: "power1.inOut",
      })
        .from(cartDrawer.querySelector(".cart-drawer-wrapper"), {
          y: 100,
          opacity: 0,
          duration: 0.4,
          ease: "power1.inOut",
        })
        .from(cartDrawer.querySelector(".cart-drawer-footer"), {
          y: 100,
          opacity: 0,
          duration: 0.4,
          ease: "power1.inOut",
        });
    }

    // Function to close the cart drawer
    function closeCartDrawer() {
      cartDrawer.classList.remove("active");
      handleOverlay({ show: false });
    }

    // Function to update range slide width
    function updateRangeSlide() {
      rangeSlide.style.width = `${inputRange.value}%`;
    }

    // Function to toggle card drawer deals
    function toggleCardDrawerDeals() {
      const dealsWrapper = cardDrawerDeals.querySelector(
        ".cart-drawer-deals-rang-wrapper"
      );

      if (cardDrawerDeals.classList.contains("active")) {
        gsap.to(dealsWrapper, {
          height: 0,
          duration: 0.4,
          opacity: 1,
          ease: "power1.inOut",
          overflow: "hidden",
        });
        cardDrawerDeals.classList.remove("active");
      } else {
        cardDrawerDeals.classList.add("active");
        gsap.to(dealsWrapper, {
          height: "auto",
          duration: 0.4,
          opacity: 1,
          ease: "power1.inOut",
        });
      }
    }

    // Initialize the cart drawer deals range
    gsap.set(cardDrawerDeals.querySelector(".cart-drawer-deals-rang-wrapper"), {
      height: 0,
      opacity: 0,
    });

    if (cardDrawerDeals.classList.contains("active")) {
      gsap.set(
        cardDrawerDeals.querySelector(".cart-drawer-deals-rang-wrapper"),
        {
          height: "auto",
          opacity: 1,
        }
      );
    }

    // Event Listeners
    cartDrawerOpenButton.addEventListener("click", openCartDrawer);
    cartDrawerCloseButton.addEventListener("click", closeCartDrawer);
    inputRange.addEventListener("input", updateRangeSlide);
    cardDrawerDeals.addEventListener("click", toggleCardDrawerDeals);

    // CART DRAWER SUGGEST PRODUCTS SWIPER
    const swiperCart = new Swiper(".cart-drawer-suggest-products-wrapper", {
      loop: true,
      speed: 700,
      slidesPerView: 1,
      pagination: {
        el: ".cart-drawer-suggest-products-pagination",
        clickable: true,
      },
    });
  })();

  /* ------------------------------
  SELECT & OPTION  SECTION  START
  -------------------------------- */
  (function () {
    const customSelect = document.querySelectorAll(".custom-select");

    // CHECK CUSTOM SELECT EXIT
    if (customSelect.length > 0) {
      window.addEventListener("click", (e) => {
        customSelect.forEach((item) => {
          if (!item.contains(e.target)) {
            item.classList.remove("open");
          }
        });
      });

      customSelect.forEach((item) => {
        const selectBox = item.querySelector(".select-box");
        const list = item.querySelector(".select-options-list");
        const options = item.querySelectorAll(".option");
        const selected = item.querySelector(".selected");

        // CHECK SELECT BOX & LIST EXIT
        if (selectBox && list) {
          selectBox.addEventListener("click", () => {
            item.classList.toggle("open");
          });
        }

        // CHECK IF OPTION EXIST
        if (options.length > 0) {
          options.forEach((opt) => {
            opt.addEventListener("click", () => {
              if (selected) {
                selected.textContent = opt.textContent;
              }
              item.classList.remove("open");
            });
          });
        }
      });
    }
  })();

  /* ----------------------------------
ANNOUNCEMENT BAR
-------------------------  */

  (function () {
    const ancBarDrawer = document.getElementById("announcement-bar-drawer");
    const ancBarDrawerToggle = document.getElementById(
      "announcement-bar-toggler"
    );

    // DEFAULT STYLE ON DRAWER
    ancBarDrawer.style.display = "none";
    ancBarDrawer.style.transform = "translateY(-110%)";

    // HANDLE CLOSE DRAWER
    const handleCloseDrawer = () => {
      ancBarDrawer.classList.remove("active");
      ancBarDrawer.style.transform = "translateY(-110%)";
      ancBarDrawerToggle.classList.remove("show");

      setTimeout(() => {
        handleOverlay({ show: false });
        ancBarDrawer.style.display = "none";
      }, 100);
    };

    // HANDLE OPEN  DRAWER
    const handleOpenDrawer = () => {
      ancBarDrawer.style.display = "block";
      setTimeout(() => {
        handleOverlay({ show: true, action: handleCloseDrawer });
        ancBarDrawer.style.transform = "translateY(0)";
        ancBarDrawer.classList.add("active");
        ancBarDrawerToggle.classList.add("show");
      }, 100);
    };

    // HANDLE ACTIONS
    ancBarDrawerToggle.addEventListener("click", () => {
      if (ancBarDrawerToggle.classList.contains("show")) {
        handleCloseDrawer();
      } else {
        handleOpenDrawer();
      }
    });

    // Initialize Swiper for Announcement Bar
    const announceBarSwiper = new Swiper(".announce-bar-swipper", {
      loop: true,
      speed: 700,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        992: {
          direction: "vertical",
        },
      },
    });
  })();

  /* ------------------------------
  HEADER SECTION START
  ------------------------------ */

  (function () {
    const header = document.getElementById("header");
    let lastScrollY = 0;

    // Function to handle header sticky behavior on scroll
    function handleScroll() {
      const currentScrollY = window.pageYOffset;

      if (currentScrollY > 40) {
        // Toggle sticky header based on scroll direction
        if (currentScrollY < lastScrollY) {
          header.classList.add("sticky-header");
        } else {
          header.classList.remove("sticky-header");
        }
      } else {
        header.classList.remove("sticky-header");
      }

      lastScrollY = currentScrollY; // Update last scroll position
    }

    // Attach scroll event listener
    window.addEventListener("scroll", () => {
      if (header) {
        handleScroll();
      }
    });
  })();

  /* ------------------------------
 SLIDE SHOW SECTION START
------------------------------ */

  (function () {
    const slideshowSwiper = new Swiper(".slideshow-swipper", {
      loop: true,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      autoplay: {
        delay: 7000,
        disableOnInteraction: false,
      },
    });
  })();

  /* -------------------------------
  PROMO SECTION
  ------------------------------ */
  (function () {
    const button = document.getElementById("promoVideoPopupButton");
    const videoPopup = document.getElementById("videoPopup");

    // Function to show the video popup
    function showVideoPopup() {
      videoPopup.classList.add("active");
      handleOverlay({ show: true });
    }

    if (button) {
      button.addEventListener("click", showVideoPopup);
    }

    // GSAP ANIMATION for promo section
    gsap.from(".promo-fade-up", {
      scrollTrigger: {
        trigger: ".promo-section",
        start: "top 90%",
      },
      opacity: 0,
      y: 50,
      duration: 2,
      ease: "power2.out",
      stagger: 0.2,
    });
  })();

  /*------------------------------------
  TAB SECTIONS START
  ------------------------------------*/

  (function () {
    document.querySelectorAll(".tabs-wrapper")?.forEach((wrapper) => {
      const buttonWrapper = wrapper.querySelector(".tabs-button-list");
      const buttons = wrapper.querySelectorAll(".tabs-button");
      const items = wrapper.querySelectorAll(".tabs-item");

      // Create the active element indicator for tabs
      const tabActiveEl = document.createElement("div");
      tabActiveEl.classList.add("tabs-button-active-shape");
      buttonWrapper.appendChild(tabActiveEl);

      // Function to handle the positioning and size of the active indicator
      const handleActiveEl = ({ left = 0, width = 0 }) => {
        tabActiveEl.style.transform = `translateX(${left}px)`;
        tabActiveEl.style.width = `${width}px`;
      };

      // Function to set the default active tab
      const handleDefaultActive = () => {
        const activeButton = Array.from(buttons).find((button) =>
          button.classList.contains("active")
        );

        if (activeButton) {
          const tabId = activeButton.getAttribute("data-tab-item");
          wrapper.querySelector(`.${tabId}`).classList.add("active");
          handleActiveEl({
            left: activeButton.offsetLeft,
            width: activeButton.clientWidth,
          });
        } else if (buttons.length > 0) {
          // If no button is active, activate the first button
          buttons[0].classList.add("active");
          items[0].classList.add("active");
          handleActiveEl({
            left: buttons[0].offsetLeft,
            width: buttons[0].clientWidth,
          });
        }
      };

      // Initialize default active tab
      handleDefaultActive();

      // Add click event listeners for tab buttons
      buttons.forEach((button) => {
        button.addEventListener("click", () => {
          // Remove active class from all buttons and items
          buttons.forEach((btn) => btn.classList.remove("active"));
          items.forEach((item) => item.classList.remove("active"));

          // Add active class to clicked button
          button.classList.add("active");
          const tabId = button.getAttribute("data-tab-item");
          wrapper.querySelector(`.${tabId}`).classList.add("active");

          // Update the active element's position and size
          handleActiveEl({
            left: button.offsetLeft,
            width: button.clientWidth,
          });
        });
      });
    });
  })();

  /*---------------------------------- 
CATEGORY SECTION START
---------------------------------- */

  (function () {
    gsap.set(".category-section .category-list-top", {
      width: `${document.body.clientWidth * 1.5}px`,
    });
    gsap.set(".category-section .category-list-bottom", {
      width: `${document.body.clientWidth * 1.5}px`,
    });

    // Function to animate the top category list
    function animateCategoryListTop() {
      gsap.fromTo(
        ".category-section .category-list-bottom",
        { xPercent: 0 },
        {
          scrollTrigger: {
            trigger: ".category-section",
            start: "top 80%",
            end: "bottom 0%",
            scrub: 1,
          },
          xPercent: -20,
          duration: 2.5,
          ease: "power2.inOut",
        }
      );
    }

    // Function to animate the bottom category list
    function animateCategoryListBottom() {
      gsap.fromTo(
        ".category-section .category-list-top",
        { xPercent: -25 },
        {
          scrollTrigger: {
            trigger: ".category-section",
            start: "top 80%",
            end: "bottom 0%",
            scrub: 1,
          },
          xPercent: 0,
          duration: 2.5,
          ease: "power2.inOut",
        }
      );
    }

    // Execute animations
    animateCategoryListTop();
    animateCategoryListBottom();
  })();

  /* ----------------------------------- 
  NEW ARRIVAL SECTIONS
  ------------------------------------ */

  (function () {
    const newArrival = document.getElementById("newArrival");
    const newArrivalPath = newArrival && newArrival.querySelectorAll("path");

    if (newArrival) {
      newArrivalPath.forEach((item) => {
        const pathLength = item.getTotalLength();

        item.style.strokeDasharray = pathLength;
        item.style.strokeDashoffset = pathLength;

        gsap.to(item, {
          duration: 2,
          strokeDashoffset: 0,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
    }

    const newArrivalSwiper = new Swiper(".new-arrival-swiper", {
      spaceBetween: 24,
      slidesPerView: 1,
      loop: true,
      speed: 1000,
      autoplay: {
        delay: 30000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        1200: {
          initialSlide: 1,

          slidesPerView: 3,
          centeredSlides: true,
        },
      },
    });
  })();

  /* ------------------------------------- 
  TRENDING SECTION START
   ------------------------------------- */
  (function () {
    const trendingSwiper = new Swiper(".trending-swiper", {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 24,
      speed: 700,
      navigation: {
        nextEl: ".trending-sl-next",
        prevEl: ".trending-sl-prev",
      },

      breakpoints: {
        575: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 24,
        },

        1200: {
          slidesPerView: 3.2,
          spaceBetween: 24,
        },

        1400: {
          slidesPerView: 3.8,
          spaceBetween: 24,
        },

        1600: {
          slidesPerView: 4,
          spaceBetween: 24,
        },
      },
    });

    gsap.from(".trending-section .product-card", {
      scrollTrigger: {
        trigger: ".trending-section",
        start: "top 70%",
      },
      opacity: 0,
      y: 200,
      scale: 0.6,
      duration: 2,
      ease: "power2.out",
    });
  })();

  /* ------------------------------ 
  COLLAGE SECTION START
   ------------------------------ */
  (() => {
    const collageVideos = document.querySelectorAll(".collage-gallery-video");
    collageVideos &&
      collageVideos.forEach((item) => {
        const playButton = item.querySelector(".collage-gallery-video-control");
        const video = item.querySelector(".collage-gallery-video-player");

        // Click event to toggle video play/pause and button state
        playButton.addEventListener("click", function () {
          if (video.paused) {
            video.play();
            playButton.classList.add("video-played");
            playButton.classList.remove("video-paused");
          } else {
            video.pause();
            playButton.classList.add("video-paused");
            playButton.classList.remove("video-played");
          }
        });
      });
  })();

  // =====================
  //

  /* --------------------------------- 
  COUNTDOWN BANNER SECTION START
   --------------------------------- */
  (function () {
    const countdownSection = new Swiper(".countdown-swiper", {
      direction: "vertical",
      speed: 700,
      crossFade: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  })();

  /* -------------------------------
  BUNDLE PRODUCT SECTION START
  -------------------------------- */

  (function () {
    const bundleProductAcc = document.querySelectorAll(".bundle-product-acc");
    bundleProductAcc &&
      bundleProductAcc.forEach((item, index) => {
        // CREATE ACC BUTTON
        const button = document.createElement("button");
        const bundleProductButtonWrapper = document.getElementById(
          "bundleProductButtonWrapper"
        );
        bundleProductButtonWrapper.appendChild(button);
        button.classList.add("bundle-product-toggler-button");
        button.innerHTML = `
        <svg class="plus-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000000" viewBox="0 0 256 256">
          <path d="M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z"></path>
        </svg>
        <svg class="minus-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000000" viewBox="0 0 256 256">
          <path d="M228,128a12,12,0,0,1-12,12H40a12,12,0,0,1,0-24H216A12,12,0,0,1,228,128Z"></path>
        </svg>
      `;

        // Find Acc Header & body
        const accHeader = item.querySelector(".bundle-product-header-wrapper");
        const accBody = item.querySelector(".bundle-product-body-wrapper");

        // Get Height Acc Body & Header
        const accHeaderHeight = accHeader.firstElementChild.clientHeight;
        const accBodyHeight = accBody.firstElementChild.clientHeight;

        // This Style For Large Device
        if (document.body.clientWidth > 1199) {
          // Acc Body Default Styling
          accBody.style.transition = "height ease .5s";
          accBody.style.height = "0";
          accBody.style.overflow = "hidden";

          // Acc Header Default Styling
          accHeader.style.transition = "height ease .5s";
          accHeader.style.overflow = "hidden";

          // Active Default Acc
          if (item.classList.contains("active")) {
            accBody.style.height = `${accBodyHeight + 4}px`;
            accHeader.style.height = `0`;
            button.classList.add("active");
          }

          // Handle Deactivate  Activated Acc
          const handleDeactivate = () => {
            // ACC Deactivations
            const getAllAcc = document.querySelectorAll(".bundle-product-acc");
            const getAllBtn = document.querySelectorAll(
              ".bundle-product-toggler-button"
            );

            // Acc Header & Body
            getAllAcc.forEach((item) => {
              item.classList.remove("active");

              // Find Acc Header & body
              const accHeader = item.querySelector(
                ".bundle-product-header-wrapper"
              );
              const accBody = item.querySelector(
                ".bundle-product-body-wrapper"
              );

              // Get Height Acc Body & Header
              const accHeaderHeight = accHeader.firstElementChild.clientHeight;

              // Acc Body & Header
              accBody.style.height = "0";
              accHeader.style.height = `${accHeaderHeight + 2}px`;
            });

            // Acc Header & Body
            getAllBtn.forEach((btn) => {
              btn.classList.remove("active");
            });
          };

          // Handle Activations
          button.addEventListener("click", () => {
            if (item.classList.contains("active")) {
              // If Activated Item It Will Deactivate
              item.classList.remove("active");
              button.classList.remove("active");

              accBody.style.height = 0;
              accHeader.style.height = `${accHeaderHeight + 4}px`;
            } else {
              // If Deactivate Item It Will Activated
              handleDeactivate();
              item.classList.add("active");
              button.classList.add("active");

              accBody.style.height = `${accBodyHeight + 4}px`;
              accHeader.style.height = `0`;
            }
          });
        } else {
          const bundleProductWrapper = document.getElementById(
            "bundleProductWrapper"
          );
          // Default Styling
          bundleProductWrapper.style.visibility = "hidden";
          bundleProductWrapper.style.transform = "translate(-50%, 100%)";
          bundleProductWrapper.style.opacity = "0";
          bundleProductWrapper.style.transition = ".5s ease all";

          const closeButton =
            bundleProductWrapper.querySelector(".close-button");

          // Handle Close
          const handleClose = () => {
            bundleProductWrapper.style.visibility = "hidden";
            bundleProductWrapper.style.transform = "translate(-50%, 100%)";
            bundleProductWrapper.style.opacity = "0";

            setTimeout(() => {
              accBody.style.display = "none";
            }, 200);
          };

          closeButton.addEventListener("click", () => {
            handleClose();
            handleOverlay({ show: false });
          });

          // Show Product Wrapper
          button.addEventListener("click", () => {
            bundleProductWrapper.style.visibility = "visible";
            bundleProductWrapper.style.transform = "translate(-50%, 0)";
            bundleProductWrapper.style.opacity = "1";
            accBody.style.display = "block";
            handleOverlay({ show: true, action: handleClose });
          });
        }
      });
  })();

  /* -------------------------------- 
  COMPARISON R SECTION
   -------------------------------- */
  (function () {
    const comparison = document.getElementById("comparison-section");
    const ImgWrapper = document.getElementById("comparison-image-wrapper");
    const sliderBtn = document.getElementById("comparison-slider-button");
    const range = document.getElementById("comparison-range-slider");

    if (ImgWrapper && sliderBtn && range) {
      // Initialize Slider Position and Width
      range.value = 0;
      ImgWrapper.style.width = "0";
      sliderBtn.style.left = `-${sliderBtn.clientWidth / 2}px`;

      // Slide Change Listener
      range.addEventListener("input", () => {
        const imgWidth = range.value;
        sliderBtn.style.left = `calc(${imgWidth}% - ${
          sliderBtn.clientWidth / 2
        }px)`;
        ImgWrapper.style.width = `${imgWidth}%`;

        sliderBtn.style.transition = "none";
        ImgWrapper.style.transition = "none";
      });

      // Scroll Listener for Image Reveal Animation
      const imgOffsetTop = comparison.offsetTop;

      window.addEventListener("scroll", () => {
        const windowScrollTop = window.scrollY + 100;

        if (
          windowScrollTop >= imgOffsetTop &&
          !comparison.classList.contains("active")
        ) {
          ImgWrapper.style.width = "50%";
          sliderBtn.style.left = `calc(50% - ${sliderBtn.clientWidth / 2}px)`;
          comparison.classList.add("active");
        }
      });
    }
  })();

  /* ------------------------ 
  # PRODUCT DETAILS
  ------------------------ */
  (function () {
    const productDetailsSwiper = document.querySelectorAll(
      ".product-details-image-block"
    );

    productDetailsSwiper &&
      productDetailsSwiper.forEach((item) => {
        const imageWrap = item.querySelector(".product-details-swiper");
        const thumbWrap = item.querySelector(".product-details-thumb-swiper");
        const thumbDirection = item.getAttribute("data-thumb-dir");
        const imgPerView = item.getAttribute("data-img-preview");
        const thumbPerView = item.getAttribute("data-thumb-preview");

        const galleryThumbs = new Swiper(thumbWrap, {
          direction: thumbDirection ? " vertical" : "horizontal",
          spaceBetween: 10,
          slidesPerView: 4,
          speed: 1000,
          initialSlide: 1,
          watchSlidesVisibility: true,
          slideToClickedSlide: true,
          breakpoints: {
            1200: {
              slidesPerView: thumbPerView ? thumbPerView : 4,
            },
          },
        });
        const galleryTop = new Swiper(imageWrap, {
          spaceBetween: 16,
          slidesPerView: 1,
          centeredSlides: true,
          speed: 1000,
          initialSlide: 1,

          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          thumbs: {
            swiper: galleryThumbs,
          },

          breakpoints: {
            1200: {
              slidesPerView: imgPerView ? imgPerView : 1,
            },
          },
        });
      });
  })();

  /* --------------------- ------------ 
  #  RECENT ADDED SECTION START
   --------------------- ------------ */

  (function () {
    const recentAddedSwiper = document.querySelectorAll(".recent-added-swiper");

    recentAddedSwiper &&
      recentAddedSwiper.forEach((item, index) => {
        const swiper = new Swiper(item, {
          direction: "horizontal",
          speed: 5000,
          autoplay: {
            delay: 5,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            reverseDirection: index === 0,
          },
          loop: true,
          slidesPerView: "auto",
          watchSlidesProgress: true,
          spaceBetween: 24,
          grabCursor: true,

          breakpoints: {
            1200: {
              direction: "vertical",
            },
          },
        });
      });
  })();

  /*---------------------------------- 
  STYLISH PRODUCT SECTION START
  ---------------------------------- */
  (function () {
    const stylishProductSwiper = document.querySelectorAll(
      ".stylish-product-swiper"
    );
    stylishProductSwiper &&
      stylishProductSwiper.forEach((item) => {
        const swiper = new Swiper(item, {
          spaceBetween: 0,
          slidesPerView: "auto",
          initialSlide: 1,
          centeredSlides: true,
          speed: 900,
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
        });
      });
  })();

  /* ------------------------------
  TESTIMONIAL SECTION START
  -------------------------------- */

  const testimonialCard = new Swiper(".testimonial-swiper", {
    spaceBetween: 20,
    slidesPerView: "auto",
    initialSlide: 1,
    centeredSlides: true,
    loop: true,
    speed: 900,
    centeredSlides: true,
    autoplay: {
      delay: 4000,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    breakpoints: {
      992: {
        spaceBetween: 48,
      },
    },
  });

  /* ------------------------------
  Media Gallery
  -------------------------------- */

  (function () {
    const videoWrapper = document.querySelectorAll(
      ".media-gallery-video-wrapper"
    );

    videoWrapper &&
      videoWrapper.forEach((item) => {
        const video = item.querySelector("video");
        const playButton = item.querySelector(".play-button");

        // Listener Activations
        playButton.addEventListener("click", function () {
          if (video.paused) {
            video.play();
            playButton.classList.add("video-played");
            playButton.classList.remove("video-paused");
          } else {
            video.pause();
            playButton.classList.remove("video-played");
            playButton.classList.add("video-paused");
          }
        });
      });
  })();

  /* ------------------------------
  FOOTER SECTION  START
  -------------------------------- */

  (function () {
    // CHECK IF THE VIEWPORT WIDTH IS LESS THAN 992 PIXELS
    if (document.body.clientWidth < 992) {
      const footerMenuWrappers = document.querySelectorAll(
        ".footer-menu-wrapper"
      );

      footerMenuWrappers &&
        footerMenuWrappers.forEach((item) => {
          // Check if header and menu list elements exist
          const headerElement = item?.querySelector(".footer-menu-heading");
          const menuListElement = item?.querySelector(".footer-menu-acc");

          if (headerElement && menuListElement) {
            // GET THE HEIGHT OF THE HEADER AND THE MENU LIST
            const headerHeight = headerElement.clientHeight;
            const menuListHeight = menuListElement.clientHeight;

            // SET INITIAL STYLES FOR THE MENU
            item.style.overflow = "hidden";
            item.style.height = `${headerHeight + 4}px`;
            item.style.transition = "all ease-in-out .3s";

            item.addEventListener("click", () => {
              if (item.classList.contains("active")) {
                item.style.height = `${headerHeight + 4}px`;
                item.classList.remove("active");
              } else {
                // EXPAND THE MENU
                item.style.height = `${menuListHeight + headerHeight + 40}px`; // EXPANDED HEIGHT
                item.classList.add("active");
              }
            });
          }
        });
    }

    // FOOTER LOGO
    const footerLogo = document.getElementById("footerLogo");
    const logoItems = footerLogo.querySelectorAll("li");

    const handleLogoAnimation = () => {
      logoItems.forEach((item) => {
        item.classList.add("is-animated");

        setTimeout(() => {
          item.classList.remove("is-animated");
        }, 500);
      });
    };

    // Create a ScrollTrigger instance
    ScrollTrigger.create({
      trigger: ".footer-section",
      start: "top end", //
      onEnter: handleLogoAnimation,
      onEnterBack: handleLogoAnimation,
    });
  })();

  /* ---------------------------------
  PRODUCT SECTION START
 --------------------------------- */

  (function () {
    const productControllers = document.querySelectorAll(
      ".product-quantity-controller"
    );

    productControllers &&
      productControllers.forEach((controller) => {
        let count = 1;
        const decreaseButton = controller.querySelector(".decrease-quantity");
        const increaseButton = controller.querySelector(".increase-quantity");
        const productQuantity = controller.querySelector(".product-quantity");

        // Set the initial quantity
        productQuantity.value = count;

        // Handle increase
        increaseButton.addEventListener("click", () => {
          count++;
          productQuantity.value = count;
        });

        // Handle decrease
        decreaseButton.addEventListener("click", () => {
          if (count > 1) {
            count--;
            productQuantity.value = count;
          }
        });
      });
  })();

  (function () {
    const productDetailsSwiper =
      document.querySelectorAll(".product-list-card");

    productDetailsSwiper &&
      productDetailsSwiper.forEach((item) => {
        const imageWrap = item?.querySelector(".product-list-card-img-swiper");
        const thumbWrap = item?.querySelector(".product-list-card-img-thumb");

        const galleryThumbs =
          thumbWrap &&
          new Swiper(thumbWrap, {
            direction: "vertical",
            spaceBetween: 10,
            slidesPerView: 4,
            speed: 1000,
            initialSlide: 0,
            watchSlidesVisibility: true,
            slideToClickedSlide: true,
          });

        const galleryTop = new Swiper(imageWrap, {
          direction: "vertical",
          spaceBetween: 0,
          slidesPerView: 1,
          speed: 1000,
          thumbs: {
            swiper: galleryThumbs,
          },
          breakpoints: {
            992: {
              thumbs: {
                swiper: galleryThumbs,
              },
            },
            1200: {
              thumbs: false,
            },
            1400: {
              thumbs: {
                swiper: galleryThumbs,
              },
            },
          },
        });
      });
  })();

  // Color Variant Selections
  (function () {
    const colorVariants = document.querySelectorAll(".product-color-variant");

    colorVariants.forEach((variant) => {
      const colorItems = variant.querySelectorAll("li");

      colorItems.forEach((item) => {
        item.addEventListener("click", () => {
          // Remove 'selected' class from all items in the current variant section
          colorItems.forEach((i) => i.classList.remove("selected"));

          // Add 'selected' class to the clicked item
          item.classList.add("selected");
        });
      });
    });
  })();

  // size Variant Selections
  (function () {
    const colorVariants = document.querySelectorAll(".product-size-variant");

    colorVariants.forEach((variant) => {
      const colorItems = variant.querySelectorAll("li");

      colorItems.forEach((item) => {
        item.addEventListener("click", () => {
          // Remove 'selected' class from all items in the current variant section
          colorItems.forEach((i) => i.classList.remove("selected"));

          // Add 'selected' class to the clicked item
          item.classList.add("selected");
        });
      });
    });
  })();

  /*------------------------------- 
  SCROLL TO TOP BUTTON
  ------------------------------- */
  (function () {
    const scrollToTopButton = document.getElementById("scrollToTop");

    // Show button when scrolled down
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 200 ||
        document.documentElement.scrollTop > 200
      ) {
        scrollToTopButton.classList.add("active");
      } else {
        scrollToTopButton.classList.remove("active");
      }
    });

    // Scroll to top animation
    scrollToTopButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth", duration: 3000 });
    });
  })();

  /*-------------------------------- 
  MARQUEE SECTION START
  -------------------------------- */
  (function () {
    const marquees = document.querySelectorAll(".marquee-slider");

    if (marquees.length > 0) {
      marquees.forEach((item) => {
        const swiperWrap = item.querySelector(".swiper-wrapper");
        const swiperWrapClone = swiperWrap.cloneNode(true);

        // Append cloned children to the swiper wrapper
        Array.from(swiperWrapClone.children).forEach((child) => {
          swiperWrap.appendChild(child);
        });

        const speed = item.getAttribute("data-speed") || 5000;
        const direction = item.getAttribute("data-direction") || "forward";
        const isReverse = direction === "reverse";

        const swiper = new Swiper(item, {
          speed: parseInt(speed, 10),
          autoplay: {
            delay: 5,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            reverseDirection: isReverse,
          },
          loop: true,
          slidesPerView: "auto",
          watchSlidesProgress: true,
          spaceBetween: 24,
          grabCursor: true,
        });
      });
    }
  })();

  /*--------------------------------- 
ABOUT SECTION START
--------------------------------- */

  (() => {
    function splitTextIntoSpans(element) {
      const text = element.innerText;
      element.innerHTML = "";

      text.split("").forEach((char) => {
        const span = document.createElement("span");
        span.style.display = "inline-block";
        span.innerText = char === " " ? "\u00A0" : char;
        element.appendChild(span);
      });
    }

    const textElement = document.querySelector(".about-text-animation");
    if (textElement) {
      splitTextIntoSpans(textElement);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#about-section-wrapper",
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 0.75,
        },
      });

      tl.from(".about-text-animation span", {
        opacity: 0.3,
        stagger: 0.1,
        y: 20,
        duration: 1.5,
        ease: "power2.out",
      });
    }
  })();

  /*------------------------------- 
SHOP PAGE SHOP SECTION START
------------------------------- */
  (function () {
    const shopWidgetCard = document.querySelectorAll(".shop-widget-card");

    if (shopWidgetCard) {
      shopWidgetCard.forEach((card) => {
        const cardHeader = card.querySelector(".shop-widget-card-header");
        const cardBody = card.querySelector(".shop-widget-card-body");

        // Get Heights
        const headerHeight = cardHeader ? cardHeader.clientHeight : 0;
        const bodyHeight = cardBody ? cardBody.clientHeight : 0;

        // Initial Card Styling
        card.style.height = `${headerHeight}px`;
        card.style.overflow = "hidden";

        // IF CARD IS DEFAULT ACTIVE
        if (card.classList.contains("active")) {
          card.style.height = `${headerHeight + bodyHeight}px`;
        }

        // Toggle Function on Click
        cardHeader.addEventListener("click", () => {
          if (card.style.height === `${headerHeight}px`) {
            card.style.height = `${headerHeight + bodyHeight}px`;
            card.classList.add("active");
          } else {
            card.style.height = `${headerHeight}px`;
            card.classList.remove("active");
          }
        });
      });
    }

    // SHOP CHECK BOX
    const checkBoxItem = document.querySelectorAll(
      ".shop-widget-checkbox-item"
    );

    if (checkBoxItem) {
      checkBoxItem.forEach((item) => {
        const checkBox = item && item.querySelector(".custom-radio");

        if (
          !item.classList.contains("disabled") &&
          checkBox &&
          checkBox.classList.contains("checked")
        ) {
          checkBox.classList.remove("checked");
          checkBox.removeAttribute("checked");
        }

        if (!item.classList.contains("disabled") && checkBox) {
          item.addEventListener("click", () => {
            if (checkBox.classList.contains("checked")) {
              checkBox.classList.remove("checked");
              checkBox.removeAttribute("checked");
            } else {
              checkBox.classList.add("checked");
              checkBox.setAttribute("checked");
            }
          });
        }
      });
    }
  })();

  // SHOP WIDGET PRICE RANGE
  (function () {
    const priceFilterElements = document.querySelectorAll(".price-filter");

    if (!priceFilterElements) return;

    priceFilterElements.forEach((filterElement) => {
      const rangeInputs = filterElement.querySelectorAll(".range-input input");
      const priceInputs = filterElement.querySelectorAll(".price-input input");
      const progressRange = filterElement.querySelector(
        ".price-filter-progress"
      );
      const priceDisplay = filterElement.querySelectorAll(
        ".price-input .input-value-show"
      );

      const priceGap = 100;

      // Update displayed values and range based on input fields
      priceInputs.forEach((input, idx) => {
        input.addEventListener("input", (e) => {
          let minPrice = parseInt(priceInputs[0].value);
          let maxPrice = parseInt(priceInputs[1].value);

          // Display current price values
          priceDisplay[0].innerHTML = minPrice;
          priceDisplay[1].innerHTML = maxPrice;

          // Adjust range if values meet required gap
          if (
            maxPrice - minPrice >= priceGap &&
            maxPrice <= rangeInputs[1].max
          ) {
            if (e.target.classList.contains("input-min")) {
              rangeInputs[0].value = minPrice;
              progressRange.style.left =
                (minPrice / rangeInputs[0].max) * 100 + "%";
            } else {
              rangeInputs[1].value = maxPrice;
              progressRange.style.right =
                100 - (maxPrice / rangeInputs[1].max) * 100 + "%";
            }
          }
        });
      });

      // Update displayed values and input fields based on range inputs
      rangeInputs.forEach((input, idx) => {
        // Set initial display values based on input attributes
        priceDisplay[idx].innerHTML = input.getAttribute("value");

        input.addEventListener("input", (e) => {
          let minVal = parseInt(rangeInputs[0].value);
          let maxVal = parseInt(rangeInputs[1].value);

          // Ensure minimum gap between min and max values
          if (maxVal - minVal < priceGap) {
            if (e.target.classList.contains("range-min")) {
              rangeInputs[0].value = maxVal - priceGap;
            } else {
              rangeInputs[1].value = minVal + priceGap;
            }
          } else {
            priceInputs[0].value = minVal;
            priceInputs[1].value = maxVal;
            priceDisplay[0].innerHTML = minVal;
            priceDisplay[1].innerHTML = maxVal;
            progressRange.style.left =
              (minVal / rangeInputs[0].max) * 100 + "%";
            progressRange.style.right =
              100 - (maxVal / rangeInputs[1].max) * 100 + "%";
          }
        });
      });
    });
  })();

  // Shop Drawer Toggler
  (function () {
    const shopWidgetWrapper = document.getElementById("shop-widget-wrapper");
    const shopWidgetOpen = document.getElementById("shop-widget-toggler");
    const shopWidgetClose = shopWidgetWrapper
      ? shopWidgetWrapper.querySelector(".close-button")
      : null;

    const handleClose = () => {
      if (shopWidgetWrapper && shopWidgetWrapper.classList.contains("active")) {
        shopWidgetWrapper.classList.remove("active");
        handleOverlay({ show: false });
      }
    };

    if (shopWidgetClose) {
      shopWidgetClose.addEventListener("click", () => {
        handleClose();
      });
    }

    if (shopWidgetOpen) {
      shopWidgetOpen.addEventListener("click", () => {
        if (shopWidgetWrapper) {
          shopWidgetWrapper.classList.add("active");
          handleOverlay({ show: true, action: handleClose });
        }
      });
    }
  })();

  // Shop Page List & Grid Tab Handler
  (function () {
    const gridWrap = document.getElementById("shopProductGridWrap");
    const listWrap = document.getElementById("shopProductListWrap");
    const gridBtn = document.getElementById("shopProductGridButton");
    const listBtn = document.getElementById("shopProductListButton");

    // Check that all elements exist before proceeding
    if (gridWrap && listWrap && gridBtn && listBtn) {
      // Set initial active button based on active wrap
      if (gridWrap.classList.contains("active")) {
        gridBtn.classList.add("active");
        listBtn.classList.remove("active");
      } else if (listWrap.classList.contains("active")) {
        listBtn.classList.add("active");
        gridBtn.classList.remove("active");
      }

      // Event listeners for toggling between grid and list views
      gridBtn.addEventListener("click", function () {
        gridWrap.classList.add("active");
        listWrap.classList.remove("active");
        gridBtn.classList.add("active");
        listBtn.classList.remove("active");
      });

      listBtn.addEventListener("click", function () {
        listWrap.classList.add("active");
        gridWrap.classList.remove("active");
        listBtn.classList.add("active");
        gridBtn.classList.remove("active");
      });
    }
  })();

  /*------------------------------- 
SHOP DETAILS SECTION START
------------------------------- */
  (() => {
    const shopThumbs = new Swiper(".shop-details-thumb-swiper", {
      spaceBetween: 8,
      slidesPerView: 4,
      speed: 1000,
      watchSlidesVisibility: true,
      slideToClickedSlide: true,

      breakpoints: {
        574: { direction: "vertical", spaceBetween: 12 },
        768: {
          direction: "vertical",
          slidesPerView: 5,
        },
        992: {
          direction: "vertical",
          slidesPerView: 4,
        },
        1200: {
          direction: "vertical",
          slidesPerView: 5,
        },
      },
    });
    const shopImage = new Swiper(".shop-details-image-swiper", {
      spaceBetween: 20,
      slidesPerView: 1,
      speed: 1000,

      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      thumbs: {
        swiper: shopThumbs,
      },
    });
  })();

  // PRODUCT IMAGE ZOOM
  (function(){

    const imgWrap = document.querySelectorAll(".image-zoom-wrapper")

    if(imgWrap){

      imgWrap.forEach((item) => {

        const exitingImage = item.querySelector("img")
        const imgUrl = exitingImage.getAttribute("src")
        const zoomIcon = document.createElement("div")
        zoomIcon.classList.add("zoom-icon")
        item.appendChild(zoomIcon)
        zoomIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#000000" viewBox="0 0 256 256"><path d="M152,112a8,8,0,0,1-8,8H120v24a8,8,0,0,1-16,0V120H80a8,8,0,0,1,0-16h24V80a8,8,0,0,1,16,0v24h24A8,8,0,0,1,152,112Zm77.66,117.66a8,8,0,0,1-11.32,0l-50.06-50.07a88.11,88.11,0,1,1,11.31-11.31l50.07,50.06A8,8,0,0,1,229.66,229.66ZM112,184a72,72,0,1,0-72-72A72.08,72.08,0,0,0,112,184Z"></path></svg>`
        item.style.backgroundImage = `url(${imgUrl})`
        
        
        
        item && item.addEventListener("mousemove", (e) => {
            var zoomer = e.currentTarget;
            e.offsetX ? offsetX = e.offsetX : offsetX = e.touches[0].pageX
            e.offsetY ? offsetY = e.offsetY : offsetX = e.touches[0].pageX
            x = offsetX/zoomer.offsetWidth*100
            y = offsetY/zoomer.offsetHeight*100
            zoomer.style.backgroundPosition = x + '% ' + y + '%';
        })
      })
    }

  })();

  // Stock Slider
  (function () {
    // Get the input and progress elements
    const qtyInput = document.getElementById("shop-details-qty-input");
    const qtyProgress = document.getElementById("shop-details-qty-progress");

    if (qtyInput && qtyProgress) {
      function updateProgress() {
        const value = qtyInput.value;
        qtyProgress.style.width = value + "%";
      }

      // Initial update
      updateProgress();

      // Add event listener to input
      qtyInput.addEventListener("input", updateProgress);

      // SIZE GUIDE POPUP
      const sizeGuidePopup = document.getElementById(
        "shop-details-size-guide-popup"
      );
      const openButton = document.getElementById("size-guide-open-button");

      if (sizeGuidePopup && openButton) {
        const handelClose = () => {
          sizeGuidePopup.classList.remove("active");
          handleOverlay({ show: false });
        };

        openButton.addEventListener("click", () => {
          sizeGuidePopup.classList.add("active");
          handleOverlay({ show: true, action: handelClose });
        });
      }
    }
  })();

  // Shop info tab
  (function () {
    const shopDtlsInfoTab = document.getElementById("shopDtlsInfoTab");

    if (shopDtlsInfoTab) {
      const tabButtonList = shopDtlsInfoTab.querySelectorAll(
        ".product-info-tab-btn"
      );
      const tabItemList = shopDtlsInfoTab.querySelectorAll(
        ".product-info-tab-item"
      );

      tabButtonList.forEach((button) => {
        // Initially set the active tab if the button has the "active" class
        if (button.classList.contains("active")) {
          const dataTabItem = button.getAttribute("data-tab-item");
          const activeItem = shopDtlsInfoTab.querySelector(`#${dataTabItem}`);
          if (activeItem) activeItem.classList.add("active");
        }

        // Event listener to toggle tabs
        button.addEventListener("click", () => {
          // Remove "active" class from all items and buttons
          tabItemList.forEach((item) => item.classList.remove("active"));
          tabButtonList.forEach((btn) => btn.classList.remove("active"));

          // Activate the selected tab item and button
          const dataTabItem = button.getAttribute("data-tab-item");
          const activeItem = shopDtlsInfoTab.querySelector(`#${dataTabItem}`);
          if (activeItem) activeItem.classList.add("active");

          button.classList.add("active");
          console.log("Tab clicked");
        });
      });
    }
  })();

  // Shop Footbar
  (function () {
    const shopDetails = document.getElementById("shop-details-section");
    const shopFootBar = document.getElementById("shop-footbar");

    if (shopDetails && shopFootBar) {
      window.addEventListener("scroll", () => {
        const shopDetailsEnd =
          shopDetails.offsetTop + shopDetails.offsetHeight + 20;

        if (window.scrollY >= shopDetailsEnd) {
          shopFootBar.classList.add("sticky");
        } else {
          shopFootBar.classList.remove("sticky");
        }
      });
    }
  })();

  /* ------------------------------------- 
  RELATED PRODUCT SECTION START
   ------------------------------------- */
  (function () {
    const swiper = new Swiper(".related-product-swiper", {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 24,
      speed: 700,
      navigation: {
        nextEl: ".related-product-sl-next",
        prevEl: ".related-product-sl-prev",
      },

      breakpoints: {
        575: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 24,
        },

        1200: {
          slidesPerView: 3.2,
          spaceBetween: 24,
        },

        1400: {
          slidesPerView: 3.8,
          spaceBetween: 24,
        },

        1600: {
          slidesPerView: 4,
          spaceBetween: 24,
        },
      },
    });
  })();

  /* ------------------------------------- 
  CART SECTION SECTION START
   ------------------------------------- */
  (function () {
    const cartShippingItem = document.querySelectorAll(".cart-shipping-item");
    if (cartShippingItem) {
      cartShippingItem.forEach((item) => {
        item.addEventListener("click", () => {
          if (item.classList.contains("selected")) {
            item.classList.remove("selected");
          } else {
            cartShippingItem.forEach((selectedItem) => {
              selectedItem.classList.remove("selected");
            });
            item.classList.add("selected");
          }
        });
      });
    }
  })();

  /*---------------------------- 
  FAQS SECTION START
  ---------------------------- */
  (function () {
    const faqSections = document.querySelectorAll(".faqs-section-wrapper");

    faqSections.forEach((section) => {
      const faqList = section.querySelectorAll(".faqs-item");

      faqList.forEach((item) => {
        const header = item.querySelector(".faqs-item-header");
        const headerHeight = header?.clientHeight || 0;
        const body = item.querySelector(".faqs-item-body");
        const bodyHeight = body?.clientHeight || 0;

        item.style.transition = "height 0.5s ease";
        item.style.overflow = "hidden";
        item.style.height = `${headerHeight}px`;

        if (item.classList.contains("active")) {
          item.style.height = `${headerHeight + bodyHeight}px`;
        }

        header?.addEventListener("click", () => {
          if (item.classList.contains("active")) {
            item.style.height = `${headerHeight}px`;
            item.classList.remove("active");
          } else {
            faqList.forEach((activeItem) => {
              activeItem.classList.remove("active");
              activeItem.style.height = `${headerHeight}px`;
            });

            item.style.height = `${headerHeight + bodyHeight}px`;
            item.classList.add("active");
          }
        });
      });
    });
  })();

  /*---------------------------- 
  AUTH SECTION START
  ---------------------------- */
  (function () {
    const passList = document.querySelectorAll(".auth-pass-input-box");

    if (passList) {
      passList.forEach((item) => {
        const toggle = item.querySelector(".auth-pass-toggle");
        const input = item.querySelector("input");

        if (toggle) {
          toggle.addEventListener("click", () => {
            // Toggle between hidden and visible password states
            const isHidden = item.classList.contains("pass-hidden");

            if (isHidden) {
              item.classList.remove("pass-hidden");
              item.classList.add("pass-visible");
              input.type = "text"; // Show password
            } else {
              item.classList.remove("pass-visible");
              item.classList.add("pass-hidden");
              input.type = "password"; // Hide password
            }
          });
        }
      });
    }
  })();

  (function () {
    const profileImage = document.getElementById(
      "user-dashboard-profile-image"
    );
    const profileInput = document.getElementById(
      "user-dashboard-profile-input"
    );
    profileInput &&
      profileInput.addEventListener("change", function () {
        const file = profileInput.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function (e) {
            profileImage.src = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      });
  })();
}); // END DOM CONTENT LOADED
