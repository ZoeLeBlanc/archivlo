"use strict";
app.controller("NavCtrl", function($scope, $location){
	$scope.navItems = [
	{
		name:"Logout", 
		url:"#/logout"
	},
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