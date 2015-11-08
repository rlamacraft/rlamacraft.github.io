$(document).ready( function() {

  $('.project').click(function() {
    var url = $(this).data("src");
    var projectViewer = $('#project-viewer');

    console.log(url);

    projectViewer.load(url + " #project-wrapper", function() {
      //Once new content has loaded
      Prism.highlightAll(); //re-render code blocks
    });

    openDrawer($('#project-viewer-wrapper'), projectViewer, $("#project-viewer-close"), 1000);
  });

  $('#project-viewer-close').click(function() {
    closeDrawer($('#project-viewer-wrapper'), $('#project-viewer'), $("#project-viewer-close"),500);
  });

} );

/*
  Opens a drawer where the absParent is an absolutely positioned parent,
  relContainer is the relatively positioned child component that is the container
  for the compoennts in the drawer and faClose is a font awesome close icon.
  iconDelay is a period of time after the animation starts that the icon disappears.
*/
function openDrawer(absParent, relContainer, faClose, iconDelay) {
  absParent.css("z-index", "100");

  relContainer.show(function() {
    relContainer.css("transform", "translateX(-100%)").css("opacity", "1.0");
    relContainer.attr('data-open', 'true');
  });

  setTimeout(function() {
      faClose.css("display", "block").css("opacity", "1.0");
  }, iconDelay);
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
