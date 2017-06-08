angular.module('freebe.services')
  .factory('transactionService', ['$http', '$location', '$auth', 'modalService', 'pinesNotifications', 'progressLoader',
    function($http, $location, $auth, modalService, pinesNotifications, progressLoader) {
      'use strict';
      var url = '/api/v1.0/paylink/transactions/';
      var notification = {
        //title: 'Freebe',
        type: 'error',
        delay: 10000
      }

      var get = function(id) {
        return $http.get('/api/v1.0/forms/paylink/transactions/' + id)
          .then(function(resp) {
            var transaction = resp.data;
            return {
              id: transaction.TransactionId,
              transactionId: transaction.TransactionId,
              amount: transaction.Amount,
              fees: transaction.Fees,
              currency: transaction.Currency,
              transactionDate: transaction.TransactionDate,
              fromAccount: {
                id: transaction.FromSubaccountId,
                accountName: transaction.FromSubaccountName,
                accountNumber: transaction.FromSubaccountNumber,
                type: transaction.FromSubaccountType
              },
              toAccount: {
                id: transaction.ToSubaccountId,
                accountName: transaction.ToSubaccountName,
                accountNumber: transaction.ToSubaccountNumber,
                type: transaction.ToSubaccountType
              },
              reference: transaction.Reference,
              remark: transaction.Remark,
              purpose: transaction.Purpose,
              completed: transaction.Completed,
              message: transaction.Message,
              type: transaction.Type,
            }
          })
          .catch(function(err) {
            notification.type = 'error';
            notification.text = 'Error retrieving transaction details.';
            pinesNotifications.notify(notification);
          });
      }

      var getRecent = function() {
        return $http.get('/api/v1.0/views/paylink/transaction_view')
          .then(function(resp) {
            var recentTrx = resp.data.map(function(transaction) {
              return {
                id: transaction.TransactionId,
                transactionId: transaction.TransactionId,
                amount: transaction.Amount,
                fees: transaction.Fees,
                currency: transaction.Currency,
                transactionDate: transaction.TransactionDate,
                fromAccount: {
                  id: transaction.FromSubaccountId,
                  accountName: transaction.FromSubaccountName,
                  accountNumber: transaction.FromSubaccountNumber,
                  type: transaction.FromSubaccountType
                },
                toAccount: {
                  id: transaction.ToSubaccountId,
                  accountName: transaction.ToSubaccountName,
                  accountNumber: transaction.ToSubaccountNumber,
                  type: transaction.ToSubaccountType
                },
                reference: transaction.Reference,
                purpose: transaction.Purpose,
                remark: transaction.Remark,
                completed: transaction.Completed,
                message: transaction.Message,
                type: transaction.Type,
              }
            });
            return recentTrx;
          })
          .catch(function(err) {
            notification.type = 'error';
            notification.text = 'Error retrieving recent transactions.';
            pinesNotifications.notify(notification);
          });
      }

      var getMerchants = function() {
        return $http.get(url + 'get-merchants')
          .then(function(resp) {
            return resp.data;
          })
          .catch(function(err) {
            notification.type = 'error';
            notification.text = 'Error retrieving mobile top up merchants.';
            pinesNotifications.notify(notification);
          });
      }

      var getProducts = function(merchantId) {
        return $http.get(`${url}merchant/${merchantId}/products`)
          .then(function(resp) {
            return resp.data;
          })
          .catch(function(err) {
            notification.type = 'error';
            notification.text = 'Error retrieving mobile top up merchant products.';
            pinesNotifications.notify(notification);
          });
      }

      var processTransaction = function(resource, obj, successCallBack, errorCallback) {
        progressLoader.start();
        progressLoader.set(50);
        //resource = resource || "transfer";
        return $http.post(url + resource, obj)
          .then(function(resp) {
            var response = resp.data;
            if(!response.TransactionId) { throw Error("Unknow error encountered" );}
            return response;
          })
          .then(function(response){
            //console.log(response);
            if (response.RequireValidation) {
              var modalOptions = {
                actionButtonText: 'Proceed',
                closeButtonText: 'Cancel',
                headerText: 'Authorization Required',
                bodyText: response.Message,
                amount: response.Amount,
                fees: response.Fees
              };

              var modalDefaults = {
                controller: function($scope, $modalInstance) {
                  $scope.otp = '';
                  $scope.modalOptions = modalOptions;
                  $scope.modalOptions.ok = function(otp) {
                    $modalInstance.close(otp);
                  };
                  $scope.modalOptions.close = function() {
                    $modalInstance.dismiss('cancel');
                  };
                },
                templateUrl: '/my/template/views/templates/otp-modal.html'
              };

              modalService.showModal(modalDefaults, modalOptions)
              .then(function(otp) {
                //console.log(otp);
                processTransaction(resource, { Reference: response.Reference, Code: otp }, successCallBack, errorCallback);
              })
              .catch(function(err){
                if(typeof errorCallback === 'function') {
                  errorCallback(err);
                }
              });
            } else {
              progressLoader.end();
              notification.type = 'success';
              notification.text = 'Transaction processed successfully!'
              pinesNotifications.notify(notification);

              if(typeof successCallBack === 'function') {
                successCallBack(response);
              }
            }
          })
          .catch(function(err) {
            progressLoader.end();
            notification.type = 'error';
            notification.text = err.data.ExceptionMessage;
            pinesNotifications.notify(notification);
            if(typeof errorCallback === 'function') {
              errorCallback(err);
            }
          });
      }

      var transfer = function(transferObject, transferOptions, successCallBack, errorCallback) {
        var modalOptions = {
          actionButtonText: 'Proceed',
          closeButtonText: 'Cancel',
          headerText: 'Freebe Transfer (NGN ' + transferObject.Amount + ')',
          bodyText: 'Are you sure you want to transfer ' + transferObject.Amount + '?'
        };

        angular.extend(modalOptions, transferOptions);

        modalService.showModal({}, modalOptions)
        .then(function() {
          processTransaction("transfer", transferObject, successCallBack, errorCallback);
        })
        .catch(function(err){
          if(typeof errorCallback === 'function') {
            errorCallback(err);
          }
        });
      }

      var pay = function(billObject, transferOptions, successCallBack, errorCallback) {
        var modalOptions = {
          actionButtonText: 'Proceed',
          closeButtonText: 'Cancel',
          headerText: 'Freebe Bill Payment (NGN ' + billObject.Amount + ')',
          bodyText: 'Are you sure you want to pay ' + billObject.Amount + '?'
        };

        angular.extend(modalOptions, transferOptions);

        modalService.showModal({}, modalOptions)
        .then(function() {
          processTransaction("bill", billObject, successCallBack, errorCallback);
        })
        .catch(function(err){
          if(typeof errorCallback === 'function') {
            errorCallback(err);
          }
        });
      }


      return {
        get: get,
        getRecent: getRecent,
        transfer: transfer,
        pay: pay,
        getMerchants: getMerchants,
        getProducts: getProducts
      }
    }
  ]);
