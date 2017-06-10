angular.module('freebe.services')
  .service('subaccountService', ['$http', '$auth', 'pinesNotifications', 'modalService',
    function($http, $auth, pinesNotifications, modalService) {
    'use strict';
    var url = '/api/v1.0/paylink/subaccounts/';
    var error = {
      //title: 'Freebe',
      type: 'error',
      delay: 10000
    }

    this.getAccounts = function(type, param) {
      return $http.get(url + type + "/getall/" + param)
        .then(function(resp) {
          return resp.data.map(
            function(account) {
              return {
                id: account.SubaccountId,
                subaccountId: account.SubaccountId,
                type: account.Type,
                accountType: account.Type,                
                bankName: account.BankName,
                bankCode: account.BankCode,
                accountName: account.AccountName,
                accountNumber: account.AccountNumber
              }
            });
        })
        .catch(function(err) {
          //error.text = 'Error retrieving accounts.';
          //pinesNotifications.notify(error);
        });
    }

    this.getBanks = function() {
      return $http.get(url + "get-banks")
        .then(function(resp) {
          return resp.data.sort(function(a, b) {
            return a.name > b.name;
          });
        })
        .catch(function(err) {
          error.text = 'Error retrieving banks.';
          pinesNotifications.notify(error);
        });
    }

    this.validateAccountNumber = function(bankCode, accountNumber) {
      return $http.post(url + "validateAccountNumber", { bankCode: bankCode, accountNumber: accountNumber })
        .then(function(resp) {
          return resp.data
        })
        .catch(function(err) {
          error.title = 'Error validating account number';
          error.text = err.data.ExceptionMessage;
          pinesNotifications.notify(error);
        });
    }

    this.changeStatus = function(subaccountId, status) {
      return $http.get(`${url}${subaccountId}/${status}`)
        .then(function(resp) {
          var state = !status ? 'deactivated' : 'activated'

          var notification = {
            text: `Account ${state} successfully`,
            type: 'success',
            delay: 10000
          }
          pinesNotifications.notify(notification);
          var account = resp.data;
          return {
            id: account.SubaccountId,
            subaccountId: account.SubaccountId,
            type: account.Type,
            bankName: account.BankName,
            bankCode: account.BankCode,
            accountType: account.Type,
            accountName: account.AccountName,
            accountNumber: account.AccountNumber,
            balance: account.Balance,
            dailyMaxDeposit: account.DailyMaxDeposit,
            dailyMaxWithdrawal: account.DailyMaxWithdrawal,
            active: account.Active
          };
        })
        .catch(function(err) {
          var state = !status ? 'deactivating' : 'activating'
          error.title = `Error ${state} account`;
          error.text = err.data.ExceptionMessage;
          pinesNotifications.notify(error);
        });
    }

    this.changePin = function(data, successCallBack, errorCallback) {
      var modalOptions = {
        actionButtonText: 'Proceed',
        closeButtonText: 'Cancel',
        headerText: 'Freebe PIN change request',
        bodyText: 'Are you sure you want to change the PIN for this account?'
      };

      modalService.showModal({}, modalOptions)
        .then(function() {
          return $http.post(`${url}updatePin`, data);
        })
        .then(function(resp) {
          var notification = {
            text: `Account PIN changed successfully`,
            type: 'success',
            delay: 10000
          }
          pinesNotifications.notify(notification);
          if (typeof successCallBack === 'function') {
            successCallBack(resp);
          }
        })
        .catch(function(err) {
          error.title = err.ExceptionMessage;
          error.text = err.data.ExceptionMessage;
          pinesNotifications.notify(error);
          if (typeof errorCallback === 'function') {
            errorCallback(err);
          }
        });
    }
  }]);
