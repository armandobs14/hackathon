app.controller('Map.Controller', function ($scope) {
  $scope.msg = 'Map';
  $scope.map = { center: { latitude:-9.5503066, longitude: -35.6307039}, zoom: 16 };
  $scope.markers = [
	  {
	  	id:1,
	  	title:'Pratagy Beach All Inclusive Resort',
	    latitude: -9.5503066,
	  	longitude: -35.6307039
	  },
	  {
	  	id:2,
	    latitude: 44,
	  	longitude: -73
	  },
	  {
	  	id:3,
	    latitude: 43,
	  	longitude: -73
	  },
	  {
	  	id:4,
	    latitude: 42,
	  	longitude: -73
	  }
  ];
})