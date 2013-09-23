/* jshint unused:false */

(function() {

  angular.module('ntc.controllers', ['ntc.services'])

    // Main controller
    .controller('MainCtrl', ['$scope', '$rootScope', '$location', '$route', 'Router',
      function($scope, $rootScope, $location, $route, Router) {
        $scope.route = Router;
        $scope.user  = {};

        $scope.$on('loading', function(event, state) {
          $scope.loading = state;
        });
      }])

    // Signup controller
    .controller('SignupCtrl', ['$scope', '$routeParams', 'Router', 'type',
      function($scope, $routeParams, Router, type) {
        $scope.type = type;

        $scope.submit = function(path) {
          console.log('Submit: ', path);
          $scope.complete = true;
        };
      }])

    // Donate controller
    .controller('DonateCtrl', ['$scope',
      function($scope) {
        $scope.submit = function() {
          console.log('Submit: donate');
          $scope.complete = true;
        };
      }])

    // Share controller
    .controller('ShareCtrl', ['$scope',
      function($scope) {
        $scope.shareFacebook = function(event) {
          event.preventDefault();
          console.log('Share: Facebook');
        };

        $scope.shareTwitter = function(event) {
          event.preventDefault();
          console.log('Share: Twitter');
        };

        $scope.shareEmail = function() {
          console.log('Share: Email');
          $scope.complete = true;
        };

        $scope.toggleEmailForm = function(event) {
          event.preventDefault();
          $scope.emailFormVisible = !$scope.emailFormVisible;
        };
      }]);

})();
