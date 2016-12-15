"use strict";
app.controller("ProjectViewCtrl", function($scope, $rootScope, $routeParams, ProjectFactory, AnnotationFactory){
	$scope.clickProjectId = $routeParams.id;
	console.log("$scope.clickProjectId", $scope.clickProjectId);
	$scope.editVersion = false;
	$scope.deleteAnnotation = function(){
		$scope.selectedAnnotations = $rootScope.annotationsArray.filter(function(annotation){
			return annotation.selected;
		});
		angular.forEach($scope.selectedAnnotations, function(value, index){
			AnnotationFactory.deleteAnnotation(value.id).then((deleteAnnotationResponse)=>{
			AnnotationFactory.getAnnotationList($rootScope.user.uid).then( (annotations)=>{
					$rootScope.annotationsArray = annotations;
				});
			});
		});
		
	};
	$scope.editAnnotation = function(){
		$scope.editVersion = true;
		$scope.selectedEditAnnotations = $rootScope.annotationsArray.filter(function(annotation){
			return annotation.selected;
		});
		console.log($scope.editVersion);
	};
	$scope.saveEditedAnnotations = function(){
		$scope.finalAnnotations = $rootScope.annotationsArray.filter(function(annotation){
			return annotation.selected;
		});
		console.log($scope.finalAnnotations);
		angular.forEach($scope.finalAnnotations, function(value, index){
			AnnotationFactory.editAnnotation(value).then((editAnnotationResponse)=>{
				console.log("editAnnotationResponse", editAnnotationResponse);
			AnnotationFactory.getAnnotationList($rootScope.user.uid).then( (annotations)=>{
					$rootScope.annotationsArray = annotations;
				});
			});
		});
		$scope.editVersion = false;
	};
	// $scope.projectAnnotations = [];
	// angular.forEach($rootScope.annotationsArray, function(value, key){
	// 	if (value.projectId === $scope.clickProjectId){
			
	// 		$scope.projectAnnotations.push(value);

	// 	}
	// 	console.log("value", $scope.projectAnnotations);
	// });
});