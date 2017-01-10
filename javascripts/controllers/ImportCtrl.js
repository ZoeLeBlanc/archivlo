"use strict";
app.controller("ImportCtrl", function($scope, $rootScope, $routeParams, $location, ImportFactory, HypothesisFactory, LeadFactory, ArchiveWikiFactory, UserArchiveFactory){
	$scope.userHypothesis = {};
	$scope.loadArchives = ()=>{
		$rootScope.archiveWiki = [];
		ArchiveWikiFactory.getArchiveWikiList().then( (archiveWikiResponse)=>{
			angular.forEach(archiveWikiResponse, (archive, index)=>{
				if (archive !== null){
					archive.id = index;
					$rootScope.archiveWiki.push(archive);
				}
			});
			console.log($rootScope.archiveWiki);
		});
	};
	$scope.loadArchives();
	$scope.importHypothesis = true;
	$scope.importArchives = false;
	$scope.setImportHypothesis = function(){
		$scope.importHypothesis = true;
		$scope.importArchives = false;
	};
	$scope.setImportArchives = function(){
		$scope.importHypothesis = false;
		$scope.importArchives = true;
	};
	$scope.clickProjectId = $routeParams.id;
	console.log("$scope.projectId", $scope.clickProjectId);
	
	$scope.searchHypothesis = function(){
		$scope.searchLeads = {};
		$scope.newSearch = "search?";
		console.log($scope.userHypothesis);
		angular.forEach($scope.userHypothesis, function(value, key){
			$scope.newSearch += key+ '='+value + "&";
		});
		console.log("value", $scope.newSearch);
		$scope.newSearch = $scope.newSearch.slice(0, -1);
		console.log("value", $scope.newSearch);
		HypothesisFactory.searchHypothesis($scope.newSearch).then( (searchResponse)=>{
			$scope.searchLeads = searchResponse[0];

		
			angular.forEach($scope.searchLeads, (lead, index)=>{
				console.log("lead test", lead.id);
				HypothesisFactory.getHypothesisJSON(lead).then( (response)=>{
					console.log(response);
				});
			});
			// 
 			$scope.userHypothesis = {};
 		});
	};
	$scope.selectedLeads = function(){
		$scope.selectedLeads = $scope.searchLeads.filter(function(lead){
			return lead.selected;
		});
		// console.log($scope.selectedLeads);
		// LeadFactory.getAllLeads().then( (leads)=>{
		// 	$scope.totalLeads = leads.length + 1;
		// });
		angular.forEach($scope.selectedLeads, function(value, key){
			let newLead = {
	 			title: value.document.title,
	 			projectId: $scope.clickProjectId,
	 			text: value.text,
	 			uri: value.uri,
	 			html: value.links.html,
	 			incontext: value.links.incontext,
	 			json: value.links.json,
	 			tags: value.tags,
	 			created: value.created,
	 			updated: value.updated,
	 			user: value.user,
	 			group: value.group,
	 			uid: $rootScope.user.uid
	 		};
	 		console.log("newLead", newLead);
	 		LeadFactory.postNewLead(newLead).then( (postNewResponse)=>{
					console.log("postNewResponse", postNewResponse);
				
			});
		});
	};
	$scope.searchArchives = (searchTerm)=>{
		console.log("search",searchTerm);
		$scope.filtered = [];
		var regex = new RegExp(".*" + searchTerm + ".*", "ig");
		angular.forEach($rootScope.archiveWiki, function(archive, key){
			console.log("archive", archive);
			angular.forEach(archive, function(value, key){
				if (regex.test(value)){
					console.log(value);
					$scope.filtered.push(archive);
				}
				console.log($scope.filtered);
			});
		});
	};
	$scope.selectedArchives = function(){
		console.log("selected click");
		$scope.selectedArchives = $rootScope.archiveWiki.filter(function(archive){
			return archive.selected;
		});
		console.log($scope.selectedArchives);
		// UserArchiveFactory.getAllArchives().then( (archives)=>{
		// 	$scope.totalArchives = archives.length + 1;
		// });
		angular.forEach($scope.selectedArchives, function(value, key){
			let newArchive = {
	 			title: value.Archive_Name,
	 			projectId: $scope.clickProjectId,
	 			description: value.Archive_Info,
	 			website: value.Archive_Link,
	 			uid: $rootScope.user.uid
	 		};

	 		console.log("newArchive", newArchive);
	 		UserArchiveFactory.postNewUserArchive(newArchive).then( (postNewResponse)=>{
					console.log("postNewResponse", postNewResponse);
				
			});
		});
	};
	$scope.finishedWorking = ()=>{
		$location.url('/projects/list');
	};
});