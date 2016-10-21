app.config(function ($urlRouterProvider, $stateProvider) {
  $urlRouterProvider.otherwise('/home');

  console.log('xx');

  $stateProvider
    .state('home', {
      url: '/',
      controller: 'Home.Controller',
      templateUrl: 'home'
    });

});
