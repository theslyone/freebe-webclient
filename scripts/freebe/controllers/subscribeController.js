angular
  .module('freebe.subscribe_controller', ['freebe.services'])
  .controller('SubscribeController', ['$scope', '$auth', 'progressLoader', 'banks', 'subscriptions', "Upload", "modalService",
    function($scope, $auth, progressLoader, banks, subscriptions, Upload, modalService) {
      'use strict';

      var d = new Date();
      var year = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();
      var c = new Date(year + 1, month, day);

      $scope.form = {};
      $scope.subscribe = {
        fiscal: {
          start: d,
          end: c
        },
        email: $auth.user.email,
        phone: $auth.user.phone
      };

      $scope.banks = banks;
      $scope.subscriptions = subscriptions;

      $scope.wizardOptions = {
        finishButton: true,
        titleClick: true,
        block: true,
        validate: true
      }
      $scope.createSubscription = function () {

      }


  }
])
