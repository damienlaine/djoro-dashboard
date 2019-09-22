'use strict';

var module = angular.module('djoroDashboard.historyMock', []);

module.service('HistoryService', function() {

    var currentHistory = [];

    function randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    function randNum(){
        return ((Math.floor( Math.random()* (1+40-20) ) ) + 20);
    }

    this.getHistory = function(deviceNumber) {
        return currentHistory;
    }

    this.refreshHistory = function (siteNumber) {
        var measuredTempHistory = [];
        var controlTempHistory = [];
        var boilerOnHistory = [];

        for (var i=1; i < 31; i++ ){
            measuredTempHistory.push([new Date(2014, 11, i), randNum()]);
            controlTempHistory.push([new Date(2014, 11, i), randNum()]);
            boilerOnHistory.push([new Date(2014, 11, i), Math.round(Math.random())]);
        }

        currentHistory = [
            { data: measuredTempHistory, label: "Measured Temp °C", yaxis: 1},
            { data: controlTempHistory, label: "Control Temp °C", yaxis: 1},
            { data: boilerOnHistory, label: "Boiler On History", yaxis: 2}];
    };


});
