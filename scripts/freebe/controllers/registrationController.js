angular
  .module('theme.core.registration_controller', [])
  .controller('RegistrationController', ['$scope', '$timeout', '$theme', '$auth', '$location', '$http',
    function($scope, $timeout, $theme, $auth, $location, $http) {
    'use strict';
    $theme.set('fullscreen', true);

    $scope.$on('$destroy', function() {
      $theme.set('fullscreen', false);
    });

    $scope.form = {};
    $scope.registrationForm = {};

    $scope.register = function(data) {
      $scope.clearAlert();
      $scope.isBusy = true;
      $http.post('/account/sign-up/validate-email', { email: data.Email })
      .then(function(resp) {
        if(!resp.data) {
          throw new Error('Email address already exists')
        }
      })
      .then(function(){
        return $auth.submitRegistration($scope.registrationForm)
      })
      .catch(function(err){
        $scope.alert = {
          type: 'danger',
          msg: err.message
        };
      })
      .finally(function() {
        $scope.isBusy = false;
      });

    }

    $scope.clearAlert = function() {
      $scope.alert = {}
    }

    $scope.$on('auth:registration-email-success', function(ev, message) {
      $location.path("/paylink/signup-successful");
    });

    $scope.$on('auth:registration-email-error', function(ev, reason) {
      //alert(JSON.stringify(reason));
      //alert("Registration failed: " + reason.errors[0]);
    });

  }]);
