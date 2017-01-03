"use strict";
app.controller("ProjectListCtrl", function($scope, $rootScope, $timeout, StorageFactory, UserFactory, ProjectFactory, AnnotationFactory){
	$scope.openModal = false;
	if ($rootScope.registering){
		console.log("registering", $rootScope.registering);
		getModal();
	}
	function getModal(){
		$timeout(function() {
			console.log("modal trigger", angular.element('#modalTrigger'));
			angular.element('#modalTrigger').triggerHandler('click');
			$scope.openModal = true;
			$rootScope.registering = false;
			console.log("registering", $rootScope.registering);
		});	
	}
	if ($scope.userImage){
		$scope.userImage.data = $scope.userImage.data.split(',')[1];
	}
	$scope.newAvatar = function() {
		$scope.userImage.data = $scope.userImage.data.split(',')[1];
		console.log($scope.userImage);
		StorageFactory.uploadImage($rootScope.user.uid, $scope.userImage).then( (result)=>{
			console.log("result", result);
			UserFactory.updateUserAvatar($rootScope.user.id, result).then( (updateUserResponse)=>{
				console.log("updateUserResponse", updateUserResponse.photoURL);
				$rootScope.user.photoURL = updateUserResponse.photoURL;
			});
		});
    };
    $scope.updateUser = ()=>{
    	if (!$scope.user.hypothesisToken){
    		$scope.user.hypothesisToken = "";
    		let newHypothesisCred = {
    		hypothesisUsername: $scope.user.hypothesisUsername,
    		hypothesisToken: $scope.user.hypothesisToken
    		};
    		UserFactory.updateUserHypothesis($rootScope.user.id, newHypothesisCred).then( (updateUserHypothesisResponse)=>{
    			$rootScope.user.hypothesisUsername = updateUserHypothesisResponse.hypothesisUsername;
    			$rootScope.user.hypothesisToken = updateUserHypothesisResponse.hypothesisToken;
    			console.log("submitted user credentials", $rootScope.user);
    		});		
    	}
    };
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
	$scope.updateSettings = ()=>{
		console.log($rootScope.user);
		console.log($scope.user);
		// var user = AuthFactory.getUser();
		// user.updateProfile({
		//   displayName: "Jane Q. User",
		//   photoURL: "https://example.com/jane-q-user/profile.jpg"
		// }).then(function() {
		//   // Update successful.
		// }, function(error) {
		//   // An error happened.
		// });
	};
	
});