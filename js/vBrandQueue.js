;(function($){

  var opts = {};

  $.extend($.fn, {
    vBrandQueue: function(settings) {
      // Set up defaults
      var defaults = {
        container: '.vbrand-container',
        data: $.parseJSON(getJsonData())
      };

      // Overwrite default options with user provided ones.
      opts = $.extend({}, defaults, settings);

      // Wrapper
      var queue = $('<div />', {'class': "vbrand-queue"}).appendTo(opts.container);

      // Create items
      $(opts.data.VideoQueue).each(function() {
        $(this).vBrandQueueItem().appendTo(queue);
      });

      // Icon
      $('.vbrand-item')
        .first()
        .removeClass('outside')
        .addClass('icon');

      // Active
      $('.vbrand-item')
        .mouseenter(function() {
          $(this).vBrandHover();
        });
      $('.vbrand-queue')
        .mouseleave(function() {
          $(this).find('.vbrand-item.active').removeClass('active');
        });

      // Watch later
      $('.later').click(function(e) {
        e.preventDefault();
        $(this).closest('.vbrand-item').vBrandWatchLater();
      });

    },

    // Generate the markup for a single item.
    vBrandQueueItem: function() {
      var item = this[0];
      var queueItem = $('<a />', {
        'class': "vbrand-item outside vbrand-item" + item.id,
        'href': item.url,
        'style': "background-image: url('" + item.image_url + "')"
      });
      $('<span />', {'class': "title"})
        .text(item.title)
        .appendTo(queueItem);
      $('<span />', {'class': "later"})
        .text("Watch later")
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
    vBrandHover: function() {
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
    },

    // Watch later handler.
    vBrandWatchLater: function() {
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
              alert('Opening the watch later queue...')
            });
        })
        .parent().animate({
          "height": 0
        }, 400);
    }

  });

  // This function simply returns the JSON.
  // Modify it to get it from where the live JSON will come from.
  // Otherwise you can pass a data object in the settings object.
  var getJsonData = function() {
    return '{"VideoQueue":[{"id":1,"image_url":"https://i.ytimg.com/vi/RHpbjkLzSlc/mqdefault.jpg","url":"https://www.youtube.com/watch?v=RHpbjkLzSlc","title":"Makeup Show","type":"content"},{"id":2,"image_url":"https://i.ytimg.com/vi/RHpbjkLzSlc/mqdefault.jpg","url":"https://www.youtube.com/watch?v=RHpbjkLzSlc","title":"Makeup Show","type":"sponsored"},{"id":3,"image_url":"https://i.ytimg.com/vi/RHpbjkLzSlc/mqdefault.jpg","url":"https://www.youtube.com/watch?v=RHpbjkLzSlc","title":"Makeup Show","type":"content"}],"SeenVideos":[{"id":1,"image_url":"https://i.ytimg.com/vi/RHpbjkLzSlc/mqdefault.jpg","url":"https://www.youtube.com/watch?v=RHpbjkLzSlc","title":"Makeup Show","type":"content"},{"id":2,"image_url":"https://i.ytimg.com/vi/RHpbjkLzSlc/mqdefault.jpg","url":"https://www.youtube.com/watch?v=RHpbjkLzSlc","title":"Makeup Show","type":"content"}],"WatchLater":[{"id":1,"image_url":"https://i.ytimg.com/vi/RHpbjkLzSlc/mqdefault.jpg","url":"https://www.youtube.com/watch?v=RHpbjkLzSlc","title":"Makeup Show","type":"content"},{"id":2,"image_url":"https://i.ytimg.com/vi/RHpbjkLzSlc/mqdefault.jpg","url":"https://www.youtube.com/watch?v=RHpbjkLzSlc","title":"Makeup Show","type":"content"}]    }';
  };

  // Call the plugin on page load.
  // Remove if you want to call it manually.
  $(document).ready(function() {
    $('vbrand-container').vBrandQueue();

    // You may also pass in a settings object.
    // $('vbrand-container').vBrandQueue({
    //   container: SELECTOR,
    //   data: DATA OBJECT
    // });
  });

})(jQuery);
