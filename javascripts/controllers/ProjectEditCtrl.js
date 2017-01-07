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
			});
			console.log(data);
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
	 		console.log("image date", $scope.createProject.projectImage);
	 		// createProject.coverPhoto = $scope.createProject.projectImage.data;
			StorageFactory.uploadImage($rootScope.user.uid, $scope.createProject.projectImage).then( (result)=>{
				// console.log("result", result);
				createProject.coverPhoto = result;
				createProject.statusId = $scope.selectedStatus;
				createProject.uid = $rootScope.user.uid;
		 		console.log("createProject", createProject);
		 		ProjectFactory.editProject(createProject).then((postResponse)=>{
		 			console.log("postResponse", postResponse);
		 			$scope.tags = [];
		 			let data = [];

				 	data = angular.element('.chip');
				 	console.log("data", data);
			 		angular.forEach(data, (value, index)=>{
			 			$scope.tags.push({
			 				'uid':$rootScope.user.uid,
			 				'tag':value.childNodes[0],
			 				'projectId':projectId
			 			});
			 		});	
			 		console.log("tags", $scope.tags);
			 		angular.forEach($scope.tags, (tag,index)=>{
			 			TagFactory.editTag(tag).then( (tagPostResponse)=>{
			 				console.log("tagPostResponse", tagPostResponse);
			 			});
			 		});
		 			$window.location.assign('#/projects/list');
		 			$rootScope.nestData();
		 			$scope.newProject = {};
			 		});
				});
	 	} else {
	 		createProject.statusId = $scope.selectedStatus;
			createProject.uid = $rootScope.user.uid;
	 		console.log("createProject", createProject);
	 		ProjectFactory.editProject(createProject).then((postResponse)=>{
	 			console.log("postResponse", postResponse);
	 			$scope.tags = [];
	 			let data = [];

			 	data = angular.element('.chip');
			 	console.log("data", data);
		 		angular.forEach(data, (value, index)=>{
		 			$scope.tags.push({
		 				'uid':$rootScope.user.uid,
		 				'tag':value.childNodes[0],
		 				'projectId':projectId
		 			});
		 		});	
		 		console.log("tags", $scope.tags);
		 		angular.forEach($scope.tags, (tag,index)=>{
		 			TagFactory.editTag(tag).then( (tagPostResponse)=>{
		 				console.log("tagPostResponse", tagPostResponse);
		 			});
		 		});
	 			$window.location.assign('#/projects/list');
	 			$rootScope.nestData();
	 			$scope.newProject = {};
	 		});
	 	}
	};
});