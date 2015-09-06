// jQuery to collapse the navbar on scroll
pageScrollDown = true;

$(window).scroll(function() {
    btn = $("#scroll-btn i");
    navBar = $(".navbar");
    isFloating = navBar.offset().top > 50;
    if (isFloating) {
        navBar.addClass("top-nav-collapse");
        navBar.addClass("shadow");
        $(".content-section.toggle-hidden").css("opacity", "1.0");
        btn.removeClass("fa-chevron-circle-down");
        btn.addClass("fa-chevron-circle-up");
        pageScrollDown = false;
    } else {
        navBar.removeClass("top-nav-collapse");
        navBar.removeClass("shadow");
        $(".content-section.toggle-hidden").css("opacity", "0.0");
        btn.removeClass("fa-chevron-circle-up");
        btn.addClass("fa-chevron-circle-down");
        pageScrollDown = true;
    }
    if( $(".navbar").offset().top + 10 > $(".intro").height() ) {
      $('#scroll-btn').addClass('floating');
    } else {
      $('#scroll-btn').removeClass('floating');
    }
});

//scroll button
$(function() {
    $('#scroll-btn').bind('click', function(event) {
      $('#scroll-btn').addClass('btn-highlight');
      if(pageScrollDown) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 50// - 90
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
    }, 750);

    function openTag(tag) {
      console.log("open");
      $('.tag').removeClass('open'); //use closeTag() on all?

      thisTag = $(tag);
      thisTag.addClass('open');
      thisTag.data("open", '1');
    }

    function closeTag(tag) {
      thisTag = $(tag);
      thisTag.removeClass('open');
      thisTag.data("open", '0');
    }

    /*function tagAction(tag, source) {
      setData = function(newAction) {
        $(tag).data('action', newAction);
      }

      action = $(tag).data('action'); */
      /*switch(action) {
        case('open'): openTag(tag); setData('go'); break;
        case('go'):   console.log("go"); break;
      }*/
      /*if(source === 'hover') {
        openTag(this);
      } else if(source === 'click') {
        console.log("go");
      }
    }*/


    /*$('.tag').hover(function() {
      tagAction(this, 'hover');
    }, function() {
      closeTag(this);
    } );

    $('.tag').click(function() {
      tagAction(this, 'click');
    })*/

    /*$('.tag.open').on("touchstart", function (e) {
      console.log("touch tap");
    });*/

    $('.tag').data('open', '0');
    function isOpen(tag) {
      if($(tag).data('open') === '1')
        return true;
      return false;
    }

    /*$('.tag').on("mouseover", function() {
      console.log("hover start");
      openTag(this);
    });

    $('.tag').on("mouseleave", function() {
      console.log("hover end");
      closeTag(this);
    });*/

    $('.tag').hover(function() {
      openTag(this);
    }, function() {
      closeTag(this);
    });

    $('.tag').on("touchstart", function (e) {
      console.log("tap: " + isOpen(this));
      if(isOpen(this))
        alert("touch tap");
    });

    $('.tag').on("mousedown", function (e) {
      console.log("mousedown: " + isOpen(this));
      if(isOpen(this))
        alert("mouse tap");
    });



});
