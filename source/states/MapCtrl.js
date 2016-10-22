app.controller('Map.Controller', function ($scope,$rootScope,Ref) {
  $scope.msg = 'Map';
  /*var incidentsRef = Ref.child('incidents');

  incidentsRef
    .on('value', function () {
      $timeout(function (snap) {
        $scope.incidents = snap.val();
      });
  })

  console.log($scope.incidents);
  */
  $scope.map = { center: { latitude:$rootScope.markers[0].latitude, longitude:$rootScope.markers[0].longitude}, zoom: 16 };
  $scope.markers = $rootScope.markers;
 
})