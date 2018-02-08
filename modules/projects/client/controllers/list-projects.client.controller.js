(function () {
  'use strict';

  angular
    .module('projects')
    .controller('ProjectsListController', ProjectsListController);

  ProjectsListController.$inject = ['ProjectsService','$uibModal'];

  function ProjectsListController(ProjectsService,$uibModal) {
    var vm = this;

    vm.projects = ProjectsService.query();
    

    vm.openDeleteModal = openDeleteModal;    
    // open a model
    function openDeleteModal(projectId){
       
          var modalInstance  = $uibModal.open({
            templateUrl: '/modules/projects/client/views/modaldelete-project.client.view.html',
            controller: 'ProjectsModalEditController',
            controllerAs: 'vm',
            size: 'sm',
            backdrop: 'static',
            resolve: {
				    projectResolve: ProjectsService.get({
                    projectId: projectId })
            }
         });
         
          modalInstance.result.then(function () {
     			vm.projects = ProjectsService.query();
    	  }, function () {
               
   		  });
         
    } 
	
	
		vm.openViewModal = openViewModal;    
    // open a model
    function openViewModal(projectId){

          var modalInstance  = $uibModal.open({
            templateUrl: '/modules/projects/client/views/modalview-project.client.view.html',
            controller: 'ProjectsModalEditController',
            controllerAs: 'vm',
            size: 'lg',
            backdrop: 'static',
            resolve: {
                projectResolve: ProjectsService.get({
                   projectId: projectId })
            }
         });
         
          modalInstance.result.then(function () {
     			vm.projects = ProjectsService.query();
    	  }, function () {
     		
   		  });
         
    } 


  }
})();
