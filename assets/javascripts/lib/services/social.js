/* globals FB */

(function() {

  angular.module('ldc.services.social', [])

    /**
     * Analytics
     */
    .service('Analytics', [function() {

      var google = function () {
        return window[window.GoogleAnalyticsObject] || function(){};
      };

      this.event = function (category, action, label) {
        google()('send', 'event', category, action, label);
      };

    }])

    /**
     * Twitter
     */
    .service('Twitter', ['Analytics', function(Analytics) {

      window.twttr = (function (d,s,id) {
        var t, js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js=d.createElement(s);
        js.id=id;
        js.src="https://platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js, fjs);
        return window.twttr || (t = { _e: [], ready: function(f){ t._e.push(f); } });
      }(document, "script", "twitter-wjs"));

      function shareCallback (event) {
        if (event !== 'undefined' && event.type === "tweet")
          Analytics.event('Social', 'Shared', 'Twitter');
      }

      window.twttr.ready(function (twttr) {
        twttr.events.bind('tweet', shareCallback);
      });

    }])

    /**
     * Facebook
     */
    .service('Facebook', ['Analytics', function(Analytics) {

      function shareCallback (response) {
        if (typeof response !== 'undefined' && typeof response.post_id !== 'undefined')
          Analytics.event('Social', 'Shared', 'Facebook');
      }

      this.share = function (url, title, caption, description, image) {
        if (typeof FB !== 'undefined') {
          var data = {
            method:  'feed',
            link:    url,
            picture: image,
            name:    title,
            caption: caption,
            description: description
          };
          FB.ui(data, shareCallback);
        }
      };

    }]);

})();
