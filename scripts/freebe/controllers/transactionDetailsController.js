angular
  .module('theme.core.transaction_details_controller', [])
  .controller('TransactionDetailsController', TransactionDetailsController);

TransactionDetailsController.$inject = ['$scope', 'transaction']
function TransactionDetailsController($scope, transaction){
  'use strict';
  $scope.transaction = transaction;
}
