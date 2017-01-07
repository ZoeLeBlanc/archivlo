"use strict";
app.controller("ProjectViewCtrl", function($scope, $rootScope, $routeParams, ProjectFactory, NoteFactory, StatusFactory, TagFactory, LeadFactory, UserArchiveFactory){
	$scope.clickProjectId = $routeParams.id;
	console.log("$scope.clickProjectId", $scope.clickProjectId);
	console.log("nested Projects", $rootScope.nestedProjects);
	// let tagData = [];
	// let chipData = [];

	// angular.forEach($rootScope.nestedProjects, function(project,index){
	// 	if(project.id === $scope.clickProjectId){
	// 		tagData = project.tags;
	// 		console.log(tagData);
	// 		angular.forEach(tagData, function(tag, index){
	// 			chipData.push({tag:'${tag.tag}'});
	// 		});
	// 	}
	// });
	
	// $scope.getChips();

	// function initializeChips(){
	// 	console.log("chipData",chipData);
	//   $('.chips-initial').material_chip();
	// }
	$scope.editVersion = false;
	// LEAD FUNCTIONS
	$scope.deleteLead = function(){
		console.log("working?");
		$scope.selectedLeads = $rootScope.leadsArray.filter(function(lead){
			return lead.selected;
		});
		angular.forEach($scope.selectedLeads, function(value, index){
			LeadFactory.deleteLead(value.id).then((deleteLeadResponse)=>{
			// LeadFactory.getLeadList($rootScope.user.uid).then( (leads)=>{
			// 		$rootScope.leadsArray = leads;
			// 	});
			$rootScope.nestData();
			});
		});
		
	};
	$scope.editLead = function(){
		$scope.editVersion = true;
		$scope.selectedEditLeads = $rootScope.leadsArray.filter(function(lead){
			return lead.selected;
		});
		console.log($scope.editVersion);
	};
	$scope.saveEditedLeads = function(){
		$scope.finalLeads = $rootScope.leadsArray.filter(function(lead){
			return lead.selected;
		});
		console.log($scope.finalLeads);
		angular.forEach($scope.finalLeads, function(value, index){
			LeadFactory.editLead(value).then((editLeadResponse)=>{
				console.log("editLeadResponse", editLeadResponse);
			// AnnotationFactory.getAnnotationList($rootScope.user.uid).then( (annotations)=>{
			// 		$rootScope.annotationsArray = annotations;
			// 	});
				$rootScope.nestData();
			});
		});
		$scope.editVersion = false;
	};
	// NOTE FUNCTIONS
	$scope.deleteNote = function(){
		$scope.selectedNotes = $rootScope.notesArray.filter(function(note){
			return note.selected;
		});
		angular.forEach($scope.selectedNotes, function(value, index){
			NoteFactory.deleteNote(value.id).then((deleteNoteResponse)=>{
			// LeadFactory.getLeadList($rootScope.user.uid).then( (leads)=>{
			// 		$rootScope.leadsArray = leads;
			// 	});
			$rootScope.nestData();
			});
		});
		
	};
	$scope.editNote = function(){
		$scope.editVersion = true;
		$scope.selectedEditNotes = $rootScope.notesArray.filter(function(note){
			return note.selected;
		});
		console.log($scope.editVersion);
	};
	$scope.saveEditedNotes = function(){
		$scope.finalNotes = $rootScope.notesArray.filter(function(note){
			return note.selected;
		});
		console.log($scope.finalNotes);
		angular.forEach($scope.finalNotes, function(value, index){
			NoteFactory.editNote(value).then((editNoteResponse)=>{
				console.log("editNoteResponse", editNoteResponse);
			// AnnotationFactory.getAnnotationList($rootScope.user.uid).then( (annotations)=>{
			// 		$rootScope.annotationsArray = annotations;
			// 	});
				$rootScope.nestData();
			});
		});
		$scope.editVersion = false;
	};
	// USER ARCHIVE FUNCTIONS
	$scope.deleteUserArchive = function(){
		$scope.selectedUserArchives = $rootScope.userArchivesArray.filter(function(userArchive){
			return userArchive.selected;
		});
		angular.forEach($scope.selectedUserArchives, function(value, index){
			UserArchiveFactory.deleteUserArchive(value.id).then((deleteUserArchiveResponse)=>{
			// LeadFactory.getLeadList($rootScope.user.uid).then( (leads)=>{
			// 		$rootScope.leadsArray = leads;
			// 	});
			$rootScope.nestData();
			});
		});
		
	};
	$scope.editArchive = function(){
		$scope.editVersion = true;
		$scope.selectedEditArchives = $rootScope.userArchivesArray.filter(function(userArchive){
			return userArchive.selected;
		});
		console.log("selected", $scope.selectedEditArchives);
		console.log($scope.editVersion);
	};
	$scope.saveEditedArchives = function(){
		$scope.finalArchives = $rootScope.userArchivesArray.filter(function(userArchive){
			return userArchive.selected;
		});
		console.log($scope.finalArchives);
		angular.forEach($scope.finalArchives, function(value, index){
			UserArchiveFactory.editUserArchive(value).then((editArchiveResponse)=>{
				console.log("editArchiveResponse", editArchiveResponse);
			// AnnotationFactory.getAnnotationList($rootScope.user.uid).then( (annotations)=>{
			// 		$rootScope.annotationsArray = annotations;
			// 	});
				$rootScope.nestData();
			});
		});
		$scope.editVersion = false;
	};
});