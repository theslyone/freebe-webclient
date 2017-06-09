angular.module('freebe.services')
.service('reportService', ['$http', '$auth', 'pinesNotifications', function($http, $auth, pinesNotifications){
  'use strict';
  var url = '/api/v1.0/paylink/report/';
  var error = {
    //title: 'Freebe',
    type: 'error',
    delay: 10000
  }

  this.getTransactionStatistics = function (startDate, endDate) {
    return $http.get(`${url}transaction-statistics/${startDate}/${endDate}`)
    .then(function(resp) {
      return resp.data.map(function(stat){
        return {
          transaction_date: stat.TransactionDate,
          transfers: stat.Transfers,
          received: stat.Received
        }
      });
     })
    .catch(function(err) {
      error.text = 'Error retrieving transaction statistics.';
      pinesNotifications.notify(error);
    });
  }

}]);
