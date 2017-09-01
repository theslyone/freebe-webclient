/*!
 * Bootstrap v3.0.0
 *
 * Copyright 2013 Twitter, Inc
 * Licensed under the Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Designed and built with all the love in the world @twitter by @mdo and @fat.
 */

+function(a){"use strict";var b=window.navigator.appName=="Microsoft Internet Explorer",c=function(b,c){this.$element=a(b),this.$input=this.$element.find(":file");if(this.$input.length===0)return;this.name=this.$input.attr("name")||c.name,this.$hidden=this.$element.find('input[type=hidden][name="'+this.name+'"]'),this.$hidden.length===0&&(this.$hidden=a('<input type="hidden" />'),this.$element.prepend(this.$hidden)),this.$preview=this.$element.find(".fileinput-preview");var d=this.$preview.css("height");this.$preview.css("display")!="inline"&&d!="0px"&&d!="none"&&this.$preview.css("line-height",d),this.original={exists:this.$element.hasClass("fileinput-exists"),preview:this.$preview.html(),hiddenVal:this.$hidden.val()},this.listen()};c.prototype.listen=function(){this.$input.on("change.bs.fileinput",a.proxy(this.change,this)),a(this.$input[0].form).on("reset.bs.fileinput",a.proxy(this.reset,this)),this.$element.find('[data-trigger="fileinput"]').on("click.bs.fileinput",a.proxy(this.trigger,this)),this.$element.find('[data-dismiss="fileinput"]').on("click.bs.fileinput",a.proxy(this.clear,this))},c.prototype.change=function(b){b.target.files===undefined&&(b.target.files=b.target&&b.target.value?[{name:b.target.value.replace(/^.+\\/,"")}]:[]);if(b.target.files.length===0)return;this.$hidden.val(""),this.$hidden.attr("name",""),this.$input.attr("name",this.name);var c=b.target.files[0];if(this.$preview.length>0&&(typeof c.type!="undefined"?c.type.match("image.*"):c.name.match(/\.(gif|png|jpe?g)$/i))&&typeof FileReader!="undefined"){var d=new FileReader,e=this.$preview,f=this.$element;d.onload=function(d){var g=a("<img>").attr("src",d.target.result);b.target.files[0].result=d.target.result,f.find(".fileinput-filename").text(c.name),e.css("max-height")!="none"&&g.css("max-height",parseInt(e.css("max-height"),10)-parseInt(e.css("padding-top"),10)-parseInt(e.css("padding-bottom"),10)-parseInt(e.css("border-top"),10)-parseInt(e.css("border-bottom"),10)),e.html(g),f.addClass("fileinput-exists").removeClass("fileinput-new"),f.trigger("change.bs.fileinput",b.target.files)},d.readAsDataURL(c)}else this.$element.find(".fileinput-filename").text(c.name),this.$preview.text(c.name),this.$element.addClass("fileinput-exists").removeClass("fileinput-new"),this.$element.trigger("change.bs.fileinput")},c.prototype.clear=function(a){a&&a.preventDefault(),this.$hidden.val(""),this.$hidden.attr("name",this.name),this.$input.attr("name","");if(b){var c=this.$input.clone(!0);this.$input.after(c),this.$input.remove(),this.$input=c}else this.$input.val("");this.$preview.html(""),this.$element.find(".fileinput-filename").text(""),this.$element.addClass("fileinput-new").removeClass("fileinput-exists"),a!==!1&&(this.$input.trigger("change"),this.$element.trigger("clear.bs.fileinput"))},c.prototype.reset=function(){this.clear(!1),this.$hidden.val(this.original.hiddenVal),this.$preview.html(this.original.preview),this.$element.find(".fileinput-filename").text(""),this.original.exists?this.$element.addClass("fileinput-exists").removeClass("fileinput-new"):this.$element.addClass("fileinput-new").removeClass("fileinput-exists"),this.$element.trigger("reset.bs.fileinput")},c.prototype.trigger=function(a){this.$input.trigger("click"),a.preventDefault()},a.fn.fileinput=function(b){return this.each(function(){var d=a(this),e=d.data("fileinput");e||d.data("fileinput",e=new c(this,b)),typeof b=="string"&&e[b]()})},a.fn.fileinput.Constructor=c,a(document).on("click.fileinput.data-api",'[data-provides="fileinput"]',function(b){var c=a(this);if(c.data("fileinput"))return;c.fileinput(c.data());var d=a(b.target).closest('[data-dismiss="fileinput"],[data-trigger="fileinput"]');d.length>0&&(b.preventDefault(),d.trigger("click.bs.fileinput"))})}(window.jQuery);;angular
  .module('theme', [
    'ngCookies',
    'ipCookie',
    'ng-token-auth',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ui.router.state.events',
    'angularCSS',
    'ngAnimate',
    'ui.sortable',
    'easypiechart',
    'NgSwitchery',
    'sun.scrollable',
    'ui.bootstrap',
    'ui.select',
    'oc.lazyLoad',
    'xeditable',
    'ngFileUpload',
    'ngImgCrop',
    'ngIdle',
    'angular-spinkit',
    'theme.core.templates',
    'theme.core.template_overrides',
    'theme.core.panels',
    'theme.core.directives',
    'theme.core.navigation_controller',
    'theme.core.notifications_controller',
    'theme.core.messages_controller',
    'theme.core.home_controller',
    'theme.core.main_controller'
  ]);
;angular.module('theme.core.home_controller', ['theme.core.services'])
  .controller('HomeController', ['$scope', '$theme', '$ocLazyLoad', '$css', function($scope, $theme, $ocLazyLoad, $css) {
    'use strict';
    $theme.set('fullscreen', true);

    $scope.$on('$destroy', function() {
      $theme.set('fullscreen', false);
    });
  }]);
;angular.module('theme.core.main_controller', ['theme.core.services'])
  .controller('MainController', ['$scope', '$theme', '$timeout', 'progressLoader', '$location', '$state', '$auth',
    'Idle', 'Keepalive', '$uibModal',
    function($scope, $theme, $timeout, progressLoader, $location, $state, $auth,
      Idle, Keepalive, $uibModal) {
      'use strict';
      // $scope.layoutIsSmallScreen = false;
      $scope.layoutFixedHeader = $theme.get('fixedHeader');
      $scope.layoutPageTransitionStyle = $theme.get('pageTransitionStyle');
      $scope.layoutDropdownTransitionStyle = $theme.get('dropdownTransitionStyle');
      $scope.layoutPageTransitionStyleList = ['bounce',
        'flash',
        'pulse',
        'bounceIn',
        'bounceInDown',
        'bounceInLeft',
        'bounceInRight',
        'bounceInUp',
        'fadeIn',
        'fadeInDown',
        'fadeInDownBig',
        'fadeInLeft',
        'fadeInLeftBig',
        'fadeInRight',
        'fadeInRightBig',
        'fadeInUp',
        'fadeInUpBig',
        'flipInX',
        'flipInY',
        'lightSpeedIn',
        'rotateIn',
        'rotateInDownLeft',
        'rotateInDownRight',
        'rotateInUpLeft',
        'rotateInUpRight',
        'rollIn',
        'zoomIn',
        'zoomInDown',
        'zoomInLeft',
        'zoomInRight',
        'zoomInUp'
      ];

      $scope.user = $auth.user;

      $scope.$on('auth:logout-success', function(ev) {
        $state.go("login");
      });

      $scope.layoutLoading = true;

      $scope.getLayoutOption = function(key) {
        return $theme.get(key);
      };

      $scope.setNavbarClass = function(classname, $event) {
        $event.preventDefault();
        $event.stopPropagation();
        $theme.set('topNavThemeClass', classname);
      };

      $scope.setSidebarClass = function(classname, $event) {
        $event.preventDefault();
        $event.stopPropagation();
        $theme.set('sidebarThemeClass', classname);
      };

      $scope.$watch('layoutFixedHeader', function(newVal, oldval) {
        if (newVal === undefined || newVal === oldval) {
          return;
        }
        $theme.set('fixedHeader', newVal);
      });
      $scope.$watch('layoutLayoutBoxed', function(newVal, oldval) {
        if (newVal === undefined || newVal === oldval) {
          return;
        }
        $theme.set('layoutBoxed', newVal);
      });
      $scope.$watch('layoutLayoutHorizontal', function(newVal, oldval) {
        if (newVal === undefined || newVal === oldval) {
          return;
        }
        $theme.set('layoutHorizontal', newVal);
      });
      $scope.$watch('layoutPageTransitionStyle', function(newVal) {
        $theme.set('pageTransitionStyle', newVal);
      });
      $scope.$watch('layoutDropdownTransitionStyle', function(newVal) {
        $theme.set('dropdownTransitionStyle', newVal);
      });

      $scope.hideHeaderBar = function() {
        $theme.set('headerBarHidden', true);
      };

      $scope.showHeaderBar = function($event) {
        $event.stopPropagation();
        $theme.set('headerBarHidden', false);
      };

      $scope.toggleLeftBar = function() {
        if ($scope.layoutIsSmallScreen) {
          return $theme.set('leftbarShown', !$theme.get('leftbarShown'));
        }
        $theme.set('leftbarCollapsed', !$theme.get('leftbarCollapsed'));
      };

      $scope.toggleRightBar = function() {
        $theme.set('rightbarCollapsed', !$theme.get('rightbarCollapsed'));
      };

      $scope.toggleSearchBar = function($event) {
        $event.stopPropagation();
        $event.preventDefault();
        $theme.set('showSmallSearchBar', !$theme.get('showSmallSearchBar'));
      };

      $scope.chatters = [{
          id: 0,
          status: 'online',
          avatar: 'potter.png',
          name: 'Jeremy Potter'
        },
        {
          id: 1,
          status: 'online',
          avatar: 'tennant.png',
          name: 'David Tennant'
        }
      ];
      $scope.currentChatterId = null;
      $scope.hideChatBox = function() {
        $theme.set('showChatBox', false);
      };
      $scope.toggleChatBox = function(chatter, $event) {
        $event.preventDefault();
        if ($scope.currentChatterId === chatter.id) {
          $theme.set('showChatBox', !$theme.get('showChatBox'));
        } else {
          $theme.set('showChatBox', true);
        }
        $scope.currentChatterId = chatter.id;
      };

      $scope.hideChatBox = function() {
        $theme.set('showChatBox', false);
      };

      $scope.$on('themeEvent:maxWidth767', function(event, newVal) {
        $timeout(function() {
          $scope.layoutIsSmallScreen = newVal;
          if (!newVal) {
            $theme.set('leftbarShown', false);
          } else {
            $theme.set('leftbarCollapsed', false);
          }
        });
      });
      $scope.$on('themeEvent:changed:fixedHeader', function(event, newVal) {
        $scope.layoutFixedHeader = newVal;
      });
      $scope.$on('themeEvent:changed:layoutHorizontal', function(event, newVal) {
        $scope.layoutLayoutHorizontal = newVal;
      });
      $scope.$on('themeEvent:changed:layoutBoxed', function(event, newVal) {
        $scope.layoutLayoutBoxed = newVal;
      });

      // there are better ways to do this, e.g. using a dedicated service
      // but for the purposes of this demo this will do :P
      $scope.isLoggedIn = true;
      $scope.logOut = function() {
        $scope.isLoggedIn = false;
      };
      $scope.logIn = function() {
        $scope.isLoggedIn = true;
      };

      $scope.rightbarAccordionsShowOne = false;
      $scope.rightbarAccordions = [{
        open: true
      }, {
        open: true
      }, {
        open: true
      }, {
        open: true
      }, {
        open: true
      }, {
        open: true
      }, {
        open: true
      }];

      $scope.$on('$stateChangeStart', function() {
        if ($location.path() === '') {
          return $state.go('dashboard');
        }
        progressLoader.start();
        progressLoader.set(50);
      });
      $scope.$on('$stateChangeSuccess', function() {
        progressLoader.end();
        if ($scope.layoutLoading) {
          $scope.layoutLoading = false;
        }
      });

      $scope.$on('auth:login-success', function(ev, token) {
        startSessionTimer();
      });

      $scope.$on('auth:validation-success', function(ev, token) {
        startSessionTimer();
      });

      $scope.$on('auth:logout-success', function(ev, token) {
        closeModals();
        Idle.unwatch();
        console.log('session timer off')
      });

      function startSessionTimer() {
        closeModals();
        Idle.watch();
        console.log('session timer on')
      }

      function closeModals() {
        if ($scope.warning) {
          $scope.warning.close();
          $scope.warning = null;
        }

        if ($scope.timedout) {
          $scope.timedout.close();
          $scope.timedout = null;
        }
      }

      $scope.$on('IdleStart', function() {
        closeModals();
        $scope.warning = $uibModal.open({
          templateUrl: '/my/template/views/templates/warning-dialog.html',
          windowClass: 'modal-danger'
        });
      });

      $scope.$on('IdleEnd', function() {
        closeModals();
      });

      $scope.$on('IdleTimeout', function() {
        closeModals();
        $scope.timedout = $uibModal.open({
          templateUrl: '/my/template/views/templates/timedout-dialog.html',
          windowClass: 'modal-danger'
        });
        $auth.signOut();
      });
    }
  ]);
;angular
  .module('theme.core.messages_controller', [])
  .controller('MessagesController', ['$scope', '$filter', function($scope, $filter) {
    'use strict';
    $scope.messages = [{
      name: 'Polly Paton',
      message: 'Uploaded all the files to server',
      time: '3m',
      class: 'notification-danger',
      thumb: '/Static/images/avatar.jpg',
      read: false
    }, {
      name: 'Simon Corbett',
      message: 'I am signing off for today',
      time: '17m',
      class: 'notification-danger',
      thumb: '/Static/images/avatar.jpg',
      read: false
    }, {
      name: 'Matt Tennant',
      message: 'Everything is working just fine here',
      time: '2h',
      class: 'notification-danger',
      thumb: '/Static/images/avatar.jpg',
      read: true
    }, {
      name: 'Alan Doyle',
      message: 'Please mail me the files by tonight',
      time: '5d',
      class: 'notification-danger',
      thumb: '/Static/images/avatar.jpg',
      read: false
    }, {
      name: 'Polly Paton',
      message: 'Uploaded all the files to server',
      time: '3m',
      class: 'notification-danger',
      thumb: '/Static/images/avatar.jpg',
      read: false
    }, {
      name: 'Simon Corbett',
      message: 'I am signing off for today',
      time: '17m',
      class: 'notification-danger',
      thumb: '/Static/images/avatar.jpg',
      read: false
    }, {
      name: 'Matt Tennant',
      message: 'Everything is working just fine here',
      time: '2h',
      class: 'notification-danger',
      thumb: '/Static/images/avatar.jpg',
      read: true
    }, {
      name: 'Alan Doyle',
      message: 'Please mail me the files by tonight',
      time: '5d',
      class: 'notification-danger',
      thumb: '/Static/images/avatar.jpg',
      read: false
    }, ];

    $scope.setRead = function(item, $event) {
      $event.preventDefault();
      $event.stopPropagation();
      item.read = true;
    };

    $scope.setUnread = function(item, $event) {
      $event.preventDefault();
      $event.stopPropagation();
      item.read = false;
    };

    $scope.setReadAll = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      angular.forEach($scope.messages, function(item) {
        item.read = true;
      });
    };

    $scope.unseenCount = $filter('filter')($scope.messages, {
      read: false
    }).length;

    $scope.$watch('messages', function(messages) {
      $scope.unseenCount = $filter('filter')(messages, {
        read: false
      }).length;
    }, true);
  }]);
