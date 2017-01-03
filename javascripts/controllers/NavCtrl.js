"use strict";
app.controller("NavCtrl", function($scope, $location, $rootScope, UserFactory, AuthFactory){
	console.log($rootScope.user);
	$scope.updateSettings = ()=>{
		console.log("hi");
		console.log($scope.user);
		// var user = AuthFactory.getUser();
		// user.updateProfile({
		//   displayName: "Jane Q. User",
		//   photoURL: "https://example.com/jane-q-user/profile.jpg"
		// }).then(function() {
		//   // Update successful.
		// }, function(error) {
		//   // An error happened.
		// });
	};
  
});