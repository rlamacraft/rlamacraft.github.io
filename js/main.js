$('#scroll-down').click(function() {
  $('html, body').stop().animate({
    scrollTop: $('#homepage-content-section').offset().top
  }, 1500);
})

$(document).ready( function() {
    $('input.form-control').focus(function() {
      var parent = $($($(this).parent()[0]).parent()[0]);
      parent.addClass('focused');
    });

    $('input.form-control').focusout(function() {
      var parent = $($($(this).parent()[0]).parent()[0]);
      parent.removeClass('focused');
    });

    $('.project').on('click', function() {
      $('.project').removeClass('hover');
      $(this).addClass('hover');
    });

    $('.overlay-buttons a').on('focus', function() {
      $('.project').removeClass('hover');
      $(this).parents('.project').addClass('hover');
    });
});
