angular.module('freebe.directives', [])
  .directive('tileReport', function($http) {
    'use strict';
    var base = '/api/v1.0/paylink/report/';

    return {
      restrict: 'E',
      scope: {
        item: '=data'
      },
      templateUrl: '/my/template/views/templates/tile-report.html',
      replace: true,
      transclude: true,
      link: function(scope) {
        $http.get(`${base}${scope.item.resource}`)
          .then(function(resp) {
            scope.item.value = resp.data;
          })
          .catch(function(err){
            scope.item.value = 0;
          })
      }
    };
  })
