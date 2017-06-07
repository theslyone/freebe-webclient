angular
  .module('theme.core.signin_controller', [
    'theme.core.services'
  ])
  .controller('SignInController', ['$rootScope', '$scope', '$location', '$auth', '$theme', 'progressLoader',
    function($rootScope, $scope, $location, $auth, $theme, progressLoader) {
      'use strict';
      $theme.set('fullscreen', true);

      $scope.$on('$destroy', function() {
        $theme.set('fullscreen', false);
      });

      $scope.form = {};
      $scope.loginForm = {};
      $scope.forgotPasswordForm = {};

      $scope.login = function(credentials) {
        $scope.clearAlert();
        $scope.isBusy = true;
        progressLoader.start();
        progressLoader.set(50);
        $auth.submitLogin($scope.loginForm)
          .then(function(resp) {
            $scope.isBusy = false;
          })
          .finally(function() {
            $scope.isBusy = false;
            progressLoader.end();
          });
      }

      $scope.resetPassword = function(credentials) {
        $scope.clearAlert();
        $scope.isBusy = true;
        progressLoader.start();
        progressLoader.set(50);
        $auth.submitLogin($scope.loginForm)
          .then(function(resp) {
            $scope.isBusy = false;
          })
          .finally(function() {
            $scope.isBusy = false;
            progressLoader.end();
          });
      }

      $scope.clearAlert = function() {
        $scope.alert = {}
      }
      $scope.clearAlert();

      $scope.$on('auth:login-success', function(ev, token) {
        $scope.isBusy = false;
        $rootScope.isLoggedIn = true;
        $location.path("/paylink");
      });

      $scope.$on('auth:login-error', function(ev, reason) {
        $scope.isBusy = false;
        $scope.alert = {
          type: 'danger',
          msg: 'Email or password is not correct'
        };
      });

      $scope.$on('auth:validation-success', function(ev) {
        alert('auth validation success');
      });

      $scope.$on('auth:validation-error', function(ev, reason) {
        alert('auth validation failed because', reason.errors[0]);
        $location.path("/paylink/login");
      });
    }
  ]);
