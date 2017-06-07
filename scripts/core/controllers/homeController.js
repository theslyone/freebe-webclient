angular.module('theme.core.home_controller', ['theme.core.services'])
  .controller('HomeController', ['$scope', '$theme', '$ocLazyLoad', '$css', function($scope, $theme, $ocLazyLoad, $css) {
    'use strict';
    $theme.set('fullscreen', true);

    $scope.$on('$destroy', function() {
      $css.remove('/my/template/css/home.css');
      $theme.set('fullscreen', false);
    });
  }]);