;angular
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
          url: 'mobile-topup'
        },
        {
          label: 'Bill Payment',
          iconClasses: 'fa fa-ils',
          url: 'bill-payment'
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
;angular
  .module('theme.core.notifications_controller', [])
  .controller('NotificationsController', ['$scope', '$filter', function($scope, $filter) {
    'use strict';
    $scope.notifications = [{
      text: 'Server #1 is live',
      time: '4m',
      class: 'notification-success',
      iconClasses: 'glyphicon glyphicon-ok',
      seen: true
    }, {
      text: 'New user Registered',
      time: '10m',
      class: 'notification-user',
      iconClasses: 'glyphicon glyphicon-user',
      seen: false
    }, {
      text: 'CPU at 92% on server#3!',
      time: '22m',
      class: 'notification-danger',
      iconClasses: 'glyphicon glyphicon-exclamation-sign',
      seen: false
    }, {
      text: 'Database overloaded',
      time: '30m',
      class: 'notification-warning',
      iconClasses: 'glyphicon glyphicon-warning-sign',
      seen: false
    }, {
      text: 'New order received',
      time: '1h',
      class: 'notification-order',
      iconClasses: 'glyphicon glyphicon-shopping-cart',
      seen: true
    }, {
      text: 'Application error!',
      time: '9d',
      class: 'notification-danger',
      iconClasses: 'glyphicon glyphicon-remove',
      seen: true
    }, {
      text: 'Installation Succeeded',
      time: '1d',
      class: 'notification-success',
      iconClasses: 'glyphicon glyphicon-ok',
      seen: false
    }, {
      text: 'Account Created',
      time: '2d',
      class: 'notification-success',
      iconClasses: 'glyphicon glyphicon-ok',
      seen: false
    }, ];

    $scope.setSeen = function(item, $event) {
      $event.preventDefault();
      $event.stopPropagation();
      item.seen = true;
    };

    $scope.setUnseen = function(item, $event) {
      $event.preventDefault();
      $event.stopPropagation();
      item.seen = false;
    };

    $scope.setSeenAll = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      angular.forEach($scope.notifications, function(item) {
        item.seen = true;
      });
    };

    $scope.unseenCount = $filter('filter')($scope.notifications, {
      seen: false
    }).length;

    $scope.$watch('notifications', function(notifications) {
      $scope.unseenCount = $filter('filter')(notifications, {
        seen: false
      }).length;
    }, true);
  }]);;angular
  .module('theme.core.directives', [])
  .directive('sgBanner', function() {
    'use strict';
    return {
      restrict: 'A',
      link: function(scope, element) {
        // IE: Height fix.
        if (skel.vars.browser == 'ie' &&
          skel.vars.IEVersion > 9) {

          skel.on('-small !small', function() {
            element.css('height', '100vh');
          });

          skel.on('+small', function() {
            element.css('height', '');
          });

        }
        // More button.
        element.find('.more').addClass('scrolly');
      }
    };
  })
  .directive('sgBackground', function() {
    'use strict';
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        element.css('background-image', 'url(' + attrs.sgBackground + ')');
      }
    };
  })
  .directive('sgPost', function() {
    'use strict';
    return {
      restrict: 'A',
      link: function(scope, element) {
        var p = element,
          i = p.find('.inner'),
          m = p.find('.more');

        m.addClass('scrolly');

        p.scrollex({
          top: '40vh',
          bottom: '40vh',
          terminate: function() {
            m.removeClass('current');
            i.removeClass('current');
          },
          enter: function() {
            m.addClass('current');
            i.addClass('current');
          },
          leave: function() {
            m.removeClass('current');
            i.removeClass('current');
          }
        });

        m.scrolly();
      }
    };
  })
  .directive('sgMenu', function() {
    'use strict';
    return {
      restrict: 'A',
      link: function(scope, element) {
        element.append('<a href="#menu" class="close"></a>')
        .appendTo(element.parent())
        .panel({
          delay: 500,
          hideOnClick: true,
          hideOnSwipe: true,
          resetScroll: true,
          resetForms: true,
          side: 'right'
        });
      }
    };
  })
  .directive('sgFadeIn', ['$window', function($window) {
    'use strict';
    return {
      restrict: 'A',
      link: function(scope, element) {
        element.addClass('is-loading');
        angular.element(document).ready(function() {
          $window.setTimeout(function() {
            element.removeClass('is-loading');
          }, 100);
        });
        /*$window.on('load', function() {

        });*/
      }
    };
  }]);
;angular
  .module('theme.core.directives')
  .directive('autosize', function() {
    'use strict';
    return {
      restrict: 'AC',
      link: function(scope, element) {
        element.autosize({
          append: '\n'
        });
      }
    };
  })
  .directive('fullscreen', function() {
    'use strict';
    return {
      restrict: 'AC',
      link: function(scope, element) {
        element.fseditor({
          maxHeight: 500
        });
      }
    };
  })
  .directive('colorpicker', function() {
    'use strict';
    return {
      restrict: 'AC',
      link: function(scope, element) {
        element.colorpicker();
      }
    };
  })
  .directive('daterangepicker', function() {
    'use strict';
    return {
      restrict: 'A',
      scope: {
        options: '=daterangepicker',
        start: '=dateBegin',
        end: '=dateEnd'
      },
      link: function(scope, element) {
        element.daterangepicker(scope.options, function(start, end) {
          if (scope.start) {
            scope.start = start.format('D-MMM-YYYY');
          }
          if (scope.end) {
            scope.end = end.format('D-MMM-YYYY');
          }
          scope.$apply();
        });
      }
    };
  })
  .directive('multiselect', ['$timeout', function($t) {
    'use strict';
    return {
      restrict: 'A',
      link: function(scope, element) {
        $t(function() {
          element.multiSelect();
        });
      }
    };
  }])
  .directive('uiSelectRequired', function() {
    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
        ctrl.$validators.uiSelectRequired = function(modelValue, viewValue) {

          var determineVal;
          if (angular.isArray(modelValue)) {
            determineVal = modelValue;
          } else if (angular.isArray(viewValue)) {
            determineVal = viewValue;
          } else {
            return false;
          }

          return determineVal.length > 0;
        };
      }
    };
  })
  .directive('wizard', function() {
    'use strict';
    return {
      restrict: 'A',
      scope: {
        options: '=wizard',
        reset: '=reset'
      },
      link: function(scope, element, attr) {
        if (scope.options) {
          element.stepy(scope.options);
          element.stepy('step', 1);

          scope.reset = function() {
            element.stepy('step', 1);
          };

          //Make Validation Compability - see docs
          if (scope.options.validate === true) {
            element.validate({
              errorClass: 'help-block',
              validClass: 'help-block',
              highlight: function(element) {
                angular.element(element).closest('.form-group').addClass('has-error');
              },
              unhighlight: function(element) {
                angular.element(element).closest('.form-group').removeClass('has-error');
              }
            });
          }
        } else {
          element.stepy();
        }
        //Add Wizard Compability - see docs
        element.find('.stepy-navigator').wrapInner('<div class="pull-right"></div>');
      }
    };
  })
  .directive('maskinput', function() {
    'use strict';
    return {
      restrict: 'A',
      link: function(scope, element) {
        element.inputmask();
      }
    };
  })
  .directive("limitTo", [function() {
    return {
      restrict: "A",
      link: function(scope, elem, attrs) {
        var limit = parseInt(attrs.limitTo);
        elem.bind('keypress', function(e) {
          if (elem[0].value.length >= limit) {
            e.preventDefault();
            return false;
          }
        });
      }
    }
  }])
  .directive('onlyNumbers', function() {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function(scope, element, attr, ctrl) {
        function inputValue(val) {
          if (val) {
            var digits = val.replace(/[^0-9]/g, '');

            if (digits !== val) {
              ctrl.$setViewValue(digits);
              ctrl.$render();
            }
            return digits;
          }
          return undefined;
        }
        ctrl.$parsers.push(inputValue);
      }
    };
  })
  .directive('croppable', ['$timeout', function($t) {
    'use strict';
    return {
      restrict: 'A',
      replace: true,
      scope: {
        src: '@',
        imgSelected: '&',
        cropInit: '&'
      },
      link: function(scope, element) {
        var myImg;
        $t(function() {
          if (scope.src) {
            myImg = element;
            element.width(element.width()); // stupid width bug
            angular.element(myImg).Jcrop({
              trackDocument: true,
              onSelect: function(x) {
                $t(function() {
                  scope.imgSelected({
                    coords: x
                  });
                });
              },
              // aspectRatio: 1
            }, function() {
              // Use the API to get the real image size
              scope.bounds = this.getBounds();
            });
          }
        });
        scope.$watch('bounds', function() {
          scope.cropInit({
            bounds: scope.bounds
          });
        });
      }
    };
  }])
  .directive('passwordStrength', [
    function() {
      return {
        require: 'ngModel',
        restrict: 'E',
        scope: {
          password: '=ngModel'
        },

        link: function(scope, elem, attrs, ctrl) {
          scope.$watch('password', function(newVal) {
            scope.strength = isSatisfied(newVal && newVal.length >= 8) +
              isSatisfied(newVal && /[A-z]/.test(newVal)) +
              isSatisfied(newVal && /(?=.*\W)/.test(newVal)) +
              isSatisfied(newVal && /\d/.test(newVal));

            function isSatisfied(criteria) {
              return criteria ? 1 : 0;
            }
          }, true);
        },
        template: '<div class="progress">' +
          '<div class="progress-bar progress-bar-danger" style="width: {{strength >= 1 ? 25 : 0}}%"></div>' +
          '<div class="progress-bar progress-bar-warning" style="width: {{strength >= 2 ? 25 : 0}}%"></div>' +
          '<div class="progress-bar progress-bar-warning" style="width: {{strength >= 3 ? 25 : 0}}%"></div>' +
          '<div class="progress-bar progress-bar-success" style="width: {{strength >= 4 ? 25 : 0}}%"></div>' +
          '</div>'
      }
    }
  ])
  .directive('patternValidator', [
    function() {
      return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, elem, attrs, ctrl) {
          ctrl.$parsers.unshift(function(viewValue) {

            var patt = new RegExp(attrs.patternValidator);

            var isValid = patt.test(viewValue);

            ctrl.$setValidity('passwordPattern', isValid);

            // angular does this with all validators -> return isValid ? viewValue : undefined;
            // But it means that the ng-model will have a value of undefined
            // So just return viewValue!
            return viewValue;

          });
        }
      };
    }
  ]);
