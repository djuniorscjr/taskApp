( function() {
    'use strict';

    angular
        .module('domTask')
        .controller('ViewCtrl', ViewCtrl);

    ViewCtrl.$inject = ['$scope', '$stateParams', '$ionicHistory'];

    function ViewCtrl($scope, $stateParams, $ionicHistory) {
        console.log($stateParams.movieid);
        $scope.goBack = function() {
            $ionicHistory.goBack();
        }
    }
})();
