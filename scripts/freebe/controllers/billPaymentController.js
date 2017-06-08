angular
  .module('freebe.bill_payment_controller', [
    'ngGrid'
  ])
  .controller('BillPaymentController', ['$scope', '$state', '$filter', 'merchants', 'fromAccounts', 'transactionService',
    function($scope, $state, $filter, merchants, fromAccounts, transactionService) {
      'use strict';
      $scope.topupProviders = merchants.filter(function(merchant) {
        return merchant['class'] === 'topup' && merchant.status === 'Active'
      })[0].products;
      $scope.merchants = merchants.filter(function(merchant) {
        return merchant['class'] != 'topup' && merchant.status == 'Active'
      });

      $scope.fromAccounts = fromAccounts.map(function(account) {
        return {
          id: account.subaccountId,
          name: account.accountNumber
        }
      });

      $scope.initialize = function() {
        $scope.topup = {
          provider: null,
          amount: '',
          fromAccount: null,
          phone: '',
          isBusy: false
        };
        $scope.state = {}
      }

      $scope.mobileTopUp = function() {
        var topupData = {
          SourceAccountId: $scope.topup.fromAccount.id,
          SourceAccountPin: $scope.topup.fromAccount.pin,
          Merchant: {
            Id: $scope.topup.provider.merchant_id,
            Name: 'AIRTIME'
          },
          Product: {
            Id: $scope.topup.provider.id,
            Name: $scope.topup.provider.name
          },
          Phone: $scope.topup.phone.replace(/ /g, ''),
          purpose: $scope.topup.provider.description,
          description: $scope.topup.provider.description,
          Amount: Number($scope.topup.amount)
        }
        $scope.state = {
          busy: true,
          message: 'Processing, Please wait...'
        };
        transactionService.pay(topupData, {
            headerText: `Freebe Mobile Top Up (${$filter('currency')($scope.topup.amount, "NGN ")})`,
            bodyText: `Are you sure you want top up ${$scope.topup.phone} with ${$filter('currency')($scope.topup.amount, "NGN ")}?`
          },
          function(response) {
            $scope.initialize();
            $state.go('transaction-details', {
              id: response.TransactionId
            });
          },
          function(err) {
            $scope.state = {}
          });
      }
    }
  ]);
