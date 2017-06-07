angular.module('theme.core.services')
  .service('walletService', ['$http', '$auth', 'pinesNotifications', function($http, $auth, pinesNotifications) {
    'use strict';
    var url = '/api/v1.0/paylink/subaccounts/';
    var error = {
      //title: 'Freebe',
      type: 'error',
      delay: 10000
    }

    this.create = function(wallet) {
      return $http.post(url + "add", wallet)
        .then(function(resp) {
          wallet = resp.data;
          return {
            id: wallet.SubaccountId,
            subaccountId: wallet.SubaccountId,
            type: wallet.Type,
            accountType: wallet.Type,
            accountName: wallet.AccountName,
            accountNumber: wallet.AccountNumber,
            balance: wallet.Balance,
            dailyMaxDeposit: wallet.DailyMaxDeposit,
            dailyMaxWithdrawal: wallet.DailyMaxWithdrawal
          }
        })
        .catch(function(err) {
          error.text = 'Error retrieving your wallet details.';
          pinesNotifications.notify(error);
        });
    }

    this.get = function(){
      return $http.get(url + "wallet/getall/" + $auth.user.email)
      .then(function(resp) {
        if(resp.data.length > 0){
          var wallet = resp.data[0];
          return {
            id: wallet.SubaccountId,
            subaccountId: wallet.SubaccountId,
            type: wallet.Type,
            accountType: wallet.Type,
            accountName: wallet.AccountName,
            accountNumber: wallet.AccountNumber,
            balance: wallet.Balance,
            dailyMaxDeposit: wallet.DailyMaxDeposit,
            dailyMaxWithdrawal: wallet.DailyMaxWithdrawal
          }
        } else {
          return null;
        }
       })
      .catch(function(err) {
        error.text = 'Error retrieving your wallet details.';
        pinesNotifications.notify(error);
      });
    }
  }]);
