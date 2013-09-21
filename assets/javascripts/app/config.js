/* jshint unused:false */

(function() {

  angular.module('ntc.config', ['ngRoute'])
    .config([
      '$routeProvider',
      '$httpProvider',
      '$locationProvider',
      function($routeProvider, $httpProvider, $locationProvider) {

        // FIXME switch to whatever Express is using:
        // use Rails' CSRF header instead
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRF-Token';

        function signupConfig (type) {
          return {
            templateUrl: 'signup.html',
            controller: 'SignupCtrl',
            resolve: {
              type: function() { return type; }
            }
          };
        }

        $routeProvider

          .when('/', {
            templateUrl: 'home.html',
          })

          // Signup
          .when('/signup',       signupConfig(null))
          .when('/signup/join',  signupConfig('join'))
          .when('/signup/start', signupConfig('start'))

          // Donate
          .when('/donate', {
            templateUrl: 'donate.html',
            controller: 'DonateCtrl'
          })

          // Share
          .when('/share', {
            templateUrl: 'share.html',
            controller: 'ShareCtrl'
          })

          .otherwise({ redirectTo: '/' });

      }
    ]);

})();