;angular
  .module('theme.core.directives')
  .directive('disableAnimation', ['$animate', function($animate) {
    'use strict';
    return {
      restrict: 'A',
      link: function($scope, $element, $attrs) {
        $attrs.$observe('disableAnimation', function(value) {
          $animate.enabled(!value, $element);
        });
      }
    };
  }])
  .directive('slideOut', function() {
    'use strict';
    return {
      restrict: 'A',
      scope: {
        show: '=slideOut'
      },
      link: function(scope, element) {
        element.hide();
        scope.$watch('show', function(newVal, oldVal) {
          if (newVal !== oldVal) {
            element.slideToggle({
              complete: function() {
                scope.$apply();
              }
            });
          }
        });
      }
    };
  })
  .directive('slideOutNav', ['$timeout', function($t) {
    'use strict';
    return {
      restrict: 'A',
      scope: {
        show: '=slideOutNav'
      },
      link: function(scope, element) {
        scope.$watch('show', function(newVal) {
          if (angular.element('body').hasClass('sidebar-collapsed')) {
            if (newVal === true) {
              element.css('display', 'block');
            } else {
              element.css('display', 'none');
            }
            return;
          }
          if (newVal === true) {
            element.slideDown({
              complete: function() {
                $t(function() {
                  scope.$apply();
                });
              },
              duration: 100
            });
          } else if (newVal === false) {
            element.slideUp({
              complete: function() {
                $t(function() {
                  scope.$apply();
                });
              },
              duration: 100
            });
          }
        });
      }
    };
  }])
  .directive('fauxOffcanvas', ['EnquireService', '$window', function(EnquireService, $window) {
    'use strict';
    return {
      restrict: 'AE',
      link: function() {
        EnquireService.register('screen and (max-width: 767px)', {
            match : function() {  //smallscreen
                // angular.element('body').addClass('sidebar-collapsed');

                setWidthtoContent();
                angular.element(window).on('resize', setWidthtoContent);
            },
            unmatch : function() {  //bigscreen
                // angular.element('body').removeClass('sidebar-collapsed');

                angular.element('.static-content').css('width','');
                angular.element($window).off('resize', setWidthtoContent);
            }
        });

        function setWidthtoContent() {
            var w = angular.element('#wrapper').innerWidth();
            angular.element('.static-content').css('width',(w)+'px');
        }
      }
    };
  }])
  .directive('pulsate', function() {
    'use strict';
    return {
      scope: {
        pulsate: '='
      },
      link: function(scope, element) {
        // stupid hack to prevent FF from throwing error
        if (element.css('background-color') === 'transparent') {
          element.css('background-color', 'rgba(0,0,0,0.01)');
        }
        angular.element(element).pulsate(scope.pulsate);
      }
    };
  })
  .directive('prettyprint', ['$window', function($window) {
    'use strict';
    return {
      restrict: 'C',
      link: function postLink(scope, element) {
        element.html($window.prettyPrintOne(element.html(), '', true));
      }
    };
  }])
  .directive('animatePageContent', ['$rootScope', '$timeout', function($rootScope, $timeout) {
    'use strict';
    return {
      restrict: 'A',
      link: function postLink() {
        $rootScope.$on('$stateChangeSuccess', function() {
          $timeout( function () {
            angular.element('.container-fluid .animated-content')
            .css('visibility', 'visible')
            .velocity('transition.slideUpIn', {stagger: 150});
          }, 10);
        });
      }
    };
  }])
  .directive('passwordVerify', function() {
    'use strict';
    return {
      require: 'ngModel',
      scope: {
        passwordVerify: '='
      },
      link: function(scope, element, attrs, ctrl) {
        scope.$watch(function() {
          var combined;

          if (scope.passwordVerify || ctrl.$viewValue) {
            combined = scope.passwordVerify + '_' + ctrl.$viewValue;
          }
          return combined;
        }, function(value) {
          if (value) {
            ctrl.$parsers.unshift(function(viewValue) {
              var origin = scope.passwordVerify;
              if (origin !== viewValue) {
                ctrl.$setValidity('passwordVerify', false);
                return undefined;
              } else {
                ctrl.$setValidity('passwordVerify', true);
                return viewValue;
              }
            });
          }
        });
      }
    };
  })
  .directive('backgroundSwitcher', function() {
    'use strict';
    return {
      restrict: 'EA',
      link: function(scope, element) {
        angular.element(element).click(function() {
          angular.element('body').css('background', angular.element(element).css('background'));
        });
      }
    };
  })
  .directive('icheck', ['$timeout', function($timeout) {
    'use strict';
    return {
      require: '?ngModel',
      link: function($scope, element, $attrs, ngModel) {
        return $timeout(function() {
          var parentLabel = element.parent('label');
          if (parentLabel.length) {
            parentLabel.addClass('icheck-label');
          }
          var value;
          value = $attrs.value;

          $scope.$watch($attrs.ngModel, function() {
            angular.element(element).iCheck('update');
          });

          return angular.element(element).iCheck({
            checkboxClass: 'icheckbox_minimal-blue',
            radioClass: 'iradio_minimal-blue'
          }).on('ifChanged', function(event) {
            if (angular.element(element).attr('type') === 'checkbox' && $attrs.ngModel) {
              $scope.$apply(function() {
                return ngModel.$setViewValue(event.target.checked);
              });
            }
            if (angular.element(element).attr('type') === 'radio' && $attrs.ngModel) {
              return $scope.$apply(function() {
                return ngModel.$setViewValue(value);
              });
            }
          });
        });
      }
    };
  }])
  .directive('knob', function() {
    'use strict';
    return {
      restrict: 'EA',
      template: '<input class="dial" type="text"/>',
      scope: {
        options: '='
      },
      replace: true,
      link: function(scope, element) {
        angular.element(element).knob(scope.options);
      }
    };
  })
  .directive('uiBsSlider', ['$timeout', function($timeout) {
    'use strict';
    return {
      link: function(scope, element) {
        // $timeout is needed because certain wrapper directives don't
        // allow for a correct calculation of width
        $timeout(function() {
          element.slider();
        });
      }
    };
  }])
  .directive('tileLarge', function() {
    'use strict';
    return {
      restrict: 'E',
      scope: {
        item: '=data'
      },
      templateUrl: 'templates/tile-large.html',
      replace: true,
      transclude: true
    };
  })
  .directive('tileSimple', function() {
    'use strict';
    return {
      restrict: 'E',
      scope: {
        item: '=data'
      },
      templateUrl: 'templates/tile-simple.html',
      replace: true,
      transclude: true
    };
  })
  .directive('tileShortcut', function() {
    'use strict';
    return {
      restrict: 'E',
      scope: {
        item: '=data'
      },
      replace: true,
      templateUrl: 'templates/tile-shortcut.html'
    };
  })
  .directive('tile', function() {
    'use strict';
    return {
      restrict: 'E',
      scope: {
        heading: '@',
        type: '@'
      },
      transclude: true,
      templateUrl: 'templates/tile-generic.html',
      link: function(scope, element) {
        var heading = element.find('tile-heading');
        if (heading.length) {
          heading.appendTo(element.find('.tiles-heading'));
        }
      },
      replace: true
    };
  })
  .directive('datepaginator', function() {
    'use strict';
    return {
      restrict: 'A',
      scope: {
        options: '=datepaginator'
      },
      link: function(scope, element) {
        setTimeout(function() {
          element.datepaginator(scope.options);
        }, 10);
      }
    };
  })
  .directive('stickyScroll', function() {
    'use strict';
    return {
      restrict: 'A',
      link: function(scope, element, attr) {
        function stickyTop() {
          var topMax = parseInt(attr.stickyScroll);
          var headerHeight = angular.element('header').height();
          if (headerHeight > topMax) {
            topMax = headerHeight;
          }
          if (angular.element('body').hasClass('static-header') === false) {
            return element.css('top', topMax + 'px');
          }
          var windowTop = angular.element(window).scrollTop();
          if (windowTop < topMax) {
            element.css('top', (topMax - windowTop) + 'px');
          } else {
            element.css('top', 0 + 'px');
          }
        }

        angular.element(function() {
          angular.element(window).scroll(stickyTop);
          stickyTop();
        });
      }
    };
  })
  .directive('rightbarRightPosition', function() {
    'use strict';
    return {
      restrict: 'A',
      scope: {
        isFixedLayout: '=rightbarRightPosition'
      },
      link: function(scope) {
        scope.$watch('isFixedLayout', function(newVal, oldVal) {
          if (newVal !== oldVal) {
            setTimeout(function() {
              var $pc = angular.element('#wrapper');
              var endingRight = (angular.element(window).width() - ($pc.offset().left + $pc.outerWidth()));
              if (endingRight < 0) {
                endingRight = 0;
              }
              angular.element('.infobar').css('right', endingRight);
            }, 100);
          }
        });
      }
    };
  })
  // .directive('fitHeight', ['$window', '$timeout', '$location', function ($window, $timeout, $location) {
  // 'use strict';
  //   return {
  //     restrict: 'A',
  //     scope: true,
  //     link: function (scope, element, attr) {
  //       function resetHeight () {
  //         var horizontalNavHeight = angular.element('nav.navbar').height();
  //         var viewPortHeight = angular.element(window).height()-angular.element('header').height()-horizontalNavHeight;
  //         var contentHeight = angular.element('#page-content').height();
  //         if (viewPortHeight>contentHeight)
  //           angular.element('#page-content').css('min-height', viewPortHeight+'px');
  //       }
  //       setInterval(resetHeight, 1000);
  //       angular.element(window).on('resize', resetHeight);
  //     }
  //   };
  // }])
  .directive('backToTop', function() {
    'use strict';
    return {
      restrict: 'AE',
      link: function(scope, element) {
        element.click(function() {
          angular.element('body').scrollTop(0);
        });
      }
    };
  })
  .directive('toTopOnLoad', ['$rootScope', function($rootScope) {
    'use strict';
    return {
      restrict: 'AE',
      link: function() {
        $rootScope.$on('$stateChangeSuccess', function() {
          angular.element('body').scrollTop(0);
        });
      }
    };
  }])
  .directive('scrollToBottom', function() {
    'use strict';
    return {
      restrict: 'A',
      scope: {
        model: '=scrollToBottom'
      },
      link: function(scope, element) {
        scope.$watch('model', function(n, o) {
          if (n !== o) {
            element[0].scrollTop = element[0].scrollHeight;
          }
        });
      }
    };
  })
  .directive('positionChatBox', function() {
    'use strict';
    return {
      restrict: 'A',
      scope: {
        chatter: '=positionChatBox'
      },
      link: function(scope, element) {
        var nanoScrollOld = 0;
        angular.element('.infobar .nano-content').on('scroll', function() {
          var top = angular.element('.infobar .nano-content').scrollTop();
          var scrolledAmmount = top - nanoScrollOld;
          element.css({
            top: parseInt(element.css('top').replace('px', '')) - scrolledAmmount + 'px'
          });
          fixWindowOverflow();
          nanoScrollOld = top;
        });
        angular.element('.infobar').on('click', 'li[data-stats]', function(event) {
          angular.element(this).siblings().removeClass('active');
          angular.element(this).addClass('active');
          event.stopPropagation();
          element.css({
            top: 0,
            left: 0
          });
          var clickOffset = angular.element(event.target).closest('li[data-stats]').offset();
          element.css({
            top: clickOffset.top - angular.element(window).scrollTop() + 'px',
            left: clickOffset.left - 420 + 'px'
          });
          fixWindowOverflow();
        });

        angular.element('body').click(function() {
          angular.element('li[data-stats]').removeClass('active');
        });

        function fixWindowOverflow() {
          if (angular.element(window).height() < parseInt(element.css('top').replace('px', '')) + element.height()) {
            var offset = angular.element(window).height() - (parseInt(element.css('top').replace('px', '')) + element.height());
            element.css({
              top: parseInt(element.css('top').replace('px', '')) + offset + 'px'
            });
          } else if (parseInt(element.css('top').replace('px', '')) < 50) {
            element.css({
              top: '50px'
            });
          }
        }
      }
    };
  });
;/*
 *
 * https://github.com/fatlinesofcode/ngDraggable
 */
/* jshint ignore:start */
angular.module("ngDraggable", [])
  .directive('ngDrag', ['$rootScope', '$parse', '$document', '$window', function($rootScope, $parse, $document, $window) {
    return {
      restrict: 'A',
      scope: true,
      link: function(scope, element, attrs) {
        scope.value = attrs.ngDrag;
        var offset, _centerAnchor = false,
          _mx, _my, _tx, _ty, _mrx, _mry;
        var _hasTouch = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
        var _pressEvents = 'touchstart mousedown';
        var _moveEvents = 'touchmove mousemove';
        var _releaseEvents = 'touchend mouseup';

        // to identify the element in order to prevent getting superflous events when a single element has both drag and drop directives on it.
        var _myid = scope.$id;
        var _data = null;

        var _dragEnabled = false;

        var _pressTimer = null;

        var onDragSuccessCallback = $parse(attrs.ngDragSuccess) || null;

        var initialize = function() {
          element.attr('draggable', 'false'); // prevent native drag
          toggleListeners(true);
        };

        // this same func is in ngDrop, it needs to be DRYed up but don't know if its
        // worth writing a service (or equivalent) for one function
        var _privoffset = function(docElem) {
          var box = {
            top: 0,
            left: 0
          };
          if (typeof docElem[0].getBoundingClientRect !== undefined) {
            box = docElem[0].getBoundingClientRect();
          }
          return {
            top: box.top + $window.pageYOffset - docElem[0].clientTop,
            left: box.left + $window.pageXOffset - docElem[0].clientLeft
          };
        }

        var toggleListeners = function(enable) {
          if (!enable) return;
          // add listeners.

          scope.$on('$destroy', onDestroy);
          scope.$watch(attrs.ngDrag, onEnableChange);
          scope.$watch(attrs.ngCenterAnchor, onCenterAnchor);
          scope.$watch(attrs.ngDragData, onDragDataChange);
          element.on(_pressEvents, onpress);
          if (!_hasTouch && element[0].nodeName.toLowerCase() == "img") {
            element.on('mousedown', function() {
              return false;
            }); // prevent native drag for images
          }
        };
        var onDestroy = function(enable) {
          toggleListeners(false);
        };
        var onDragDataChange = function(newVal, oldVal) {
          _data = newVal;
        };
        var onEnableChange = function(newVal, oldVal) {
          _dragEnabled = (newVal);
        };
        var onCenterAnchor = function(newVal, oldVal) {
          if (angular.isDefined(newVal))
            _centerAnchor = (newVal || 'true');
        }

        var isClickableElement = function(evt) {
          return (
            angular.isDefined(angular.element(evt.target).attr("ng-click")) || angular.isDefined(angular.element(evt.target).attr("ng-dblclick")) || angular.isDefined(angular.element(evt.target).attr("ng-cancel-drag"))
          );
        }

        // var isDragHandle = function (evt) {
        //     return !(angular.element(evt.target).closest("[ng-drag-handle]").length > 0);
        // }
        var isDragHandle = function(evt) {
          var attr = angular.element(evt.target).attr("ng-drag-handle");
          return (typeof attr !== typeof undefined && attr !== false);
        }

        /*
         * When the element is clicked start the drag behaviour
         * On touch devices as a small delay so as not to prevent native window scrolling
         */
        var onpress = function(evt) {
          if (!_dragEnabled || !isDragHandle(evt)) return;
          if (evt.type == "mousedown" && evt.button !== 0) return;
          element.css('width', element.width() + 'px');
          // disable drag on clickable element
          // if (isClickableElement(evt) || !isDragHandle(evt)) {
          // return;
          // }

          if (_hasTouch) {
            cancelPress();
            _pressTimer = setTimeout(function() {
              cancelPress();
              onlongpress(evt);
            }, 100);
            $document.on(_moveEvents, cancelPress);
            $document.on(_releaseEvents, cancelPress);
          } else {
            onlongpress(evt);
          }

        }
        var cancelPress = function() {
          clearTimeout(_pressTimer);
          $document.off(_moveEvents, cancelPress);
          $document.off(_releaseEvents, cancelPress);
        }
        var onlongpress = function(evt) {
          if (!_dragEnabled) return;
          evt.preventDefault();
          element.addClass('dragging');
          offset = _privoffset(element);

          element.centerX = element[0].offsetWidth / 2;
          element.centerY = element[0].offsetHeight / 2;

          _mx = (evt.pageX || evt.touches[0].pageX);
          _my = (evt.pageY || evt.touches[0].pageY);
          _mrx = _mx - offset.left;
          _mry = _my - offset.top;
          if (_centerAnchor) {
            _tx = _mx - element.centerX - $window.pageXOffset;
            _ty = _my - element.centerY - $window.pageYOffset;
          } else {
            _tx = _mx - _mrx - $window.pageXOffset;
            _ty = _my - _mry - $window.pageYOffset;
          }

          $document.on(_moveEvents, onmove);
          $document.on(_releaseEvents, onrelease);
          $rootScope.$broadcast('draggable:start', {
            x: _mx,
            y: _my,
            tx: _tx,
            ty: _ty,
            event: evt,
            element: element,
            data: _data
          });
        }

        var onmove = function(evt) {
          if (!_dragEnabled) return;
          evt.preventDefault();

          _mx = (evt.pageX || evt.touches[0].pageX);
          _my = (evt.pageY || evt.touches[0].pageY);

          if (_centerAnchor) {
            _tx = _mx - element.centerX - $window.pageXOffset;
            _ty = _my - element.centerY - $window.pageYOffset;
          } else {
            _tx = _mx - _mrx - $window.pageXOffset;
            _ty = _my - _mry - $window.pageYOffset;
          }

          moveElement(_tx, _ty);

          $rootScope.$broadcast('draggable:move', {
            x: _mx,
            y: _my,
            tx: _tx,
            ty: _ty,
            event: evt,
            element: element,
            data: _data,
            uid: _myid
          });
        }

        var onrelease = function(evt) {
          if (!_dragEnabled)
            return;
          evt.preventDefault();
          $rootScope.$broadcast('draggable:end', {
            x: _mx,
            y: _my,
            tx: _tx,
            ty: _ty,
            event: evt,
            element: element,
            data: _data,
            callback: onDragComplete,
            uid: _myid
          });
          element.removeClass('dragging');
          reset();
          $document.off(_moveEvents, onmove);
          $document.off(_releaseEvents, onrelease);
        }

        var onDragComplete = function(evt) {
          if (!onDragSuccessCallback) return;

          scope.$apply(function() {
            onDragSuccessCallback(scope, {
              $data: _data,
              $event: evt
            });
          });
        }

        var reset = function() {
          element.css({
            left: '',
            top: '',
            position: '',
            'z-index': '',
            margin: ''
          });
        }

        var moveElement = function(x, y) {
          element.css({
            left: (x + 'px'),
            top: (y + 'px'),
            position: 'fixed',
            'z-index': 99999
              //,margin: '0'  don't monkey with the margin, 
          });
        }
        initialize();
      }
    }
  }])

