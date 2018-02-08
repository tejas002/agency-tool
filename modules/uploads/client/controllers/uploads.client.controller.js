(function () {
    'use strict';
    // Uploads controller
    angular.module('uploads').controller('UploadsController', UploadsController);
    UploadsController.$inject = ['$scope', '$state', 'Authentication', 'uploadResolve', '$http', '$stateParams','UploadsService', '$filter'];

    function UploadsController($scope, $state, Authentication, upload, $http,$stateParams, uploadsService, $filter) {
        var vm = this;
        vm.authentication = Authentication;
        vm.upload = upload;
        vm.error = null;
        vm.form = {};
        vm.remove = remove;
        vm.save = save;
        vm.buttondisable = false;
        vm.urlUploadFile = {}
        //console.log(vm.authentication)

        vm.progress = function () {
            //console.log(vm.urlUploadFile.name)
            if (vm.upload.name && vm.urlUploadFile.name && vm.upload.description) {
                vm.upload.progressPercentage = '100';
            } else if ((vm.upload.name && vm.urlUploadFile.name) || (vm.upload.name && vm.upload.description) || (vm.urlUploadFile.name && vm.upload.description)) {
                vm.upload.progressPercentage = '66.66';
            } else if (vm.upload.name || vm.urlUploadFile.name || vm.upload.description) {
                vm.upload.progressPercentage = '33.33';
            }
            else {
                vm.upload.progressPercentage = '0';
            }

        }
        

        $scope.check = function (element) {
            //console.log('helo', element.files[0].name)
            vm.urlUploadFile.name = element.files[0].name
            $scope.$apply()
            vm.progress();

        }




        // Remove existing Upload
        function remove() {
            if (confirm('Are you sure you want to delete?')) {
                vm.upload.$remove($state.go('uploads.list'));
            }
        }



        // Save Upload
        function save(isValid) {
            vm.error = null;
            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'vm.form.uploadForm');

                return false;
            }

            vm.upload.username = vm.authentication.user.username
            //console.log(vm.upload.progressPercentage)

            var fd = new FormData();
            fd.append('upload', JSON.stringify({
                name: vm.upload.name,
                description: vm.upload.description,
                username: vm.upload.username,
                progressPercentage: vm.upload.progressPercentage
            }));
            fd.append('files', vm.urlUploadFile);
            $http.post('/api/uploads', fd, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            }).success(function (res) {
                Authentication.setStatus(res.jobstatus)
                $state.go('home',{}, {reload: true})
            }).error(function (res) {
                //console.log(res);
                vm.error = res.message;
            });




        }










    }
})();

