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
	let RegisterMeIn = (loginStuff)=>{
		AuthFactory.authenticate(loginStuff).then( (loginResponse)=>{
			console.log("loginResponse", loginResponse);
			return UserFactory.getUser(loginResponse);
		}).then( (userCreds)=>{
			console.log("userCreds", userCreds);
			$rootScope.user = userCreds;
			$rootScope.registering = true;
			$scope.login = {};
			$scope.register = {};
			$location.url('/projects/list');

		});
	};
	let logMeIn = (loginStuff)=>{
		AuthFactory.authenticate(loginStuff).then( (loginResponse)=>{
			console.log("loginResponse", loginResponse);
			return UserFactory.getUser(loginResponse);
		}).then( (userCreds)=>{
			console.log("userCreds", userCreds);
			$rootScope.user = userCreds;
			$scope.login = {};
			$scope.register = {};
			$location.url('/projects/list');

		});
	};

	let loginSetUser = {};
	loginSetUser.email = "a@a.com";
	loginSetUser.password = "123456";
	logMeIn(loginSetUser);
	$scope.setUser = function(userResponse){
		console.log("userResponseuid", userResponse.uid);
		UserFactory.checkUser(userResponse).then( (checkUserResponse)=>{
			if (angular.equals({}, checkUserResponse)){
				UserFactory.addUser(userResponse).then( (addUserResponse)=>{
					console.log("addUserResponse", addUserResponse);
					$rootScope.user = {
					uid: userResponse.uid,
					displayName: userResponse.displayName,
					photoURL: userResponse.photoURL,
					email: userResponse.email
					};
					$scope.login = {};
					$scope.register = {};
					$location.url('/projects/list');
				});
			} else {
				console.log("checkUserResponse", checkUserResponse);
				$rootScope.user = {
					uid: userResponse.uid,
					displayName: userResponse.displayName,
					photoURL: userResponse.photoURL,
					email: userResponse.email
				};
				$scope.login = {};
				$scope.register = {};
				$location.url('/projects/list');
			}
			
		});
		
	};
	$scope.loginFacebookUser = ()=>{
		AuthFactory.authenticateFacebook().then( (logFacebookResponse)=>{
			console.log("logFacebookResponse", logFacebookResponse);
			$scope.setUser(logFacebookResponse);
		});
	};
	$scope.loginTwitterUser = ()=>{
		AuthFactory.authenticateTwitter().then( (logTwitterResponse)=>{
			console.log("logTwitterResponse", logTwitterResponse);
			$scope.setUser(logTwitterResponse);
		});
	};
	$scope.loginGithubUser = ()=>{
		AuthFactory.authenticateGithub().then( (logGithubResponse)=>{
			console.log("logGithubResponse", logGithubResponse);
			$scope.setUser(logGithubResponse);
		});
	};
	$scope.loginGoogleUser = ()=>{
		AuthFactory.authenticateGoogle().then( (logGoogleResponse)=>{
			console.log("logGoogleResponse", logGoogleResponse);
			$scope.setUser(logGoogleResponse);
		});
	};
	$scope.registerUser = function(registerNewUser){
		console.log("registerNewUser", registerNewUser);
		AuthFactory.registerWithEmail(registerNewUser).then( (registerResponse)=>{
			console.log("registerResponse", registerResponse);
			registerNewUser.uid = registerResponse.uid;
			return UserFactory.addUser(registerNewUser);
		}).then( (registerComplete)=>{
			console.log("registerNewUser", registerNewUser);
			RegisterMeIn(registerNewUser);
		});
	};
	$scope.loginUser = function(loginNewUser){
		logMeIn(loginNewUser);
	};
	
});