.directive('ngDrop', ['$parse', '$timeout', '$window', function($parse, $timeout, $window) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        scope.value = attrs.ngDrop;

        var _myid = scope.$id;

        var _dropEnabled = false;

        var onDropCallback = ($parse(attrs.ngDropSuccess) == angular.noop) ? function(scope, obj) {
          element.find('.drag-placeholder').after(obj.$event.element);
          obj.$event.element.show();
        } : $parse(attrs.ngDropSuccess);

        var initialize = function() {
          toggleListeners(true);
        };

        var toggleListeners = function(enable) {
          // remove listeners

          if (!enable) return;
          // add listeners.
          attrs.$observe("ngDrop", onEnableChange);
          scope.$on('$destroy', onDestroy);
          //scope.$watch(attrs.uiDraggable, onDraggableChange);
          scope.$on('draggable:start', onDragStart);
          scope.$on('draggable:move', onDragMove);
          scope.$on('draggable:end', onDragEnd);
        };

        // this same func is in ngDrag, it needs to be DRYed up but don't know if its
        // worth writing a service (or equivalent) for one function
        var _privoffset = function(docElem) {
          var box = {
            top: 0,
            left: 0
          };
          if (typeof docElem[0].getBoundingClientRect !== undefined) {
            box = docElem[0].getBoundingClientRect();
          }
          return {
            top: box.top + $window.pageYOffset - docElem[0].clientTop,
            left: box.left + $window.pageXOffset - docElem[0].clientLeft
          };
        }

        var onDestroy = function(enable) {
          toggleListeners(false);
        };
        var onEnableChange = function(newVal, oldVal) {
          _dropEnabled = scope.$eval(newVal);
        }
        var onDragStart = function(evt, obj) {
          if (!_dropEnabled) return;
          $('.drag-placeholder').show();
          if (isTouching(obj.x, obj.y, obj.element)) {
            obj.element.css({
              position: 'fixed',
              top: obj.ty + 'px',
              left: obj.tx + 'px'
            });
            if (element.find('.drag-placeholder').length < 1) {
              var dragPlaceholder = $('<div class="drag-placeholder"></div>').css({
                height: obj.element.innerHeight() + 'px',
                width: '100%'
              });
              $(obj.element).after(dragPlaceholder);
            }
          }
        }
        var onDragMove = function(evt, obj) {
          if (!_dropEnabled) return;
          if (isTouching(obj.x, obj.y, obj.element)) {
            if (element.find('.drag-placeholder').length < 1) {
              var dragPlaceholder = $('<div class="drag-placeholder"></div>').css({
                height: obj.element.innerHeight() + 'px',
                width: '100%'
              });
              $(element).append(dragPlaceholder);
            }
            element.find('[ng-drag]:not(.dragging)').each(function() {
              if (hitTestElement(obj.x, obj.y, $(this))) {
                // $(this).css('border', '1px solid blue');
                if (($(this).offset().top + $(this).height() / 2) < obj.y) {
                  // $(this).css('border', '1px solid red');
                  // element.find('.drag-placeholder').before(this);
                  $(this).after(element.find('.drag-placeholder'));
                } else {
                  // element.find('.drag-placeholder').after(this);
                  $(this).before(element.find('.drag-placeholder'));
                }
                // else
              }
            })
          } else {
            if (element.find('.drag-placeholder').length > 0) {
              element.find('.drag-placeholder').remove();
            }
          }
        }

        var onDragEnd = function(evt, obj) {
          // don't listen to drop events if this is the element being dragged
          if (!_dropEnabled || _myid === obj.uid) return;
          $('.drag-placeholder').hide();
          obj.element.css('width', '');
          if (isTouching(obj.x, obj.y, obj.element)) {
            obj.element.hide();
            // call the ngDraggable ngDragSuccess element callback
            if (obj.callback) {
              obj.callback(obj);
            }

            $timeout(function() {
              onDropCallback(scope, {
                $data: obj.data,
                $event: obj
              });
              $('.drag-placeholder').remove();
            });
          }
          updateDragStyles(false, obj.element);
        }

        var isTouching = function(mouseX, mouseY, dragElement) {
          var touching = hitTest(mouseX, mouseY);
          updateDragStyles(touching, dragElement);
          return touching;
        }

        var updateDragStyles = function(touching, dragElement) {
          if (touching) {
            element.addClass('drag-enter');
            dragElement.addClass('drag-over');
          } else {
            element.removeClass('drag-enter');
            dragElement.removeClass('drag-over');
          }
        }

        var hitTest = function(x, y) {
          var bounds = _privoffset(element);
          bounds.right = bounds.left + element[0].offsetWidth;
          bounds.bottom = bounds.top + element[0].offsetHeight;
          return x >= bounds.left && x <= bounds.right && y <= bounds.bottom && y >= bounds.top;
        }

        var hitTestElement = function(x, y, element) {
          var bounds = _privoffset(element);
          bounds.right = bounds.left + element[0].offsetWidth;
          bounds.bottom = bounds.top + element[0].offsetHeight;
          return x >= bounds.left && x <= bounds.right && y <= bounds.bottom && y >= bounds.top;
        }

        initialize();
      }
    }
  }])
  .directive('ngDragClone', ['$parse', '$timeout', function($parse, $timeout) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var img, _allowClone = true;
        scope.clonedData = {};
        var initialize = function() {

          img = element.find('img');
          element.attr('draggable', 'false');
          img.attr('draggable', 'false');
          reset();
          toggleListeners(true);
        };


        var toggleListeners = function(enable) {
          // remove listeners

          if (!enable) return;
          // add listeners.
          scope.$on('draggable:start', onDragStart);
          scope.$on('draggable:move', onDragMove);
          scope.$on('draggable:end', onDragEnd);
          preventContextMenu();

        };
        var preventContextMenu = function() {
          //  element.off('mousedown touchstart touchmove touchend touchcancel', absorbEvent_);
          img.off('mousedown touchstart touchmove touchend touchcancel', absorbEvent_);
          //  element.on('mousedown touchstart touchmove touchend touchcancel', absorbEvent_);
          img.on('mousedown touchstart touchmove touchend touchcancel', absorbEvent_);
        }
        var onDragStart = function(evt, obj, elm) {
          _allowClone = true
          if (angular.isDefined(obj.data.allowClone)) {
            _allowClone = obj.data.allowClone;
          }
          if (_allowClone) {
            scope.$apply(function() {
              scope.clonedData = obj.data;
            });
            element.css('width', obj.element[0].offsetWidth);
            element.css('height', obj.element[0].offsetHeight);

            moveElement(obj.tx, obj.ty);
          }
        }
        var onDragMove = function(evt, obj) {
          if (_allowClone) {
            moveElement(obj.tx, obj.ty);
          }
        }
        var onDragEnd = function(evt, obj) {
          //moveElement(obj.tx,obj.ty);
          if (_allowClone) {
            reset();
          }
        }

        var reset = function() {
          element.css({
            left: 0,
            top: 0,
            position: 'fixed',
            'z-index': -1,
            visibility: 'hidden'
          });
        }
        var moveElement = function(x, y) {
          element.css({
            left: (x + 'px'),
            top: (y + 'px'),
            position: 'fixed',
            'z-index': 99999,
            'visibility': 'visible'
              //,margin: '0'  don't monkey with the margin, 
          });
        }

        var absorbEvent_ = function(event) {
          var e = event.originalEvent;
          e.preventDefault && e.preventDefault();
          e.stopPropagation && e.stopPropagation();
          e.cancelBubble = true;
          e.returnValue = false;
          return false;
        }

        initialize();
      }
    }
  }])
  .directive('ngPreventDrag', ['$parse', '$timeout', function($parse, $timeout) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var initialize = function() {

          element.attr('draggable', 'false');
          toggleListeners(true);
        };


        var toggleListeners = function(enable) {
          // remove listeners

          if (!enable) return;
          // add listeners.
          element.on('mousedown touchstart touchmove touchend touchcancel', absorbEvent_);
        };


        var absorbEvent_ = function(event) {
          var e = event.originalEvent;
          e.preventDefault && e.preventDefault();
          e.stopPropagation && e.stopPropagation();
          e.cancelBubble = true;
          e.returnValue = false;
          return false;
        }

        initialize();
      }
    }
  }])
  .directive('ngCancelDrag', [function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        element.find('*').attr('ng-cancel-drag', 'ng-cancel-drag');
      }
    }
  }]);
/* jshint ignore:end */;angular.module('theme.core.template_overrides', [])
  .config(['$provide', function($provide) {
    'use strict';
/*    $provide.decorator('tabsetDirective', function($delegate) {
      $delegate[0].templateUrl = function(element, attr) {
        if (attr.tabPosition || attr.tabTheme) {
          if (attr.tabPosition && (attr.tabPosition === '\'bottom\'' || attr.tabPosition === 'bottom')) {
            return 'templates/themed-tabs-bottom.html';
          }
          return 'templates/themed-tabs.html';
        } else if (attr.panelTabs && attr.heading !== undefined) {
          return 'templates/panel-tabs.html';
        } else if (attr.panelTabs && attr.heading === undefined) {
          return 'templates/panel-tabs-without-heading.html';
        } else {
          return 'templates/themed-tabs.html';
        }
      };

      // "hacks" because 1.3.x broke scope extensions
      $delegate[0].$$isolateBindings.heading = {
        attrName: 'heading',
        mode: '@',
        optional: true
      };

      $delegate[0].$$isolateBindings.panelClass = {
        attrName: 'panelClass',
        mode: '@',
        optional: true
      };

      $delegate[0].$$isolateBindings.panelIcon = {
        attrName: 'panelIcon',
        mode: '@',
        optional: true
      };

      $delegate[0].$$isolateBindings.theme = {
        attrName: 'tabTheme',
        mode: '@',
        optional: true
      };

      $delegate[0].$$isolateBindings.position = {
        attrName: 'tabPosition',
        mode: '@',
        optional: true
      };

      $delegate[0].$$isolateBindings.draggable = {
        attrName: 'ngDrag',
        mode: '=',
        optional: true
      };

      return $delegate;
    });

    $provide.decorator('progressbarDirective', function($delegate) {
      $delegate[0].templateUrl = function(element, attr) {
        if (attr.contextual && attr.contextual === 'true') {
          return 'templates/contextual-progressbar.html';
        }

        return 'template/progressbar/progressbar.html';
      };

      $delegate[0].$$isolateBindings.heading = {
        attrName: 'heading',
        mode: '@'
      };

      return $delegate;
    });
*/
  }])
  /* jshint ignore:start */
  .run(['$templateCache', function($templateCache) {
    $templateCache.put('footerTemplate.html',
      "<div ng-show=\"showFooter\" class=\"ng-grid-footer\" ng-style=\"footerStyle()\">\r" +
      "\n" +
      "    <div class=\"col-md-4\" >\r" +
      "\n" +
      "        <div class=\"ngFooterTotalItems\" ng-class=\"{'ngNoMultiSelect': !multiSelect}\" >\r" +
      "\n" +
      "            <span class=\"ngLabel\">{{i18n.ngTotalItemsLabel}} {{maxRows()}}</span><span ng-show=\"filterText.length > 0\" class=\"ngLabel\">({{i18n.ngShowingItemsLabel}} {{totalFilteredItemsLength()}})</span>\r" +
      "\n" +
      "        </div>\r" +
      "\n" +
      "        <div class=\"ngFooterSelectedItems\" ng-show=\"multiSelect\">\r" +
      "\n" +
      "            <span class=\"ngLabel\">{{i18n.ngSelectedItemsLabel}} {{selectedItems.length}}</span>\r" +
      "\n" +
      "        </div>\r" +
      "\n" +
      "    </div>\r" +
      "\n" +
      "    <div class=\"col-md-4\" ng-show=\"enablePaging\" ng-class=\"{'ngNoMultiSelect': !multiSelect}\">\r" +
      "\n" +
      "            <label class=\"control-label ng-grid-pages center-block\">{{i18n.ngPageSizeLabel}}\r" +
      "\n" +
      "               <select class=\"form-control input-sm\" ng-model=\"pagingOptions.pageSize\" >\r" +
      "\n" +
      "                      <option ng-repeat=\"size in pagingOptions.pageSizes\">{{size}}</option>\r" +
      "\n" +
      "                </select>\r" +
      "\n" +
      "        </label>\r" +
      "\n" +
      "</div>\r" +
      "\n" +
      // "<pagination total-items=\"totalFilteredItemsLength()\" ng-model=\"pagingOptions.currentPage\"></pagination>" +
      // "\n" +
      "     <div class=\"col-md-4\">\r" +
      "\n" +
      "        <div class=\"pull-right ng-grid-pagination\">\r" +
      "\n" +
      "            <button type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"pageToFirst()\" ng-disabled=\"cantPageBackward()\" title=\"{{i18n.ngPagerFirstTitle}}\"><i class=\"fa fa-angle-double-left\"></i></button>\r" +
      "\n" +
      "            <button type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"pageBackward()\" ng-disabled=\"cantPageBackward()\" title=\"{{i18n.ngPagerPrevTitle}}\"><i class=\"fa fa-angle-left\"></i></button>\r" +
      "\n" +
      "            <label class=\"control-label\">\r" +
      "\n" +
      "                   <input class=\"form-control input-sm\" min=\"1\" max=\"{{currentMaxPages}}\" type=\"number\" style=\"width:50px; height: 24px; margin-top: 1px; padding: 0 4px;\" ng-model=\"pagingOptions.currentPage\"/>\r" +
      "\n" +
      "            </label>\r" +
      "\n" +
      "            <span class=\"ngGridMaxPagesNumber\" ng-show=\"maxPages() > 0\">/ {{maxPages()}}</span>\r" +
      "\n" +
      "            <button type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"pageForward()\" ng-disabled=\"cantPageForward()\" title=\"{{i18n.ngPagerNextTitle}}\"><i class=\"fa fa-angle-right\"></i></button>\r" +
      "\n" +
      "            <button type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"pageToLast()\" ng-disabled=\"cantPageToLast()\" title=\"{{i18n.ngPagerLastTitle}}\"><i class=\"fa fa-angle-double-right\"></i></button>\r" +
      "\n" +
      "        </div>\r" +
      "\n" +
      "     </div>\r" +
      "\n" +
      "</div>\r" +
      "\n"
    );

    $templateCache.put("template/rating/rating.html",
      "<span ng-mouseleave=\"reset()\" ng-keydown=\"onKeydown($event)\" tabindex=\"0\" role=\"slider\" aria-valuemin=\"0\" aria-valuemax=\"{{range.length}}\" aria-valuenow=\"{{value}}\">\n" +
      "    <i ng-repeat=\"r in range track by $index\" ng-mouseenter=\"enter($index + 1)\" ng-click=\"rate($index + 1)\" class=\"fa\" ng-class=\"$index < value && (r.stateOn || 'fa-star') || (r.stateOff || 'fa-star-o')\">\n" +
      "        <span class=\"sr-only\">({{ $index < value ? '*' : ' ' }})</span>\n" +
      "    </i>\n" +
      "</span>");

    $templateCache.put("bootstrap/match.tpl.html", "<div class=\"ui-select-match\" ng-hide=\"$select.open\" ng-disabled=\"$select.disabled\" ng-class=\"{\'btn-default-focus\':$select.focus}\"><button type=\"button\" class=\"form-control ui-select-toggle\" tabindex=\"-1\" ;=\"\" ng-disabled=\"$select.disabled\" ng-click=\"$select.activate()\"><span ng-show=\"$select.isEmpty()\" class=\"ui-select-placeholder text-muted\">{{$select.placeholder}}</span> <span ng-hide=\"$select.isEmpty()\" class=\"ui-select-match-text\" ng-class=\"{\'ui-select-allow-clear\': $select.allowClear && !$select.isEmpty()}\" ng-transclude=\"\"></span> <i class=\"caret caret-right\" ng-click=\"$select.toggle($event)\"></i></button> <button type=\"button\" class=\"ui-select-clear\" ng-if=\"$select.allowClear && !$select.isEmpty()\" ng-click=\"$select.select(undefined)\"><i class=\"glyphicon glyphicon-remove\"></i></button></div>");
  }])
  /* jshint ignore:end */
  ;
