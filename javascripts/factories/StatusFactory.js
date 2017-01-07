"use strict";
app.factory("StatusFactory", function($q, $http, FIREBASE_CONFIG){
	//Firebase: get all Items
	var getStatusList = function(){
		return $q((resolve, reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/statuses.json`)
			 .success( (response)=>{
			 	let statuses = [];
			 	Object.keys(response).forEach((key)=>{
			 		response[key].id = key;
			 		statuses.push(response[key]);
			 	});
			 	resolve(statuses);
			 })
			 .error( (errorResponse)=>{
			 	reject(errorResponse);
			 });
		});
	};

	return {getStatusList};
});