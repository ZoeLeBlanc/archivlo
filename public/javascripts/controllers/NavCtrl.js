"use strict";
app.controller("NavCtrl", function($scope, $location){
	$scope.navItems = [
	{
		name:"Projects", 
		url:"#/projects/list"
	},
	{
		name:"Search", 
		url:"#/search"
	}
];
  
});