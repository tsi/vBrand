;(function($){

  var opts = {};

  $.extend($.fn, {
    vBrandQueue: function(settings) {
      // Set up defaults
      var defaults = {
        container: '.vbrand-container'
      };

      // Overwrite default options with user provided ones.
      opts = $.extend({}, defaults, settings);

      // Get JSON data.
      var data = $.parseJSON(getJsonData()),
      // Wrapper
          queue = $('<div />', {'class': "vbrand-queue"}).appendTo(opts.container);

      $(data.VideoQueue).each(function() {
        $(this).vBrandQueueItem().appendTo(queue);
      });

    },

    vBrandQueueItem: function() {
      // Generate the markup for an item
      var item = this[0];
      var queueItem = $('<a />', {
        'class': "vbrand-item vbrand-item" + item.id,
        'href': item.url,
        'style': "background-image: url('" + item.image_url + "')"
      });
      $('<span />', {'class': "title"})
        .text(item.title)
        .appendTo(queueItem);
      // Sponsored
      if (item.type == 'sponsored') {
        $('<span />', {'class': "sponsored"})
          .text(item.type)
          .appendTo(queueItem);
      }
      return queueItem;
    }

  });

  // Call the plugin on page load.
  // Remove if you want to call it manually.
  $(document).ready(function() {
    $('vbrand-container').vBrandQueue();
  });


  // This function simply returns the JSON.
  // Modify it to get it from where the live JSON will come from.
  var getJsonData = function() {
    return '{"VideoQueue":[{"id":1,"image_url":"https://i.ytimg.com/vi/RHpbjkLzSlc/mqdefault.jpg","url":"https://www.youtube.com/watch?v=RHpbjkLzSlc","title":"Makeup Show","type":"content"},{"id":2,"image_url":"https://i.ytimg.com/vi/RHpbjkLzSlc/mqdefault.jpg","url":"https://www.youtube.com/watch?v=RHpbjkLzSlc","title":"Makeup Show","type":"sponsored"},{"id":3,"image_url":"https://i.ytimg.com/vi/RHpbjkLzSlc/mqdefault.jpg","url":"https://www.youtube.com/watch?v=RHpbjkLzSlc","title":"Makeup Show","type":"content"}],"SeenVideos":[{"id":1,"image_url":"https://i.ytimg.com/vi/RHpbjkLzSlc/mqdefault.jpg","url":"https://www.youtube.com/watch?v=RHpbjkLzSlc","title":"Makeup Show","type":"content"},{"id":2,"image_url":"https://i.ytimg.com/vi/RHpbjkLzSlc/mqdefault.jpg","url":"https://www.youtube.com/watch?v=RHpbjkLzSlc","title":"Makeup Show","type":"content"}],"WatchLater":[{"id":1,"image_url":"https://i.ytimg.com/vi/RHpbjkLzSlc/mqdefault.jpg","url":"https://www.youtube.com/watch?v=RHpbjkLzSlc","title":"Makeup Show","type":"content"},{"id":2,"image_url":"https://i.ytimg.com/vi/RHpbjkLzSlc/mqdefault.jpg","url":"https://www.youtube.com/watch?v=RHpbjkLzSlc","title":"Makeup Show","type":"content"}]    }';
  };

})(jQuery);
