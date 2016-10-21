app

  .factory('Ref', function() {
    return firebase.database().ref('/');
  })

  .factory('Auth', function() {
    return firebase.auth();
  });
  