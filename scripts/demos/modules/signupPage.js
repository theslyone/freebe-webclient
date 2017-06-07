angular
  .module('theme.demos.signup_page', [
    'theme.core.services'
  ])
  .controller('SignupPageController', ['$scope', '$theme', function ($scope, $theme) {
      'use strict';
      $theme.set('fullscreen', true);

      $scope.$on('$destroy', function () {
          $theme.set('fullscreen', false);
      });

      $scope.handleRegBtnClick = function () {
          $auth.submitRegistration($scope.registrationForm)
            .then(function (resp) {
                // handle success response
            })
            .catch(function (resp) {
                // handle error response
            });
      };

      $scope.handleLoginBtnClick = function() {
          $auth.submitLogin($scope.loginForm)
            .then(function(resp) {
              // handle success response
            })
            .catch(function(resp) {
              // handle error response
            });
        };
  }]);