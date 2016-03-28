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
    redirectTo: '/',
    templateUrl: 'templates/questionaries_list.html',
    controller: 'mainCtrl'
  });
}])

.controller('mainCtrl', function ($scope, $uibModal, $log, Questionary) {
  
  $scope.questionariesList  = Questionary.getSubmitted();
  $scope.questionary        = Questionary.query();

  $scope.open = function (size) {

    $scope.questionary = Questionary.query();

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

      $scope.questionariesList = Questionary.save(postPayload);
      $scope.questionary = {};
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