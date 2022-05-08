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

// $(function () {
//   $('.page-pic-change').owlCarousel({
//     nav: true,
//     dots: false,
//     loop: true,
//     items: 1,
//     slideSpeed: 1200,
//     paginationSpeed: 1000,
//     smartSpeed: 1200,
//   })
// })
// FancyBox
$('[data-fancybox]').fancybox({
  buttons: ['zoom', 'fullScreen', 'close'],
})
