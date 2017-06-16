angular.module('freebe.services')
  .service('accountService', ['$http', '$auth', 'pinesNotifications', function($http, $auth, pinesNotifications) {
    'use strict';
    var url = '/account/';
    var notification = {
      //title: 'Freebe',
      type: 'error',
      delay: 10000
    }

    this.changePassword = function(param){
      return $http.post(url + "change-password", {
        OldPassword: param.oldPassword,
        Password: param.newPassword,
        ConfirmPassword: param.newPasswordConfirm
      })
      .then(function(resp){
        if(resp.data) {
          notification.type = "success";
          notification.text = 'Account password changed successfully.';
          pinesNotifications.notify(notification);
        }
        else {
          throw Error('Old Password is not correct')
        }
      })
      .catch(function(err) {
        notification.type = "error";
        notification.text = `Error changing account password. ${err.message}`;
        pinesNotifications.notify(notification);
        throw err;
      });
    }
  }]);
