(function() {
    'use strict';
    angular.module('uploads').config(routeConfig);
    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        $stateProvider.state('home.uploads', {
            url: 'uploads',
            template: '<ui-view/>',
            data: {
                roles: ['user', 'admin']
            }
        }).state('home.uploads.list', {
            url: '/list',
            templateUrl: '/modules/uploads/client/views/list-uploads.client.view.html',
            controller: 'UploadsListController',
            controllerAs: 'vm',
            data: {
                pageTitle: 'Uploads List'
            }
        }).state('home.uploads.create', {
            url: '/create',
            templateUrl: '/modules/uploads/client/views/form-upload.client.view.html',
            controller: 'UploadsController',
            controllerAs: 'vm',
            resolve: {
                uploadResolve: newUpload
            },
            data: {
                //roles: ['user', 'admin'],
                pageTitle: 'Uploads Create'
            }
        }).state('home.uploads.edit', {
            url: '/:uploadId/edit',
            templateUrl: '/modules/uploads/client/views/form-upload.client.view.html',
            controller: 'UploadsController',
            controllerAs: 'vm',
            resolve: {
                uploadResolve: getUpload
            },
            data: {
                //roles: ['user', 'admin'],
                pageTitle: 'Edit Upload {{ uploadResolve.name }}'
            }
        }).state('home.uploads.view', {
            url: '/:uploadId',
            templateUrl: '/modules/uploads/client/views/view-upload.client.view.html',
            controller: 'UploadsController',
            controllerAs: 'vm',
            resolve: {
                uploadResolve: getUpload
            },
            data: {
                pageTitle: 'Upload {{ articleResolve.name }}'
            }
        });
    }
    getUpload.$inject = ['$stateParams', 'UploadsService'];

    function getUpload($stateParams, UploadsService) {
        return UploadsService.get({
            uploadId: $stateParams.uploadId
        }).$promise;
    }
    newUpload.$inject = ['UploadsService'];

    function newUpload(UploadsService) {
        return new UploadsService();
    }
})();