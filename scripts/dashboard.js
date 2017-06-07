var paylinkApp = angular
  .module('PaylinkApp', [
    'theme'
  ]);

paylinkApp.config(['$provide', '$routeProvider', '$locationProvider', '$authProvider', '$httpProvider',
  function($provide, $routeProvider, $locationProvider, $authProvider, $httpProvider) {
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

    var originalWhen = $routeProvider.when;
    $routeProvider.accessWhen = function(path, route) {
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

      return originalWhen.call($routeProvider, path, route);
    };

    $routeProvider
      .when('#/paylink', {
        redirectTo: '/paylink'
      })
      .when('/paylink/login', {
        templateUrl: '/my/template/views/user/login.html',
        controller: "SignInController",
        /*resolve: {
          auth: UserLoggedIn
        }*/
      })
      .when('/paylink/signup', {
        templateUrl: '/my/template/views/user/signup.html',
        controller: "RegistrationController"
      })
      .when('/paylink/signup-successful', {
        templateUrl: '/my/template/views/user/email-sent.html',
        controller: "RegistrationController"
      })
      .when('/paylink/forgotpassword', {
        templateUrl: '/my/template/views/user/forgotpassword.html',
        controller: "SignInController"
      })
      .accessWhen('/paylink/profile', {
        templateUrl: '/my/template/views/user/profile.html',
        controller: "ProfileController"
      })
      .accessWhen('/paylink', {
        templateUrl: '/my/template/views/dashboard.html'
      })
      .accessWhen('/paylink/wallet', {
        templateUrl: '/my/template/views/wallet/index.html',
        controller: "WalletController",
        resolve: {
          wallet: ['$auth', 'walletService', function($auth, walletService) {
            return $auth.validateUser()
              .then(function() {
                return walletService.get()
              });
          }]
        }
      })
      .accessWhen('/paylink/wallet/topup', {
        templateUrl: '/my/template/views/wallet/topUp.html',
        controller: "WalletController",
        resolve: {
          wallet: ['$auth', 'walletService', function($auth, walletService) {
            return $auth.validateUser()
              .then(function() {
                return walletService.get()
              });
          }]
        }
      })
      .accessWhen('/paylink/transfer', {
        templateUrl: '/my/template/views/transfer.html',
        controller: 'TransferController',
        resolve: {
          fromAccounts: ['$auth', 'subaccountService', function($auth, subaccountService) {
            return $auth.validateUser()
              .then(function() {
                return subaccountService.getAccounts('withdrawal');
              });
          }],
          banks: ['subaccountService', function(subaccountService) {
            return subaccountService.getBanks();
          }],
          beneficiaries: ['beneficiaryService', function(beneficiaryService) {
            return beneficiaryService.getAll();
          }]
        }
      })
      .accessWhen('/paylink/transactions', {
        templateUrl: '/my/template/views/transactions/index.html',
        reloadOnSearch: false
      })
      .accessWhen('/paylink/transactions/:id', {
        templateUrl: '/my/template/views/transactions/details.html',
        controller: 'TransactionDetailsController',
        reloadOnSearch: false,
        resolve: {
          transaction: ['$route', 'transactionService', function($route, transactionService) {
            return transactionService.get($route.current.params.id);
          }]
        }
      })
      .accessWhen('/paylink/:templateFile', {
        templateUrl: function(param) {
          return '/my/template/views/' + param.templateFile + '.html';
        },
        reloadOnSearch: false
      })
      .otherwise({
        redirectTo: '/paylink/login'
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

paylinkApp.run(['$rootScope', '$location', function($rootScope, $location) {
  $rootScope.$on('$locationChangeStart', function(e, goingTo, cameFrom) {
    function extractPath(fullUrl) {
      const anchor = document.createElement("a");
      anchor.href = fullUrl;
      return anchor.pathname;
    };


    //This hack fixes a strange angularjs bug which, out of the blue,
    //forces a page to load "fromUrl" during the route change.
    //When this condition occurs, "toUrl" url is swapped with "fromUrl",
    //which results in the page reload.

    //No referrer. The current url is the last page.
    if (cameFrom !== goingTo) {
      //Seems like the destination url is acutally the document url.
      //Don't want to be in this page anymore.
      if (goingTo === location.toString()) {

        //fromUrl is actually the destination.
        const goTo = extractPath(cameFrom);

        $location.url(goTo);
        $location.search({});
      };
    };

    window.overridePath = null;
  });
  $rootScope.$on("$routeChangeError", function(event, next, current, error) {
    console.error(error);
    $location.path('/paylink/login');
  });
}]);
