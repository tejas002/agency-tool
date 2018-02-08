(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', '$state', 'Authentication', '$timeout', 'AdminService'];

  function HomeController($scope, $state, Authentication, $timeout, AdminService) {
    var vm = this;
    vm.user = Authentication.user;
    //console.log(vm.user)

    vm.status = Authentication.getStatus()

    vm.showform = (vm.user ? (vm.user.status ? true : false) : '') || vm.status ? true : false

    vm.showarning = true
    $timeout(function () {
      vm.showarning = false
    }, 3000);

    vm.getuserstat = function (id) {

      AdminService.get({
        userId: id
      }, function (userdetails) {
        vm.user.projects = userdetails.projects
        $state.reload();
      })
    }

  }

}());