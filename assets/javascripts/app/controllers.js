/* jshint unused:false */

(function() {

  angular.module('ntc.controllers', ['ntc.services'])

    // Main controller
    .controller('MainCtrl', ['$scope', '$rootScope', '$location', '$route', 'Router',
      function($scope, $rootScope, $location, $route, Router) {
        $scope.route = Router;

        $scope.$on('loading', function(event, state) {
          $scope.loading = state;
        });
      }])

    // Signup controller
    .controller('SignupCtrl', ['$scope', '$routeParams', 'Router', 'type',
      function($scope, $routeParams, Router, type) {
        $scope.type = type;
      }])

    // Donate controller
    .controller('DonateCtrl', ['$scope',
      function($scope) {}])

    // Share controller
    .controller('ShareCtrl', ['$scope',
      function($scope) {}]);

})();
