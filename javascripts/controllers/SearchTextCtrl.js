"use strict";
app.controller("SearchTextCtrl", function($scope, $rootScope, $location, ProjectFactory, AnnotationFactory, UserFactory){
	$scope.searchRecords = (searchTerm)=>{
		console.log("search",searchTerm);
		$scope.filtered = [];
		var regex = new RegExp(".*" + searchTerm + ".*", "ig");
		angular.forEach($rootScope.projectsArray, function(proj, key){
			angular.forEach(proj, function(value, key){
				if (regex.test(value)){
					console.log(value);
					$scope.filtered.push(proj);
				}
				console.log($scope.filtered);
			});
		});
	};
	// $scope.searchUsers = ()=>{
	// 	UserFactory.getAllUsers().then( (searchUsersResponse)=>{
	// 		console.log(searchUsersResponse);
	// 	});
	// };
});