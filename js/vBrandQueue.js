var opts = {};
var mouseOver = false;
var mouseOverWatch = false;
var minimizedstate = true;
var minimizedWatchstate = true;
var player
;(function($){

  $.extend($.fn, {
    vBrandQueue: function(settings) {
      // Set up defaults
      var defaults = {
        container: this,
        data: $.parseJSON(getJsonData())
      };


      // Overwrite default options with user provided ones.
      opts = $.extend({}, defaults, settings);

      // Wrapper
      var queue = $('<div />', {'class': "vbrand-queue"}).appendTo(opts.container);

      // Container
      $(opts.container)
        .addClass('vbrand-container');

      // Create items
      $(opts.data.VideoQueue).each(function() {
        $(this).vBrandQueueItem().appendTo(queue);
      });

      queue.jScrollPane();
      var jsp = queue.data('jsp');

      setTimeout(function() {
        // Icon
        $('.inqueue')
          .first()
          .removeClass('outside')
          .addClass('icon');
      }, 1000);

      // Active
      $('.vbrand-item').mouseenter(function() {
        $(this).vBrandHoverDrop();
        $('.inqueue').removeClass('outside'); //making sure all drops ares inside
        queue.addClass('hovered');
        mouseOver = true;
      });

      $('.inqueue').mouseleave(function() {
        $(this).removeClass('active');
      });

      queue.mouseleave(function() {
        $('.inqueue').removeClass('active');
        setTimeout(function() {
          if (!mouseOver) {
            $(this).minimizeDrop();
            queue.removeClass('hovered');
            jsp.scrollToY(0, true);
          }
        }, 2000);
        mouseOver = false;
        if(minimizedstate) {
          $('.inqueue').removeClass('active').addClass('outside');
          $('.inqueue').first().addClass('icon').removeClass('outside');
        }
      });

      // Watch later
      $('.later').click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).closest('.vbrand-item').vBrandWatchLater();
      });

    },

    // Generate the markup for a single item.
    vBrandQueueItem: function() {
      var item = this[0];
      var queueItem = $('<a />', {
        'class': "vbrand-item inqueue outside vbrand-item" + item.id,
        //'href': item.url,
        'style': "background-image: url('" + item.image_url + "')",
    'contenturl': item.url
      });
      $('<span />', {'class': "title"})
        .text(item.title)
        .appendTo(queueItem);
      //$('<span />', {'class': "later"})
      $('<img class="later" src="http://d1fnuwuy1vks2k.cloudfront.net/media/watchlater.png" height="25" width="25">', {'class': "later"})
        //.text("Watch later")
        .appendTo(queueItem);
      // Sponsored
      if (item.type == 'sponsored') {
        $('<span />', {'class': "sponsored"})
          .text(item.type)
          .appendTo(queueItem);
      }
      return queueItem;
    },

    // Handle state changes on hover.
    vBrandHoverDrop: function() {
      if ($(this).is('.icon')) {
        // Initial state - bring in all items.
        $(this)
          .addClass('active')
          .removeClass('icon')
          .siblings()
          .each(function(i) {
            var item = $(this);
            setTimeout( function(i){
              item.removeClass('outside');
            }, i*100);
          });
      }
      else {
        // Active class.
        $(this)
          .addClass('active')
          .siblings('.active')
          .removeClass('active');
      }
    minimizedstate=false;
    },
  OpenDrop: function() {
    if(minimizedWatchstate){ // open only if watch-later queue is close
      $('.inqueue').first().removeClass('outside').removeClass('icon');
      minimizedstate=false;
      if(!mouseOver) {$('.inqueue').first().addClass('active');}
    }
  },
  CloseDrop: function() {
    if(!mouseOver) {
      $('.inqueue').removeClass('active').addClass('outside');
      $('.inqueue').first().addClass('icon').removeClass('outside');
    }
    minimizedstate=true;
  },
  // Watch later handler.
    minimizeDrop: function() {
    if ($('.inqueue').first().is('.icon')) {
      // already minimized
    }else{
      $('.inqueue').addClass('outside');
      $('.inqueue').first().addClass('icon').removeClass('active');
      //$('.inqueue').first().removeClass('outside').addClass('icon');
    }
  },
    // Watch later handler.
    vBrandWatchLater: function() {
    $(this).removeClass('inqueue');
      var item = $(this),
          pos = item.position(),
          wrp = $('<div />').width(item.width()).height(item.outerHeight(true))
          queueHeight = item.closest('.vbrand-queue').outerHeight();

      opts.queueData = opts.queueData || {}
      opts.queueData[item.data('id')] = item.data('id');
      if ("console" in window) {
        console.log('1 item added to queue.');
      }

      item
        .unbind('mouseenter')
        .unbind('mouseleave')
        .wrap(wrp)
        .css({
          "position": "absolute",
          "bottom": queueHeight - pos.top - item.outerHeight(true)
        })
        .animate({
          "bottom": "20px"
        }, 200, function() {
          $(this)
            .removeClass('active')
            .addClass('watch-later')
            .unbind('click')
            .click(function() {
        if (!mouseOver) {$(this).minimizeDrop();}
        $('.watch-later.wlq-close').addClass('wlq-open').removeClass('wlq-close');
        mouseOverWatch=true;
        minimizedWatchstate=false;
        $('.inqueue').minimizeDrop();
            });
      if (minimizedWatchstate) {$(this).addClass('wlq-close')} else {$(this).addClass('wlq-open')}
        })
        .parent().animate({
          "height": 0
        }, 400)
    .mouseleave(function() { // open watchlater queue
      setTimeout(function() {
        if (!mouseOverWatch){
          $('.wlq-open').addClass('wlq-close').removeClass('wlq-open');minimizedWatchstate=true;}}, 2000);
      mouseOverWatch=false;
    });
    }

  });

  // This function simply returns the JSON.
  // Modify it to get it from where the live JSON will come from.
  // Otherwise you can pass a data object in the settings object.
  var getJsonData = function() {
    return '{"VideoQueue":[{"id":1,"image_url":"http://d1fnuwuy1vks2k.cloudfront.net/media/robot_assist.png","url":"https://www.youtube.com/watch?v=EIRjZERkmZs","title":"Flight tips","type":"content"},{"id":2,"image_url":"//d1fnuwuy1vks2k.cloudfront.net/media/virgin.jpg","url":"https://www.youtube.com/watch?v=DtyfiPIHsIg","title":"Coolest Safety V..","type":"sponsored"},{"id":3,"image_url":"https://i.ytimg.com/vi/OYe8MlRg2Ss/default.jpg","url":"https://www.youtube.com/watch?v=OYe8MlRg2Ss","title":"Airport services","type":"content"},{"id":4,"image_url":"https://i.ytimg.com/vi/OYe8MlRg2Ss/default.jpg","url":"https://www.youtube.com/watch?v=OYe8MlRg2Ss","title":"Airport services","type":"content"},{"id":5,"image_url":"https://i.ytimg.com/vi/OYe8MlRg2Ss/default.jpg","url":"https://www.youtube.com/watch?v=OYe8MlRg2Ss","title":"Airport services","type":"content"},{"id":6,"image_url":"https://i.ytimg.com/vi/OYe8MlRg2Ss/default.jpg","url":"https://www.youtube.com/watch?v=OYe8MlRg2Ss","title":"Airport services","type":"content"},{"id":7,"image_url":"https://i.ytimg.com/vi/OYe8MlRg2Ss/default.jpg","url":"https://www.youtube.com/watch?v=OYe8MlRg2Ss","title":"Airport services","type":"content"},{"id":8,"image_url":"https://i.ytimg.com/vi/OYe8MlRg2Ss/default.jpg","url":"https://www.youtube.com/watch?v=OYe8MlRg2Ss","title":"Airport services","type":"content"}],"SeenVideos":[{"id":1,"image_url":"https://i.ytimg.com/vi/RHpbjkLzSlc/mqdefault.jpg","url":"http://vjs.zencdn.net/v/oceans.mp4mp4","title":"Makeup Show","type":"content"},{"id":2,"image_url":"https://i.ytimg.com/vi/RHpbjkLzSlc/mqdefault.jpg","url":"http://vjs.zencdn.net/v/oceans.mp4","title":"Makeup Show","type":"content"}],"WatchLater":[{"id":1,"image_url":"https://i.ytimg.com/vi/RHpbjkLzSlc/mqdefault.jpg","url":"http://vjs.zencdn.net/v/oceans.mp4","title":"Makeup Show","type":"content"},{"id":2,"image_url":"https://i.ytimg.com/vi/RHpbjkLzSlc/mqdefault.jpg","url":"http://vjs.zencdn.net/v/oceans.mp4","title":"Makeup Show","type":"content"}]    }';
  };

  // Call the plugin on page load.

  // $(document).ready(function() {
  //   $('#player_a').vBrandQueue();

  //   You may also pass in a settings object.
  //   $('#player_a').vBrandQueue({
  //     data: DATA JSON OBJECT
  //   });
  // });

})(jQuery);
