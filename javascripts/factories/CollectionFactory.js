// "use strict";
// app.factory("CollectionFactory", function($q, $http, FIREBASE_CONFIG){
// 	//Firebase: get all Items
// 	var getCollectionList = function(userId){
// 		return $q((resolve, reject)=>{
// 			$http.get(`${FIREBASE_CONFIG.databaseURL}/collections.json?orderBy="uid"&equalTo="${userId}"`)
// 			 .success( (response)=>{
// 			 	let collections = [];
// 			 	Object.keys(response).forEach((key)=>{
// 			 		response[key].id = key;
// 			 		collections.push(response[key]);
// 			 	});
// 			 	resolve(collections);
// 			 })
// 			 .error( (errorResponse)=>{
// 			 	reject(errorResponse);
// 			 });
// 		});
// 	};
// 	//Firebase: send a new item to Firebase
// 	var postNewCollection = function(newCollection){
// 		return $q((resolve, reject)=>{
// 			$http.post(`${FIREBASE_CONFIG.databaseURL}/collections.json`, JSON.stringify({
// 				archiveId: newCollection.archiveId,
// 				title: newCollection.title,
// 				website: newCollection.website,
// 				leadId: newCollection.leadId,
// 				folderId: newCollection.folderId,
// 				projectId: newCollection.projectId,
// 				uid: newCollection.uid
// 				})
// 			)
// 			 .success( (postResponse)=>{
// 			 	resolve(postResponse);
// 			 })
// 			 .error( (errorResponse)=>{
// 			 	reject(errorResponse);
// 			 });
// 		});
// 	};
// 	var deleteCollection = function(collectionId){
// 		return $q((resolve, reject)=>{
// 			$http.delete(`${FIREBASE_CONFIG.databaseURL}/collections/${collectionId}.json`)
// 			 .success( (deleteReponse)=>{
// 			 	resolve(deleteReponse);
// 			 })
// 			 .error( (deleteError)=>{
// 			 	reject(deleteError);
// 			 });
// 		});
// 	};
// 	var getSingleCollection = function(collectionId){
// 		return $q((resolve, reject)=>{
// 			$http.get(`${FIREBASE_CONFIG.databaseURL}/collections/${collectionId}.json`)
// 			 .success( (getSingleReponse)=>{
// 			 	resolve(getSingleReponse);
// 			 })
// 			 .error( (getSingleError)=>{
// 			 	reject(getSingleError);
// 			 });
// 		});
// 	};
// 	var editCollection = function(editCollection){
// 		return $q((resolve, reject)=>{
// 			$http.put(`${FIREBASE_CONFIG.databaseURL}/collections/${editCollection.id}.json`, 
// 				JSON.stringify({
// 				archiveId: editCollection.archiveId,
// 				title: editCollection.title,
// 				website: editCollection.website,
// 				leadId: editCollection.leadId,
// 				folderId: editCollection.folderId,
// 				projectId: editCollection.projectId,
// 				uid: editCollection.uid
// 				})
// 			)
// 			 .success( (editResponse)=>{
// 			 	resolve(editResponse);
// 			 })
// 			 .error( (errorResponse)=>{
// 			 	reject(errorResponse);
// 			 });
// 		});
// 	};
// 	return {getCollectionList, postNewCollection, deleteCollection, getSingleCollection, editCollection};
// });