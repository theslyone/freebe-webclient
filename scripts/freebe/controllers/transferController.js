angular
  .module('freebe.transfer_controller', ['freebe.services'])
  .controller('TransferController', ['$scope', '$timeout', '$location', 'subaccountService', 'transactionService',
    'fromAccounts', 'banks', 'beneficiaries',
    function($scope, $timeout, $location, subaccountService, transactionService, fromAccounts, banks, beneficiaries) {
      'use strict';

      $scope.fromAccounts = fromAccounts.map(function(account) {
        return {
          id: account.subaccountId,
          name: account.accountNumber
        }
      });
      $scope.banks = banks;
      $scope.beneficiaries = beneficiaries;
      $scope.selectedBeneficiaries = {};

      $scope.transferType = [{
          name: 'To Bank Account',
          id: 'bank-account'
        },
        {
          name: 'To Beneficiary',
          id: 'beneficiary'
        },
        {
          name: 'To Freebe User',
          id: 'freebe-user'
        }
      ]

      $scope.form = {};
      $scope.transfer = {};
      $scope.initialize = function() {
        $scope.transfer = {
          type: $scope.transferType[0].id,
          fromAccount: {},
          toAccount: {
            id: '',
            accountNumber: '',
            accountName: '',
            phoneNumber: '',
          },
          beneficiary: {},
          amount: '',
          remark: '',
          complete: false,
          successful: false
        }
        $scope.state = {};
        $scope.resetWizard && $scope.resetWizard();
      }

      $scope.wizardOptions = {
        finishButton: true,
        titleClick: true,
        block: true,
        validate: true
      }
      $scope.resetWizard = null;

      $scope.transferTypeChanged = function() {
        $scope.transfer.toAccount = {
          id: '',
          accountNumber: '',
          accountName: '',
          phoneNumber: '',
        };
      }

      $scope.accountNumberLength = 10
      $scope.validateAccountNumber = function() {
        $scope.transfer.toAccount.accountName = '';
        if ($scope.transfer.bank && $scope.transfer.toAccount.accountNumber.length == $scope.accountNumberLength) {
          $scope.state = {
            busy: true,
            message: 'Validating account number...'
          };
          subaccountService.validateAccountNumber($scope.transfer.bank.code, $scope.transfer.toAccount.accountNumber)
            .then(function(accountName) {
              $scope.transfer.toAccount.destination = 2; //indicates transfer to directly to a bank account
              $scope.transfer.toAccount.accountName = accountName;
              $scope.transfer.toAccount.type = 'bank_account';
              $scope.transfer.toAccount.accountType = 'Bank Account';
              $scope.state = {}
            })
        }
      }

      $scope.freebeUserSelected = function(freebeUser) {
        $scope.transfer.toAccount.accountType = '';
        if (freebeUser) {
          $scope.transfer.toAccount.id = freebeUser.id;
          $scope.transfer.toAccount.destination = 0; //indicates transfer to a subaccount account
          $scope.transfer.toAccount.accountNumber = freebeUser.accountNumber;
          $scope.transfer.toAccount.accountName = freebeUser.accountName;
          $scope.transfer.toAccount.type = freebeUser.type;
          $scope.transfer.toAccount.accountType = freebeUser.accountType || freebeUser.type;
          $scope.transfer.toAccount.phoneNumber = '';
        }
      }

      $scope.beneficiarySelected = function(beneficiary) {
        $scope.transfer.toAccount.accountType = '';
        if (beneficiary) {
          $scope.transfer.toAccount.id = beneficiary.id;
          $scope.transfer.toAccount.destination = 1; //indicates transfer to a beneficiary account
          $scope.transfer.toAccount.accountNumber = beneficiary.accountNumber;
          $scope.transfer.toAccount.accountName = beneficiary.accountName;
          $scope.transfer.toAccount.type = beneficiary.type;
          $scope.transfer.toAccount.accountType = beneficiary.accountType || beneficiary.type;
          $scope.transfer.toAccount.phoneNumber = '';
        }
      }

      $scope.resetTransferForm = function() {
        $scope.initialize();
        $scope.form.transfer.$setPristine();
      };

      $scope.completeTransfer = function() {
        var transferData = {
          SourceAccountId: $scope.transfer.fromAccount.id,
          SourceAccountPin: $scope.transfer.fromAccount.pin || '',
          ToSubaccountId: $scope.transfer.toAccount.id || '',
          DestinationAccount: {
            DestinationAccountId: $scope.transfer.toAccount.id || '',
            Destination: $scope.transfer.toAccount.destination || 0,
            BankCode: $scope.transfer.bank && $scope.transfer.bank.code,
            AccountNumber: $scope.transfer.toAccount.accountNumber,
            Type: $scope.transfer.toAccount.type //'bank_account'
          },
          purpose: 'Transfer',
          Remark: $scope.transfer.remark,
          Amount: Number($scope.transfer.amount)
        }
        $scope.state = {
          busy: true,
          message: 'Processing Transfer, Please wait...'
        };
        transactionService.transfer(transferData, {},
          function(response) {
          $location.path('/paylink/transactions/' + response.TransactionId);
        }, function(err){
          $scope.state = {}
        });
      }

      $scope.getFreebeAccounts = function(param) {
        return subaccountService.getAccounts('deposit', param)
          .then(function(res) {
            var users = [];
            angular.forEach(res, function(user) {
              users.push(user);
            });
            //console.log(users);
            return users;
          })
      };
    }
  ]);
