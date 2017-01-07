"use strict";
app.controller("UserCtrl", function($scope, $rootScope, AuthFactory, UserFactory, StorageFactory, HypothesisFactory){
	// let updatedUser = {};
	// let userId;
	console.log("hi");
	$scope.updateSettings = ()=>{
		console.log("hi");
		console.log("updated", $scope.user);
		UserFactory.updateProfile($scope.user).then( (response)=>{
			console.log(response);
		});
	};
	// $scope.test = {};
	// $scope.uploadFile = function(){
	// 	console.log("$scope.userImage", $scope.userImage);
	// };
	// if ($scope.userImage){
	// 	$scope.userImage.data = $scope.userImage.data.split(',')[1];
	// }
	// $scope.newAvatar = function() {
		
	// 	$scope.userImage.data = $scope.userImage.data.split(',')[1];
	// 	console.log($scope.userImage);
	// 	StorageFactory.uploadImage($rootScope.user.uid, $scope.userImage).then( (result)=>{

	// 		UserFactory.updateUserAvatar($rootScope.user.id, result).then( (updateUserResponse)=>{
	// 			console.log("updateUserResponse", updateUserResponse.userAvatar);
	// 			$rootScope.user.photoURL = updateUserResponse.photoURL;
	// 		});
	// 	});
 //    };

});