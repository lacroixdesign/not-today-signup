(function() {

  /*
   * fancier form inputs
   */

  angular.module('ldc.form.inputs', [])

    /*
     * radio:group - required wrapper for fancier radio button
     * @restrict attribute
     * @example:
       <div radio:button></div>
     */
    .directive('radioGroup', [function () {
      return {
        restrict: 'A',
        scope: true
      };
    }])

    /*
     * radio - fancier radio button
     * @requires radio:button
     * @restrict attribute
     * @example:
       <div radio name="radio" label="Radio Button" value="choice-1" disabled="true"></div>
     */
    .directive('radio', [function () {
      return {
        restrict: 'A',
        scope: {
          name: '@name',
          label: '@label',
          value: '@value',
          disabled: '@disabled'
        },
        link: function(scope, elem, attrs) {
          elem.bind('click', function() {
            if (!attrs.disabled) {
              scope.$parent.selected = scope.value;
            }
          });
        },
        replace: true,
        transclude: true,
        template: '<label class="m-input-checkbox"' +
                  ' ng:class="{ checked: $parent.selected === value, disabled: disabled }">' +
                  '<span class="m-input-checkbox--icon">' +
                  '<i data-icon="&#xe00a" ng:show="!($parent.selected === value)"></i>' +
                  '<i data-icon="&#xe00b" ng:show="$parent.selected === value"></i>' +
                  '</span><input type="radio" name="{{ name }}" ng:model="$parent.selected"' +
                  ' value="{{ value }}" ng:disabled="disabled">' +
                  '<div class="m-input-checkbox--label" ng:transclude></div>' +
                  '</label>'
      };
    }])

    /*
     * checkbox - fancier checkboxes
     * @restrict attribute
     * @example:
       <div checkbox name="remember" label="Keep me logged in" disabled="true"></div>
     */
    .directive('checkbox', [function () {
      return {
        restrict: 'A',
        scope: {
          name: '@name',
          label: '@label',
          disabled: '@disabled'
        },
        replace: true,
        transclude: true,
        template: '<label class="m-input-checkbox" ng:class="{checked: checked, disabled: disabled}">' +
                  '<span class="m-input-checkbox--icon">' +
                  '<i data-icon="&#xe008" ng:show="!checked"></i>' +
                  '<i data-icon="&#xe009" ng:show="checked"></i>' +
                  '</span><input type="checkbox" name="{{ name }}" ng:model="checked"' +
                  ' ng:true:value="checked" ng:disabled="disabled">' +
                  '<div class="m-input-checkbox--label" ng:transclude></div>' +
                  '</label>'
      };
    }]);

})();
