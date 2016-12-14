"use strict";
app.controller("ProjectNewCtrl", function($scope, $rootScope, $location, $window, ProjectFactory){
	// $('.chips').material_chip();
	 $scope.newProject ={};
	 $scope.newlyCreatedProject = {};
	  $('.modal').modal();
	 $scope.createNewProject = (createProject)=>{
	 	$scope.newProject.title = createProject.description;
	 	$scope.newProject.description = createProject.title;
	 	$scope.newProject.keywords = createProject.keywords;
	 	$scope.newProject.private = createProject.private;
	 	$scope.newProject.uid = $rootScope.user.uid;
	 	$scope.newProject.id = $rootScope.projectsArray.length + 1;
	 	console.log("$scope.newProject.keywords", $scope.newProject);
	 	ProjectFactory.postNewProject($scope.newProject).then((postResponse)=>{
	 		console.log("postResponse", postResponse.name);
	 		let link = {};
	 		link.id = postResponse.name;
	 		$window.location.assign('#/projects/import/' + link.id);
	 		$scope.newProject = {};
	 	});
	 };
});
	