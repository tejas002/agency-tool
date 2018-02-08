(function() {
    'use strict';
    // Uploads controller
    angular.module('uploads').controller('UploadsModalEditController', UploadsModalEditController);
    UploadsModalEditController.$inject = ['$scope', '$uibModalInstance', '$http', 'uploadResolve'];

    function UploadsModalEditController($scope, $uibModalInstance, $http, uploadResolve) {
        var vm = this;
        vm.upload = uploadResolve;
        vm.uploadResolve = uploadResolve;
        vm.error = null;
        vm.form = {};
        $scope.cancel = function() {
            $uibModalInstance.dismiss();
        };
        $scope.remove = function() {
            vm.uploadResolve.$remove(function() {
                $uibModalInstance.close(true);
            }, function(res) {
                vm.error = res.data.message;
            });
        }
        
    }
})();