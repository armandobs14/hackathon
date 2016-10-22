app.controller('Home.Controller', function ($scope,$rootScope, $timeout, Ref,$location) {

  var incidentsRef = Ref.child('incidents');

  /*incidentsRef
    .on('value', function () {
      $timeout(function (snap) {
        $scope.incidents = snap.val();
      });
    })

  $scope.msg = 'Hello World';*/

   $scope.showOnMap = function(incident){
   	//console.log(incident);
   	$rootScope.markers =  [];
   	$rootScope.markers.push(incident);
   	$location.path('map');
   }

   $scope.incidents = [
	  {
	  	id:1,
	  	title:'Bomba na Fernandes Lima',
	  	description: 'Ameaça de bomba ocorre em maceió',
	    latitude: -9.5503066,
	  	longitude: -35.6307039
	  },
	  {
	  	id:2,
	  	title:'Sequestro no pratagy',
	  	description:'Quadrilha ameaça sequestrar quem estiver na rua a partir das 18 horas',
	    latitude: 44,
	  	longitude: -73
	  },
	  {
	  	id:3,
	  	title:'XPTO',
	  	description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet sem eget dui ultrices suscipit. Curabitur id suscipit leo. Nullam aliquet ipsum tortor, a congue ex laoreet ac. Curabitur at nulla pretium, volutpat mi et, ornare sem. Etiam nec semper nisl, ac aliquam tortor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus a ipsum nec mi volutpat sodales non eget est. Nulla id ante orci. In consequat interdum augue ut lacinia. In hac habitasse platea dictumst.',
	    latitude: 43,
	  	longitude: -73
	  },
	  {
	  	id:4,
	  	title:'Bezerra morre',
	  	description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet sem eget dui ultrices suscipit. Curabitur id suscipit leo. Nullam aliquet ipsum tortor, a congue ex laoreet ac. Curabitur at nulla pretium, volutpat mi et, ornare sem. Etiam nec semper nisl, ac aliquam tortor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus a ipsum nec mi volutpat sodales non eget est. Nulla id ante orci. In consequat interdum augue ut lacinia. In hac habitasse platea dictumst.',
	    latitude: 42,
	  	longitude: -73
	  }
  ];

})