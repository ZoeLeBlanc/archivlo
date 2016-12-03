"use strict";
app.controller("AuthCtrl", function($location, $scope, $rootScope, AuthFactory, UserFactory){
	$scope.loginContainer = true;
	$scope.registerContainer = false;
	if($location.path()=== "/logout"){
		AuthFactory.logout();
		$rootScope.user = {};
		$location.url("/");
	}
	$scope.setLoginContainer = function(){
		$scope.loginContainer = true;
		$scope.registerContainer = false;
	};
	$scope.setRegisterContainer = function(){
		$scope.loginContainer = false;
		$scope.registerContainer = true;
	};
	let logMeIn = (loginStuff)=>{
		AuthFactory.authenticate(loginStuff).then( (loginResponse)=>{
			console.log("loginResponse", loginResponse);
			return UserFactory.getUser(loginResponse.uid);
		}).then( (userCreds)=>{
			console.log("userCreds", userCreds);
			$rootScope.user = userCreds;
			$scope.login = {};
			$scope.register = {};
			$location.url('/boards/list');

		});
	};
	$scope.loginGoogleUser = ()=>{
		AuthFactory.authenticateGoogle().then( (logGoogleResponse)=>{
			console.log("logGoogleResponse", logGoogleResponse);
			$rootScope.user = {
				uid: logGoogleResponse.uid,
				username: logGoogleResponse.displayName 
			};
			$scope.login = {};
			$scope.register = {};
			$location.url('/boards/list');
		}).then( (logGoogleComplete)=>{
			console.log("logGoogleComplete", logGoogleComplete);
		});
	};
	$scope.registerUser = function(registerNewUser){
		console.log("registerNewUser", registerNewUser);
		AuthFactory.registerWithEmail(registerNewUser).then( (registerResponse)=>{
			console.log("registerResponse", registerResponse);
			registerNewUser.uid = registerResponse.uid;
			return UserFactory.addUser(registerNewUser);
		}).then( (registerComplete)=>{
			logMeIn(registerNewUser);
		});
	};
	$scope.loginUser = function(loginNewUser){
		logMeIn(loginNewUser);
	};
});
