'use strict';

var home = angular.module('djoroDashboard.dashboard', ['ngRoute']);

home.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'pages/dashboard.html',
    controller: 'DashboardCtrl'
  });
}]);

home.controller('DashboardCtrl', function($scope) {
    $scope.welcomeMessage = "Welcome"
});
