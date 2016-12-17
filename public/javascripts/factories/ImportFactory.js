"use strict";
app.factory("ImportFactory", function($q, $http, FIREBASE_CONFIG){
	var getImportList = function(userId){
		return $q((resolve, reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/projects.json?orderBy="uid"&equalTo="${userId}"`)
			 .success( (response)=>{
			 	let projects = [];
			 	Object.keys(response).forEach((key)=>{
			 		response[key].id = key;
			 		projects.push(response[key]);
			 	});
			 	resolve(projects);
			 })
			 .error( (errorResponse)=>{
			 	reject(errorResponse);
			 });
		});
	};
	return {getImportList};
});