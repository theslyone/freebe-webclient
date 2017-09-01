angular.module('freebe.services')
  .service('subscriptionService', ['$http', '$auth', 'pinesNotifications', 'modalService',
    function($http, $auth, pinesNotifications, modalService) {
    'use strict';
    var url = '/api/v1.0/paylink/subscriptions';
    var error = {
      //title: 'Freebe',
      type: 'error',
      delay: 10000
    }

    this.getAll = function(email) {
      return $http.get(url + "/" + email)
        .then(function(resp) {
          console.log(resp);
          let subscriptions = resp.data.map(
            function(subscription) {
              return {
                id: subscription.SubscriptionId,
                code: subscription.SubscriptionCode,
                isTrialing: subscription.TrialEnd && subscription.TrialEnd > new Date(),
                trialEnd: subscription.TrialEnd,
                startDate: subscription.StartDate,
                endDate: subscription.EndDate,
                status: subscription.Status,
                plan: {
                  id: subscription.SubscriptionPlanId,//"basic_monthly",
                  name: subscription.Name, //"Basic",
                  interval: subscription.Interval, // 'MONTHLY',
                  trialPeriodInDays: subscription.TrailPeriodDays,
                  amount: subscription.Amount,
                  currency: subscription.Currency
                }
              }
            });
            console.log(subscriptions);
            return subscriptions;
        })
        .catch(function(err) {
          error.text = 'Error retrieving subscriptions.';
          pinesNotifications.notify(error);
        });
    }

    this.getPlans = function() {
      return $http.get('/api/forms/paylink/subscription_plans/all')
        .then(function(resp) {
          let subscriptionPlans = resp.data.map(
            function(subscriptionPlan) {
              return {
                id: subscriptionPlan.SubscriptionPlanId,
                code: subscriptionPlan.SubscriptionPlanCode,
                name: subscriptionPlan.Name,
                interval: subscriptionPlan.Interval,
                trialPeriodInDays: subscriptionPlan.TrialPeriodDays,
                amount: subscriptionPlan.Amount,
                currency: subscriptionPlan.Currency,
                description: subscriptionPlan.Description
              }
            });
            //console.log(subscriptionPlans);
            return subscriptionPlans;
        })
        .catch(function(err) {
          error.text = 'Error retrieving subscription plans.';
          pinesNotifications.notify(error);
        });
    }

    this.create = function(data) {
      return $http.post('/api/v1.0/paylink/subscriptions/create', data)
        .then(function(resp) {
          return resp.data;
        })
        .catch(function(err) {
          error.text = 'Error creating subscription.';
          pinesNotifications.notify(error);
          throw err;
        });
    }

    this.cancel = function(subscriptionCode, reason) {
      return $http.get(`/api/v1.0/paylink/subscriptions/cancel?subscriptionCode=${subscriptionCode}&reason=${reason}`)
        .then(function(resp) {
          return resp.data;
        })
        .catch(function(err) {
          error.text = 'Error canceling subscription.';
          pinesNotifications.notify(error);
          throw err;
        });
    }

    this.activate = function(subscriptionCode, reason) {
      return $http.get(`/api/v1.0/paylink/subscriptions/reactivate/${subscriptionCode}`)
        .then(function(resp) {
          return resp.data;
        })
        .catch(function(err) {
          error.text = 'Error activating subscription.';
          pinesNotifications.notify(error);
          throw err;
        });
    }
  }]);
