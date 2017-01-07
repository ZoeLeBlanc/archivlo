"use strict";
app.controller("ProjectEditCtrl", function($scope, $rootScope, $routeParams, $location, $window, ProjectFactory, StorageFactory, TagFactory){
	let projectId = $routeParams.id;
	$scope.createProject = {};
	$scope.editing = true;
	angular.forEach($rootScope.nestedProjects, (project, index)=>{
		if(project.id === projectId){
			console.log("looped project", project);
			$scope.createProject.id = projectId;
			$scope.createProject = project;
			$scope.switchValue = $scope.createProject.private;
			$scope.$parent.selectedStatus = $scope.createProject.statusId;
			let data = [];
			angular.forEach(project.tags, (item, index)=>{
				data.push({tag:item.tag});
				console.log($scope.data);
			});
			$('.chips-initial').material_chip({data});
		}
	});
	$scope.createNewProject = (createProject)=>{
 		createProject.dateUpdated = Date.now();
 		createProject.dateUpdated = createProject.dateUpdated.toString();
 		console.log("date", createProject.dateUpdated);
	 	createProject.private = $scope.switchValue;
	 	console.log("switch", createProject.private);
	 	if ($scope.createProject.projectImage){
	 		$scope.createProject.projectImage.data = $scope.createProject.projectImage.data.split(',')[1];
			StorageFactory.uploadImage($rootScope.user.uid, $scope.createProject.projectImage).then( (result)=>{
				console.log("result", result);
				createProject.coverPhoto = result;
			});
	 	}
	 	console.log($scope.createProject.projectImage);	 
	 	console.log("status", $scope.selectedStatus);	
	 	createProject.statusId = $scope.selectedStatus;
		createProject.uid = $rootScope.user.uid;
 		console.log("createProject", createProject);
 		ProjectFactory.editProject(createProject).then((postResponse)=>{
 			console.log("postResponse", postResponse.name);
 			$scope.tags = [];
		 	var data = $('.chips-initial').material_chip('data');
	 		angular.forEach(data, (value, index)=>{
	 			console.log("data", data[index].tag);
	 			$scope.tags.push({
	 				'uid':$rootScope.user.uid,
	 				'tag':data[index].tag,
	 				'projectId':postResponse.name
	 			});
	 		});	
	 		console.log("tags", $scope.tags);
	 		angular.forEach($scope.tags, (tag,index)=>{
	 			TagFactory.editTag(tag).then( (tagPostResponse)=>{
	 				console.log("tagPostResponse", tagPostResponse);
	 			});
	 		});
 			let link = {};
 			link.id = postResponse.name;
 			$window.location.assign('#/projects');
 			$rootScope.nestData();
 			$scope.newProject = {};
 		});
	};
});