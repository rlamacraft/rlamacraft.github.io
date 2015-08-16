// jQuery to collapse the navbar on scroll
pageScrollDown = true;

$(window).scroll(function() {
    btn = $("#scroll-btn i");
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
        $(".content-section").css("opacity", "1.0");
        btn.removeClass("fa-chevron-circle-down");
        btn.addClass("fa-chevron-circle-up");
        pageScrollDown = false;
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
        $(".content-section").css("opacity", "0.0");
        btn.removeClass("fa-chevron-circle-up");
        btn.addClass("fa-chevron-circle-down");
        pageScrollDown = true;
    }
    if( $(".navbar").offset().top + 50 > $(".intro-color-box").height() ) {
      $(".page-scroll-btn").css({
          "position": "fixed",
          "top" : "15px",
      });
    } else {
      $(".page-scroll-btn").css({
          "position": "absolute",
          "top" : "260px",
      });
    }
});

//scroll button
$(function() {
    $('#scroll-btn').bind('click', function(event) {
      $('#scroll-btn').addClass('btn-highlight');
      if(pageScrollDown) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 90
        }, 1500);
        event.preventDefault();
      } else {
        $('html, body').stop().animate({
            scrollTop: 0
        }, 1500);
      }
      window.setTimeout(function() {
        $('#scroll-btn').removeClass('btn-highlight');
      }, 1500);
      pageScrollDown = !pageScrollDown;
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

$(document).ready( function() {
    $(".content-section").css("display", "block");

    $('#scroll-btn').hover(function() {
      $('#scroll-btn').addClass('btn-highlight');
    }, function() {
      $('#scroll-btn').removeClass('btn-highlight');
    });
});
