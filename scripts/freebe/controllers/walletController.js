angular
  .module('freebe.wallet_controller', [
    'ngGrid',
    'freebe.services'
  ])
  .controller('WalletController', ['$scope', '$state', '$filter', 'modalService', 'profile', 'wallet',
    'walletService', 'subaccountService', 'transactionService',
  function($scope, $state, $filter, modalService, profile, wallet, walletService, subaccountService, transactionService) {
    'use strict';
    $scope.wallet = wallet;

    $scope.form = {};
    $scope.walletForm = {};

    $scope.topup = function(size) {
      var modalDefaults = {
        templateUrl: '/my/template/views/wallet/topUp.html',
        controller: function($scope, $modalInstance, cards) {
          $scope.cards = cards;
          $scope.topup = {
            amount: '',
            card: null,
            cardPin: '',
            isBusy: false
          };
          $scope.ok = function() {
            $scope.topup.isBusy = true;
            var transferData = {
              SourceAccountId: $scope.topup.card.id,
              SourceAccountPin: $scope.topup.cardPin,
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
              Amount: Number($scope.topup.amount)
            }
            transactionService.transfer(transferData, {
              headerText: `Freebe Wallet Top Up (${$filter('currency')($scope.topup.amount, "NGN ")})`,
              bodyText: `Are you sure you want to transfer ${$filter('currency')($scope.topup.amount, "NGN ")}
                from card ${$scope.topup.card.accountNumber} to your wallet?`
            },
              function(response) {
                $scope.topup.isBusy = false;
                $modalInstance.close();
                $state.go('transaction-details', {id: response.TransactionId });
            }, function(err){
              $scope.topup.isBusy = false;
            });
          };
          $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
          };
        },
        //size: size,
        resolve: {
          cards: function(subaccountService) {
            return subaccountService.getAccounts('card', profile.email)
          }
        }
      };
      modalService.showModal(modalDefaults, {})
      .then(function() {
      });
    };

    $scope.withdraw = function(size) {
      var modalDefaults = {
        templateUrl: '/my/template/views/wallet/withdraw.html',
        controller: function($scope, $modalInstance, banks, wallet) {
          $scope.banks = banks;
          $scope.wallet = wallet;

          $scope.withdraw = {
            amount: '',
            bank: null,
            walletPin: '',
            isBusy: false
          };
          $scope.ok = function() {
            $scope.withdraw.isBusy = true;
            var transferData = {
              SourceAccountId: wallet.id,
              SourceAccountPin: $scope.withdraw.walletPin,
              ToSubaccountId: $scope.withdraw.bank.id || '',
              DestinationAccount: {
                DestinationAccountId: $scope.withdraw.bank.id || '',
                Destination: 0, //all subaccount types = 0
                BankCode: $scope.withdraw.bank.code,
                AccountNumber: $scope.withdraw.bank.accountNumber,
                Type: $scope.withdraw.bank.type//'bank_account'
              },
              purpose: 'Wallet Withdrawal',
              Remark: 'wallet withdrawal',
              Amount: Number($scope.withdraw.amount)
            }
            transactionService.transfer(transferData, {
              headerText: `Freebe Wallet Withdrawal (${$filter('currency')($scope.withdraw.amount, "NGN ")})`,
              bodyText: `Are you sure you want to transfer ${$filter('currency')($scope.withdraw.amount, "NGN ")}
                from your wallet to bank ${$scope.withdraw.bank.bankName} (${$scope.withdraw.bank.accountNumber})?`
            },
              function(response) {
                $scope.withdraw.isBusy = false;
                $modalInstance.close();
                $state.go('transaction-details', {id: response.TransactionId });
            }, function(err){
              $scope.withdraw.isBusy = false;
            });
          };
          $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
          };
        },
        resolve: {
          banks: function(subaccountService) {
            return subaccountService.getAccounts('bank_account', profile.email)
          },
          wallet: function() {
            return $scope.wallet;
          }
        }
      };
      modalService.showModal(modalDefaults, {})
      .then(function() {
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

    $scope.changeStatus = function() {
      $scope.clearAlert();
      modalService.showModal({}, {})
      .then(function(){
        $scope.isBusy = true;
        return subaccountService.changeStatus($scope.wallet.id, !$scope.wallet.active);
      })
      .then(function(wallet) {
        $scope.wallet = wallet;
      })
      .finally(function() {
        $scope.isBusy = false;
      });
    }

    $scope.changePin = function() {
      var modalDefaults = {
        templateUrl: '/my/template/views/wallet/pinChange.html',
        controller: function($scope, $modalInstance, wallet) {
          $scope.pinChange = {
            subaccountId: wallet.id,
            oldPin: '',
            newPin: '',
            isBusy: false
          };
          $scope.ok = function() {
            $scope.pinChange.isBusy = true;
            subaccountService.changePin($scope.pinChange,
              function(response) {
                $scope.pinChange.isBusy = false;
                $modalInstance.close();
            }, function(err){
              $scope.pinChange.isBusy = false;
            });
          };
          $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
          };
        },
        resolve: {
          wallet: function() {
            return $scope.wallet;
          }
        }
      };
      modalService.showModal(modalDefaults, {})
      .then(function(){});
    };


    $scope.clearAlert = function() {
      $scope.alert = {}
    }
  }]);
