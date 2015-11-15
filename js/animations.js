var currentProjectUrl = undefined;

$(document).ready( function() {

  //project is opened
  $('.project').click(function() {
    var url = $(this).data("src");
    var projectViewer = $('#project-viewer');

    console.log(currentProjectUrl + "==" + url);
    if(url !== currentProjectUrl) {
      projectViewer.load(url + " #project-wrapper", function() {
        //Once new content has loaded
        Prism.highlightAll(); //re-render code blocks
        $('.image-fullscreen-open').click(function() { openImageFullscreen(this) });
      });
      currentProjectUrl = url;
      openDrawer($('#project-viewer-wrapper'), projectViewer, $('#project-viewer-close'), 1000, 100, "-100%");
      projectViewer.scrollTop(0);
    } else {
      openDrawer($('#project-viewer-wrapper'), projectViewer, $('#project-viewer-close'), 1000, 100, "-100%");
    }
  });

  //project is closed
  $('#project-viewer-close').click(function() {
    closeDrawer($('#project-viewer-wrapper'), $('#project-viewer'), $('#project-viewer-close'), 500);
  });

  $('#image-fullscreen-close').click(closeImageFullscreen);
} );

/*
  Opens a drawer where the absParent is an absolutely positioned parent,
  relContainer is the relatively positioned child component that is the container
  for the compoennts in the drawer and faClose is a font awesome close icon.
  iconDelay is a period of time after the animation starts that the icon disappears.
*/
function openDrawer(absParent, relContainer, faClose, iconDelay, zIndex, translation) {
  absParent.css("z-index", zIndex);

  relContainer.show(function() {
    relContainer.css("transform", "translateX(" + translation + ")");
    relContainer.css("opacity", "1.0");
    relContainer.attr('data-open', 'true');
  });

  setTimeout(function() {
      faClose.css("display", "block").css("opacity", "1.0");
  }, iconDelay);
}

function openImageFullscreen(openButton) {
  $('#image-fullscreen').show(function() {
    $('#image-fullscreen').addClass('show');
    $('#image-fullscreen-close').addClass('show').show();
    $('#image-fullscreen-image').attr("src", ($(openButton).data("imagesrc")));
  });
}

function closeImageFullscreen() {
  $('#image-fullscreen').removeClass('show').hide('slow');
  $('#image-fullscreen-close').removeClass('show').hide();
}

/*
  Closes a drawer where absParent is an absolutely positioned parent,
  relContainer is the relatively positioned child component that is the container
  for the compoennts in the drawer and faClose is a font awesome close icon.
  animationDuration is the period of time for the animation to run for, duh.
*/
function closeDrawer(absParent, relContainer, faClose, animationDuration) {
  relContainer.css("transform", "none");
  relContainer.animate({
    opacity: "0"
  },animationDuration,function() {
    relContainer.hide()
  });

  faClose.css("display", "none").css("opacity", "0.0");

  setTimeout(function() {
    absParent.css("z-index", "0");
  }, animationDuration);
}
