'use strict';

// Declare app level module which depends on views, and components
angular.module('ProjectZ', [
  'ngRoute',
  'ngAnimate',
  'ngTouch',
  'ui.bootstrap',
  'projectzServices'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({
    redirectTo: '/'
  });
}])

.controller('mainCtrl', function ($scope, $uibModal, $log, QuestionsBase) {

  $scope.questions = QuestionsBase.query();
  $scope.open = function (size) {
  
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'templates/questionary_form.html',
      controller: 'modalFormCtrl',
      size: size,
      scope: $scope
    });
    
    modalInstance.close = function () {
      $log.info('Modal closed with ' + $scope.questions[0].answer);
    };
  };
})

.controller('modalFormCtrl', function ($scope, $log, $uibModalInstance) {

    $scope.submitQuestionary = function () {
      // Pass params in close
      $uibModalInstance.close();
      $uibModalInstance.dismiss('cancel');
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });