'use strict';

// Declare app level module which depends on views, and components
angular.module('ProjectZ', [
  'ngRoute',
  'ngAnimate',
  'ngTouch',
  'ui.bootstrap',
  'projectZServices'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({
    redirectTo: '/'
  });
}])

.controller('mainCtrl', function ($scope, $uibModal, $log, Questionary) {

  $scope.questionary = Questionary.query();
  $scope.open = function (size) {

    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'templates/questionary_form.html',
      controller: 'modalFormCtrl',
      size: size,
      scope: $scope
    });

    modalInstance.saveData = function () {
    
      var postPayload = $scope.questionary;
      postPayload.fillDate = new Date();
      Questionary.save(postPayload);
    };
  };
})

.controller('modalFormCtrl', function ($scope, $log, $uibModalInstance) {

    $scope.submitQuestionary = function () {
      // Pass params in close
      $uibModalInstance.saveData();
      $uibModalInstance.dismiss('cancel');
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });