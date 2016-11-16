$('#scroll-down').click(function() {
  $('html, body').stop().animate({
    scrollTop: $('#homepage-content-section').offset().top
  }, 1000 );
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

    $('#layout-switch input[type="radio"]').on('click change', function(evt) {
      if(evt.target.value === "list") {
        $("#projects-container").css("animation-name", "gridlist");
        setTimeout(function() {
          $("#projects-container").addClass("list")
        }, 500);
        setTimeout(function() {
          $("#projects-container").css("animation-name", "");
        }, 1001);
      } else {
        $("#projects-container").css("animation-name", "gridlist");
        setTimeout(function() {
          $("#projects-container").removeClass("list")
        }, 500);
        setTimeout(function() {
          $("#projects-container").css("animation-name", "");
        }, 1001);
      }
    });
});
