//
// Плавная прокрутка к якорю
//

const menuLinks = document.querySelectorAll(".menu__link[data-goto]");
if (menuLinks.length > 0) {
  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener("click", onMenuLinkClick);
  });

  function onMenuLinkClick(e) {
    const menuLink = e.target;
    if (
      menuLink.dataset.goto &&
      document.querySelector(menuLink.dataset.goto)
    ) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      const gotoBlockValue =
        gotoBlock.getBoundingClientRect().top +
        pageYOffset -
        2 * document.querySelector("header").offsetHeight;

      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth",
      });
      e.preventDefault();
    }
  }
}
// for (let index = 0; index < array.length; index++) {
//   const element = array[index];
// }

// меню-бургер

$(function () {
  $(".menu-btn").on("click", function () {
    $(".menu__list").toggleClass("active");
    $(".header").toggleClass("active");
    $(".menu-btn").toggleClass("active");
  });
});

// slick for BARF

$(window).on("load resize", function () {
  if ($(window).width() <= 715) {
    $(".barf__composition-inner").not(".slick-initialized").slick({
      arrows: false,
      dots: true,
      infinite: true,
      speed: 100,
      slidesToShow: 1,
    });
  }
});
$(window).on("load resize", function () {
  if ($(window).width() > 715) {
    $(".barf__composition-inner").filter(".slick-initialized").slick("unslick");
  }
});

// slick for Ration
// $(document).ready(function () {
//   $(".ration__cards").slick({
//     arrows: false,
//     dots: true,
//     speed: 100,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//   });
// });
$(window).on("load resize", function () {
  if ($(window).width() <= 1170) {
    $(".ration__cards")
      .not(".slick-initialized")
      .slick({
        arrows: false,
        dots: true,
        speed: 600,
        slidesToShow: 3,
        slidesToScroll: 1,
        draggable: false,
        responsive: [
          {
            breakpoint: 900,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              speed: 600,
              dots: true,
              arrows: false,
              draggable: false,
            },
          },
          {
            breakpoint: 630,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              speed: 600,
              dots: true,
              arrows: false,
              draggable: false,
            },
          },
        ],
      });
  }
});
$(window).on("load resize", function () {
  if ($(window).width() > 1170) {
    $(".ration__cards").filter(".slick-initialized").slick("unslick");
  }
});

//
// Липкий хэдер
//

$(function () {
  const windowHeight = $(window).height();
  window.onscroll = function showHeader() {
    var header = document.querySelector(".header");

    if (window.pageYOffset > windowHeight) {
      header.classList.add("header_fixed");
    } else {
      header.classList.remove("header_fixed");
    }
  };
});

//
// Подключение слайдера Swiper
//

var swiper = new Swiper(".mySwiper", {
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});
var swiper2 = new Swiper(".mySwiper2", {
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: swiper,
  },
});

//
// Спойлер для блока FAQ
//
$(document).ready(function () {
  $(".block__item-title").click(function (event) {
    if ($(".faq__box-block").hasClass("one")) {
      $(".block__item-title").not($(this)).removeClass("active");
      $(".block__item-text").not($(this).next()).slideUp(300);
    }
    $(this).toggleClass("active").next().slideToggle(300);
  });
});

//
// Модальные окна
//

const popupLinks = document.querySelectorAll(".popup-link");
const body = document.querySelector("body");
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
  for (let index = 0; index < popupLinks.length; index++) {
    const popupLink = popupLinks[index];
    popupLink.addEventListener("click", function (e) {
      const popupName = popupLink.getAttribute("href").replace("#", "");
      const currentPopup = document.getElementById(popupName);
      popupOpen(currentPopup);
      e.preventDefault();
    });
  }
}
const popupCloseIcon = document.querySelectorAll(".close-popup");
if (popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++) {
    const el = popupCloseIcon[index];
    el.addEventListener("click", function (e) {
      popupClose(el.closest(".popup"));
      e.preventDefault();
    });
  }
}

function popupOpen(currentPopup) {
  if (currentPopup && unlock) {
    const popupActive = document.querySelector(".popup.open");
    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }
    currentPopup.classList.add("open");
    currentPopup.addEventListener("click", function (e) {
      if (!e.target.closest(".popup__box")) {
        popupClose(e.target.closest(".popup"));
      }
    });
  }
}
function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove("open");
    if (doUnlock) {
      bodyUnLock();
    }
  }
}

function bodyLock() {
  const lockPaddingValue =
    window.innerWidth - document.querySelector(".header").offsetWidth + "px";
  if (lockPadding.length > 0) {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = lockPaddingValue;
    }
  }
  body.style.paddingRight = lockPaddingValue;
  body.classList.add("lock");

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

function bodyUnLock() {
  setTimeout(function () {
    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = "0px";
      }
    }
    body.style.paddingRight = "0px";
    body.classList.remove("lock");
  }, timeout);

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

document.addEventListener("keydown", function (e) {
  if (e.which === 27) {
    const popupActive = document.querySelector(".popup.open");
    popupClose(popupActive);
  }
});

//
// Script for custom style of input number
//

jQuery(
  '<div class="quantity-nav"><div class="quantity-button quantity-up"><img src="images/Plus.png"></div><div class="quantity-button quantity-down"><img src="images/minus.png"></div></div>'
).insertAfter(".quantity input");
jQuery(".quantity").each(function () {
  var spinner = jQuery(this),
    input = spinner.find('input[type="number"]'),
    btnUp = spinner.find(".quantity-up"),
    btnDown = spinner.find(".quantity-down"),
    min = input.attr("min"),
    max = input.attr("max");

  btnUp.click(function () {
    var oldValue = parseFloat(input.val());
    if (oldValue >= max) {
      var newVal = oldValue;
    } else {
      var newVal = oldValue + 1;
    }
    spinner.find("input").val(newVal);
    spinner.find("input").trigger("change");
  });

  btnDown.click(function () {
    var oldValue = parseFloat(input.val());
    if (oldValue <= min) {
      var newVal = oldValue;
    } else {
      var newVal = oldValue - 1;
    }
    spinner.find("input").val(newVal);
    spinner.find("input").trigger("change");
  });
});

//
// Sending data from footer form
//

("use strict");

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("footer__feedback-form");
  form.addEventListener("submit", formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);

    if (error === 0) {
      // const load = document.getElementById("body");
      // load.classList.add("_sending");

      let response = await fetch("mail.php", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        let result = await response.json();

        alert(result.message);
        form.reset();
        // load.classList.remove("_sending");
      } else {
        alert("Ошибка");
        // load.classList.remove("_sending");
      }
    } else {
      alert("Заполните обязательные поля");
    }
  }

  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll("._req");

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);

      if (input.classList.contains("_email")) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      } else if (
        input.getAttribute("type") === "checkbox" &&
        input.checked === false
      ) {
        formAddError(input);
        error++;
      } else {
        if (input.value === "") {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }

  function formAddError(input) {
    input.parentElement.classList.add("_error");
    input.classList.add("_error");
  }

  function formRemoveError(input) {
    input.parentElement.classList.remove("_error");
    input.classList.remove("_error");
  }
  // test of email
  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }
});
