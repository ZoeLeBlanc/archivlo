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

app.config(function($routeProvider, $httpProvider){
	// $httpProvider.defaults.useXDomain = true;
 //  	delete $httpProvider.defaults.headers.common['X-Requested-With'];

	$routeProvider
		.when('/auth', {
			templateUrl: 'partials/auth.html',
			controller: 'AuthCtrl'
		})
		.when('/', {
			templateUrl: 'partials/landing-page.html',
			controller: 'LandingPageCtrl'
		})
		.when('/settings', {
			templateUrl: 'partials/user.html',
			controller: 'UserCtrl',
			resolve: {isAuth}
		})
		.when('/projects/list', {
			templateUrl: 'partials/project-list.html',
			controller: 'ProjectListCtrl',
			resolve: {isAuth}
		})
		.when('/projects/view/:id', {
			templateUrl: 'partials/project-view.html',
			controller: 'ProjectViewCtrl',
			resolve: {isAuth}
		})
		.when('/projects/new', {
			templateUrl: 'partials/project-new.html',
			controller: 'ProjectNewCtrl',
			resolve: {isAuth}
		})
		.when('/search', {
			templateUrl: 'partials/search.html',
			controller: 'SearchCtrl',
			resolve: {isAuth}
		})
		.when('/annotations/list/:id', {
			templateUrl: 'partials/annotation-list.html',
			controller: 'AnnotationListCtrl',
			resolve: {isAuth}
		})
		.when('/annotations/view/:id', {
			templateUrl: 'partials/annotation-view.html',
			controller: 'AnnotationViewCtrl',
			resolve: {isAuth}
		})
		.when('/logout', {
			templateUrl: 'partials/auth.html',
			controller: 'AuthCtrl'
		})
		.otherwise('/auth');
});

