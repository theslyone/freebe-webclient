angular
  .module('theme.core.wallet_controller', [
    'ngGrid'
  ])
  .controller('WalletController', ['$scope', 'modalService', 'wallet', 'walletService', 'transactionService',
  function($scope, modalService, wallet, walletService, transactionService) {
    'use strict';

    $scope.wallet = wallet;

    $scope.form = {};
    $scope.walletForm = {};

    $scope.topup = function(size) {
      var modalDefaults = {
        templateUrl: '/my/template/views/templates/walletTopUp.html',
        controller: function($scope, $modalInstance, cards) {
          $scope.cards = cards;
          $scope.deposit = {
            amount: '',
            card: null
          };
          $scope.ok = function() {
            //go busy on UI
            var transferData = {
              SourceAccountId: $scope.deposit.card.id,
              SourceAccountPin: $scope.deposit.card.pin || '',
              ToSubaccountId: wallet.id || '',
              DestinationAccount: {
                DestinationAccountId: wallet.id || '',
                Destination: 0, //all subaccount types = 0
                BankCode: null,
                AccountNumber: wallet.accountNumber,
                Type: 'wallet'
              },
              purpose: 'Wallet Topup',
              Remark: 'wallet topup',
              Amount: Number($scope.deposit.amount)
            }
            transactionService.transfer(transferData,
              function(response) {
              $location.path('/paylink/transactions/' + response.TransactionId);
            }, function(err){
              //clear busy on UI
              $scope.state = {}
            });
          };
          $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
          };
        },
        //size: size,
        resolve: {
          cards: function(subaccountService) {
            return subaccountService.getAccounts('card')
          }
        }
      };
      modalService.showModal(modalDefaults, {})
      .then(function() {
      });
    };

    $scope.withdraw = function(size) {
      var modalInstance = $modal.open({
        templateUrl: 'walletWithdrawal.html',
        controller: function($scope, $modalInstance, banks, wallet) {
          $scope.banks = banks;
          $scope.wallet = wallet;

          $scope.withdrawal = {
            amount: '',
            bank: {}
          };

          $scope.ok = function() {
            $modalInstance.close();
          };

          $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
          };
        },
        size: size,
        resolve: {
          banks: function(subaccountService) {
            return subaccountService.getAccounts('bank_account')
          },
          wallet: function() {
            return $scope.wallet;
          }
        }
      });
    };

    $scope.create = function(wallet) {
      $scope.clearAlert();
      $scope.isBusy = true;
      walletService.create(Object.assign({}, wallet, {
          Type: 'wallet'
        }))
        .then(function(newWallet) {
          $scope.wallet = newWallet;
        })
        .catch(function(err) {
          $scope.alert = {
            type: 'danger',
            msg: err.message
          };
        })
        .finally(function() {
          $scope.isBusy = false;
        });

    }

    $scope.clearAlert = function() {
      $scope.alert = {}
    }
  }]);
