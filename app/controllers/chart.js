'use strict';

var chart = angular.module('djoroDashboard.chart', ['ngRoute', 'djoroDashboard.history']);

chart.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/chart', {
    templateUrl: 'pages/chart.html',
    controller: 'ChartCtrl'
  });
}]);

chart.controller('ChartCtrl', function($scope, HistoryService) {
    $scope.version=5;
    $scope.siteHistory = [];

    $scope.change = function() {
        HistoryService.refreshHistory('0');
        $scope.siteHistory = HistoryService.getHistory('0');
    }
});

chart.directive('chart', function(){
    return{
        restrict: 'E',
        link: function(scope, elem, attrs){
            var chart = null;
            var today = new Date();
            var yesterday = new Date();
            yesterday.setDate(today.getDate() - 1);
            var options = {
                series: {
                    lines: { show: true,
                             lineWidth: 2
                          },
                    points: { show: false,
                              lineWidth: 1
                          },
                    shadowSize: 0
                },
                grid: {
                    hoverable: true,
                    clickable: true,
                    tickColor: "#f9f9f9",
                    borderWidth: 0
                },
                legend: {
                    show: true
                },
                colors: ["#bdea74", "#eae874", "#2FABE9", "#FA5833"],
                xaxis: {mode: "time", min: yesterday, ticks:10, tickDecimals: 0},
                yaxes: [
                    {ticks:20, tickDecimals: 0, axisLabel: "Temperature (°C)", min: 0},
                    {position: "right", ticks:2, tickDecimals: 0, axisLabel: "Boiler (ON/OFF)"}]
            };


            scope.$watch(attrs.ngModel, function(v){
                if(!chart){
                   chart = $.plot(elem, v , options);
                   elem.show();
                }else{
                    chart.setData(v);
                    chart.setupGrid();
                    chart.draw();
                }
            });


        }
    };
})
