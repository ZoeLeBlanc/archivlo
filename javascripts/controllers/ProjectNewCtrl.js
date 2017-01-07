"use strict";
app.controller("ProjectNewCtrl", function($scope, $rootScope, $location, $window, ProjectFactory, StorageFactory, TagFactory){
	$scope.switchValue = true;
	$scope.tagsExist = false;
	$scope.createProject ={};
	$scope.newlyCreatedProject = {};
	$('.chips').material_chip();
	 if ($scope.createProject.projectImage){
		$scope.createProject.projectImage.data = $scope.createProject.projectImage.data.split(',')[1];
	}
	$scope.createNewProject = (createProject)=>{
	 	
 		createProject.dateCreated = Date.now();
 		createProject.dateCreated = createProject.dateCreated.toString();
 		console.log("date", createProject.dateCreated);
	 	createProject.private = $scope.switchValue;
	 	console.log("switch", createProject.private);
	 	if ($scope.createProject.projectImage){
	 		$scope.createProject.projectImage.data = $scope.createProject.projectImage.data.split(',')[1];
	 		// createProject.coverPhoto = $scope.createProject.projectImage.data;
			StorageFactory.uploadImage($rootScope.user.uid, $scope.createProject.projectImage).then( (result)=>{
				console.log("result", result);
				createProject.coverPhoto = result;
				console.log("status", $scope.selectedStatus);	
			 	createProject.statusId = $scope.selectedStatus;
				createProject.uid = $rootScope.user.uid;
		 		createProject.id = $rootScope.nestedProjects.length + 1;
		 		console.log("$scope.newProject.keywords", $scope.newProject);
		 		console.log("createProject", createProject);
		 		ProjectFactory.postNewProject(createProject).then((postResponse)=>{
		 			console.log("postResponse", postResponse.name);
		 			$scope.tags = [];
				 	var data = $('.chips').material_chip('data');
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
			 			TagFactory.postNewTag(tag).then( (tagPostResponse)=>{
			 				console.log("tagPostResponse", tagPostResponse);
			 			});
			 		});
		 			let link = {};
		 			link.id = postResponse.name;
		 			$window.location.assign('#/projects/import/' + link.id);
		 			$rootScope.nestData();
		 			$scope.newProject = {};
				});
			});
			
	 	} else{
	 		createProject.statusId = $scope.selectedStatus;
			createProject.uid = $rootScope.user.uid;
	 		createProject.id = $rootScope.nestedProjects.length + 1;
	 		console.log("$scope.newProject.keywords", $scope.newProject);
	 		console.log("createProject", createProject);
	 		ProjectFactory.postNewProject(createProject).then((postResponse)=>{
	 			console.log("postResponse", postResponse.name);
	 			$scope.tags = [];
			 	var data = $('.chips').material_chip('data');
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
		 			TagFactory.postNewTag(tag).then( (tagPostResponse)=>{
		 				console.log("tagPostResponse", tagPostResponse);
		 			});
		 		});
	 			let link = {};
	 			link.id = postResponse.name;
	 			$window.location.assign('#/projects/import/' + link.id);
	 			$rootScope.nestData();
	 			$scope.newProject = {};
			});
	 	}	 
	};
});
	