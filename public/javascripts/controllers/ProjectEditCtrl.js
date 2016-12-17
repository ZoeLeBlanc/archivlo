"use strict";
app.controller("ProjectEditCtrl", function($scope, $rootScope, $routeParams, $location, ProjectFactory){
	let projectId = $routeParams.id;
	$scope.createProject = {};
	ProjectFactory.getSingleProject(projectId).then( (oneProject)=>{
		oneProject.id = projectId;
		$scope.createProject = oneProject;
	});
	 $scope.createNewProject = (createProject)=>{
	 	$scope.createProject.uid = $rootScope.user.uid;
	 	console.log("$scope.newProject.keywords", $scope.newProject);
	 	ProjectFactory.editProject($scope.createProject).then((postResponse)=>{
	 		console.log("postResponse", postResponse.name);
	 		ProjectFactory.getProjectList($rootScope.user.uid).then( (projects)=>{
				
					$rootScope.projectsArray = projects;
					$location.url('/projects/list');
			});
	 	});
	 };
});