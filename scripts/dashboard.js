var paylinkApp = angular
  .module('PaylinkApp', [
    'theme'
  ]);

paylinkApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$authProvider', '$httpProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider, $authProvider, $httpProvider) {
    'use strict';

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

    function UserLoggedIn($auth, $location) {
      if ($auth.user) {
        $location.path('/paylink')
      }
    }

    /*var originalWhen = $stateProvider.state;
    $stateProvider.state = function(path, route) {
      route.resolve || (route.resolve = {});
      angular.extend(route.resolve, {
        profile: ['$auth', 'customerService', function($auth, customerService) {
          console.log('access when');
          return $auth.validateUser()
            .then(function() {
              return customerService.get($auth.user.email)
            });
        }]
      });

      return originalWhen.call($urlRouterProvider, path, route);
    };*/

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
        url: '/paylink/login',
        templateUrl: '/my/template/views/user/login.html',
        controller: "SignInController",
        /*resolve: {
          auth: UserLoggedIn
        }*/
      })
      .state('signup', {
        url: '/paylink/signup',
        templateUrl: '/my/template/views/user/signup.html',
        controller: "RegistrationController"
      })
      .state('signup-successful', {
        url: '/paylink/signup-successful',
        templateUrl: '/my/template/views/user/email-sent.html',
        controller: "RegistrationController"
      })
      .state('forgotpassword', {
        url: '/paylink/forgotpassword',
        templateUrl: '/my/template/views/user/forgotpassword.html',
        controller: "SignInController"
      })
      .state('profile', {
        parent: 'paylink',
        url: '/paylink/profile',
        templateUrl: '/my/template/views/user/profile.html',
        controller: "ProfileController"
      })
      .state('dashboard', {
        parent: 'paylink',
        url: '/paylink/dashboard',
        templateUrl: '/my/template/views/dashboard.html'
      })
      .state('bank-accounts', {
        parent: 'paylink',
        url: '/paylink/bank-accounts',
        templateUrl: '/my/template/views/bank-accounts.html',
        reloadOnSearch: false
      })
      .state('payment-cards', {
        parent: 'paylink',
        url: '/paylink/payment-cards',
        templateUrl: '/my/template/views/payment-cards.html',
        reloadOnSearch: false
      })
      .state('beneficiaries', {
        parent: 'paylink',
        url: '/paylink/beneficiaries',
        templateUrl: '/my/template/views/beneficiaries.html',
        reloadOnSearch: false
      })
      .state('wallet', {
        parent: 'paylink',
        url: '/paylink/wallet',
        templateUrl: '/my/template/views/wallet/index.html',
        controller: "WalletController",
        resolve: {
          wallet: ['walletService', function(walletService) {
            return walletService.get();
          }]
        }
      })
      .state('wallet.topup', {
        url: '/topup',
        templateUrl: '/my/template/views/wallet/topUp.html',
        controller: "WalletController",
        resolve: {
          //resolve cards here
        }
      })
      .state('wallet.withdrawal', {
        url: '/topup',
        templateUrl: '/my/template/views/wallet/withdrawal.html',
        controller: "WalletController",
        resolve: {
          //resolve cards here
        }
      })
      .state('transfer', {
        parent: 'paylink',
        url: '/paylink/transfer',
        templateUrl: '/my/template/views/transfer.html',
        controller: 'TransferController',
        resolve: {
          fromAccounts: ['subaccountService', function(subaccountService) {
            return subaccountService.getAccounts('withdrawal');;
          }],
          banks: ['subaccountService', function(subaccountService) {
            return subaccountService.getBanks();
          }],
          beneficiaries: ['beneficiaryService', function(beneficiaryService) {
            return beneficiaryService.getAll();
          }]
        }
      })
      .state('transactions', {
        parent: 'paylink',
        url: '/paylink/transactions',
        templateUrl: '/my/template/views/transactions/index.html',
        reloadOnSearch: false
      })
      .state('transactions.details', {
        url: '/:id',
        templateUrl: '/my/template/views/transactions/details.html',
        controller: 'TransactionDetailsController',
        reloadOnSearch: false,
        resolve: {
          transaction: ['$stateParams', 'transactionService', function($stateParams, transactionService) {
            return transactionService.get($stateParams.id);
          }]
        }
      })
      .state('/paylink/:templateFile', {
        templateUrl: function($state) {
          return '/my/template/views/' + $state.params.templateFile + '.html';
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
      omniauthWindowType: 'sameWindow',
      authProviderPaths: {
        facebook: 'account/facebook/sign-in',
        google: 'account/google/sign-in'
      },
      tokenFormat: {
        "access-token": "{{ token }}",
        "token-type": "Bearer",
        "client": "{{ clientId }}",
        "expiry": "{{ expiry }}",
        "uid": "{{ uid }}"
      },
      /*tokenFormat: {
        "access-token": "{{ token }}",
        "Authorization": "Bearer {{ token }}"
      },*/
      parseExpiry: function(headers) {
        // convert from UTC ruby (seconds) to UTC js (milliseconds)
        return (parseInt(headers['expiry']) * 1000) || null;
      },
      handleLoginResponse: function(response) {
        return response.data;
      },
      handleAccountUpdateResponse: function(response) {
        return response.data;
      },
      handleTokenValidationResponse: function(response) {
        return response.data;
      }
    });

    $httpProvider.interceptors.push('httpRequestInterceptor');
  }
])

paylinkApp.run(['$rootScope', '$state', function($rootScope, $state) {
  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){

  });

  $rootScope.$on("$stateChangeError", function(event, next, current, error) {
    console.error(error);
    $state.go('/paylink/login');
  });
}]);
