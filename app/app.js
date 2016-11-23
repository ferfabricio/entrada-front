'use strict';

// Declare app level module which depends on views, and components
angular.module('devApp', [
  'ui.bootstrap',
  'ngRoute',
  'devApp.list'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/list'});
}]);
