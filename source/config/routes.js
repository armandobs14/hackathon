app.config(function ($urlRouterProvider, $stateProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      controller: 'Home.Controller',
      templateUrl: 'home'
    })
    .state('map', {
      url: '/map',
      controller: 'Map.Controller',
      templateUrl: 'map'
    })
    ;

});
