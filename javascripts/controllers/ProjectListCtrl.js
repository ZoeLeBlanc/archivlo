"use strict";
app.controller("ProjectListCtrl", function($scope, $rootScope, $timeout, $q, StorageFactory, UserFactory, ProjectFactory, NoteFactory, TagFactory, StatusFactory, LeadFactory, UserArchiveFactory){

	$scope.switchValue = true;
	$scope.imageValue = true;
	console.log($scope.switchValue);
	$scope.openModal = false;
	if ($rootScope.registering){
		// console.log("registering", $rootScope.registering);
		getModal();
	}
	function getModal(){
		$timeout(function() {
			// console.log("modal trigger", angular.element('#modalTrigger'));
			angular.element('#modalTrigger').triggerHandler('click');
			$scope.openModal = true;
			$rootScope.registering = false;
			// console.log("registering", $rootScope.registering);
		});	
	}
	if ($scope.userImage){
		$scope.userImage.data = $scope.userImage.data.split(',')[1];
	}
	$scope.newAvatar = function() {
		$scope.userImage.data = $scope.userImage.data.split(',')[1];
		console.log($scope.userImage);
		StorageFactory.uploadImage($rootScope.user.uid, $scope.userImage).then( (result)=>{
			// console.log("result", result);
			UserFactory.updateUserAvatar($rootScope.user.id, result).then( (updateUserResponse)=>{
				// console.log("updateUserResponse", updateUserResponse.photoURL);
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
    			// console.log("submitted user credentials", $rootScope.user);
    		});		
    	}
    };
    
    $scope.isSwitchedOn = function() {
    	$scope.imageValue =angular.element('#coverPhotoSwitch').prop('checked');
      console.log(angular.element('#coverPhotoSwitch').prop('checked'));
      console.log($scope.switchValue);
    };  
    // Testing Variables
	
	$scope.projectsToEdit = {};
	$rootScope.nestData = ()=>{
		$rootScope.nestedProjects = [];
		$scope.projects = [];
		$scope.leads = [];
		$scope.notes = [];
		$scope.tags = [];
		$scope.userArchives = [];
		$scope.statuses = [];
		$rootScope.leadsArray = [];
		$rootScope.notesArray = [];
		$rootScope.statusesArray = [];
		$rootScope.userArchivesArray = [];
		NoteFactory.getNoteList($rootScope.user.uid).then( (notes)=>{
				$scope.notes = notes;
				$rootScope.notesArray = notes;
		});
		TagFactory.getTagList($rootScope.user.uid).then( (tags)=>{
				$scope.tags = tags;
		});
		StatusFactory.getStatusList().then( (statuses)=>{
				$scope.statuses = statuses;
				$rootScope.statusesArray = statuses;
		});
		UserArchiveFactory.getUserArchiveList($rootScope.user.uid).then( (userArchives)=>{
			$scope.userArchives = userArchives;
			console.log("userArchives", userArchives);
			$rootScope.userArchivesArray = userArchives;
		});	
		ProjectFactory.getProjectList($rootScope.user.uid).then( (projects)=>{
			$scope.projects = projects;
			$rootScope.nestedProjects = projects;
			LeadFactory.getLeadList($rootScope.user.uid).then( (leads)=>{
				$scope.leads = leads;
				$rootScope.leadsArray = leads;
				angular.forEach($rootScope.nestedProjects, function(project, index){
					project.tags= [];
					angular.forEach($scope.tags, function(tag, index){
						if (project.id === tag.projectId){
							project.tags.push(tag);
						}
					});
					project.notes=[];
					angular.forEach($scope.notes, function(note, index){
						if (project.id === note.projectId){
							project.notes.push(note);
						}
					});	
					project.leads=[];					
					angular.forEach($scope.leads, function(lead, index){
							if (project.id === lead.projectId){

								project.leads.push(lead);
							}	
					});
					project.userArchives=[];					
					angular.forEach($scope.userArchives, function(userArchive, index){
							if (project.id === userArchive.projectId){

								project.userArchives.push(userArchive);
							}	
					});
				});
					// $rootScope.nestedProjects.push(project);
				
			});
			console.log("status", $scope.statuses);
			console.log("nested", $rootScope.nestedProjects);
		});
	};
	$rootScope.nestData();
	$scope.duplicateProject = function(index){
		console.log("project", index);
	};
	$scope.deleteProject = function(projectId){
		ProjectFactory.deleteProject(projectId).then( (deleteResponse)=>{
			// ProjectFactory.getProjectList($rootScope.user.uid).then( (projects)=>{
			// 	$scope.projects = projects;
			// 	$rootScope.projectsArray = projects;
			// 	console.log("projects deleted", $rootScope.projectsArray);
			// });
			angular.forEach($scope.leads, function(value, index){
				if (projectId === value.projectId){
					LeadFactory.deleteLead(value.id).then( (deleteLeadResponse)=>{
						// LeadFactory.getLeadList($rootScope.user.uid).then( (leads)=>{
						// 	$scope.leads = leads;
						// 	$rootScope.leadsArray = leads;
						// });
					});
				}
			});
			angular.forEach($scope.notes, function(value, index){
				if (projectId === value.projectId){
					NoteFactory.deleteNote(value.id).then( (deleteNoteResponse)=>{
						// NoteFactory.getNoteList($rootScope.user.uid).then( (notes)=>{
						// 	$scope.notes = notes;
						// });
					});
				}
			});
			angular.forEach($scope.tags, function(value, index){
				if (projectId === value.projectId){
					TagFactory.deleteTag(value.id).then( (deleteTagResponse)=>{
						// TagFactory.getTagList($rootScope.user.uid).then( (tags)=>{
						// 	$scope.tags = tags;
						// });
					});
				}
			});
			angular.forEach($scope.userArchives, function(value, index){
				if (projectId === value.projectId){
					UserArchiveFactory.deleteUserArchive(value.id).then( (deleteUserArchiveResponse)=>{
						// TagFactory.getTagList($rootScope.user.uid).then( (tags)=>{
						// 	$scope.tags = tags;
						// });
					});
				}
			});
			$rootScope.nestData();
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
	//DOWNLOAD FILE SECTION
	$scope.separator = ",";
	$scope.decimalSeparator =".";
	function getHeaderData(projectId){
		let headers = [];
		angular.forEach($rootScope.nestedProjects, (project, index)=>{
			if(project.id === projectId){
				$scope.filename = project.title;
				console.log("project", $scope.filename);
				angular.forEach(project, (value, index)=>{
					console.log("index", value);
					if (Array.isArray(value)){
						angular.forEach(value, (item, key)=>{
							console.log("item", item);
							headers.push(key);
						});
					} else {
						headers.push(index);
					}
					
				});
				return headers;
			}
		});
	}
	function getProjectData(projectId){
		let projectData = [];
		angular.forEach($rootScope.nestedProjects, (project, index)=>{
			if(project.id === projectId){
				$scope.filename = project.title;
				console.log("project", $scope.filename);
				angular.forEach(project, (value, index)=>{
					console.log("index", value);
					if (Array.isArray(value)){
						angular.forEach(value, (item, key)=>{
							console.log("item", item);
							projectData.push({key:item});
						});
					} else {
						projectData.push({index:value});
					}
				});
				return projectData;
			}	
		});
	}
	$scope.downloadProject = (projectId)=>{
		console.log("downloaded", projectId);
	};
	$scope.getHeaders =(projectId)=>{
		return getHeaderData(projectId);
	};
	$scope.getArray=(projectId)=>{
		return getProjectData(projectId);
	};
});