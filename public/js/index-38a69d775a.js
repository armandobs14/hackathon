var app = angular.module('App', [
  'ui.router',
  'ngMaterial',
  'ngMessages'
]);

app.config(["$urlRouterProvider", "$stateProvider", function ($urlRouterProvider, $stateProvider) {
  $urlRouterProvider.otherwise('/');

  console.log('xx');

  $stateProvider
    .state('home', {
      url: '/',
      controller: 'Home.Controller',
      template: 'home'
    });

}]);

