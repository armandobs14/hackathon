var app = angular.module('App', [
  'ui.router',
  'ngMaterial',
  'ngMessages',
  'uiGmapgoogle-maps'
]);

//= include ../config/routes.js
//= include ../config/firebase.js
//= include HomeCtrl.js
//= include MapCtrl.js
