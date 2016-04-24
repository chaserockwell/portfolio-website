/**
 * Created by chasekitteridge on 4/5/16.
 */
(function ($, window, document) {
  "use strict";

  ///// Variables /////
  var pageTitle = 'landing';

  // Logic that depends on the DOM loading
  $(function () {

    // Trigger hamburger icon events
    $('.hamburger').click(function () {
      toggleNavMenu();
    });

    // Scroll event for anchor tags
    $('a[href^="#"]').on('click', function(event) {
      try {
        var index = this.href.indexOf('#'),
            target = $(this.href.substring(index, this.href.length));

        if( target.length ) {
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000);
          if ($('.hamburger').hasClass('open')) {
            toggleNavMenu();
          }
        }
      } catch (error) {
        console.error(error);
      }
    });
  });

  // Toggle open class on drop down menu and hamburger icon
  function toggleNavMenu() {
    $('.nav-drop-menu').toggleClass('open');
    $('.hamburger').toggleClass('open');
  }

  // Change the page title when page is scrolled to each anchor
  function setPageTitle() {
    // Set window and section scroll positions and other variables
    var scrollPos = scrollY || pageYOffset,
      windowHeight = $(window).height(),
      navHeight = $('#nav').height(),
      buffer = navHeight + 100,
      landingPos = $('#landing').position().top - buffer,
      aboutPos = $('#about').position().top - buffer,
      contactPos = $('#contact').position().top - buffer,
      isTitleChanged = false;

    if (pageTitle !== 'landing' && (scrollPos > landingPos && scrollPos < aboutPos)) {
      pageTitle = 'landing';
      isTitleChanged = true;
    } else if (pageTitle !== 'about' && (scrollPos > aboutPos && scrollPos < contactPos)) {
      pageTitle = 'about';
      isTitleChanged = true;
    } else if (pageTitle !== 'contact' && (scrollPos > contactPos)) {
      pageTitle = 'contact';
      isTitleChanged = true;
    }

    if (isTitleChanged) changePageTitle();
  }

  // Debounce scroll function, hit every 150 ms
  var setPageTitleDebounced = _.debounce(setPageTitle, 150);

  // Change pageTitle UI
  function changePageTitle() {
    $('.page-title.active').removeClass('active');
    $('.page-title.' + pageTitle).addClass('active');
  }

  $(window).scroll(function () {
    setPageTitleDebounced();
  });
})(window.jQuery, window, document);