;/* jshint ignore:start */
angular.module('theme.core.templates', []).run(['$templateCache', function ($templateCache) {
  'use strict';

  $templateCache.put('templates/contextual-progressbar.html',
    "<div class=\"contextual-progress\">\n" +
    "\t<div class=\"clearfix\">\n" +
    "\t\t<div class=\"progress-title\">{{heading}}</div>\n" +
    "\t\t<div class=\"progress-percentage\">{{percent | number:0}}%</div>\n" +
    "\t</div>\n" +
    "\t<div class=\"progress\">\n" +
    "\t\t<div class=\"progress-bar\" ng-class=\"type && 'progress-bar-' + type\" role=\"progressbar\" aria-valuenow=\"{{value}}\" aria-valuemin=\"0\" aria-valuemax=\"{{max}}\" ng-style=\"{width: percent + '%'}\" aria-valuetext=\"{{percent | number:0}}%\" ng-transclude></div>\n" +
    "\t</div>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/custom-styles.html',
    "<style>\n" +
    "\t.dropdown.open .dropdown-menu.animated {\n" +
    "\t\t-webkit-animation-name: {{getLayoutOption('dropdownTransitionStyle')}};\n" +
    "\t\tanimation-name: {{getLayoutOption('dropdownTransitionStyle')}};\n" +
    "\t\t-webkit-animation-duration: .5s;\n" +
    "\t\tanimation-duration: .5s;\n" +
    "\t}\n" +
    "\t.dropdown-menu.animated {\n" +
    "\t\t-webkit-animation-name: none;\n" +
    "\t\tanimation-name: none;\n" +
    "\t}\n" +
    "\n" +
    "\t.mainview-animation.animated.ng-enter {\n" +
    "\t\t-webkit-animation-name: {{getLayoutOption('pageTransitionStyle')}};\n" +
    "\t\tanimation-name: {{getLayoutOption('pageTransitionStyle')}};\n" +
    "\t}\n" +
    "</style>"
  );


  $templateCache.put('templates/nav_renderer.html',
    "<div ng-if=\"item.separator==true\">\n" +
    "\t<span>{{item.label}}</span>\n" +
    "</div>\n" +
    "<a ng-if=\"!item.separator\" ng-click=\"select(item)\" ng-href=\"{{item.url}}\">\n" +
    "\t<i ng-if=\"item.iconClasses\" class=\"{{item.iconClasses}}\"></i><span>{{item.label}}</span>\n" +
    "\t<span ng-bind-html=\"item.html\"></span>\n" +
    "</a>\n" +
    "<ul ng-if=\"item.children.length\" data-slide-out-nav=\"item.open || (searchQuery.length>0 && item.selected)\">\n" +
    "    <li ng-repeat=\"item in item.children\"\n" +
    "\t    ng-class=\"{ hasChild: (item.children!==undefined),\n" +
    "                      active: item.selected,\n" +
    "                        open: (item.children!==undefined) && item.open,\n" +
    "              'search-focus': (searchQuery.length>0 && item.selected) }\"\n" +
    " \t\tng-show=\"!(searchQuery.length>0 && !item.selected)\"\n" +
    "    \tng-include=\"'templates/nav_renderer.html'\"\n" +
    "    ></li>\n" +
    "</ul>"
  );


  $templateCache.put('templates/nav_renderer_horizontal.html',
    "<a ng-click=\"select(item)\" ng-href=\"{{item.url}}\">\n" +
    "  <i ng-if=\"item.iconClasses\" class=\"{{item.iconClasses}}\"></i><span>{{item.label}}</span>\n" +
    "  <span ng-bind-html=\"item.html\"></span>\n" +
    "</a>\n" +
    "<ul ng-if=\"item.children.length\">\n" +
    "    <li ng-repeat=\"item in item.children\"\n" +
    "      ng-class=\"{ hasChild: (item.children!==undefined),\n" +
    "                      active: item.selected,\n" +
    "                        open: (item.children!==undefined) && item.open }\"\n" +
    "      ng-include=\"'templates/nav_renderer_horizontal.html'\"\n" +
    "    ></li>\n" +
    "</ul>\n"
  );


  $templateCache.put('templates/panel-tabs-without-heading.html',
    "<div class=\"panel {{panelClass}}\">\n" +
    "  <div class=\"panel-heading\" ng-attr-ng-drag-handle=\"{{draggable}}\">\n" +
    "        <h2>\n" +
    "            <ul class=\"nav nav-{{type || 'tabs'}}\" ng-class=\"{'nav-stacked': vertical, 'nav-justified': justified}\" ng-transclude></ul>\n" +
    "        </h2>\n" +
    "  </div>\n" +
    "  <div class=\"panel-body\">\n" +
    "    <div class=\"tab-content\">\n" +
    "        <div class=\"tab-pane\"\n" +
    "            ng-repeat=\"tab in tabs\"\n" +
    "            ng-class=\"{active: tab.active}\"\n" +
    "            tab-content-transclude=\"tab\">\n" +
    "        </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/panel-tabs.html',
    "<div class=\"panel {{panelClass}}\">\n" +
    "  <div class=\"panel-heading\" ng-attr-ng-drag-handle=\"{{draggable}}\">\n" +
    "        <h2><i ng-if=\"panelIcon\" class=\"{{panelIcon}}\"></i>{{(panelIcon? \" \":\"\")+heading}}</h2>\n" +
    "        <div class=\"panel-ctrls\">\n" +
    "            <ul class=\"nav nav-{{type || 'tabs'}}\" ng-class=\"{'nav-stacked': vertical, 'nav-justified': justified}\" ng-transclude></ul>\n" +
    "        </div>\n" +
    "  </div>\n" +
    "  <div class=\"panel-body\">\n" +
    "    <div class=\"tab-content\">\n" +
    "        <div class=\"tab-pane\"\n" +
    "            ng-repeat=\"tab in tabs\"\n" +
    "            ng-class=\"{active: tab.active}\"\n" +
    "            tab-content-transclude=\"tab\">\n" +
    "        </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/panel.html',
    "<div class=\"panel {{panelClass}}\">\n" +
    "  <div class=\"panel-heading\">\n" +
    "        <h2><i ng-if=\"panelIcon\" class=\"{{panelIcon}}\"></i>{{(panelIcon? \" \":\"\")+heading}}</h2>\n" +
    "        <div class=\"panel-ctrls\">\n" +
    "        </div>\n" +
    "  </div>\n" +
    "  <div class=\"panel-body\" ng-transclude>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/themed-tabs-bottom.html',
    "<div class=\"tab-container tab-{{theme || 'primary'}} tab-{{position || 'normal'}}\">\n" +
    "  <div class=\"tab-content\">\n" +
    "    <div class=\"tab-pane\"\n" +
    "        ng-repeat=\"tab in tabs\"\n" +
    "        ng-class=\"{active: tab.active}\"\n" +
    "        tab-content-transclude=\"tab\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <ul class=\"nav nav-{{type || 'tabs'}}\" ng-class=\"{'nav-stacked': vertical, 'nav-justified': justified}\" ng-transclude></ul>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/themed-tabs.html',
    "<div class=\"tab-container tab-{{theme || 'primary'}} tab-{{position || 'normal'}}\">\n" +
    "  <ul class=\"nav nav-{{type || 'tabs'}}\" ng-class=\"{'nav-stacked': vertical, 'nav-justified': justified}\" ng-transclude></ul>\n" +
    "  <div class=\"tab-content\">\n" +
    "    <div class=\"tab-pane\"\n" +
    "        ng-repeat=\"tab in tabs\"\n" +
    "        ng-class=\"{active: tab.active}\"\n" +
    "        tab-content-transclude=\"tab\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/tile-generic.html',
    "<div class=\"info-tiles tiles-{{type}}\">\n" +
    "\t<div class=\"tiles-heading\">\n" +
    "\t\t{{heading}}\n" +
    "\t</div>\n" +
    "\t<div class=\"tiles-body\" ng-transclude>\n" +
    "\t</div>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/tile-large.html',
    "<a class=\"info-tiles tiles-{{item.color}}\" ng-href=\"{{item.href}}\">\n" +
    "    <div class=\"tiles-heading\">\n" +
    "        <div class=\"pull-left\">{{item.title}}</div>\n" +
    "        <div class=\"pull-right\">{{item.titleBarInfo}}</div>\n" +
    "    </div>\n" +
    "    <div class=\"tiles-body\">\n" +
    "        <div class=\"pull-left\"><i class=\"{{item.classes}}\"></i></div>\n" +
    "        <div class=\"pull-right\" ng-show=\"item.text\">{{item.text}}</div>\n" +
    "        <div class=\"pull-right\" ng-show=\"!item.text\" ng-transclude></div>\n" +
    "    </div>\n" +
    "</a>\n"
  );


  $templateCache.put('templates/tile-shortcut.html',
    "<a class=\"shortcut-tiles tiles-{{item.color}}\" ng-href=\"{{item.href}}\">\n" +
    "\t<div class=\"tiles-body\">\n" +
    "\t\t<div class=\"pull-left\"><i class=\"{{item.classes}}\"></i></div>\n" +
    "\t\t<div class=\"pull-right\"><span class=\"badge\">{{item.titleBarInfo}}</span></div>\n" +
    "\t</div>\n" +
    "\t<div class=\"tiles-footer\">\n" +
    "\t\t{{item.text}}\n" +
    "\t</div>\n" +
    "</a>\n"
  );


  $templateCache.put('templates/tile-simple.html',
    "<a class=\"info-tiles tiles-{{item.color}}\" ng-href=\"{{item.href}}\">\n" +
    "    <div class=\"tiles-heading\">\n" +
    "        <div class=\"text-center\">{{item.title}}</div>\n" +
    "    </div>\n" +
    "    <div class=\"tiles-body\">\n" +
    "        <div class=\"text-center\" ng-show=\"item.text\">{{item.text}}</div>\n" +
    "    </div>\n" +
    "</a>"
  );
}])
/* jshint ignore:end */;angular
  .module('theme.core.panels', ['ngDraggable'])
  .config(function() {});;angular
  .module('theme.core.panels')
  .directive('panel', function() {
    'use strict';
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        panelClass: '@',
        heading: '@',
        panelIcon: '@',
        ngDrag: '@'
      },
      templateUrl: 'templates/panel.html',
      link: function(scope, element, attrs) {
        if (attrs.ngDrag === 'true') {
          element.find('.panel-heading').attr('ng-drag-handle', '');
        }
      }
    };
  })
  .directive('panelControls', [function() {
    'use strict';
    return {
      restrict: 'E',
      require: '?^tabset',
      replace: true,
      link: function(scope, element) {
        var panel = angular.element(element).closest('.panel');
        if (panel.hasClass('.ng-isolate-scope') === false) {
          angular.element(element).children().appendTo(panel.find('.panel-ctrls'));
        }
      }
    };
  }])
  .directive('panelControlCollapse', function() {
    'use strict';
    return {
      restrict: 'EAC',
      link: function(scope, element) {
        element.html('<button class="button-icon"><i class="glyphicon glyphicon-minus"></i></button>');
        element.bind('click', function() {
          angular.element(element).find('i').toggleClass('glyphicon-plus glyphicon-minus');
          angular.element(element).closest('.panel').find('.panel-body').slideToggle({
            duration: 200
          });
          angular.element(element).closest('.panel-heading').toggleClass('rounded-bottom');
        });
        return false;
      }
    };
  })
  .directive('panelControlRefresh', function() {
    'use strict';
    return {
      restrict: 'EAC',
      scope: {
        isLoading: '=',
        type: '@'
      },
      link: function(scope, element) {
        var type = (scope.type) ? scope.type : 'circular';
        element.append('<button class="button-icon"><i class="glyphicon glyphicon-refresh"></i></button>');
        element.find('button').bind('click', function() {
          element.closest('.panel')
            .append('<div class="panel-loading"><div class="panel-loader-' + type + '"></div></div>');
        });
        scope.$watch('isLoading', function(n) {
          if (n === false) {
            element.closest('.panel').find('.panel-loading').remove();
          }
        });
      }
    };
  })
  .directive('panelControlColors', ['$compile', function($compile) {
    'use strict';
    return {
      restrict: 'EAC',
      replace: true,
      link: function(scope, element) {
        var controls = '<span class="button-icon" dropdown="" dropdown-toggle="">' +
          '<i class="glyphicon glyphicon-tint"></i>' +
          '<ul class="dropdown-menu dropdown-tint" role="menu">' +
          '<li><span class="btn btn-default" data-class="panel-default"></span></li>' +
          '<li><span class="btn btn-midnightblue" data-class="panel-midnightblue"></span></li>' +
          '<li><span class="btn btn-danger" data-class="panel-danger"></span></li>' +
          '<li><span class="btn btn-success" data-class="panel-success"></span></li>' +
          '<li><span class="btn btn-primary" data-class="panel-primary"></span></li>' +
          '<li><span class="btn btn-inverse" data-class="panel-inverse"></span></li>' +
          '<li><span class="btn btn-indigo" data-class="panel-indigo"></span></li>' +
          '</ul>' +
          '</span>';
        element.append($compile(controls)(scope));
        element.find('li span').bind('click', function() {
          element.closest('.panel').removeClass(function(index, css) {
            return (css.match(/(^|\s)panel-\S+/g) || []).join(' ');
          });
          element.closest('.panel').removeClass('panel-*').addClass(angular.element(this).attr('data-class'));
        });
        return false;
      }
    };
  }])
  .directive('panelControlTitle', ['$compile', '$timeout', function($compile, $t) {
    'use strict';
    return {
      restrict: 'EAC',
      scope: true,
      link: function(scope, element) {
        var controls = '<span class="button-icon" dropdown="" dropdown-toggle="" is-open="showInputBox">' +
          '<i class="glyphicon glyphicon-edit"></i>' +
          '<ul class="dropdown-menu dropdown-edit" role="menu" ng-keyup="processKeyUp($event)">' +
          '<li><input class="form-control" type="text" ng-model="title" id="lolput" ng-click="$event.preventDefault();$event.stopPropagation()" /></li>' +
          '</ul>' +
          '</span>';
        element.append($compile(controls)(scope));
        scope.processKeyUp = function(event) {
          if (event.keyCode === 32) { // space pressed
            event.preventDefault();
          } else if (event.keyCode === 13) {
            scope.showInputBox = false;
          }
        };
        scope.$watch('showInputBox', function(n) {
          if (n) {
            $t(function() {
              element.find('input').val(element.closest('.panel').find('.panel-heading h2').text()).focus();
            }, 10);
          }
        });
        scope.$watch('title', function(n) {
          element.closest('.panel').find('.panel-heading h2').html(n);
        });
        return false;
      }
    };
  }]);;angular
  .module('theme.core.services', [])
  .factory('progressLoader', function() {
    'use strict';
    return {
      start: function() {
        angular.element.skylo('start');
      },
      set: function(position) {
        angular.element.skylo('set', position);
      },
      end: function() {
        angular.element.skylo('end');
      },
      get: function() {
        return angular.element.skylo('get');
      },
      inch: function(amount) {
        angular.element.skylo('show', function() {
          angular.element(document).skylo('inch', amount);
        });
      }
    };
  })
  .factory('EnquireService', ['$window', function($window) {
    'use strict';
    return $window.enquire;
  }])
  .factory('pinesNotifications', ['$window', function ($window) {
    'use strict';
    return {
      notify: function (args) {
        args.mouse_reset = false;
        var notification = new $window.PNotify(args);
        notification.notify = notification.update;
        return notification;
      },
    };
  }])
  .factory('$bootbox', ['$uibModal', '$window', function($uibModal, $window) {
    'use strict';
    // NOTE: this is a workaround to make BootboxJS somewhat compatible with
    // Angular UI Bootstrap in the absence of regular bootstrap.js
    if (angular.element.fn.modal === undefined) {
      angular.element.fn.modal = function(directive) {
        var that = this;
        if (directive === 'hide') {
          if (this.data('bs.modal')) {
            this.data('bs.modal').close();
            angular.element(that).remove();
          }
          return;
        } else if (directive === 'show') {
          return;
        }

        var modalInstance = $uibModal.open({
          template: angular.element(this).find('.modal-content').html()
        });
        this.data('bs.modal', modalInstance);
        setTimeout(function() {
          angular.element('.modal.ng-isolate-scope').remove();
          angular.element(that).css({
            opacity: 1,
            display: 'block'
          }).addClass('in');
        }, 100);
      };
    }

    return $window.bootbox;
  }])
  .service('lazyLoad', ['$q', '$timeout', function($q, $t) {
    'use strict';
    var deferred = $q.defer();
    var promise = deferred.promise;
    this.load = function(files) {
      angular.forEach(files, function(file) {
        if (file.indexOf('.js') > -1) { // script
          (function(d, script) {
            var fDeferred = $q.defer();
            script = d.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.onload = function() {
              $t(function() {
                fDeferred.resolve();
              });
            };
            script.onerror = function() {
              $t(function() {
                fDeferred.reject();
              });
            };

            promise = promise.then(function() {
              script.src = file;
              d.getElementsByTagName('head')[0].appendChild(script);
              return fDeferred.promise;
            });
          }(document));
        }
      });

      deferred.resolve();

      return promise;
    };
  }])
  .filter('safe_html', ['$sce', function($sce) {
    'use strict';
    return function(val) {
      return $sce.trustAsHtml(val);
    };
  }])
  .factory('httpRequestInterceptor', function () {
  return {
    request: function (config) {
      config.headers = Object.assign(config.headers, getHeaders());
      return config;
    }
  };
});
;angular.module('theme.core.services')
.service('modalService', ['$uibModal',
  function($uibModal) {

    var modalDefaults = {
      backdrop: true,
      keyboard: true,
      modalFade: true,
      templateUrl: '/my/template/views/templates/modal.html'
    };

    var modalOptions = {
      closeButtonText: 'Close',
      actionButtonText: 'OK',
      headerText: 'Proceed?',
      bodyText: 'Perform this action?'
    };

    this.showModal = function(customModalDefaults, customModalOptions) {
      if (!customModalDefaults) customModalDefaults = {};
      customModalDefaults.backdrop = 'static';
      return this.show(customModalDefaults, customModalOptions);
    };

    this.show = function(customModalDefaults, customModalOptions) {
      //Create temp objects to work with since we're in a singleton service
      var tempModalDefaults = {};
      var tempModalOptions = {};

      //Map angular-ui modal custom defaults to modal defaults defined in service
      angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

      //Map modal.html $scope custom properties to defaults defined in service
      angular.extend(tempModalOptions, modalOptions, customModalOptions);

      if (!tempModalDefaults.controller) {
        tempModalDefaults.controller = function($scope, $uibModalInstance) {
          $scope.modalOptions = tempModalOptions;
          $scope.modalOptions.ok = function(result) {
            $uibModalInstance.close(result);
          };
          $scope.modalOptions.close = function(result) {
            $uibModalInstance.dismiss('Action cancelled');
          };
        }
      }

      return $uibModal.open(tempModalDefaults).result;
    };

  }
]);
;angular
  .module('theme.core.services')
  .service('$theme', ['$rootScope', 'EnquireService', '$document', function($rootScope, EnquireService, $document) {
    'use strict';
    this.settings = {
      fixedHeader: true,
      headerBarHidden: true,
      leftbarCollapsed: true,
      leftbarShown: false,
      rightbarCollapsed: false,
      fullscreen: false,
      layoutHorizontal: false,
      layoutHorizontalLargeIcons: false,
      layoutBoxed: false,
      showSmallSearchBar: false,
      topNavThemeClass: 'navbar-midnightblue',
      sidebarThemeClass: 'sidebar-midnightblue',
      showChatBox: false,
      pageTransitionStyle: 'fadeIn',
      dropdownTransitionStyle: 'flipInX'
    };

    var brandColors = {
      'default': '#ecf0f1',

      'inverse': '#95a5a6',
      'primary': '#3498db',
      'success': '#2ecc71',
      'warning': '#f1c40f',
      'danger': '#e74c3c',
      'info': '#1abcaf',

      'brown': '#c0392b',
      'indigo': '#9b59b6',
      'orange': '#e67e22',
      'midnightblue': '#34495e',
      'sky': '#82c4e6',
      'magenta': '#e73c68',
      'purple': '#e044ab',
      'green': '#16a085',
      'grape': '#7a869c',
      'toyo': '#556b8d',
      'alizarin': '#e74c3c'
    };

    this.getBrandColor = function(name) {
      if (brandColors[name]) {
        return brandColors[name];
      } else {
        return brandColors['default'];
      }
    };

    $document.ready(function() {
      EnquireService.register('screen and (max-width: 767px)', {
        match: function() {
          $rootScope.$broadcast('themeEvent:maxWidth767', true);
        },
        unmatch: function() {
          $rootScope.$broadcast('themeEvent:maxWidth767', false);
        }
      });
    });

    this.get = function(key) {
      return this.settings[key];
    };
    this.set = function(key, value) {
      this.settings[key] = value;
      $rootScope.$broadcast('themeEvent:changed', {
        key: key,
        value: this.settings[key]
      });
      $rootScope.$broadcast('themeEvent:changed:' + key, this.settings[key]);
    };
    this.values = function() {
      return this.settings;
    };
  }]);
