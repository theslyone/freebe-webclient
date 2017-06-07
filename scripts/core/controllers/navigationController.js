angular
  .module('theme.core.navigation_controller', ['theme.core.services'])
  .controller('NavigationController', ['$scope', '$location', '$state', '$timeout',
    function($scope, $location, $state, $timeout) {

      'use strict';
      $scope.menu = [{
          label: 'Main',
          iconClasses: '',
          separator: true
        },
        {
          label: 'Dashboard',
          iconClasses: 'glyphicon glyphicon-dashboard',
          url: 'dashboard'
        },
        {
          label: 'Bank Accounts',
          iconClasses: 'fa fa-university',
          url: 'bank-accounts'
        },
        {
          label: 'Payment Cards',
          iconClasses: 'glyphicon glyphicon-credit-card',
          url: 'payment-cards'
        },
        {
          label: 'Wallet',
          iconClasses: 'fa fa-money',
          url: 'wallet'
        },
        {
          label: 'Transactions',
          iconClasses: 'glyphicon glyphicon-transfer',
          url: 'transactions'
        },
        {
          label: 'Beneficiaries',
          iconClasses: 'fa fa-users',
          url: 'beneficiaries'
        },
        {
          label: 'Features',
          iconClasses: 'fa fa-home',
          separator: true
        },
        {
          label: 'Fund Transfer',
          iconClasses: 'glyphicon glyphicon-send',
          url: 'transfer'
        },
        {
          label: 'Mobile Top Up',
          iconClasses: 'glyphicon glyphicon-phone',
          url: '#/'
        },
        {
          label: 'Bill Payment',
          iconClasses: 'fa fa-ils',
          url: '#/'
        }
      ];


      var setParent = function(children, parent) {
        angular.forEach(children, function(child) {
          child.parent = parent;
          if (child.children !== undefined) {
            setParent(child.children, child);
          }
        });
      };

      $scope.findItemByUrl = function(children, url) {
        for (var i = 0, length = children.length; i < length; i++) {
          if (children[i].url && children[i].url.replace('#', '') === url) {
            return children[i];
          }
          if (children[i].children !== undefined) {
            var item = $scope.findItemByUrl(children[i].children, url);
            if (item) {
              return item;
            }
          }
        }
      };

      setParent($scope.menu, null);

      $scope.openItems = [];
      $scope.selectedItems = [];
      $scope.selectedFromNavMenu = false;

      $scope.select = function(item) {
        // close open nodes
        if (item.open) {
          item.open = false;
          return;
        }
        for (var i = $scope.openItems.length - 1; i >= 0; i--) {
          $scope.openItems[i].open = false;
        }
        $scope.openItems = [];
        var parentRef = item;
        while (parentRef !== null) {
          parentRef.open = true;
          $scope.openItems.push(parentRef);
          parentRef = parentRef.parent;
        }

        // handle leaf nodes
        if (!item.children || (item.children && item.children.length < 1)) {
          $scope.selectedFromNavMenu = true;
          for (var j = $scope.selectedItems.length - 1; j >= 0; j--) {
            $scope.selectedItems[j].selected = false;
          }
          $scope.selectedItems = [];
          parentRef = item;
          while (parentRef !== null) {
            parentRef.selected = true;
            $scope.selectedItems.push(parentRef);
            parentRef = parentRef.parent;
          }
        }
      };

      $scope.highlightedItems = [];
      var highlight = function(item) {
        var parentRef = item;
        while (parentRef !== null) {
          if (parentRef.selected) {
            parentRef = null;
            continue;
          }
          parentRef.selected = true;
          $scope.highlightedItems.push(parentRef);
          parentRef = parentRef.parent;
        }
      };

      var highlightItems = function(children, query) {
        angular.forEach(children, function(child) {
          if (child.label.toLowerCase().indexOf(query) > -1) {
            highlight(child);
          }
          if (child.children !== undefined) {
            highlightItems(child.children, query);
          }
        });
      };

      // $scope.searchQuery = '';
      $scope.$watch('searchQuery', function(newVal, oldVal) {
        var currentPath = '#' + $location.path();
        if (newVal === '') {
          for (var i = $scope.highlightedItems.length - 1; i >= 0; i--) {
            if ($scope.selectedItems.indexOf($scope.highlightedItems[i]) < 0) {
              if ($scope.highlightedItems[i] && $scope.highlightedItems[i] !== currentPath) {
                $scope.highlightedItems[i].selected = false;
              }
            }
          }
          $scope.highlightedItems = [];
        } else
        if (newVal !== oldVal) {
          for (var j = $scope.highlightedItems.length - 1; j >= 0; j--) {
            if ($scope.selectedItems.indexOf($scope.highlightedItems[j]) < 0) {
              $scope.highlightedItems[j].selected = false;
            }
          }
          $scope.highlightedItems = [];
          highlightItems($scope.menu, newVal.toLowerCase());
        }
      });

      $scope.$on('$routeChangeStart', function(event, next) {
        var authorised;
        if (next.access !== undefined) {
          authorised = $scope.auth.enums.authorised.loginRequired;
          /*authorization.authorize(next.access.loginRequired,
                                               next.access.permissions,
                                               next.access.permissionCheckType);
                        */
          if (authorised === $scope.auth.enums.authorised.loginRequired) {
            $state.go($scope.auth.routes.login);
          } else if (authorised === $scope.auth.enums.authorised.notAuthorised) {
            $state.go($scope.auth.routes.notAuthorised).replace();
          }
        }
      });

      $scope.$on('$routeChangeSuccess', function() {
        if ($scope.selectedFromNavMenu === false) {
          var item = $scope.findItemByUrl($scope.menu, $location.path());
          if (item) {
            $timeout(function() {
              $scope.select(item);
            });
          }
        }
        $scope.selectedFromNavMenu = false;
        $scope.searchQuery = '';
      });



      $scope.auth = {
        name: 'auth',
        enums: {
          authorised: {
            authorised: 0,
            loginRequired: 1,
            notAuthorised: 2
          },
          permissionCheckType: {
            atLeastOne: 0,
            combinationRequired: 1
          }
        },
        events: {
          userLoggedIn: 'auth:user:loggedIn',
          userLoggedOut: 'auth:user:loggedOut'
        },
        controllers: {
          login: 'loginCtrl'
        },
        services: {
          authentication: 'authentication',
          authorization: 'authorization'
        },
        routes: {
          login: '/paylink/login',
          notAuthorised: '/not-authorised'
        }
      };
    }
  ]);
