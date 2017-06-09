angular
  .module('freebe.profile_controller', ['freebe.services'])
  .controller('ProfileController', ['$scope', '$auth', 'progressLoader', '$modal', "profile",
    "customerService", "transactionService", "Upload",
    function($scope, $auth, progressLoader, $modal, profile, customerService, transactionService, Upload) {
      'use strict';

      $scope.profile = profile;

      $scope.changeAvatar = function(size) {
        var modalInstance = $modal.open({
          templateUrl: 'profileAvatar.html',
          controller: function($scope, $modalInstance) {
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
              $modalInstance.close($scope.avatar.New);
            };

            $scope.cancel = function() {
              $modalInstance.dismiss('cancel');
            };
          },
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

      $scope.clearAlert = function() {
        $scope.alert = {}
      }
      $scope.clearAlert();
    }
  ]);
