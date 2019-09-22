'use strict';

var home = angular.module('djoroDashboard.users', ['ngRoute']);

home.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/users', {
    templateUrl: 'pages/users.html',
    controller: 'UsersCtrl'
  });
}]);

home.controller('UsersCtrl', function($scope) {
    $scope.welcomeMessage = "Welcome"
});
