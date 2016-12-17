"use strict";
app.controller("ProjectListCtrl", function($scope, $rootScope, ProjectFactory, AnnotationFactory){
	$scope.projects = [];
	$scope.annotations = [];
	$scope.projectsToEdit = {};
	ProjectFactory.getProjectList($rootScope.user.uid).then( (projects)=>{
		$scope.projects = projects;
		$rootScope.projectsArray = projects;
		// console.log("projects", $scope.projects);
		AnnotationFactory.getAnnotationList($rootScope.user.uid).then( (annotations)=>{
			$scope.annotations = annotations;
			$rootScope.annotationsArray = annotations;
			// console.log("annotations", $scope.annotations);
			angular.forEach($scope.projects, function(project, index){
				project.annotations = [];
				angular.forEach($scope.annotations, function(annotation, index){
					// console.log("anno", anno.projectId);
					if(project.id === annotation.projectId){
						project.annotations.push(annotation);
						
					}
					$rootScope.nestedProjects = project;

				});
				// console.log($rootScope.nestedProjects);

			});
		});

	});
	$scope.deleteProject = function(projectId){
		ProjectFactory.deleteProject(projectId).then( (deleteResponse)=>{
			ProjectFactory.getProjectList($rootScope.user.uid).then( (projects)=>{
				$scope.projects = projects;
				$rootScope.projectsArray = projects;
			});
		});
		angular.forEach($scope.annotations, function(value, index){
			if (projectId === value.projectId){
				AnnotationFactory.deleteAnnotation(value.id).then( (deleteAnnotationResponse)=>{
					AnnotationFactory.getAnnotationList($rootScope.user.uid).then( (annotations)=>{
						$scope.annotations = annotations;
						$rootScope.annotationsArray = annotations;
					});
				});
			}
		});
		
	};
	
});