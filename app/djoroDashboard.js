'use strict';

// Declare app level module which depends on views, and components
var djoroDashboard = angular.module('djoroDashboard', [
  'ngRoute',
  'djoroDashboard.chart',
  'djoroDashboard.users',
  'djoroDashboard.dashboard',
  'djoroDashboard.campaigns'
])
