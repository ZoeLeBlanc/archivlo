"use strict";
app.controller("SearchTextCtrl", function($scope, $rootScope, $location, ProjectFactory, LeadFactory, UserFactory){
	$scope.namedUsers = [];
	$scope.star = true;
	UserFactory.getAllUsers().then( (searchUsersResponse)=>{
		console.log("all users", searchUsersResponse);
		angular.forEach(searchUsersResponse, function(user, key){
			console.log("user", user);
			if (user.hasOwnProperty('displayName')){
				$scope.namedUsers.push(user);
			}
			console.log($scope.namedUsers);
		});
	});
	$scope.searchRecords = (searchTerm)=>{
		let searchProjects = $rootScope.nestedProjects;
		ProjectFactory.getAllProjectList().then( (allProjects)=>{
			angular.forEach(allProjects, (project, index)=>{
				if (project.private === false){
					searchProjects.push(project);
				}
			});
		});
		$scope.filtered = [];
		var regex = new RegExp(".*" + searchTerm + ".*", "ig");
		angular.forEach(searchProjects, function(project, key){
			angular.forEach(project, function(value, key){
				// console.log("proj2", value);
				if (regex.test(value)){
					// console.log("proj", proj);
					$scope.filtered.push(project);
					angular.forEach($scope.filtered, (item, index)=>{
						angular.forEach($scope.namedUsers, (user, index)=>{
							if (item.uid === user.uid){
								item.displayName = user.displayName;
							}
						});
					});
				}
			});
		});
	};
	$scope.saveProject=(projectId, event)=>{
		if (event.target.id === projectId){
			$scope.star = false;
		}
		console.log("event", event);
		console.log(projectId);
		
	};
});