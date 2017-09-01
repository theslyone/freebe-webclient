angular
  .module('freebe.subscribe_controller', ['freebe.services'])
  .controller('SubscribeController', ['$scope', '$auth', 'progressLoader', 'banks', 'subscriptionService',
    'subscriptions', "plans", "cards", "Upload", "modalService",
    function($scope, $auth, progressLoader, banks, subscriptionService, subscriptions, plans, cards, Upload, modalService) {
      'use strict';

      var d = new Date();
      var year = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();
      var c = new Date(year + 1, month, day);

      $scope.form = {};
      $scope.subscribe = {
        plan: {},
        card: {},
        bank: {},
        fiscal: {
          start: d,
          end: c
        },
        contact: {
          email: $auth.user.email,
          phone: $auth.user.phone
        }
      };

      $scope.banks = banks;
      $scope.subscriptions = subscriptions;
      $scope.plans = plans;
      $scope.cards = cards;

      $scope.wizardOptions = {
        finishButton: true,
        titleClick: true,
        block: true,
        validate: true
      }

      $scope.createSubscription = function () {
        progressLoader.start();
        progressLoader.set(50);
        $scope.state = {
          busy: true,
          message: 'Processing Subscription, Please wait...'
        };
        let subscriptionRequest = Object.assign({}, $scope.subscribe,
          {
            subscription: {
              SubscriptionPlanId: $scope.subscribe.plan.id,
              CustomerId: $auth.user.id,
              SubaccountId: $scope.subscribe.card.id
            }
          }
        );
        console.log(subscriptionRequest);
        subscriptionService.create(subscriptionRequest)
        .then((subscription) => {
          $scope.subscriptions = ($scope.subscriptions || []).push(subscription);
          progressLoader.end();
          $scope.state = {}
        })
        .catch(err => {
          progressLoader.end();
          $scope.state = {}
        });
      }

      $scope.cancelSubscription = function (subscriptionCode) {
        progressLoader.start();
        progressLoader.set(50);
        $scope.state = {
          busy: true,
          message: 'Canceling Subscription, Please wait...'
        };
        subscriptionService.cancel(subscriptionCode, '')
        .then((subscription) => {
          //$scope.subscriptions = ($scope.subscriptions || []).filter(s => s.code != subscriptionCode);
          $scope.subscriptions = ($scope.subscriptions || []).map(s => {
            if(s.code == subscriptionCode) {
              s.status = subscription.Status;
            }
            return s;
          });
          progressLoader.end();
          $scope.state = {}
        })
        .catch(err => {
          progressLoader.end();
          $scope.state = {}
        });
      }

      $scope.reactivateSubscription = function (subscriptionCode) {
        progressLoader.start();
        progressLoader.set(50);
        $scope.state = {
          busy: true,
          message: 'Activating Subscription, Please wait...'
        };
        subscriptionService.activate(subscriptionCode, '')
        .then((subscription) => {
          $scope.subscriptions = ($scope.subscriptions || []).map(s => {
            if(s.code == subscriptionCode) {
              s.status = subscription.Status;
            }
            return s;
          });
          progressLoader.end();
          $scope.state = {}
        })
        .catch(err => {
          progressLoader.end();
          $scope.state = {}
        });
      }
  }
])
