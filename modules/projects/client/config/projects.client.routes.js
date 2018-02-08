(function () {
  'use strict';

  angular
    .module('projects')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
     
      .state('admin.projects', {
        url: '/projects',
        abstract:true,
        templateUrl: '/modules/projects/client/views/home-add-projects.client.view.html'
      })
      .state('admin.projects.create', {
        url: '/create',
        templateUrl: '/modules/projects/client/views/form-project.client.view.html',
        controller: 'ProjectsController',
        controllerAs: 'vm',
        resolve: {
          projectResolve: newProject
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Projects AddProjects'
        }
      }) 
      .state('admin.projects.list', {
        url: '/list',
        templateUrl: '/modules/projects/client/views/list-projects.client.view.html',
        controller: 'ProjectsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Projects List'
        }
      })
      .state('admin.projects.view', {
        url: '/:projectId',
        templateUrl: '/modules/projects/client/views/view-project.client.view.html',
        controller: 'ProjectsController',
        controllerAs: 'vm',
        resolve: {
          projectResolve: getProject
        },
        data:{
          pageTitle: 'Project {{ articleResolve.projectName }}'
        }
      })
      .state('admin.projects.edit', {
        url: '/:projectId/edit',
        templateUrl: '/modules/projects/client/views/form-project.client.view.html',
        controller: 'ProjectsController',
        controllerAs: 'vm',
        resolve: {
          projectResolve: getProject
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Project {{ projectResolve.name }}'
        }
      })
      ;
  }

  getProject.$inject = ['$stateParams', 'ProjectsService'];

  function getProject($stateParams, ProjectsService) {
    return ProjectsService.get({
      projectId: $stateParams.projectId
    }).$promise;
  }

  newProject.$inject = ['ProjectsService'];

  function newProject(ProjectsService) {
    return new ProjectsService();
  }
})();
