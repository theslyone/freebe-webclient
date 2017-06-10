angular
  .module('theme.demos.ui_components')
  .controller('ModalsDemoController', ['$scope', '$uibModal', '$bootbox', '$log', '$window', function($scope, $uibModal, $bootbox, $log, $window) {
    'use strict';
    var alert = $window.alert;
    $scope.items = ['item1', 'item2', 'item3'];

    $scope.open = function(size) {
      var modalInstance = $uibModal.open({
        templateUrl: 'myModalContent.html',
        controller: function($scope, $uibModalInstance, items) {
          $scope.items = items;
          $scope.selected = {
            item: $scope.items[0]
          };

          $scope.ok = function() {
            $uibModalInstance.close($scope.selected.item);
          };

          $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
          };
        },
        size: size,
        resolve: {
          items: function() {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function(selectedItem) {
        $scope.selected = selectedItem;
      }, function() {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    $scope.openDemoModal = function(size) {
      $uibModal.open({
        templateUrl: 'demoModalContent.html',
        controller: function($scope, $uibModalInstance) {
          $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
          };
        },
        size: size,
      });
    };

    $scope.openAlert = function() {
      $bootbox.alert('Hello world!');
    };
    $scope.openAlertWithCallback = function() {
      $bootbox.alert('Hello world!', function() {
        alert('You clicked OK!');
      });
    };
    $scope.openConfirm = function() {
      $bootbox.confirm('Are you sure?', function(result) {
        alert('Confirm result: ' + result);
      });
    };
    $scope.openPrompt = function() {
      $bootbox.prompt('What is your name?', function(result) {
        if (result === null) {
          alert('Prompt dismissed');
        } else {
          alert('Hi ' + result + '!');
        }
      });
    };
    $scope.openDialog = function() {
      $bootbox.dialog({
        message: 'I am a custom dialog',
        title: 'Custom title',
        buttons: {
          success: {
            label: 'Success!',
            className: 'btn-success',
            callback: function() {
              alert('great success');
            }
          },
          danger: {
            label: 'Danger!',
            className: 'btn-danger',
            callback: function() {
              alert('uh oh, look out!');
            }
          },
          main: {
            label: 'Click ME!',
            className: 'btn-primary',
            callback: function() {
              alert('Primary button');
            }
          }
        }
      });
    };
  }]);