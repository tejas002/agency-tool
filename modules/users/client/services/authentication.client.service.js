(function () {
  'use strict';

  // Authentication service for user variables

  angular
    .module('users.services')
    .factory('Authentication', Authentication);

  Authentication.$inject = ['$window'];

  function Authentication($window) {
    var auth = {
      user: $window.user,
      setStatus:function(stat){
        return this.status=stat
      },
      getStatus:function(){
        return this.status
      }
    };

    return auth;
  }
}());
