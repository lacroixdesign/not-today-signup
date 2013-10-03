
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
    .controller('ShareCtrl', ['$scope', '$http', 'Twitter', 'Facebook', 'Analytics',
      function($scope, $http, Twitter, Facebook, Analytics) {
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

        $scope.shareFacebook = function (image, url, title, caption, desc) {
          url   = url   || 'http://www.ntc.io';
          title = title || 'Not Today Coalition';
          desc  = desc  || 'You can help give hope to the hopeless - signup '+
                          'at www.nottodaycoalition.org and help tell the '+
                          'story of the Dalits to everyone!';
          Facebook.share(url, title, caption, desc, image);
        };

        $scope.shareEmail = function () {
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
                Analytics.event('Social', 'Share', 'Email');
                $scope.complete = true;
              })
              .error(function (data) {
                $scope.responseError = data.msg;
                $scope.processing    = false;
              })
            ;
          }
        };

      }])
    ;

})();
