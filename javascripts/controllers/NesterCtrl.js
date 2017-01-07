// "use strict";
// app.controller("NesterCtrl", function($scope, $rootScope, $timeout, StorageFactory, UserFactory, ProjectFactory, FolderFactory, NoteFactory, TagFactory, StatusFactory, CollaboratorFactory, LeadFactory){
// 	$rootScope.$on("CallNester", function(){
//            $scope.getData();
//        });

// 	let projects = [];
// 	let folders = [];
// 	let leads = [];
// 	let notes = [];
// 	let collaborators = [];
// 	$scope.tags = [];
// 	$scope.statuses = [];
	
// 	$scope.getData = ()=>{
// 		ProjectFactory.getProjectList($rootScope.user.uid).then( (projects)=>{
// 			projects = projects;
// 			console.log("projects", projects);
// 			$rootScope.projectsArray = projects;

// 		});
// 		LeadFactory.getLeadList($rootScope.user.uid).then( (leads)=>{
// 				leads = leads;
// 				console.log("leads", leads);
// 				$rootScope.leadsArray = leads;
// 		});
// 		FolderFactory.getFolderList($rootScope.user.uid).then( (folders)=>{
// 				folders = folders;
// 				console.log("folders", folders);
// 		});
// 		NoteFactory.getNoteList($rootScope.user.uid).then( (notes)=>{
// 				console.log(notes);
// 				notes = notes;
// 		});
// 		TagFactory.getTagList($rootScope.user.uid).then( (tags)=>{
// 				console.log(tags);
// 				tags = tags;
// 		});
// 		StatusFactory.getStatusList().then( (statuses)=>{
// 				console.log(statuses);
// 				statuses = statuses;
// 		});
// 		$scope.nestData();
// 	};
// 	$scope.nestFolderData = ()=>{
// 		angular.forEach(projects, function(project,index){
// 			projects.folders = [];
// 			angular.forEach(folders, function(folder, index){
// 				if(project.id === folder.projectId){
// 					project.folders.push(folder);
// 				}
				
// 			});
// 		});
// 		$scope.nestLeadData();
// 	};
// 	$scope.nestLeadData
// 			$scope.leads = leads;
			
// 			// console.log("annotations", $scope.annotations);
// 			angular.forEach($scope.projects, function(project, index){
// 				project.leads = [];
// 				angular.forEach($scope.leads, function(lead, index){
// 					// console.log("anno", anno.projectId);
// 					if(project.id === lead.projectId){
// 						project.leads.push(lead);
						
// 					}
// 					$rootScope.nestedProjects = project;

// 				});
// 				console.log($rootScope.nestedProjects);

// 			});
// 		});

// 	});
// });