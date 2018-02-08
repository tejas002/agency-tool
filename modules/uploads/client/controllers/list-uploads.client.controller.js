(function() {
    'use strict';
    angular.module('uploads').controller('UploadsListController', UploadsListController);
    UploadsListController.$inject = ['UploadsService', '$uibModal'];

    function UploadsListController(UploadsService, $uibModal) {
        var vm = this;
        vm.uploads = UploadsService.query();
        vm.openDeleteModal = openDeleteModal;

        function openDeleteModal(uploadId) {
            var modalInstance = $uibModal.open({
                templateUrl: '/modules/uploads/client/views/modaldelete-upload.client.view.html',
                controller: 'UploadsModalEditController',
                controllerAs: 'vm',
                size: 'sm',
                backdrop: 'static',
                resolve: {
                    uploadResolve: UploadsService.get({
                        uploadId: uploadId
                    })
                }
            });
            modalInstance.result.then(function() {
                vm.uploads = UploadsService.query();
            }, function() {});
        }
        vm.openViewModal = openViewModal;

        function openViewModal(uploadId) {
            var modalInstance = $uibModal.open({
                templateUrl: '/modules/uploads/client/views/modalview-upload.client.view.html',
                controller: 'UploadsModalEditController',
                controllerAs: 'vm',
                size: 'lg',
                backdrop: 'static',
                resolve: {
                    uploadResolve: UploadsService.get({
                        uploadId: uploadId
                    })
                }
            });
            modalInstance.result.then(function() {
                vm.uploads = UploadsService.query();
            }, function() {});
        }
        

        
    }
})();