;angular.module('freebe', [
  'theme',
  'freebe.directives',
  'freebe.dashboard_controller',
  'freebe.signin_controller',
  'freebe.forgot_password_controller',
  'freebe.profile_controller',
  'freebe.registration_controller',
  'freebe.bank_account_controller',
  'freebe.wallet_controller',
  'freebe.transaction_details_controller',
  'freebe.transfer_controller',
  'freebe.bill_payment_controller',
  'freebe.subscribe_controller'
])
;angular
  .module('freebe.bank_account_controller', [
    'ngGrid'
  ])
  .controller('BankAccountController', ['$scope', '$filter', '$ocLazyLoad', function($scope, $filter, $ocLazyLoad) {
    'use strict';
  }]);
;angular
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
;angular.module('freebe.dashboard_controller', [
    'angular-skycons',
    'chart.js'
  ])
  .controller('DashboardController', ['$scope', '$timeout', '$window', 'reportService', function($scope, $timeout, $window, reportService) {
    'use strict';
    var moment = $window.moment;
    var _ = $window._;
    $scope.loadingChartData = false;

    $scope.dateRange = {
      start: moment().subtract(30, 'days').format('MMM, D YYYY'),
      end: moment().add(1, 'days').format('MMM, D YYYY')
    };

    /*$scope.drp_options = {
      ranges: {
        'Today': [moment().format('MMM, D YYYY'), moment().format('MMM, D YYYY')],
        'Yesterday': [moment().subtract(1, 'days').format('MMM, D YYYY'), moment().subtract(1, 'days').format('MMM, D YYYY')],
        'Last 7 Days': [moment().subtract(6, 'days').format('MMM, D YYYY'), moment().format('MMM, D YYYY')],
        'Last 30 Days': [moment().subtract(29, 'days').format('MMM, D YYYY'), moment().format('MMM, D YYYY')],
        'This Month': [moment().startOf('month').format('MMM, D YYYY'), moment().endOf('month').format('MMM, D YYYY')],
        'Last Month': [moment().subtract(1, 'month').startOf('month').format('MMM, D YYYY'), moment().subtract(1, 'month').endOf('month').format('MMM, D YYYY')]
      },
      "locale": {
        "format": "MM/DD/YYYY",
        "separator": " - ",
      },
      opens: 'left',
      startDate: moment().subtract(29, 'days').format('D-MMM-YYYY'),
      endDate: moment().format('D-MMM-YYYY')
    };*/

    $scope.$watchGroup(['dateRange.start', 'dateRange.end'], function(newVal, oldVal) {
      if (newVal) {
        $scope.loadStatistics();
      }
    }, true);

    $scope.loadStatistics = function() {
      $scope.loadingChartData = true;
      reportService.getTransactionStatistics($scope.dateRange.start, $scope.dateRange.end)
        .then(function(stats) {
          $scope.stats = stats;
          $scope.chart = {
            labels: stats.map(function(stat) {
              return moment(stat.transaction_date).format('MMM D, YYYY')
            }),
            options: { legend: { display: true } },
            series: [" # of Transfers", " # of Received"],
            data: [
              stats.map(function(stat) {
                return stat.transfers
              }),
              stats.map(function(stat) {
                return stat.received
              })
            ]
          }
        })
        .finally(function() {
          $scope.loadingChartData = false;
        });
    }
  }]);
;angular
  .module('freebe.forgot_password_controller', [])
  .controller('ForgotPasswordController', ['$rootScope', '$scope', '$state', '$auth', '$theme', 'progressLoader', 'token',
    function($rootScope, $scope, $state, $auth, $theme, progressLoader, token) {
      'use strict';
      $theme.set('fullscreen', true);

      $scope.$on('$destroy', function() {
        $theme.set('fullscreen', false);
      });

      $scope.form = {};
      $scope.forgotPasswordForm = {
        Email: '',
        Token: token
      };

      $scope.resetPassword = function(credentials) {
        $scope.clearAlert();
        $scope.isBusy = true;
        progressLoader.start();
        progressLoader.set(50);
        $auth.requestPasswordReset($scope.forgotPasswordForm)
          .finally(function() {
            $scope.isBusy = false;
            progressLoader.end();
          });
      }

      $scope.clearAlert = function() {
        $scope.alert = {}
      }
      $scope.clearAlert();

      $scope.$on('auth:password-reset-request-success', function(ev, token) {
        $scope.isBusy = false;
        $state.go("reset-successful");
      });

      $scope.$on('auth:password-reset-request-error', function(ev, reason) {
        $scope.isBusy = false;
        $scope.alert = {
          type: 'danger',
          msg: 'Password reset request failed'
        };
      });
    }
  ]);
