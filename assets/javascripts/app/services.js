(function() {

  angular.module('ntc.services', [])

    .service('Router', ['$location', function($location) {
      this.home   = '/';
      this.signup = 'signup';
      this.donate = 'donate';
      this.share  = 'share';

      this.to = function(path) {
        $location.path(path);
      };

      this.is = function(path) {
        return path === $location.path();
      };

      this.has = function(path) {
        var found = $location.path().search(path);
        return found !== -1;
      };

      this.currentPath = function() {
        return $location.path();
      };

    }]);

})();
