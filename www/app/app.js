// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('domTask', [
        'ionic', 
        'ui.router', 
        'ionic-toast',
        'ngCordova'
])

.run(function($ionicPlatform, $rootScope, $ionicLoading) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    
    if(window.Connection){
        if(navigator.connection.type == Connection.NONE){
            $ionicPopup.confirm({
                title:'Network Problem',
                content:'Sorry, Please Check Your Network Connection.'
            }).then(function(result) {
                if(!result){
                    navigator.app.exitApp();
                }
            });
        }
    }
  });

  $rootScope.$on('loading:show', function() {
      $ionicLoading.show({
          template: '<p class="item-icon-left">Carregando...<ion-spinner icon="lines"/></p>'
      });
  });

  $rootScope.$on('loading:hide', function() {
      $ionicLoading.hide(); 
  });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider
        .state('task',{
            url: '/',
            templateUrl:'app/task/tasks.html',
            controller: 'tasksController as vm',
        })
        .state('task-save', {
            url: '/task-save',
            templateUrl: 'app/task/task-save.html',
            controller: 'taskSaveController as vm',
        })
        .state('list', {
            url: '/list',
            templateUrl: 'app/home/list.html',
            controller: 'ListCtrl'
        })
        .state('view', {
            url: '/movie/:movieid',
            templateUrl: 'app/home/view.html',
            controller: 'ViewCtrl'
        })
        .state('task-edit', {
            url: '/task-edit/:_id',
            templateUrl: 'app/task/task-save.html',
            controller: 'taskSaveController as vm'
        });

    $urlRouterProvider.otherwise('/');

    $httpProvider.interceptors.push(function($rootScope) {
        return {
            request: function(config) {
                $rootScope.$broadcast('loading:show');
                return config;
            },
            response: function(response) {
                $rootScope.$broadcast('loading:hide');
                return response;
            },
            requestError: function(rejection) {
                console.log("Request Error: " + rejection);
            },
            responseError: function(rejection) {
                console.log("Response Error: " + rejection);
            }
        }; 
    });
})

.constant('URL', 'https://blooming-dusk-6612.herokuapp.com/');

