$('#scroll-down').click(function() {
  $('html, body').stop().animate({
    scrollTop: $('#main').offset().top
  }, 1500);
})

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

    $('.tag').on("mouseenter", function() {
      openTag(this);
    });

    $('.tag').on("mouseleave", function() {
      closeTag(this);
    });
});
