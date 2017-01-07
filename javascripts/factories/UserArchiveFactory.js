"use strict";
app.factory("UserArchiveFactory", function($q, $http, FIREBASE_CONFIG){
	//Firebase: get all Items
	var getUserArchiveList = function(userId){
		return $q((resolve, reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/userArchives.json?orderBy="uid"&equalTo="${userId}"`)
			 .success( (response)=>{
			 	let userArchives = [];
			 	Object.keys(response).forEach((key)=>{
			 		response[key].id = key;
			 		userArchives.push(response[key]);
			 	});
			 	resolve(userArchives);
			 })
			 .error( (errorResponse)=>{
			 	reject(errorResponse);
			 });
		});
	};
	//Firebase: send a new item to Firebase
	var postNewUserArchive = function(newUserArchive){
		return $q((resolve, reject)=>{
			$http.post(`${FIREBASE_CONFIG.databaseURL}/userArchives.json`, JSON.stringify({
				title: newUserArchive.title,
				description: newUserArchive.description,
				projectId: newUserArchive.projectId,
				leadId: newUserArchive.leadId,
				addressId: newUserArchive.addressId,
				websiteId: newUserArchive.websiteId,
				uid: newUserArchive.uid
				})
			)
			 .success( (postResponse)=>{
			 	resolve(postResponse);
			 })
			 .error( (errorResponse)=>{
			 	reject(errorResponse);
			 });
		});
	};
	var deleteUserArchive = function(userArchiveId){
		return $q((resolve, reject)=>{
			$http.delete(`${FIREBASE_CONFIG.databaseURL}/userArchives/${userArchiveId}.json`)
			 .success( (deleteReponse)=>{
			 	resolve(deleteReponse);
			 })
			 .error( (deleteError)=>{
			 	reject(deleteError);
			 });
		});
	};
	var getSingleUserArchive = function(userArhciveId){
		return $q((resolve, reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/userArhcives/${userArhciveId}.json`)
			 .success( (getSingleReponse)=>{
			 	resolve(getSingleReponse);
			 })
			 .error( (getSingleError)=>{
			 	reject(getSingleError);
			 });
		});
	};
	var editUserArchive = function(editUserArchive){
		return $q((resolve, reject)=>{
			$http.put(`${FIREBASE_CONFIG.databaseURL}/userArchives/${editUserArchive.id}.json`, 
				JSON.stringify({
				title: editUserArchive.title,
				description: editUserArchive.description,
				projectId: editUserArchive.projectId,
				leadId: editUserArchive.leadId,
				addressId: editUserArchive.addressId,
				websiteId: editUserArchive.websiteId,
				uid: editUserArchive.uid
				})
			)
			 .success( (editResponse)=>{
			 	resolve(editResponse);
			 })
			 .error( (errorResponse)=>{
			 	reject(errorResponse);
			 });
		});
	};
	var getAllArchives = function(){
		return $q((resolve, reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/userArchives.json"`)
			 .success( (response)=>{
			 	let userArchives = [];
			 	Object.keys(response).forEach((key)=>{
			 		response[key].id = key;
			 		userArchives.push(response[key]);
			 	});
			 	resolve(userArchives);
			 })
			 .error( (errorResponse)=>{
			 	reject(errorResponse);
			 });
		});
	};
	return {getUserArchiveList, postNewUserArchive, deleteUserArchive, getSingleUserArchive, editUserArchive, getAllArchives};
});