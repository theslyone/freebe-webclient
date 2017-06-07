angular
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
            scope.start = start.format('MMMM D, YYYY');
          }
          if (scope.end) {
            scope.end = end.format('MMMM D, YYYY');
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
            alert('reseting')
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
