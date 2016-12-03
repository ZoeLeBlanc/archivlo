"use strict";
let isAuth = (AuthFactory)=>{
	new Promise( (resolve, reject)=>{
		if (AuthFactory.isAuthenticated()){
			resolve();
		} else {
			reject();
		}
	});
};
app.run(function($rootScope, $location, AuthFactory, FIREBASE_CONFIG){
	firebase.initializeApp(FIREBASE_CONFIG);
	$rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute){
		let logged = AuthFactory.isAuthenticated();
		let appTo;
		if (currRoute.originalPath){
			appTo = currRoute.originalPath.indexOf('/auth') !== -1;
		}
		console.log("appTo", appTo);
		if(!appTo && !logged){
			event.preventDefault();
			$location.path('/auth');
		}
	});
});

app.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'partials/auth.html',
			controller: 'AuthCtrl'
		})
		.when('/auth', {
			templateUrl: 'partials/auth.html',
			controller: 'AuthCtrl'
		})
		.when('/boards/list', {
			templateUrl: 'partials/board-list.html',
			controller: 'BoardListCtrl',
			resolve: {isAuth}
		})
		.when('/boards/new', {
			templateUrl: 'partials/board-new.html',
			controller: 'BoardNewCtrl',
			resolve: {isAuth}
		})
		.when('/boards/edit/:id', {
			templateUrl: 'partials/board-edit.html',
			controller: 'BoardEditCtrl',
			resolve: {isAuth}
		})
		.when('/search', {
			templateUrl: 'partials/search.html',
			controller: 'SearchCtrl',
			resolve: {isAuth}
		})
		.when('/pins/list/:id', {
			templateUrl: 'partials/pin-list.html',
			controller: 'PinListCtrl',
			resolve: {isAuth}
		})
		.when('/pins/view/:id', {
			templateUrl: 'partials/pin-view.html',
			controller: 'PinViewCtrl',
			resolve: {isAuth}
		})
		.when('/logout', {
			templateUrl: 'partials/auth.html',
			controller: 'AuthCtrl'
		})
		.otherwise('/auth');
});
