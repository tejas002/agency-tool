(function () {
  'use strict';

  // Uploads controller
  angular
    .module('projects')
    .controller('ProjectsModalEditController', ProjectsModalEditController);

  ProjectsModalEditController.$inject = ['$scope','$uibModalInstance','$http', 'projectResolve'];

  function ProjectsModalEditController ($scope,$uibModalInstance,$http,projectResolve) {
    var vm = this;

 
    vm.project = projectResolve;
    vm.projectResolve = projectResolve;
    vm.error = null;
    vm.form = {};	
    
	
	  
    $scope.cancel = function() {
        $uibModalInstance.dismiss();
    }; 
      
    $scope.remove = function() {
      vm.projectResolve.$remove(function(){
          $uibModalInstance.close(true);          
      }                                       
      ,function(){
         vm.error = res.data.message; 
      });
      
    }
   
   
	
	
	
	
	
	
	}
})();
