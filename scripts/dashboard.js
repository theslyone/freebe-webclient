var paylinkApp = angular
  .module('PaylinkApp', [
    'freebe'
  ]);

paylinkApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
  '$authProvider', '$httpProvider', 'ChartJsProvider','KeepaliveProvider', 'IdleProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider,
    $authProvider, $httpProvider, ChartJsProvider, KeepaliveProvider, IdleProvider) {
    'use strict';

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

    ChartJsProvider.setOptions({
      chartColors: ['#FF5252', '#80b6ff', '#803690', '#c980ff'],
      responsive: true
    });
    $urlRouterProvider.otherwise('/paylink/login');

    $stateProvider
      .state('paylink', {
        abstract: true,
        resolve: {
          profile: ['$auth', 'customerService', function($auth, customerService) {
            return $auth.validateUser()
              .then(function() {
                return customerService.get($auth.user.email)
              });
          }]
        }
      })
      .state('login', {
        url: '^/paylink/login',
        params: {
          returnUrl: 'dashboard'
        },
        templateUrl: '/my/template/views/user/login.html',
        controller: "SignInController",
        /*resolve: {
          auth: function($auth, $state) {
            return $auth.validateUser()
              .then(function() {
                if ($auth.user) {
                  $state.go('dashboard')
                }
                else { "" }
              });
          }
        }*/
      })
      .state('google-login', {
        url: '^/paylink/google-login',
        templateUrl: '/my/template/views/user/google-login.html',
        controller: "SignInController"
      })
      .state('facebook-login', {
        url: '^/paylink/facebook-login',
        templateUrl: '/my/template/views/user/facebook-login.html',
        controller: "SignInController"
      })
      .state('signup', {
        url: '^/paylink/signup',
        templateUrl: '/my/template/views/user/signup.html',
        controller: "RegistrationController"
      })
      .state('signup-successful', {
        url: '^/paylink/signup-successful',
        templateUrl: '/my/template/views/user/email-sent.html',
        controller: "RegistrationController"
      })
      .state('forgotpassword', {
        url: '^/paylink/forgotpassword',
        templateUrl: '/my/template/views/user/forgotpassword.html',
        controller: "ForgotPasswordController",
        resolve: {
          token: function($http) {
            return $http.get('/account/reset/get-token').then(function(reset) { return reset.data.Token; })
          }
        }
      })
      .state('reset-successful', {
        url: '^/paylink/reset-successful',
        templateUrl: '/my/template/views/user/reset-email-sent.html',
        controller: "SignInController"
      })
      .state('profile', {
        parent: 'paylink',
        url: '^/paylink/profile',
        templateUrl: '/my/template/views/user/profile.html',
        controller: "ProfileController"
      })
      .state('subscribe', {
        parent: 'paylink',
        url: '^/paylink/subscribe',
        templateUrl: '/my/template/views/user/subscribe.html',
        controller: "SubscribeController",
        resolve: {
          banks: function(subaccountService) {
            return subaccountService.getBanks();
          },
          subscriptions: function() {
            return [
              // {
              //   isTrialing: true,
              //   trialEnd: new Date(),
              //   plan: {
              //     id: "basic_monthly",
              //     name: "Basic",
              //     interval: 'MONTHLY', //SubscriptionPlan.SubscriptionInterval.Monthly,
              //     trialPeriodInDays: 30,
              //     price: 10000,
              //     currency: "NGN"
              //   }
              // }
            ]
          }
        }
      })
      .state('dashboard', {
        parent: 'paylink',
        url: '^/paylink/dashboard',
        templateUrl: '/my/template/views/dashboard.html',
        resolve: {
          loadChartsJs: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([
              '/bower_components/Chartjs/Chart.min.js'
            ]);
          }]
        }
      })
      .state('bank-accounts', {
        parent: 'paylink',
        url: '^/paylink/bank-accounts?View=grid',
        templateUrl: '/my/template/views/bank-accounts.html',
        reloadOnSearch: false
      })
      .state('payment-cards', {
        parent: 'paylink',
        url: '^/paylink/payment-cards',
        templateUrl: '/my/template/views/payment-cards.html',
        reloadOnSearch: false
      })
      .state('beneficiaries', {
        parent: 'paylink',
        url: '^/paylink/beneficiaries?View=grid',
        templateUrl: '/my/template/views/beneficiaries.html',
        reloadOnSearch: false
      })
      .state('wallet', {
        parent: 'paylink',
        url: '^/paylink/wallet',
        templateUrl: '/my/template/views/wallet/index.html',
        controller: "WalletController",
        resolve: {
          wallet: ['walletService', function(walletService) {
            return walletService.get();
          }]
        }
      })
      .state('wallet-topup', {
        parent: 'wallet',
        url: '^/paylink/wallet/topup',
        templateUrl: '/my/template/views/wallet/topUp.html',
        controller: "WalletController",
        resolve: {
          //resolve cards here
        }
      })
      .state('wallet-withdrawal', {
        parent: 'paylink',
        url: '^/paylink/wallet/withdrawal',
        templateUrl: '/my/template/views/wallet/withdrawal.html',
        controller: "WalletController",
        resolve: {
          //resolve cards here
        }
      })
      .state('transfer', {
        parent: 'paylink',
        url: '^/paylink/transfer',
        templateUrl: '/my/template/views/transfer.html',
        controller: 'TransferController',
        resolve: {
          fromAccounts: function(profile, subaccountService) {
            return subaccountService.getAccounts('withdrawal', profile.email);;
          },
          banks: function(subaccountService) {
            return subaccountService.getBanks();
          },
          beneficiaries: function(beneficiaryService) {
            return beneficiaryService.getAll();
          }
        }
      })
      .state('transactions', {
        parent: 'paylink',
        url: '^/paylink/transactions',
        templateUrl: '/my/template/views/transactions/index.html',
        reloadOnSearch: false
      })
      .state('transaction-details', {
        parent: 'paylink',
        url: '^/paylink/transactions/:id',
        templateUrl: '/my/template/views/transactions/details.html',
        controller: 'TransactionDetailsController',
        reloadOnSearch: false,
        resolve: {
          transaction: ['$stateParams', 'transactionService', function($stateParams, transactionService) {
            return transactionService.get($stateParams.id);
          }]
        }
      })
      .state('mobile-topup', {
        parent: 'paylink',
        url: '^/paylink/mobile-topup',
        templateUrl: '/my/template/views/bill-payment/mobile-topup.html',
        controller: 'BillPaymentController',
        resolve: {
          fromAccounts: function(profile, subaccountService) {
            return subaccountService.getAccounts('withdrawal', profile.email);;
          },
          merchants: function(transactionService) {
            return transactionService.getMerchants();
          }
        }
      })
      .state('bill-payment', {
        parent: 'paylink',
        url: '^/paylink/bill-payment',
        templateUrl: '/my/template/views/bill-payment/index.html',
        controller: 'BillPaymentController',
        resolve: {
          fromAccounts: function(profile, subaccountService) {
            return subaccountService.getAccounts('withdrawal', profile.email);;
          },
          merchants: function(transactionService) {
            return transactionService.getMerchants();
          }
        }
      })
      .state('bill-payment.product', {
        url: '^/paylink/bill-payment/:id',
        templateUrl: '/my/template/views/bill-payment/product.html',
        controller: 'BillPaymentController'
      })
      .state('/paylink/:templateFile', {
        templateUrl: function($stateParams) {
          return '/my/template/views/' + $stateParams.templateFile + '.html';
        },
        reloadOnSearch: false
      });

    $authProvider.configure({
      apiUrl: '/',
      tokenValidationPath: 'account/validate-token',
      signOutUrl: 'account/sign-out-mobile',
      emailRegistrationPath: 'account/sign-up',
      accountUpdatePath: 'account/update',
      accountDeletePath: 'account/delete',
      confirmationSuccessUrl: 'account/paylink', //window.location.href,
      passwordResetPath: 'account/reset',
      passwordUpdatePath: 'account/change-password',
      passwordResetSuccessUrl: 'account/token/login', //window.location.href,
      emailSignInPath: 'account/sign-in',
      storage: 'localStorage',
      forceValidateToken: false,
      validateOnPageLoad: true,
      proxyIf: function() {
        return false;
      },
      proxyUrl: '/proxy',
      omniauthWindowType: 'newWindow',
      authProviderPaths: {
        facebook: 'paylink/facebook-login',
        google: 'paylink/google-login'
      },
      tokenFormat: {
        "access-token": "{{ token }}",
        "token-type": "Bearer",
        "client": "{{ clientId }}",
        "expiry": "{{ expiry }}",
        "uid": "{{ uid }}"
      },
      parseExpiry: function(headers) {
        // convert from UTC ruby (seconds) to UTC js (milliseconds)
        return (parseInt(headers['expiry']) * 1000) || null;
      },
      handleLoginResponse: function(response) {
        return response.data.data;
      },
      handleAccountUpdateResponse: function(response) {
        return response.data.data;
      },
      handleTokenValidationResponse: function(response) {
        return response.data.data;
      }
    });

    $httpProvider.interceptors.push('httpRequestInterceptor');

    IdleProvider.idle(10*60);
    IdleProvider.timeout(30);
    //KeepaliveProvider.interval(10);
  }
])

paylinkApp.run(['$rootScope', '$state', function($rootScope, $state) {
  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {

  });

  $rootScope.$on("$stateChangeError", function(event, next, current, error) {
    //console.error(next.name);
    $state.go('login', { returnUrl: next.name} );
  });
}]);
