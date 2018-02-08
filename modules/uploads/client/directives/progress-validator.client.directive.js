(function () {
  'use strict';

  angular
    .module('users')
    .directive('progressValidator', progressValidator);

  progressValidator.$inject = ['PasswordValidator'];

  function progressValidator(PasswordValidator) {
    var directive = {
      require: 'ngModel',
      link: link
    };

    return directive;

    function link(scope, element, attrs, ngModel) {
      ngModel.$validators.requirements = function (value) {
        var status = true;
        if (value) {
          var result = true
          var requirementsIdx = 0;

          // Requirements Meter - visual indicator for users
          var requirementsMeter = [{
            color: 'danger',
            progress: '20'
          }, {
            color: 'warning',
            progress: '40'
          }, {
            color: 'info',
            progress: '60'
          }, {
            color: 'primary',
            progress: '80'
          }, {
            color: 'success',
            progress: '100'
          }];

         

          

        }
        return status;
      };
    }
  }
}());
