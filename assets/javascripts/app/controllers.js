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
    .controller('SignupCtrl', ['$scope', '$routeParams', '$http', 'Router', 'type',
      function($scope, $routeParams, $http, Router, type) {
        $scope.type = type;

        $scope.clearErrors = function () {
          $scope.attempted     = false;
          $scope.responseError = null;
        };

        $scope.submit = function (path) {
          var url = '/' + path;
          $scope.attempted = true;
          if ($scope.form.$valid) {
            $scope.processing = true;
            $http.post(url, $scope.user)
              .success(function () {
                $scope.complete = true;
              })
              .error(function (data) {
                $scope.responseError = data.msg;
                $scope.processing    = false;
              });
          }
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
    .controller('ShareCtrl', ['$scope', '$http',
      function($scope, $http) {
        $scope.destinations = [{},{},{},{},{}];

        $scope.clearErrors = function () {
          $scope.attempted     = false;
          $scope.responseError = null;
        };

        $scope.validDestinations = function () {
          return $scope.destinations
            .map(function (dest) {
              return dest.email;
            })
            .filter(function (dest) {
              return dest;
            });
        };

        $scope.shareFacebook = function(event) {
          event.preventDefault();
          console.log('Share: Facebook');
        };

        $scope.shareTwitter = function(event) {
          event.preventDefault();
          console.log('Share: Twitter');
        };

        $scope.shareEmail = function() {
          $scope.attempted = true;
          var destinations = $scope.validDestinations();
          if ($scope.form.$valid && destinations.length > 0) {
            $scope.processing = true;
            // set POST data
            var data = angular.copy($scope.user);
            data.destinations = destinations;
            // send req
            $http.post('/share', data)
              .success(function () {
                $scope.complete = true;
              })
              .error(function (data) {
                $scope.responseError = data.msg;
                $scope.processing    = false;
              })
            ;
          }
        };

        $scope.toggleEmailForm = function(event) {
          event.preventDefault();
          $scope.emailFormVisible = !$scope.emailFormVisible;
        };
      }])
    ;

})();
