"use strict";
app.controller("ProjectNewCtrl", function($scope, $rootScope, $location, $window, ProjectFactory){
	// $('.chips').material_chip();
	 $scope.createProject ={};
	 $scope.newlyCreatedProject = {};
	 $scope.createNewProject = (createProject)=>{
	 	$scope.createProject.uid = $rootScope.user.uid;
	 	$scope.createProject.id = $rootScope.projectsArray.length + 1;
	 	console.log("$scope.newProject.keywords", $scope.newProject);
	 	ProjectFactory.postNewProject($scope.createProject).then((postResponse)=>{
	 		console.log("postResponse", postResponse.name);
	 		let link = {};
	 		link.id = postResponse.name;
	 		$window.location.assign('#/projects/import/' + link.id);
	 		$scope.newProject = {};
	 	});
	 };
});
	