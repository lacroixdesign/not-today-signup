/* globals Kicksend: true */

/*
 * mailcheck - Provides suggestions for common email typos
 * @restrict attribute
 * @example:
    <a mailcheck="user.email">
      Did you mean <span>example@<strong>gmail.com</strong></span>?
    </a>
 */

angular.module('ldc.form.mailcheck', []).directive('mailcheck', [function () {
  return {
    scope: true,
    restrict: 'A',
    template: '<a ng-show="active">Did you mean <span>{{ address }}@<strong>{{ domain }}</strong></span>?</a>',
    replace: true,
    link: function(scope, element, attrs) {

      function checkEmail(email) {
        Kicksend.mailcheck.run({
          email: email,
          suggested: function(suggestion) {
            scope.suggestion = suggestion.full;
            scope.address    = suggestion.address;
            scope.domain     = suggestion.domain;
            scope.active = true;
          },
          empty: function() {
            scope.suggestion = null;
            scope.active = false;
          }
        });
      }

      scope.$watch(attrs.mailcheck, function(email) {
        checkEmail(email);
      });

      element.bind('click', function (event) {
        event.preventDefault();
        if (scope.suggestion) {
          scope.$parent.$apply(attrs.mailcheck+' = "'+scope.suggestion+'"');
        }
      });

    }
  };

}]);
