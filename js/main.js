$('#scroll-down').click(function() {
  $('html, body').stop().animate({
    scrollTop: $('#main').offset().top
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

    if(window.location.hash !== "")
      $(window.location.hash).parent().parent().parent().css('opacity', '1.0');

    $('.project').on('click mouseover', function() {
      $('.project').removeClass('hover');
      $(this).addClass('hover');
    });

    $('.project').on('mouseleave', function() {
      $('.project').removeClass('hover');
    })

});
