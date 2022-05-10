$(function () {
  $('.project-carousel').owlCarousel({
    nav: false,
    dots: false,
    margin: 24,
    loop: true,
    items: 6,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    slideSpeed: 1200,
    paginationSpeed: 1000,
    smartSpeed: 1200,
  })
})
// MAP
if ($('#map').length > 0) {
  function initMap() {
    // Map options
    var options = {
      zoom: 8,
      center: { lat: 40.409264, lng: 49.867092 },
    }
    // new map
    var map = new google.maps.Map(document.getElementById('map'), options)
    // Marker
    var marker = new google.maps.Marker({
      position: { lat: 40.409264, lng: 49.867092 },
      map: map,
    })
  }
}

var navbar = document.querySelector('.header-flex')
window.onscroll = function () {
  if (window.pageYOffset > 0) {
    navbar.classList.add('scrolled')
  } else {
    navbar.classList.remove('scrolled')
  }
}

// FancyBox
$('[data-fancybox]').fancybox({
  buttons: ['zoom', 'fullScreen', 'close'],
})

let open = document.getElementById('open')
let menu = document.getElementById('open-menu')
let close = document.getElementById('close-menu')

open.addEventListener('click', function onClick() {
  menu.style.display = 'block'
  open.style.display = 'none'
})
close.addEventListener('click', function onClick() {
  menu.style.display = 'none'
  open.style.display = 'block'
})

// owl nav bottom
const prevIcon = '<i class="fa fa-long-arrow-left" aria-hidden="true"></i>'
const nextIcon = '<i class="fa fa-long-arrow-right" aria-hidden="true"></i>'
$(function () {
  $('.owl-gal').owlCarousel({
    nav: true,
    dots: false,
    loop: true,
    margin: 8,
    items: 4,
    slideSpeed: 1200,
    paginationSpeed: 1000,
    smartSpeed: 1200,
    navText: [prevIcon, nextIcon],
    responsive: {
      992: { items: 4 },
      576: { items: 3 },
    },
  })
})
// project details
$(document).ready(function () {
  var sync1 = $('#sync1')
  var sync2 = $('#sync2')
  var slidesPerPage = 5
  var syncedSecondary = true

  sync1
    .owlCarousel({
      items: 1,
      slideSpeed: 2000,
      nav: true,
      dots: false,
      loop: true,
      responsiveRefreshRate: 200,
      navText: [prevIcon, nextIcon],
    })
    .on('changed.owl.carousel', syncPosition)

  sync2
    .on('initialized.owl.carousel', function () {
      sync2.find('.owl-item').eq(0).addClass('current')
    })
    .owlCarousel({
      items: slidesPerPage,
      dots: false,
      nav: false,
      smartSpeed: 200,
      slideSpeed: 500,
      slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
      responsiveRefreshRate: 100,
    })
    .on('changed.owl.carousel', syncPosition2)

  function syncPosition(el) {
    //if you set loop to false, you have to restore this next line
    //var current = el.item.index;

    //if you disable loop you have to comment this block
    var count = el.item.count - 1
    var current = Math.round(el.item.index - el.item.count / 2 - 0.5)

    if (current < 0) {
      current = count
    }
    if (current > count) {
      current = 0
    }

    //end block

    sync2
      .find('.owl-item')
      .removeClass('current')
      .eq(current)
      .addClass('current')
    var onscreen = sync2.find('.owl-item.active').length - 1
    var start = sync2.find('.owl-item.active').first().index()
    var end = sync2.find('.owl-item.active').last().index()

    if (current > end) {
      sync2.data('owl.carousel').to(current, 100, true)
    }
    if (current < start) {
      sync2.data('owl.carousel').to(current - onscreen, 100, true)
    }
  }

  function syncPosition2(el) {
    if (syncedSecondary) {
      var number = el.item.index
      sync1.data('owl.carousel').to(number, 100, true)
    }
  }

  sync2.on('click', '.owl-item', function (e) {
    e.preventDefault()
    var number = $(this).index()
    sync1.data('owl.carousel').to(number, 300, true)
  })
})
//  fade in fade out element in same location
$('.main-text').hide()

function test(elem) {
  elem.fadeIn(2000, function () {
    elem.fadeOut(1000, function () {
      test(
        elem.next('.main-text').length
          ? elem.next('.main-text')
          : $('.main-text:first')
      )
    })
  })
}

test($('.main-text:first'))

// Change whole bg of page
const leftChevron = '<i class="fa fa-chevron-left" aria-hidden="true"></i>'
const rightChevron = '<i class="fa fa-chevron-right" aria-hidden="true"></i>'
$(function () {
  $('.site-slider').owlCarousel({
    loop: true,
    auto: true,
    dots: false,
    mouseDrag: true,
    autoplay: false,
    items: 1,
    nav: true,
    navText: [leftChevron, rightChevron],
    onTranslated: function () {
      var $slideHeading = $('.site-slider .owl-item.active .slider-text h1')
      var $slidePara = $(
        '.site-slider .owl-item.active .slider-text h3, .site-slider .owl-item.active .slider-text .animation-btn'
      )

      $slideHeading.addClass('animate-in-fast').on('animationend', function () {
        $slideHeading.removeClass('animate-in-fast').addClass('opacFull')
      })

      $slidePara.addClass('animate-in-slow').on('animationend', function () {
        $slidePara.removeClass('animate-in-slow').addClass('opacFull')
      })
    },
    onChange: function () {
      var $slideHeading = $('.site-slider .owl-item.active .slider-text h1')
      var $slidePara = $(
        '.site-slider .owl-item.active .slider-text h3, .site-slider .owl-item.active .slider-text a'
      )
      $slideHeading.removeClass('opacFull')
      $slidePara.removeClass('opacFull')
    },
  })
})

$(window).on('load', function () {
  var $slideHeading = $('.site-slider .owl-item.active .slider-text h1')
  var $slidePara = $(
    '.site-slider .owl-item.active .slider-text h3, .site-slider .owl-item.active .slider-text .animation-btn'
  )

  $slideHeading.addClass('animate-in-fast').on('animationend', function () {
    $slideHeading.removeClass('animate-in-fast').addClass('opacFull')
  })

  $slidePara.addClass('animate-in-slow').on('animationend', function () {
    $slidePara.removeClass('animate-in-slow').addClass('opacFull')
  })
})
// arrow bounce
var arrowBounce = function () {
  var arrow = $('.arrow')

  if (arrow.hasClass('lift')) {
    arrow.removeClass('lift')
  } else {
    arrow.addClass('lift')
  }
}
setInterval(arrowBounce, 600)

// Hamburger Menu
const navMenu = document.querySelector('#navMenu')
navMenu.addEventListener('click', () => {
  navMenu.classList.toggle('active')
})
