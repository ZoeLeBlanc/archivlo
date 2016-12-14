"use strict";
app.controller("ProjectViewCtrl", function($scope, $rootScope, $routeParams, ProjectFactory, AnnotationFactory){
	$scope.clickProjectId = $routeParams.id;
	console.log("$scope.clickProjectId", $scope.clickProjectId);
	
	// $scope.projectAnnotations = [];
	// angular.forEach($rootScope.annotationsArray, function(value, key){
	// 	if (value.projectId === $scope.clickProjectId){
			
	// 		$scope.projectAnnotations.push(value);

	// 	}
	// 	console.log("value", $scope.projectAnnotations);
	// });
});