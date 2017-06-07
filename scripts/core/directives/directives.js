angular
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
