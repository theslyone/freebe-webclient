angular.module('freebe.dashboard_controller', [
    'angular-skycons',
    //'theme.chart.canvas'
    'chart.js'
  ])
  .controller('DashboardController', ['$scope', '$timeout', '$window', 'reportService', function($scope, $timeout, $window, reportService) {
    'use strict';
    var moment = $window.moment;
    var _ = $window._;
    $scope.loadingChartData = false;

    $scope.drp_start = moment().subtract(30, 'days').format('MMM, D YYYY');
    $scope.drp_end = moment().add(1, 'days').format('MMM, D YYYY');
    /*$scope.drp_options = {
      ranges: {
        'Today': [moment().format('MMM, D YYYY'), moment().format('MMM, D YYYY')],
        'Yesterday': [moment().subtract(1, 'days').format('MMM, D YYYY'), moment().subtract(1, 'days').format('MMM, D YYYY')],
        'Last 7 Days': [moment().subtract(6, 'days').format('MMM, D YYYY'), moment().format('MMM, D YYYY')],
        'Last 30 Days': [moment().subtract(29, 'days').format('MMM, D YYYY'), moment().format('MMM, D YYYY')],
        'This Month': [moment().startOf('month').format('MMM, D YYYY'), moment().endOf('month').format('MMM, D YYYY')],
        'Last Month': [moment().subtract(1, 'month').startOf('month').format('MMM, D YYYY'), moment().subtract(1, 'month').endOf('month').format('MMM, D YYYY')]
      },
      "locale": {
        "format": "MM/DD/YYYY",
        "separator": " - ",
      },
      opens: 'left',
      startDate: moment().subtract(29, 'days').format('D-MMM-YYYY'),
      endDate: moment().format('D-MMM-YYYY')
    };*/

    $scope.$watch('drp_start', function(newVal, oldVal) {
      console.log('changed');
      if (newVal) {
        $scope.loadStatistics();
      }
    }, true);

    $scope.loadStatistics = function() {
      $scope.loadingChartData = true;
      reportService.getTransactionStatistics($scope.drp_start, $scope.drp_end)
        .then(function(stats) {
          $scope.stats = stats;
          $scope.chart = {
            labels: stats.map(function(stat) {
              return moment(stat.transaction_date).format('MMM D, YYYY')
            }),
            options: { legend: { display: true } },
            series: [" # of Transfers", " # of Received"],
            data: [
              stats.map(function(stat) {
                return stat.transfers
              }),
              stats.map(function(stat) {
                return stat.received
              })
            ],
            onClick: function (points, evt) {
              console.log(points, evt);
              $scope.drp_end = moment($scope.drp_end).subtract(1, 'days').format('MMM, D YYYY');

              loadStatistics();
            }
          }
        })
        .finally(function() {
          $scope.loadingChartData = false;
        });
    }

    $scope.epDiskSpace = {
      animate: {
        duration: 0,
        enabled: false
      },
      barColor: '#e6da5c',
      trackColor: '#ebedf0',
      scaleColor: false,
      lineWidth: 5,
      size: 100,
      lineCap: 'circle'
    };

    $scope.epBandwidth = {
      animate: {
        duration: 0,
        enabled: false
      },
      barColor: '#d95762',
      trackColor: '#ebedf0',
      scaleColor: false,
      lineWidth: 5,
      size: 100,
      lineCap: 'circle'
    };
  }]);
