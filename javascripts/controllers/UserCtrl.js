"use strict";
app.controller("UserCtrl", function($scope, $rootScope, UserFactory, AnnotationFactory){
	console.log($rootScope.user.userAvatar);
	let updatedUser = {};
	let userId;
	UserFactory.updateUser(updatedUser, userId).then( (userResponse)=>{
		console.log("update Response", userResponse);
	});
 
});