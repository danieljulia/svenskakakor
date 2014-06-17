


var app=angular.module('app', [
  'ngRoute',
  'svenskaControllers',
  'ui.bootstrap'
]);


app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
     when('/menu', {
        templateUrl: 'partials/menu.html',
        controller: 'MenuController'
      }).
     when('/level_finished', {
        templateUrl: 'partials/level_finished.html',
     
      }).
      when('/level0', {
        templateUrl: 'partials/level0.html',
        controller: 'Level0Controller'
      }).
     when('/level1', {
        templateUrl: 'partials/level1.html',
        controller: 'Level1Controller'
      }).
     when('/level2', {
        templateUrl: 'partials/verbs.html',
        controller: 'VerbsController'
      }).
      otherwise({
        redirectTo: '/menu'
      });
  }]);