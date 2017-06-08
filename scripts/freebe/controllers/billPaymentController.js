angular
  .module('freebe.bill_payment_controller', [
    'ngGrid'
  ])
  .controller('BillPaymentController', ['$scope', '$state', '$stateParams', '$filter', 'merchants', 'fromAccounts', 'transactionService',
    function($scope, $state, $stateParams, $filter, merchants, fromAccounts, transactionService) {
      'use strict';

      $scope.oneAtATime = true;

      $scope.initialize = function() {
        $scope.topupProviders = merchants.filter(function(merchant) {
          return merchant['class'] === 'topup' && merchant.status === 'Active'
        })[0].products;

        $scope.merchants = merchants.filter(function(merchant) {
          return merchant['class'] != 'topup' && merchant.status == 'Active'
        });

        $scope.topup = {
          provider: null,
          amount: '',
          fromAccount: null,
          phone: '',
          isBusy: false
        };
        $scope.bill = {
          product: null,
          sourceAccount: null,
          isBusy: false
        }
        $scope.state = {}
      }

      $scope.getProduct = function() {
        $scope.initialize();
        $scope.product = merchants
          .map(function(merchant) {
            return merchant.products
          })
          .reduce(function(a, b) {
            return a.concat(b);
          })
          .filter(function(products) {
            return products.id === $stateParams.id;
          })[0]

        $scope.fields = Object.keys($scope.product.hookdata).map(function(field) {
          var type = 'text';
          var pattern = new RegExp(/^[a-zA-Z0-9_.@]*$/);
          var help = '';
          switch ($scope.product.hookdata[field].type) {
            case 'email-address':
            case 'email':
              type = 'email';
              //pattern = '/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/';
              break;
            case "numeric":
            case "number":
              type = 'text';
              pattern = new RegExp(/^[0-9]*$/);
              break;
            case 'phone':
            case 'phone_number':
              type = 'text';
              //pattern = '/^(\+234)?[ -]?(\d{3})?[ -]?(\d{3})[ -]?(\d{4})$/';
              help = '+234 800 000 0000';
              break;
          }
          return {
            name: field,
            readonly: $scope.product.hookdata[field].disabled,
            type: type,
            pattern: pattern,
            value: field === 'amount' ? $scope.product.cost : '',
            help: help
          }
        })
      }

      $scope.fromAccounts = fromAccounts.map(function(account) {
        return {
          id: account.subaccountId,
          name: account.accountNumber
        }
      });

      $scope.$watch('product', function(newProduct, oldProduct, scope) {
        if(newProduct){
          scope.bill.product = {
            id: newProduct.id,
            merchant_id: newProduct.merchant_id,
            name: newProduct.name,
            description: newProduct.description
          };
        }
      }, true);
      $scope.$watch('fields', function(newFields, oldField, scope) {
        if(newFields) {
          var fields = newFields.reduce(function(a, b) {
            a[b.name] = b.value;
            return a;
          }, {});
          //console.log('fields changed:' + JSON.stringify(fields, null, 4));
          angular.extend(scope.bill, fields);
          //console.log(scope.bill);
        }
      }, true);

      $scope.mobileTopUp = function() {
        var topupData = {
          sourceAccountId: $scope.bill.sourceAccount.id,
          sourceAccountPin: $scope.bill.sourceAccount.pin,
          //phone: $scope.topup.phone.replace(/ /g, ''),
          purpose: 'AIRTIME',
          description: $scope.bill.product.description
        }
        angular.extend(topupData, $scope.bill);
        $scope.state = {
          busy: true,
          message: 'Processing, Please wait...'
        };
        transactionService.pay(topupData, {
            headerText: `Freebe Mobile Top Up (${$filter('currency')($scope.bill.amount, "NGN ")})`,
            bodyText: `Are you sure you want top up ${$scope.bill.phone} with ${$filter('currency')($scope.bill.amount, "NGN ")}?`
          },
          function(response) {
            $state.go('transaction-details', {
              id: response.TransactionId
            });
            $scope.initialize();
          },
          function(err) {
            $scope.state = {}
          });
      }

      $scope.pay = function() {
        var billData = {
          sourceAccountId: $scope.bill.sourceAccount.id,
          sourceAccountPin: $scope.bill.sourceAccount.pin,
          purpose: 'Bill Payment',
          description: $scope.bill.product.description
        }
        angular.extend(billData, $scope.bill);
        //console.log(billData);
        $scope.state = {
          busy: true,
          message: 'Processing, Please wait...'
        };
        transactionService.pay(billData, {
            headerText: `Freebe Bill Payment (${$filter('currency')($scope.bill.amount, "NGN ")})`,
            bodyText: `Are you sure you want to pay ${$filter('currency')($scope.bill.amount, "NGN ")}
            for ${$scope.bill.product.description}?`
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
