"use strict";
app.controller("LatestActivityCtrl", function($scope, $rootScope, $timeout, StorageFactory, UserFactory, ProjectFactory, AnnotationFactory, HypothesisFactory){
	$('.chips').material_chip();
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
 	};
 	$scope.getChips = ()=>{
 		var data = $('#searchChips').material_chip('data');
 		angular.forEach(data, (value, index)=>{
 			console.log("data", data[index].tag);
 		});	
 	};
 	
});