;angular
  .module('freebe.profile_controller', ['freebe.services'])
  .controller('ProfileController', ['$scope', '$auth', 'progressLoader', '$uibModal', "profile",
    "customerService", "accountService", "transactionService", "Upload", "modalService",
    function($scope, $auth, progressLoader, $uibModal, profile, customerService, accountService,
       transactionService, Upload, modalService) {
      'use strict';

      $scope.profile = profile;

      $scope.changeAvatar = function(size) {
        var modalInstance = $uibModal.open({
          templateUrl: 'profileAvatar.html',
          controller: ["$scope", "$uibModalInstance", function($scope, $uibModalInstance) {
            $scope.avatar = {
              Old: '',
              New: '',
              isLoading: false
            };

            $scope.loading = function() {
              $scope.avatar.isLoading = true;
            };

            $scope.done = function() {
              $scope.avatar.isLoading = false;
            };

            $scope.error = function() {
              $scope.avatar.isLoading = false;
            };

            $scope.ok = function() {
              $uibModalInstance.close($scope.avatar.New);
            };

            $scope.cancel = function() {
              $uibModalInstance.dismiss('cancel');
            };
          }],
          size: size
        });

        modalInstance.result
        .then(function(newAvatar) {
          $scope.profile.avatar = newAvatar;
          $scope.profile.avatarChanged = true;
        })
        .catch(function() {
        });
      };

      $scope.getRecentTransactions = function() {
        transactionService.getRecent().then(function(rtx) {
          $scope.recentTransactions = rtx;
        });
      }

      $scope.updateProfile = function() {
        $scope.clearAlert();
        $scope.isBusy = true;
        progressLoader.start();
        progressLoader.set(50);

        if ($scope.profile.avatarChanged) {
          Upload.upload({
              url: '/api/v1.0/paylink/customers/avatar',
              data: {
                file: Upload.dataUrltoBlob($scope.profile.avatar, $auth.user.customerCode + '_avatar.png')
              },
              //headers: getHeaders(),
            })
            .then(function(resp) {
              //console.log('Success ' + resp.config.data.file.name + ' uploaded. Response: ' + resp.data);
              $scope.profile.avatar = resp.data;
              updateAll();
            }, function(resp) {
              //console.log('Error status: ' + resp.status);
              $scope.isBusy = false;
              progressLoader.end();
              $scope.profile.avatarChanged = false;
            }, function(evt) {
              var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
              //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            })
        } else {
          updateAll();
        }
      }

      function updateAll() {
        customerService.update($scope.profile)
          .then(function(resp) {})
          .finally(function() {
            $scope.isBusy = false;
            progressLoader.end();
            $scope.profile.avatarChanged = false;
          });
      }

      $scope.changePassword = function() {
        var modalDefaults = {
          templateUrl: '/my/template/views/user/changePassword.html',
          controller: function($scope, $uibModalInstance) {
            $scope.passwordChange = {
              oldPassword: '',
              newPassword: '',
              newPasswordConfirm: '',
              isBusy: false
            };
            $scope.ok = function() {
              $scope.passwordChange.isBusy = true;

              accountService.changePassword($scope.passwordChange)
              .then(function(response) {
                $scope.passwordChange.isBusy = false;
                $uibModalInstance.close();
              })
              .finally(function(err){
                $scope.passwordChange.isBusy = false;
              });
            };
            $scope.cancel = function() {
              $uibModalInstance.dismiss('cancel');
            };
          }
        };
        modalService.showModal(modalDefaults, {})
        .then(function(){});
      };

      $scope.clearAlert = function() {
        $scope.alert = {}
      }
      $scope.clearAlert();  
    }
  ]);
;angular
  .module('freebe.registration_controller', [])
  .controller('RegistrationController', ['$scope', '$timeout', '$theme', '$auth', '$state', '$http',
    function($scope, $timeout, $theme, $auth, $state, $http) {
    'use strict';
    $theme.set('fullscreen', true);

    $scope.$on('$destroy', function() {
      $theme.set('fullscreen', false);
    });

    $scope.form = {};
    $scope.registrationForm = {};
    $scope.passwordPolicy = 'Password should contain at least 6 characters with one uppercase, lowercase, and a number.'

    $scope.register = function(data) {
      $scope.clearAlert();
      $scope.isBusy = true;
      $http.post('/account/sign-up/validate-email', { email: data.Email })
      .then(function(resp) {
        if(!resp.data) {
          throw new Error('Email address already exists')
        }
      })
      .then(function(){
        return $auth.submitRegistration($scope.registrationForm)
      })
      .catch(function(err){
        $scope.alert = {
          type: 'danger',
          msg: err.message
        };
      })
      .finally(function() {
        $scope.isBusy = false;
      });

    }

    $scope.clearAlert = function() {
      $scope.alert = {}
    }

    $scope.$on('auth:registration-email-success', function(ev, message) {
      $state.go("signup-successful");
    });

    $scope.$on('auth:registration-email-error', function(ev, reason) {
      //alert(JSON.stringify(reason));
      //alert("Registration failed: " + reason.errors[0]);
    });

  }]);
;angular
  .module('freebe.signin_controller', [])
  .controller('SignInController', ['$rootScope', '$scope', '$state', '$stateParams', '$auth', '$theme', 'progressLoader',
    function($rootScope, $scope, $state, $stateParams, $auth, $theme, progressLoader) {
      'use strict';
      $theme.set('fullscreen', true);

      $scope.$on('$destroy', function() {
        $theme.set('fullscreen', false);
      });

      $scope.form = {};
      $scope.loginForm = {};
      $scope.forgotPasswordForm = {};

      $scope.login = function(credentials) {
        $scope.clearAlert();
        $scope.isBusy = true;
        progressLoader.start();
        progressLoader.set(50);
        $auth.submitLogin($scope.loginForm)
          .then(function(resp) {
          })
          .finally(function() {
          });
      }

      $scope.resetPassword = function(credentials) {
        $scope.clearAlert();
        $scope.isBusy = true;
        progressLoader.start();
        progressLoader.set(50);
        $auth.submitLogin($scope.loginForm)
          .then(function(resp) {
            $scope.isBusy = false;
          })
          .finally(function() {
            $scope.isBusy = false;
            progressLoader.end();
          });
      }

      $scope.clearAlert = function() {
        $scope.alert = {}
      }
      $scope.clearAlert();

      $scope.$on('auth:login-success', function(ev, token) {
        loginSuccess();
      });

      $scope.$on('auth:login-error', function(ev, reason) {
        $scope.isBusy = false;
        $scope.alert = {
          type: 'danger',
          msg: 'Email or password is not correct'
        };
      });

      $scope.$on('auth:validation-success', function(ev) {
        //alert('auth validation success');
        loginSuccess();
      });

      $scope.$on('auth:validation-error', function(ev, reason) {
        //alert('auth validation failed because', reason.errors[0]);
        $state.go("login");
      });

      function loginSuccess () {
        $state.go($stateParams.returnUrl)
        //$state.go("dashboard");
        //$scope.isBusy = false;
        //progressLoader.end();
        //$rootScope.isLoggedIn = true;
      }
    }
  ]);
;angular
  .module('freebe.subscribe_controller', ['freebe.services'])
  .controller('SubscribeController', ['$state', '$scope', '$auth', 'progressLoader', 'banks', 'subscriptionService',
    'subscriptions', "plans", "cards", "Upload", "modalService",
    function($state, $scope, $auth, progressLoader, banks, subscriptionService, subscriptions, plans, cards, Upload, modalService) {
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
          $scope.state = {};
          $state.reload();
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

      $scope.changePlan = function () {
        var modalDefaults = {
          templateUrl: '/my/template/views/user/changePlan.html',
          controller: function($scope, $uibModalInstance, $auth, plans, currentSubscription) {
            $scope.changePlan = {
              plan: {},
              isBusy: false
            };
            $scope.plans = plans.filter(p => p.id != currentSubscription.plan.id);
            $scope.ok = function() {
              $scope.changePlan.isBusy = true;
              let data = {
                currentSubscriptionCode: currentSubscription.code,
                newPlanId: $scope.changePlan.plan.id,
                customerId: $auth.user.id
              }
              subscriptionService.changePlan(data)
              .then(function(response) {
                $scope.changePlan.isBusy = false;
                $uibModalInstance.close(response);
              })
              .finally(function(err){
                $scope.changePlan.isBusy = false;
              });
            };
            $scope.cancel = function() {
              $uibModalInstance.dismiss('cancel');
            };
          },
          resolve: {
            plans: function(){
              return plans;
            },
            currentSubscription: function () {
              return $scope.subscriptions.filter(s => s.status === 'active')[0];
            }
          }
        };
        modalService.showModal(modalDefaults, {})
        .then(function(response) {
          //console.log(response);
          $state.reload();
        });
      }
  }
])
;angular
  .module('freebe.transaction_details_controller', [])
  .controller('TransactionDetailsController', TransactionDetailsController);

TransactionDetailsController.$inject = ['$scope', 'transaction']
function TransactionDetailsController($scope, transaction){
  'use strict';
  $scope.transaction = transaction;
}
;angular
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
;angular
  .module('freebe.wallet_controller', [
    'ngGrid',
    'freebe.services'
  ])
  .controller('WalletController', ['$scope', '$state', '$filter', 'modalService', 'profile', 'wallet',
    'walletService', 'subaccountService', 'transactionService',
  function($scope, $state, $filter, modalService, profile, wallet, walletService, subaccountService, transactionService) {
    'use strict';
    $scope.wallet = wallet;

    $scope.form = {};
    $scope.walletForm = {};

    $scope.topup = function(size) {
      var modalDefaults = {
        templateUrl: '/my/template/views/wallet/topUp.html',
        controller: function($scope, $uibModalInstance, cards) {
          $scope.cards = cards;
          $scope.topup = {
            amount: '',
            card: null,
            cardPin: '',
            isBusy: false
          };
          $scope.ok = function() {
            $scope.topup.isBusy = true;
            var transferData = {
              SourceAccountId: $scope.topup.card.id,
              SourceAccountPin: $scope.topup.cardPin,
              ToSubaccountId: wallet.id || '',
              DestinationAccount: {
                DestinationAccountId: wallet.id || '',
                Destination: 0, //all subaccount types = 0
                BankCode: null,
                AccountNumber: wallet.accountNumber,
                Type: 'wallet'
              },
              purpose: 'Wallet Topup',
              Remark: 'wallet topup',
              Amount: Number($scope.topup.amount)
            }
            transactionService.transfer(transferData, {
              headerText: `Freebe Wallet Top Up (${$filter('currency')($scope.topup.amount, "NGN ")})`,
              bodyText: `Are you sure you want to transfer ${$filter('currency')($scope.topup.amount, "NGN ")}
                from card ${$scope.topup.card.accountNumber} to your wallet?`
            },
              function(response) {
                $scope.topup.isBusy = false;
                $uibModalInstance.close();
                $state.go('transaction-details', {id: response.TransactionId });
            }, function(err){
              $scope.topup.isBusy = false;
            });
          };
          $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
          };
        },
        //size: size,
        resolve: {
          cards: function(subaccountService) {
            return subaccountService.getAccounts('card', profile.email)
          }
        }
      };
      modalService.showModal(modalDefaults, {})
      .then(function() {
      });
    };

    $scope.withdraw = function(size) {
      var modalDefaults = {
        templateUrl: '/my/template/views/wallet/withdraw.html',
        controller: function($scope, $uibModalInstance, banks, wallet) {
          $scope.banks = banks;
          $scope.wallet = wallet;

          $scope.withdraw = {
            amount: '',
            bank: null,
            walletPin: '',
            isBusy: false
          };
          $scope.ok = function() {
            $scope.withdraw.isBusy = true;
            var transferData = {
              SourceAccountId: wallet.id,
              SourceAccountPin: $scope.withdraw.walletPin,
              ToSubaccountId: $scope.withdraw.bank.id || '',
              DestinationAccount: {
                DestinationAccountId: $scope.withdraw.bank.id || '',
                Destination: 0, //all subaccount types = 0
                BankCode: $scope.withdraw.bank.code,
                AccountNumber: $scope.withdraw.bank.accountNumber,
                Type: $scope.withdraw.bank.type//'bank_account'
              },
              purpose: 'Wallet Withdrawal',
              Remark: 'wallet withdrawal',
              Amount: Number($scope.withdraw.amount)
            }
            transactionService.transfer(transferData, {
              headerText: `Freebe Wallet Withdrawal (${$filter('currency')($scope.withdraw.amount, "NGN ")})`,
              bodyText: `Are you sure you want to transfer ${$filter('currency')($scope.withdraw.amount, "NGN ")}
                from your wallet to bank ${$scope.withdraw.bank.bankName} (${$scope.withdraw.bank.accountNumber})?`
            },
              function(response) {
                $scope.withdraw.isBusy = false;
                $uibModalInstance.close();
                $state.go('transaction-details', {id: response.TransactionId });
            }, function(err){
              $scope.withdraw.isBusy = false;
            });
          };
          $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
          };
        },
        resolve: {
          banks: function(subaccountService) {
            return subaccountService.getAccounts('bank_account', profile.email)
          },
          wallet: function() {
            return $scope.wallet;
          }
        }
      };
      modalService.showModal(modalDefaults, {})
      .then(function() {
      });
    };

    $scope.create = function(wallet) {
      $scope.clearAlert();
      $scope.isBusy = true;
      walletService.create(Object.assign({}, wallet, {
          Type: 'wallet'
        }))
        .then(function(newWallet) {
          $scope.wallet = newWallet;
        })
        .catch(function(err) {
          $scope.alert = {
            type: 'danger',
            msg: err.message
          };
        })
        .finally(function() {
          $scope.isBusy = false;
        });

    }

    $scope.changeStatus = function() {
      $scope.clearAlert();
      modalService.showModal({}, {})
      .then(function(){
        $scope.isBusy = true;
        return subaccountService.changeStatus($scope.wallet.id, !$scope.wallet.active);
      })
      .then(function(wallet) {
        $scope.wallet = wallet;
      })
      .finally(function() {
        $scope.isBusy = false;
      });
    }

    $scope.changePin = function() {
      var modalDefaults = {
        templateUrl: '/my/template/views/wallet/pinChange.html',
        controller: function($scope, $uibModalInstance, wallet) {
          $scope.pinChange = {
            subaccountId: wallet.id,
            oldPin: '',
            newPin: '',
            isBusy: false
          };
          $scope.ok = function() {
            $scope.pinChange.isBusy = true;
            subaccountService.changePin($scope.pinChange,
              function(response) {
                $scope.pinChange.isBusy = false;
                $uibModalInstance.close();
            }, function(err){
              $scope.pinChange.isBusy = false;
            });
          };
          $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
          };
        },
        resolve: {
          wallet: function() {
            return $scope.wallet;
          }
        }
      };
      modalService.showModal(modalDefaults, {})
      .then(function(){});
    };


    $scope.clearAlert = function() {
      $scope.alert = {}
    }
  }]);
;angular.module('freebe.directives', [])
  .directive('tileReport', ["$http", function($http) {
    'use strict';
    var base = '/api/v1.0/paylink/report/';

    return {
      restrict: 'E',
      scope: {
        item: '=data'
      },
      templateUrl: '/my/template/views/templates/tile-report.html',
      replace: true,
      transclude: true,
      link: function(scope) {
        $http.get(`${base}${scope.item.resource}`)
          .then(function(resp) {
            scope.item.value = resp.data;
          })
          .catch(function(err){
            scope.item.value = 0;
          })
      }
    };
  }])
;angular.module('freebe.services', [])
;angular.module('freebe.services')
  .service('accountService', ['$http', '$auth', 'pinesNotifications', function($http, $auth, pinesNotifications) {
    'use strict';
    var url = '/account/';
    var notification = {
      //title: 'Freebe',
      type: 'error',
      delay: 10000
    }

    this.changePassword = function(param){
      return $http.post(url + "change-password", {
        OldPassword: param.oldPassword,
        Password: param.newPassword,
        ConfirmPassword: param.newPasswordConfirm
      })
      .then(function(resp){
        if(resp.data) {
          notification.type = "success";
          notification.text = 'Account password changed successfully.';
          pinesNotifications.notify(notification);
        }
        else {
          throw Error('Old Password is not correct')
        }
      })
      .catch(function(err) {
        notification.type = "error";
        notification.text = `Error changing account password. ${err.message}`;
        pinesNotifications.notify(notification);
        throw err;
      });
    }
  }]);
;angular.module('freebe.services')
.service('beneficiaryService', ['$http', '$auth', 'pinesNotifications', function($http, $auth, pinesNotifications){
  'use strict';
  var url = '/api/v1.0/views/paylink/beneficiaries/';
  var error = {
    //title: 'Freebe',
    type: 'error',
    delay: 10000
  }

  this.getAll = function () {
    return $http.get(url + 'all')
    .then(function(resp) {
      return resp.data.map(
        function(account) {
          return {
            id: account.BeneficiaryId,
            subaccountId: account.BeneficiaryId,
            type: "bank_account",
            accountType: "Bank Account",
            accountName: account.AccountName,
            accountNumber: account.AccountNumber
          }
        });
     })
    .catch(function(err) {
      error.text = 'Error retrieving beneficiaries.';
      pinesNotifications.notify(error);
    });
  }

}]);
;angular.module('freebe.services')
.service('customerService', ['$http', '$auth', 'pinesNotifications', function($http, $auth, pinesNotifications){
  var url = '/api/v1.0/paylink/customers/';

  var notification = {
    //title: 'Freebe',
    type: 'error',
    delay: 10000
  }

  this.update = function(obj){
    return $http.post(url + 'update/' + $auth.user.email, {
      Phone: obj.phone,
      Bvn: obj.bvn,
      FirstName: obj.firstName,
      LastName: obj.lastName,
      Email: obj.email,
      Avatar: obj.avatar || ''
    })
    .then(function(resp){
      var customer = resp.data;
      angular.extend($auth.user,
        {
            customerCode: customer.CustomerCode,
            lastName: customer.LastName,
            firstName: customer.FirstName,
            phone: customer.Phone,
            updatedAt: customer.UpdatedAt,
            bvn: customer.Bvn,
            isValidated: customer.IsVerified,
            avatar: customer.Avatar ? customer.Avatar : url + 'avatar/500/500/avatar.png'
        }
      );
      notification.type = 'success';
      notification.text = 'Account details updated successfully.';
      pinesNotifications.notify(notification);
      return customer;
    })
    .catch(function(err){
      notification.type = 'error';
      notification.text = 'Error updating account details.';
      pinesNotifications.notify(notification);
    });
  }

  this.get = function(param){
    return $http.get(url + "get/" + param)
    .then(function(resp) {
      var temp = resp.data;
      var customer =  {
        id: temp.CustomerId,
        customerCode: temp.CustomerCode,
        phone: temp.Phone,
        email: temp.Email,
        firstName: temp.FirstName,
        lastName: temp.LastName,
        customerCode: temp.CustomerCode,
        createdAt: temp.CreatedAt,
        updatedAt: temp.UpdatedAt,
        bvn: temp.Bvn,
        isValidated: temp.IsValidated,
        avatar: temp.Avatar ? temp.Avatar : url + 'avatar/500/500/avatar.png'
      }
      angular.extend($auth.user, customer);
      return customer;
    });
  }
}]);
;angular.module('freebe.services')
.service('reportService', ['$http', '$auth', 'pinesNotifications', function($http, $auth, pinesNotifications){
  'use strict';
  var url = '/api/v1.0/paylink/report/';
  var error = {
    //title: 'Freebe',
    type: 'error',
    delay: 10000
  }

  this.getTransactionStatistics = function (startDate, endDate) {
    return $http.get(`${url}transaction-statistics/${startDate}/${endDate}`)
    .then(function(resp) {
      return resp.data.map(function(stat){
        return {
          transaction_date: stat.TransactionDate,
          transfers: stat.Transfers,
          received: stat.Received
        }
      });
     })
    .catch(function(err) {
      error.text = 'Error retrieving transaction statistics.';
      pinesNotifications.notify(error);
    });
  }

}]);
;angular.module('freebe.services')
  .service('subaccountService', ['$http', '$auth', 'pinesNotifications', 'modalService',
    function($http, $auth, pinesNotifications, modalService) {
    'use strict';
    var url = '/api/v1.0/paylink/subaccounts/';
    var error = {
      //title: 'Freebe',
      type: 'error',
      delay: 10000
    }

    this.getAccounts = function(type, param) {
      return $http.get(url + type + "/getall/" + param)
        .then(function(resp) {
          return resp.data.map(
            function(account) {
              return {
                id: account.SubaccountId,
                subaccountId: account.SubaccountId,
                type: account.Type,
                accountType: account.Type,                
                bankName: account.BankName,
                bankCode: account.BankCode,
                accountName: account.AccountName,
                accountNumber: account.AccountNumber
              }
            });
        })
        .catch(function(err) {
          //error.text = 'Error retrieving accounts.';
          //pinesNotifications.notify(error);
        });
    }

    this.getBanks = function() {
      return $http.get(url + "get-banks")
        .then(function(resp) {
          return resp.data.sort(function(a, b) {
            return a.name > b.name;
          });
        })
        .catch(function(err) {
          error.text = 'Error retrieving banks.';
          pinesNotifications.notify(error);
        });
    }

    this.validateAccountNumber = function(bankCode, accountNumber) {
      return $http.post(url + "validateAccountNumber", { bankCode: bankCode, accountNumber: accountNumber })
        .then(function(resp) {
          return resp.data
        })
        .catch(function(err) {
          error.title = 'Error validating account number';
          error.text = err.data.ExceptionMessage;
          pinesNotifications.notify(error);
        });
    }

    this.changeStatus = function(subaccountId, status) {
      return $http.get(`${url}${subaccountId}/${status}`)
        .then(function(resp) {
          var state = !status ? 'deactivated' : 'activated'

          var notification = {
            text: `Account ${state} successfully`,
            type: 'success',
            delay: 10000
          }
          pinesNotifications.notify(notification);
          var account = resp.data;
          return {
            id: account.SubaccountId,
            subaccountId: account.SubaccountId,
            type: account.Type,
            bankName: account.BankName,
            bankCode: account.BankCode,
            accountType: account.Type,
            accountName: account.AccountName,
            accountNumber: account.AccountNumber,
            balance: account.Balance,
            dailyMaxDeposit: account.DailyMaxDeposit,
            dailyMaxWithdrawal: account.DailyMaxWithdrawal,
            active: account.Active
          };
        })
        .catch(function(err) {
          var state = !status ? 'deactivating' : 'activating'
          error.title = `Error ${state} account`;
          error.text = err.data.ExceptionMessage;
          pinesNotifications.notify(error);
        });
    }

    this.changePin = function(data, successCallBack, errorCallback) {
      var modalOptions = {
        actionButtonText: 'Proceed',
        closeButtonText: 'Cancel',
        headerText: 'Freebe PIN change request',
        bodyText: 'Are you sure you want to change the PIN for this account?'
      };

      modalService.showModal({}, modalOptions)
        .then(function() {
          return $http.post(`${url}updatePin`, data);
        })
        .then(function(resp) {
          var notification = {
            text: `Account PIN changed successfully`,
            type: 'success',
            delay: 10000
          }
          pinesNotifications.notify(notification);
          if (typeof successCallBack === 'function') {
            successCallBack(resp);
          }
        })
        .catch(function(err) {
          error.title = err.ExceptionMessage;
          error.text = err.data.ExceptionMessage;
          pinesNotifications.notify(error);
          if (typeof errorCallback === 'function') {
            errorCallback(err);
          }
        });
    }
  }]);
