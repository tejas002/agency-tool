(function () {
  'use strict';

  angular
    .module('users.admin')
    .controller('UserController', UserController);

  UserController.$inject = ['$scope', '$state', '$window', 'Authentication', 'userResolve', 'Notification','projectResolve','$filter'];

  function UserController($scope, $state, $window, Authentication, user, Notification,projectResolve,$filter) {
    var vm = this;

    vm.authentication = Authentication;
    vm.user = user;
    vm.remove = remove;
    vm.update = update;
    vm.isContextUserSelf = isContextUserSelf;
    vm.projects=projectResolve;
    vm.projectIdtoNameMapping=[]
    vm.sendMail = sendMail;
    //console.log('us',vm.user)

    vm.user.projects.forEach(function(data){
      
      //console.log($filter('filter')(vm.projects, {_id: data}, true)[0])
      var projectdetails = $filter('filter')(vm.projects, {_id: data._id}, true)[0];
      vm.projectIdtoNameMapping.push(projectdetails);
    })

    function remove(user) {
      if ($window.confirm('Are you sure you want to delete this user?')) {
        if (user) {
          user.$remove();

          vm.users.splice(vm.users.indexOf(user), 1);
          Notification.success('User deleted successfully!');
        } else {
          vm.user.$remove(function () {
            $state.go('admin.users');
            Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> User deleted successfully!' });
          });
        }
      }
    }

    function update(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

        return false;
      }
      //console.log(vm.user.projects)
      vm.user.lastLoggedOnProject = vm.user.projects;

      var user = vm.user;
      

      user.$update(function () {
        $state.go('admin.user', {
          userId: user._id
        });
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> User saved successfully!' });
      }, function (errorResponse) {
        Notification.error({ message: errorResponse.data.message, title: '<i class="glyphicon glyphicon-remove"></i> User update error!' });
      });
    }

    function isContextUserSelf() {
      return vm.user.username === vm.authentication.user.username;
    }

    function sendMail(userinfo){
      //console.log(user)
      userinfo.$save(function (info) {
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Mail sent successfully to '+info.accepted[0],delay:6000 });
        $state.go('admin.users')
      }, function (errorResponse) {
        Notification.error({ message: errorResponse.data.message, title: '<i class="glyphicon glyphicon-remove"></i> ! '+errorResponse.message });
      });

      
    }
  }
}());
