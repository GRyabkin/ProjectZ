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

  $scope.isEditing = false;

  // Start fill new questionary
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

  // Editing questionary list item
  $scope.editItem = function (started, item, questionary) {
      item.isEditing = started;
      if (item.isEditing) {
          item.beforeEdit = item.answer;
      } else {
          if (item.beforeEdit.localeCompare(item.answer) != 0)
          {
              Questionary.update(questionary);
          }
      }
  };
})
    // Focus answer input
.directive('focusOnShow', function($timeout) {
    return {
        restrict: 'A',
        link: function($scope, $element, $attr) {
            if ($attr.ngShow){
                $scope.$watch($attr.ngShow, function(newValue){
                    if(newValue){
                        $timeout(function(){
                            $element[0].focus();
                        }, 0);
                    }
                })
            }
            if ($attr.ngHide){
                $scope.$watch($attr.ngHide, function(newValue){
                    if(!newValue){
                        $timeout(function(){
                            $element[0].focus();
                        }, 0);
                    }
                })
            }

        }
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