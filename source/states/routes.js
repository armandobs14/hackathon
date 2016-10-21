app.config(function ($urlRouterProvider, $stateProvider) {
  $urlRouterProvider.otherwise('/');

  console.log('xx');

  $stateProvider
    .state('home', {
      url: '/',
      controller: 'Home.Controller',
      template: 'home'
    });

});
