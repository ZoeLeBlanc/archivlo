"use strict";
app.controller("NavCtrl", function($scope, $location){
	$scope.navItems = [
	{
		name:"Logout", 
		url:"#/logout"
	},
	{
		name:"All Boards", 
		url:"#/boards/list"
	},
	{
		name:"Search", 
		url:"#/search"
	}
];
});