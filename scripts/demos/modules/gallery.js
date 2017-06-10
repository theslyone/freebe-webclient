angular
  .module('theme.demos.gallery', [
    'ui.bootstrap',
    'theme.gallery',
  ])
  .controller('GalleryController', ['$scope', '$uibModal', '$timeout', function($scope, $uibModal) {
    'use strict';
    $scope.galleryFilter = 'all';

    $scope.openImageModal = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $uibModal.open({
        templateUrl: 'imageModalContent.html',
        controller: ['$scope', '$uibModalInstance', 'src', function($scope, $uibModalInstance, src) {
          $scope.src = src;
          $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
          };
        }],
        size: 'lg',
        resolve: {
          src: function() {
            console.log($event.target.src.replace('thumb_', ''));
            return $event.target.src.replace('thmb_', '');
          }
        }
      });
    };
  }]);