;angular.module('freebe.services')
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
          //console.log(resp);
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
            //console.log(subscriptions);
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

    this.changePlan = function(data) {
      return $http.post(`/api/v1.0/paylink/subscriptions/changePlan`, data)
        .then(function(resp) {
          return resp.data;
        })
        .catch(function(err) {
          error.text = 'Error changing subscription plan.';
          pinesNotifications.notify(error);
          throw err;
        });
    }
  }]);
;angular.module('freebe.services')
  .factory('transactionService', ['$http', '$location', '$auth', 'modalService', 'pinesNotifications', 'progressLoader',
    function($http, $location, $auth, modalService, pinesNotifications, progressLoader) {
      'use strict';
      var url = '/api/v1.0/paylink/transactions/';
      var notification = {
        //title: 'Freebe',
        type: 'error',
        delay: 10000
      }

      var get = function(id) {
        return $http.get('/api/v1.0/forms/paylink/transactions/' + id)
          .then(function(resp) {
            var transaction = resp.data;
            return {
              id: transaction.TransactionId,
              transactionId: transaction.TransactionId,
              amount: transaction.Amount,
              fees: transaction.Fees,
              currency: transaction.Currency,
              transactionDate: transaction.TransactionDate,
              fromAccount: {
                id: transaction.FromSubaccountId,
                accountName: transaction.FromSubaccountName,
                accountNumber: transaction.FromSubaccountNumber,
                type: transaction.FromSubaccountType
              },
              toAccount: {
                id: transaction.ToSubaccountId,
                accountName: transaction.ToSubaccountName,
                accountNumber: transaction.ToSubaccountNumber,
                type: transaction.ToSubaccountType
              },
              reference: transaction.Reference,
              remark: transaction.Remark,
              purpose: transaction.Purpose,
              completed: transaction.Completed,
              message: transaction.Message,
              type: transaction.Type,
            }
          })
          .catch(function(err) {
            notification.type = 'error';
            notification.text = 'Error retrieving transaction details.';
            pinesNotifications.notify(notification);
          });
      }

      var getRecent = function() {
        return $http.get('/api/v1.0/views/paylink/transaction_view')
          .then(function(resp) {
            var recentTrx = resp.data.map(function(transaction) {
              return {
                id: transaction.TransactionId,
                transactionId: transaction.TransactionId,
                amount: transaction.Amount,
                fees: transaction.Fees,
                currency: transaction.Currency,
                transactionDate: transaction.TransactionDate,
                fromAccount: {
                  id: transaction.FromSubaccountId,
                  accountName: transaction.FromSubaccountName,
                  accountNumber: transaction.FromSubaccountNumber,
                  type: transaction.FromSubaccountType
                },
                toAccount: {
                  id: transaction.ToSubaccountId,
                  accountName: transaction.ToSubaccountName,
                  accountNumber: transaction.ToSubaccountNumber,
                  type: transaction.ToSubaccountType
                },
                reference: transaction.Reference,
                purpose: transaction.Purpose,
                remark: transaction.Remark,
                completed: transaction.Completed,
                message: transaction.Message,
                type: transaction.Type,
              }
            });
            return recentTrx;
          })
          .catch(function(err) {
            notification.type = 'error';
            notification.text = 'Error retrieving recent transactions.';
            pinesNotifications.notify(notification);
          });
      }

      var getMerchants = function() {
        return $http.get(url + 'get-merchants')
          .then(function(resp) {
            return resp.data;
          })
          .catch(function(err) {
            notification.type = 'error';
            notification.text = 'Error retrieving mobile top up merchants.';
            pinesNotifications.notify(notification);
          });
      }

      var getProducts = function(merchantId) {
        return $http.get(`${url}merchant/${merchantId}/products`)
          .then(function(resp) {
            return resp.data;
          })
          .catch(function(err) {
            notification.type = 'error';
            notification.text = 'Error retrieving mobile top up merchant products.';
            pinesNotifications.notify(notification);
          });
      }

      var processTransaction = function(resource, obj, successCallBack, errorCallback) {
        progressLoader.start();
        progressLoader.set(50);
        //resource = resource || "transfer";
        return $http.post(url + resource, obj)
          .then(function(resp) {
            var response = resp.data;
            if(!response.TransactionId) { throw Error("Unknow error encountered" );}
            return response;
          })
          .then(function(response){
            //console.log(response);
            if (response.RequireValidation) {
              var modalOptions = {
                actionButtonText: 'Proceed',
                closeButtonText: 'Cancel',
                headerText: 'Authorization Required',
                bodyText: response.Message,
                amount: response.Amount,
                fees: response.Fees
              };

              var modalDefaults = {
                controller: function($scope, $uibModalInstance) {
                  $scope.otp = '';
                  $scope.modalOptions = modalOptions;
                  $scope.modalOptions.ok = function(otp) {
                    $uibModalInstance.close(otp);
                  };
                  $scope.modalOptions.close = function() {
                    $uibModalInstance.dismiss('cancel');
                  };
                },
                templateUrl: '/my/template/views/templates/otp-modal.html'
              };

              modalService.showModal(modalDefaults, modalOptions)
              .then(function(otp) {
                //console.log(otp);
                processTransaction(resource, { Reference: response.Reference, Code: otp }, successCallBack, errorCallback);
              })
              .catch(function(err){
                if(typeof errorCallback === 'function') {
                  errorCallback(err);
                }
              });
            } else {
              progressLoader.end();
              notification.type = 'success';
              notification.text = 'Transaction processed successfully!'
              pinesNotifications.notify(notification);

              if(typeof successCallBack === 'function') {
                successCallBack(response);
              }
            }
          })
          .catch(function(err) {
            progressLoader.end();
            notification.type = 'error';
            notification.text = err.data.ExceptionMessage;
            pinesNotifications.notify(notification);
            if(typeof errorCallback === 'function') {
              errorCallback(err);
            }
          });
      }

      var transfer = function(transferObject, transferOptions, successCallBack, errorCallback) {
        var modalOptions = {
          actionButtonText: 'Proceed',
          closeButtonText: 'Cancel',
          headerText: 'Freebe Transfer (NGN ' + transferObject.Amount + ')',
          bodyText: 'Are you sure you want to transfer ' + transferObject.Amount + '?'
        };

        angular.extend(modalOptions, transferOptions);

        modalService.showModal({}, modalOptions)
        .then(function() {
          processTransaction("transfer", transferObject, successCallBack, errorCallback);
        })
        .catch(function(err){
          if(typeof errorCallback === 'function') {
            errorCallback(err);
          }
        });
      }

      var pay = function(billObject, transferOptions, successCallBack, errorCallback) {
        var modalOptions = {
          actionButtonText: 'Proceed',
          closeButtonText: 'Cancel',
          headerText: 'Freebe Bill Payment (NGN ' + billObject.Amount + ')',
          bodyText: 'Are you sure you want to pay ' + billObject.Amount + '?'
        };

        angular.extend(modalOptions, transferOptions);

        modalService.showModal({}, modalOptions)
        .then(function() {
          processTransaction("bill", billObject, successCallBack, errorCallback);
        })
        .catch(function(err){
          if(typeof errorCallback === 'function') {
            errorCallback(err);
          }
        });
      }


      return {
        get: get,
        getRecent: getRecent,
        transfer: transfer,
        pay: pay,
        getMerchants: getMerchants,
        getProducts: getProducts
      }
    }
  ]);
;angular.module('freebe.services')
  .service('walletService', ['$http', '$auth', 'pinesNotifications', function($http, $auth, pinesNotifications) {
    'use strict';
    var url = '/api/v1.0/paylink/subaccounts/';
    var error = {
      //title: 'Freebe',
      type: 'error',
      delay: 10000
    }

    this.create = function(wallet) {
      return $http.post(url + "add", wallet)
        .then(function(resp) {
          wallet = resp.data;
          return {
            id: wallet.SubaccountId,
            subaccountId: wallet.SubaccountId,
            type: wallet.Type,
            accountType: wallet.Type,
            accountName: wallet.AccountName,
            accountNumber: wallet.AccountNumber,
            balance: wallet.Balance,
            dailyMaxDeposit: wallet.DailyMaxDeposit,
            dailyMaxWithdrawal: wallet.DailyMaxWithdrawal,
            active: wallet.Active
          }
        })
        .catch(function(err) {
          error.text = 'Error retrieving your wallet details.';
          pinesNotifications.notify(error);
        });
    }

    this.get = function(){
      return $http.get(url + "wallet/getall/" + $auth.user.email)
      .then(function(resp) {
        if(resp.data.length > 0){
          var wallet = resp.data[0];
          return {
            id: wallet.SubaccountId,
            subaccountId: wallet.SubaccountId,
            type: wallet.Type,
            accountType: wallet.Type,
            accountName: wallet.AccountName,
            accountNumber: wallet.AccountNumber,
            balance: wallet.Balance,
            dailyMaxDeposit: wallet.DailyMaxDeposit,
            dailyMaxWithdrawal: wallet.DailyMaxWithdrawal,
            active: wallet.Active
          }
        } else {
          return null;
        }
       })
      .catch(function(err) {
        error.text = 'Error retrieving your wallet details.';
        pinesNotifications.notify(error);
      });
    }
  }]);
;angular
  .module('theme.chart.canvas', [])
  .directive('canvasChart', ['$window', function($window) {
    'use strict';
    return {
      restrict: 'EA',
      scope: {
        data: '=canvasChart',
        options: '=options',
        type: '=',
      },
      link: function(scope, element) {
        scope.$watch('data', function(newData, oldData) {
          if ($window.Chart) {
            var cchart = (new $window.Chart(angular.element(element)[0].getContext('2d')))[scope.type](scope.data, scope.options);
            var legend = cchart.generateLegend();
            //$('.js-legend').html('');
            $('.js-legend').append(legend);
          }
        }, true);
      }
    };
  }]);
;angular
  .module('theme.chart.flot', [])
  .directive('flotChart', function() {
    'use strict';
    return {
      restrict: 'AE',
      scope: {
        data: '=flotData',
        options: '=flotOptions',
        plothover: '&plotHover',
        plotclick: '&plotClick'
      },
      link: function(scope, element) {
        var plot = angular.element.plot(angular.element(element), scope.data, scope.options);

        angular.element(element).bind('plothover', function(event, position, item) {
          scope.plothover({
            event: event,
            position: position,
            item: item
          });
        });

        angular.element(element).bind('plotclick', function(event, position, item) {
          scope.plotclick({
            event: event,
            position: position,
            item: item
          });
        });

        scope.$watch('data', function(newVal) {
          plot.setData(newVal);
          plot.setupGrid();
          plot.draw();
        });

        scope.$watch('options', function(newVal) {
          plot = angular.element.plot(angular.element(element), scope.data, newVal);
        }, true);
      }
    };
  });;angular
  .module('theme.chart.morris', [])
  .directive('svgChart', ['$window', function($window) {
    'use strict';
    return {
      restrict: 'EA',
      scope: {
        options: '=svgChart',
        type: '=',
      },
      link: function(scope, element, attr) {
        if ($window.Morris) {
          var elementId;
          if (!angular.element(element).attr('id')) {
            elementId = angular.element(element).attr('id', scope.type + attr.svgChart);
          } else {
            elementId = angular.element(element).attr('id');
          }
          $window.Morris[scope.type](angular.extend(scope.options, {
            element: elementId
          }));
        }
      }
    };
  }]);;angular
  .module('theme.chart.sparklines', [])
  .directive('sparklines', function() {
    'use strict';
    return {
      restrict: 'A',
      scope: {
        options: '=sparklines',
        values: '=data'
      },
      link: function(scope, element, attr) {
        var options = {};
        if (scope.options) {
          options = angular.copy(scope.options);
        }
        var container = angular.element(element).closest('sparklines-composite');
        var target = element;
        if (container.length) {
          if (container.find('span.sparklines-container').length < 1) {
            container.append('<span class="sparklines-container"></span>');
          }
          target = container.find('span.sparklines-container');
          if (target.find('canvas').length) {
            options.composite = true;
            options.enableTagOptions = true;
          }
          if (attr.values) {
            target.attr('values', attr.values);
          } else {
            target.removeAttr('values');
          }
        }

        function sparklineIt() {
          if (scope.values) {
            angular.element(target).sparkline(scope.values, options);
          } else {
            angular.element(target).sparkline('html', options);
          }
        }

        // since the canvas will be invisible if the parent element is :\
        scope.$watch(function() {
          return element.is(':visible');
        }, function() {
          sparklineIt();
        });

        sparklineIt();
      }
    };
  });;var paylinkApp = angular
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
          token: ["$http", function($http) {
            return $http.get('/account/reset/get-token').then(function(reset) { return reset.data.Token; })
          }]
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
          banks: ["subaccountService", function(subaccountService) {
            return subaccountService.getBanks();
          }],
          subscriptions: ["profile", "subscriptionService", function(profile, subscriptionService) {
            return subscriptionService.getAll(profile.email)
          }],
          plans: ["profile", "subscriptionService", function(profile, subscriptionService) {
            return subscriptionService.getPlans()
          }],
          cards: ["profile", "subaccountService", function(profile, subaccountService) {
            return subaccountService.getAccounts('card', profile.email)
          }]
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
          fromAccounts: ["profile", "subaccountService", function(profile, subaccountService) {
            return subaccountService.getAccounts('withdrawal', profile.email);;
          }],
          banks: ["subaccountService", function(subaccountService) {
            return subaccountService.getBanks();
          }],
          beneficiaries: ["beneficiaryService", function(beneficiaryService) {
            return beneficiaryService.getAll();
          }]
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
          fromAccounts: ["profile", "subaccountService", function(profile, subaccountService) {
            return subaccountService.getAccounts('withdrawal', profile.email);;
          }],
          merchants: ["transactionService", function(transactionService) {
            return transactionService.getMerchants();
          }]
        }
      })
      .state('bill-payment', {
        parent: 'paylink',
        url: '^/paylink/bill-payment',
        templateUrl: '/my/template/views/bill-payment/index.html',
        controller: 'BillPaymentController',
        resolve: {
          fromAccounts: ["profile", "subaccountService", function(profile, subaccountService) {
            return subaccountService.getAccounts('withdrawal', profile.email);;
          }],
          merchants: ["transactionService", function(transactionService) {
            return transactionService.getMerchants();
          }]
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
