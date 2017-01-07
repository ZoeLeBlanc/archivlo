"use strict";
app.factory("ArchiveWikiFactory", function($q, $http, FIREBASE_CONFIG){
	//Firebase: get all Items
	var getArchiveWikiList = function(){
		return $q((resolve, reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/archivesWiki.json`)
			 .success( (response)=>{
			 	// console.log("response", response);
			 	// let archiveList = JSON.parse(response);


			 	let archiveWikis = [];
			 	Object.keys(response).forEach((key)=>{
			 		archiveWikis.push(response[key]);
			 	});
			 	console.log(archiveWikis);
			 	resolve(archiveWikis);
			 })
			 .error( (errorResponse)=>{
			 	reject(errorResponse);
			 });
		});
	};

	return {getArchiveWikiList};
});