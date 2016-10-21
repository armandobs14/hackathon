app.controller('Home.Controller', function ($scope, $timeout, Ref) {

  var incidentsRef = Ref.child('incidents');

  incidents
    .on('value', function () {
      $timeout(function (snap) {
        $scope.incidents = snap.val();
      });
    })

  $scope.msg = 'Hello World';
})