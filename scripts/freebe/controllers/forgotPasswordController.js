angular
  .module('freebe.forgot_password_controller', [])
  .controller('ForgotPasswordController', ['$rootScope', '$scope', '$state', '$auth', '$theme', 'progressLoader', 'token',
    function($rootScope, $scope, $state, $auth, $theme, progressLoader, token) {
      'use strict';
      $theme.set('fullscreen', true);

      $scope.$on('$destroy', function() {
        $theme.set('fullscreen', false);
      });

      $scope.form = {};
      $scope.forgotPasswordForm = {
        Email: '',
        Token: token
      };

      $scope.resetPassword = function(credentials) {
        $scope.clearAlert();
        $scope.isBusy = true;
        progressLoader.start();
        progressLoader.set(50);
        $auth.requestPasswordReset($scope.forgotPasswordForm)
          .finally(function() {
            $scope.isBusy = false;
            progressLoader.end();
          });
      }

      $scope.clearAlert = function() {
        $scope.alert = {}
      }
      $scope.clearAlert();

      $scope.$on('auth:password-reset-request-success', function(ev, token) {
        $scope.isBusy = false;
        $state.go("reset-successful");
      });

      $scope.$on('auth:password-reset-request-error', function(ev, reason) {
        $scope.isBusy = false;
        $scope.alert = {
          type: 'danger',
          msg: 'Password reset request failed'
        };
      });
    }
  ]);
