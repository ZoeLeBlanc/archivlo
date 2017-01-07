"use strict";
app.controller("LatestActivityCtrl", function($scope, $rootScope, $timeout, StorageFactory, UserFactory, ProjectFactory, HypothesisFactory){
	$scope.hypothesisOptions = ["any", "user", "group", "tag", "url"];

	$('.chips-initial').material_chip({
	    data: [{
	      tag: 'Apple',
	    }, {
	      tag: 'Microsoft',
	    }, {
	      tag: 'Google',
	    }],
	  });
	var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
 	var today = (new Date()).getDay();
 	$scope.sortedList = weekdays.slice(today).concat(weekdays.slice(0,today));
 	console.log("today number", $scope.sortedList);
 	$scope.labels = $scope.sortedList;

 	$scope.series = ['Series A', 'Series B'];
  	$scope.data = [
    	[65, 59, 80, 81, 56, 55, 40],
    	[28, 48, 40, 19, 86, 27, 90]
  	];
  	$scope.onClick = function (points, evt) {
    	console.log(points, evt);
  	};
  	$scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
  	$scope.options = {
	    scales: {
	      yAxes: [
	        {
	          id: 'y-axis-1',
	          type: 'linear',
	          display: true,
	          position: 'left'
	        },
	        {
	          id: 'y-axis-2',
	          type: 'linear',
	          display: true,
	          position: 'right'
	        }
	      ]
	    }
 	};
 	$scope.searchHypothesis = function(searchTerms, searchProp){
		$scope.HypothesisData = [];
		angular.forEach(searchTerms, function(value, key){
			$scope.searchAnnotations = {};
			$scope.newSearch = "search?";
			$scope.newSearch += searchProp+ '='+value + "&";
			$scope.newSearch = $scope.newSearch.slice(0, -1);
			console.log("value", $scope.newSearch);
			HypothesisFactory.searchHypothesis($scope.newSearch).then( (searchResponse)=>{
				$scope.searchAnnotations = searchResponse[0];
				console.log($scope.searchAnnotations);
				$scope.HypothesisData.push($scope.searchAnnotations);
				// angular.forEach(searchResponse, function(value,key){
				// 	console.log("searchResponse", value);
				// 	value;
				// });
				console.log($scope.HypothesisData);	
	 		});
	 		console.log($scope.HypothesisData);
		});
		console.log($scope.HypothesisData);
 	};
 	$scope.getSearchies = ()=>{
 		$scope.searchedTerms = [];
 		console.log("selectedOption", $scope.selectedOption);
 		var data = $('#searchChips').material_chip('data');
 		angular.forEach(data, (value, index)=>{
 			console.log("data", data[index].tag);
 			$scope.searchedTerms.push(data[index].tag);
 			console.log($scope.searchedTerms);
 		});	
 		$scope.searchHypothesis($scope.searchedTerms, $scope.selectedOption);
 		$scope.searchedTerms = [];
 		$scope.searchTerms = "";
 	};
});