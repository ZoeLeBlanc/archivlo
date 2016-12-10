"use strict";
app.controller("ProjectListCtrl", function($scope, $rootScope, ProjectFactory, AnnotationFactory){
	$scope.projects = [];
	$scope.annotations = [];
	$scope.projectsToEdit = {};
	ProjectFactory.getProjectList($rootScope.user.uid).then( (projects)=>{
		$scope.projects = projects;
		$rootScope.projectsArray = projects;
		console.log("projects", $scope.projects);
	});
	AnnotationFactory.getAnnotationList($rootScope.user.uid).then( (annotations)=>{
		$scope.annotations = annotations;
		$rootScope.annotationsArray = annotations;
		console.log("annotations", $scope.annotations);
	});
});