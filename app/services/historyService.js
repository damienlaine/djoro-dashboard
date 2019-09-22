'use strict';

var module = angular.module('djoroDashboard.history', ['restangular']);

module.service('HistoryService', function(Restangular) {
    var url = 'https://api.djoro.com';
    var localUrl = 'http://localhost:3000';
    Restangular.setBaseUrl(url);
    var restService = Restangular.all('site/1/device');

    var currentHistory = [];

    this.getHistory = function(deviceNumber) {
        return currentHistory;
    }

    this.refreshHistory = function(deviceNumber) {
      restService.one(deviceNumber + '/history').get().then(
        function(data) {
            var history = data.payload;
            console.log('length: ' + history.length);
            console.log(JSON.stringify(history));

            var measuredTempHistory = [];
            var controlTempHistory = [];
            var boilerOnHistory = [];
            for (var elem in history) {
                console.log('elem: ' + history[elem]);
                var h = history[elem];
                measuredTempHistory.push([new Date(h.measuredOn), h.measuredTemp]);
                controlTempHistory.push([new Date(h.measuredOn), h.setPoint]);
                if (h.boilerOn != 0)
                    boilerOnHistory.push([new Date(h.measuredOn), 1]);
                else
                    boilerOnHistory.push([new Date(h.measuredOn), 0]);
            }

            console.log(measuredTempHistory);

            currentHistory = [
                      { data: measuredTempHistory, label: "Measured Temp °C", yaxis: 1},
                      { data: controlTempHistory, label: "Control Temp °C", yaxis: 1},
                      { data: boilerOnHistory, label: "Boiler On History", yaxis: 2}];

        },
        function(data) {
          console.log("Failed to get history for device " + deviceNumber + " : " + data);
      });
    }

    this.refreshHistory('0');

  });
