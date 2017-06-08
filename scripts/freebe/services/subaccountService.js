angular.module('freebe.services')
.service('subaccountService', ['$http', '$auth', 'pinesNotifications', function($http, $auth, pinesNotifications){
  'use strict';
  var url = '/api/v1.0/paylink/subaccounts/';
  var error = {
    //title: 'Freebe',
    type: 'error',
    delay: 10000
  }

  this.getAccounts = function (type, param) {
    return $http.get(url + type + "/getall/" + param)
    .then(function(resp) {
      return resp.data.map(
        function(account) {
          return {
            id: account.SubaccountId,
            subaccountId: account.SubaccountId,
            type: account.Type,
            bankName: account.BankName,
            bankCode: account.BankCode,
            accountName: account.AccountName,
            accountNumber: account.AccountNumber
          }
        });
     })
    .catch(function(err) {
      error.text = 'Error retrieving accounts.';
      pinesNotifications.notify(error);
    });
  }

  this.getBanks = function () {
    return $http.get(url + "get-banks")
    .then(function(resp) { return resp.data.sort(function(a, b) { return a.name > b.name; }); })
    .catch(function(err) {
      error.text = 'Error retrieving banks.';
      pinesNotifications.notify(error);
    });
  }

  this.validateAccountNumber = function (bankCode, accountNumber) {
    return $http.get(url + "validate/" + bankCode + "/account/" + accountNumber)
    .then(function(resp) { return resp.data })
    .catch(function(err) {
      error.title = 'Error validating account number';
      error.text = err.data.ExceptionMessage;
      pinesNotifications.notify(error);
    });
  }
}]);
