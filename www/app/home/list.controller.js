(function() {
  'use strict';

  angular.module('domTask')
      .controller('ListCtrl', ListCtrl);
    
  ListCtrl.$inject = ['$scope', '$state'];

  function ListCtrl($scope, $state) {
      $scope.changePage = function() {
          $state.go('view', {movieid: 1});
      }
  };

})()
