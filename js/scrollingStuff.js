// jQuery to collapse the navbar on scroll

$(window).scroll(function() {
    isFloating = document.body.scrollTop > 0;
    if (isFloating) {
        $(".content-section.toggle-hidden").css("opacity", "1.0");
    } else {
        $(".content-section.toggle-hidden").css("opacity", "0.0");
    }

    belowHeader = document.body.scrollTop >= $('.intro').outerHeight();
    if( belowHeader ) {
      $('#scroll-up').css('opacity','1.0');
      $('#scroll-up i').removeClass('fa-home').addClass('fa-chevron-up');
    } else {
      $('#scroll-up i').removeClass('fa-chevron-up').addClass('fa-home');
      $('#scroll-up.homepage i').removeClass('fa-home').addClass('fa-refresh');
    }
});

$('#scroll-up').click(function() {
  belowHeader = document.body.scrollTop >= $('.intro').outerHeight();
  if( belowHeader ) {
    $('html, body').stop().animate({
        scrollTop: 0
    }, 1500);
  } else {
      window.location.href = "index.html";
  }
})

$('#scroll-down').click(function() {
  $('html, body').stop().animate({
    scrollTop: $('#main').offset().top
  }, 1500);
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

$(document).ready( function() {
    $(".content-section").css("display", "block");

    $('input.form-control').focus(function() {
      var parent = $($($(this).parent()[0]).parent()[0]);
      parent.addClass('focused');
    });

    $('input.form-control').focusout(function() {
      var parent = $($($(this).parent()[0]).parent()[0]);
      parent.removeClass('focused');
    });

    //small header pages have animated loading of content
    $('.content-section.always-show').css('opacity', '1.0');
    allPanels = $('.content-section.always-show .content-panel');

    panelIndex = 0;
    makePanelsVisible = window.setInterval(function() {
      $(allPanels[panelIndex]).css('opacity', '1.0');
      panelIndex++;
      if(panelIndex === allPanels.length)
        window.clearInterval(makePanelsVisible);
    }, 250);

    if(window.location.hash !== "")
      $(window.location.hash).parent().parent().parent().css('opacity', '1.0');

    function openTag(tag) {
      $('.tag').removeClass('open');
      thisTag = $(tag);
      thisTag.addClass('open');
      thisTag.data("open", '1');
    }

    function closeTag(tag) {
      thisTag = $(tag);
      thisTag.removeClass('open');
      thisTag.data("open", '0');
    }

    $('.tag').data('open', '0');
    function isOpen(tag) {
      if($(tag).data('open') === '1')
        return true;
      return false;
    }

    tagClick = function(tag) {
      window.location.href = "projectTags.html#" + $(tag).data('href');
    }

    $('.tag').on("mouseenter", function() {
      openTag(this);
    });

    $('.tag').on("mouseleave", function() {
      closeTag(this);
    });

    $('.tag').on("touchstart", function (e) {
      if(isOpen(this))
        tagClick(this);
    });

    $('.tag').on("mousedown", function (e) {
      if(isOpen(this))
        tagClick(this);
    });

});
