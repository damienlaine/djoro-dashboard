'use strict';

var module = angular.module('djoroDashboard.saving', ['restangular']);

module.service('SavingService', function(Restangular) {
    var url = 'https://api.djoro.com';
    var localUrl = 'http://localhost:3000';
    Restangular.setBaseUrl(url);
    var restService = Restangular.one('site', 1);

    this.refreshSavings = function(deviceNumber, successCallback, errorCallback ) {

      restService.one('device', deviceNumber).one('saving').get().then(
          successCallback, errorCallback);
    }

    this.newCampaign = function(deviceNumber, campaign, successCallback, errorCallback) {

        var data = {
            program : {
                startDate: "2015-04-23T18:25:43.511+0200",
                endDate: "2015-04-23T20:25:43.511+0200",
                type: "PERMANENT",
                temperature: "tempAway"
            },
            type: "CAMPAIGN",
            title: campaign.title,
            content: campaign.content,
            amount: campaign.amount
        };

        restService
            .one('device', deviceNumber)
            .all('saving')
            .post(JSON.stringify(data))
            .then(successCallback, errorCallback);
    }
});
