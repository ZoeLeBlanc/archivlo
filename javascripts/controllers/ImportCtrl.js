"use strict";
app.controller("ImportCtrl", function($scope, $rootScope, $routeParams, $location, ImportFactory, AnnotationFactory, HypothesisFactory){
	$scope.importHypothesis = true;
	$scope.importPDF = false;
	$scope.setImportHypothesis = function(){
		$scope.importHypothesis = true;
		$scope.importPDF = false;
	};
	$scope.setImportPDF = function(){
		$scope.importHypothesis = false;
		$scope.importPDF = true;
	};
	$scope.clickProjectId = $routeParams.id;
	console.log("$scope.projectId", $scope.clickProjectId);
	
	$scope.searchHypothesis = function(){
		$scope.searchAnnotations = {};
		$scope.newSearch = "search?";
		angular.forEach($scope.userHypothesis, function(value, key){
			$scope.newSearch += key+ '='+value + "&";
		});
		$scope.newSearch = $scope.newSearch.slice(0, -1);
		console.log("value", $scope.newSearch);
		HypothesisFactory.searchHypothesis($scope.newSearch).then( (searchResponse)=>{
			$scope.searchAnnotations = searchResponse[0];
			console.log($scope.searchAnnotations);
			// angular.forEach(searchResponse, function(value,key){
			// 	console.log("searchResponse", value);
			// 	value;
			// });	
 		$scope.userHypothesis = {};
 	});
		$scope.selectedAnnotation = function(){
			$scope.selectedAnnotations = $scope.searchAnnotations.filter(function(annotation){
				return annotation.selected;
			});
			console.log($scope.selectedAnnotations);
			angular.forEach($scope.selectedAnnotations, function(value, key){
				let newAnnotation = {
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
		 			id: value.id,
		 			uid: $rootScope.user.uid
		 		};
		 		console.log("newAnnotation", newAnnotation);
		 		AnnotationFactory.postNewAnnotation(newAnnotation).then( (postNewResponse)=>{
 					console.log("postNewResponse", postNewResponse);
 					$location.url('/projects/list');
 				});
			});
		};
	};
	
 	// 	let responses = testResponse[0];
 	// 	let test = responses[0];
 	// 	console.log("test", test.document.title);
 	// 	
 	// 	
 		// groupTest = responses[0];
 		// console.log("groupTest", groupTest.group);
 		// let userAccount = groupTest.user;
 		// HypothesisFactory.getHypothesisJson(groupTest).then( (groupResponse)=>{
 		// 	console.log("groupResponse", groupResponse);
 		// });
 		
		
 		
 	// });
 	// console.log("groupTest", groupTest.group);
});