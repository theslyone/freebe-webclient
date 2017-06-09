angular
  .module('theme.chart.canvas', [])
  .directive('canvasChart', ['$window', function($window) {
    'use strict';
    return {
      restrict: 'EA',
      scope: {
        data: '=canvasChart',
        options: '=options',
        type: '=',
      },
      link: function(scope, element) {
        scope.$watch('data', function(newData, oldData) {
          if ($window.Chart) {
            var cchart = (new $window.Chart(angular.element(element)[0].getContext('2d')))[scope.type](scope.data, scope.options);
            var legend = cchart.generateLegend();
            //$('.js-legend').html('');
            $('.js-legend').append(legend);
          }
        }, true);
      }
    };
  }]);
