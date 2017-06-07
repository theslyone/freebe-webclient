angular.module('theme.core.services')
.service('beneficiaryService', ['$http', '$auth', 'pinesNotifications', function($http, $auth, pinesNotifications){
  'use strict';
  var url = '/api/v1.0/views/paylink/beneficiaries/';
  var error = {
    //title: 'Freebe',
    type: 'error',
    delay: 10000
  }

  this.getAll = function () {
    return $http.get(url + 'all')
    .then(function(resp) {
      return resp.data.map(
        function(account) {
          return {
            id: account.BeneficiaryId,
            subaccountId: account.BeneficiaryId,
            type: "bank_account",
            accountType: "Bank Account",
            accountName: account.AccountName,
            accountNumber: account.AccountNumber
          }
        });
     })
    .catch(function(err) {
      error.text = 'Error retrieving beneficiaries.';
      pinesNotifications.notify(error);
    });
  }

}]);
