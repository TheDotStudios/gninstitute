(function ($) {
  "use strict";

  var $window = $(window);
  var $body = $("body");

  /* Preloader Effect */
  $window.on("load", function () {
    $(".preloader").fadeOut(600);
  });

  /* Sticky Header */
  if ($(".active-sticky-header").length) {
    $window.on("resize", function () {
      setHeaderHeight();
    });

    function setHeaderHeight() {
      $("header.main-header").css(
        "height",
        $("header .header-sticky").outerHeight(),
      );
    }

    $(window).on("scroll", function () {
      var fromTop = $(window).scrollTop();
      setHeaderHeight();
      var headerHeight = $("header .header-sticky").outerHeight();
      $("header .header-sticky").toggleClass(
        "hide",
        fromTop > headerHeight + 100,
      );
      $("header .header-sticky").toggleClass("active", fromTop > 600);
    });
  }

  /* Slick Menu JS */
  $("#menu").slicknav({
    label: "",
    prependTo: ".responsive-menu",
  });

  if ($("a[href='#top']").length) {
    $("a[href='#top']").click(function () {
      $("html, body").animate({ scrollTop: 0 }, "slow");
      return false;
    });
  }

  /* Hero Slider Layout JS */
  const hero_slider_layout = new Swiper(".hero-slider-layout .swiper", {
    slidesPerView: 1,
    speed: 1000,
    spaceBetween: 0,
    loop: true,
    autoplay: {
      delay: 4000,
    },
    pagination: {
      el: ".hero-pagination",
      clickable: true,
    },
  });

  /* testimonial Slider JS */
  if ($(".testimonial-slider").length) {
    const testimonial_slider = new Swiper(".testimonial-slider .swiper", {
      slidesPerView: 1,
      speed: 1000,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 5000,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".testimonial-button-next",
        prevEl: ".testimonial-button-prev",
      },
      breakpoints: {
        768: {
          slidesPerView: 1,
        },
        991: {
          slidesPerView: 1,
        },
      },
    });
  }

  /* Skill Bar */
  if ($(".skills-progress-bar").length) {
    $(".skills-progress-bar").waypoint(
      function () {
        $(".skillbar").each(function () {
          $(this)
            .find(".count-bar")
            .animate(
              {
                width: $(this).attr("data-percent"),
              },
              2000,
            );
        });
      },
      {
        offset: "70%",
      },
    );
  }

  /* Youtube Background Video JS */
  if ($("#herovideo").length) {
    var myPlayer = $("#herovideo").YTPlayer();
  }

  /* Init Counter */
  if ($(".counter").length) {
    $(".counter").counterUp({ delay: 6, time: 3000 });
  }

  /* Image Reveal Animation */
  if ($(".reveal").length) {
    gsap.registerPlugin(ScrollTrigger);
    let revealContainers = document.querySelectorAll(".reveal");
    revealContainers.forEach((container) => {
      let image = container.querySelector("img");
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          toggleActions: "play none none none",
        },
      });
      tl.set(container, {
        autoAlpha: 1,
      });
      tl.from(container, 1, {
        xPercent: -100,
        ease: Power2.out,
      });
      tl.from(image, 1, {
        xPercent: 100,
        scale: 1,
        delay: -1,
        ease: Power2.out,
      });
    });
  }

  /* Parallaxie js */
  var $parallaxie = $(".parallaxie");
  if ($parallaxie.length && $window.width() > 991) {
    if ($window.width() > 768) {
      $parallaxie.parallaxie({
        speed: 0.55,
        offset: 0,
      });
    }
  }

  /* Zoom Gallery screenshot */
  $(".gallery-items").magnificPopup({
    delegate: "a",
    type: "image",
    closeOnContentClick: false,
    closeBtnInside: false,
    mainClass: "mfp-with-zoom",
    image: {
      verticalFit: true,
    },
    gallery: {
      enabled: true,
    },
    zoom: {
      enabled: true,
      duration: 300, // don't foget to change the duration also in CSS
      opener: function (element) {
        return element.find("img");
      },
    },
  });

  var $contactform = $("#contactForm");
  $contactform.validator({ focus: false }).on("submit", function (event) {
    if (!event.isDefaultPrevented()) {
      event.preventDefault();

      // Reset the form
      $contactform[0].reset();

      // Show the popup
      var popup = document.getElementById("successPopup");
      popup.style.display = "flex";

      // Optional: close popup if user clicks the dark backdrop
      popup.addEventListener("click", function (e) {
        if (e.target === popup) popup.style.display = "none";
      });
    }
  });

  function submitMSG(valid, msg) {
    if (valid) {
      var msgClasses = "h4 text-success";
    } else {
      var msgClasses = "h4 text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
  }
  /* Contact form validation end */

  /* Appointment form validation */
  var $appointmentForm = $("#appointmentForm");
  $appointmentForm.validator({ focus: false }).on("submit", function (event) {
    if (!event.isDefaultPrevented()) {
      event.preventDefault();
      // submitappointmentForm();
    }
  });

  function submitappointmentForm() {
    /* Ajax call to submit form */
    $.ajax({
      type: "POST",
      url: "form-appointment.php",
      data: $appointmentForm.serialize(),
      success: function (text) {
        if (text == "success") {
          appointmentformSuccess();
        } else {
          appointmentsubmitMSG(false, text);
        }
      },
    });
  }

  function appointmentformSuccess() {
    $appointmentForm[0].reset();
    appointmentsubmitMSG(true, "Message Sent Successfully!");
  }

  function appointmentsubmitMSG(valid, msg) {
    if (valid) {
      var msgClasses = "h3 text-success";
    } else {
      var msgClasses = "h3 text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
  }
  /* Appointment form validation end */

  /* Animated Wow Js */
  new WOW().init();

  /* Popup Video */
  if ($(".popup-video").length) {
    $(".popup-video").magnificPopup({
      type: "iframe",
      mainClass: "mfp-fade",
      removalDelay: 160,
      preloader: false,
      fixedContentPos: true,
    });
  }
})(jQuery);
var lastScroll = 0;
var header = document.querySelector(".header-sticky");

window.addEventListener("scroll", function () {
  var currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll && currentScroll > 100) {
    // Scrolling DOWN — remove sticky, hide
    header.classList.remove("active");
    header.classList.remove("hide");
  } else if (currentScroll < lastScroll && currentScroll > 100) {
    // Scrolling UP — make sticky and show
    header.classList.add("active");
    header.classList.remove("hide");
  } else {
    // At top — normal position
    header.classList.remove("active");
    header.classList.remove("hide");
  }

  lastScroll = currentScroll;
});
