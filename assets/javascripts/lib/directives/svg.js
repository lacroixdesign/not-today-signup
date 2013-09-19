(function() {

  /*
   * svg:fallback - svg => png replacement for legacy browsers
   * @requires Modernizr
   * @restrict attribute
   * @example:
     <img src="logo.svg" svg:fallback="logo.png">
   */

  angular.module('ldc.ui.svg', [])

    .directive('svgFallback', [function () {
      return {

        restrict: 'A',
        scope: true,
        link: function(scope, elem, attrs) {
          if (typeof Modernizr !== 'undefined') {
            if (!Modernizr.svg) {
              var newSrc = attrs.svgFallback ||
                           attrs.src.replace(/\.svg$/i, '.png');
              elem.attr('src', newSrc);
            }
          }
        }

      };
    }]);

})();
