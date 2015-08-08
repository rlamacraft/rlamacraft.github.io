// jQuery to collapse the navbar on scroll
/*$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});*/
pageScrollDown = true;

$(window).scroll(function() {
    btn = $(".page-scroll i");
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
});

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
      if(pageScrollDown) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500);
        event.preventDefault();
      } else {
        $('html, body').stop().animate({
            scrollTop: 0
        }, 1500);
      }
      pageScrollDown = !pageScrollDown;
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});
