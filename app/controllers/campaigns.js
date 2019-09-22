'use strict';

var home = angular.module('djoroDashboard.campaigns', ['ngRoute', 'djoroDashboard.saving']);

home.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/campaigns', {
    templateUrl: 'pages/campaigns.html',
    controller: 'CampaignsCtrl'
}).when('/campaigns-new', {
    templateUrl: 'pages/campaigns-new.html',
    controller: 'CampaignsCtrl'
}).when('/campaigns-inprogress', {
      templateUrl: 'pages/campaigns-inprogress.html',
      controller: 'CampaignsCtrl'
  }).when('/campaigns-done', {
        templateUrl: 'pages/campaigns-done.html',
        controller: 'CampaignsCtrl'
      });
}]);

home.controller('CampaignsCtrl', function($scope, SavingService) {
    $scope.welcomeMessage = "Welcome"
    $scope.showNewPromoForm = false;
    $scope.savings = [];

    $scope.showNewPromo = function(){
        $scope.showNewPromoForm = true;
    }
    $scope.cancelNewPromo = function(){
        $scope.showNewPromoForm = false;
    }
    $scope.validateNewPromo = function(promo){
        $scope.showNewPromoForm = false;
        SavingService.newCampaign('0', promo,
            function(response){
                console.log("newPromo success" + response);
            }, function(response){
                console.log("newPromo error" + response);
            });
    }

    $scope.refreshSavings = function() {
        SavingService.refreshSavings('0', function(data) {
            $scope.savings = angular.fromJson(data.payload);
            console.log('length: ' + $scope.savings.length);
            console.log(JSON.stringify($scope.savings));
        }, function(data){
            console.log('error refreshing savings');
        });
    }

    var init = function() {
        $scope.refreshSavings();
    }

    init();

});
