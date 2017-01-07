// "use strict";
// app.factory("FolderFactory", function($q, $http, FIREBASE_CONFIG){
// 	//Firebase: get all Items
// 	var getFolderList = function(userId){
// 		return $q((resolve, reject)=>{
// 			$http.get(`${FIREBASE_CONFIG.databaseURL}/folders.json?orderBy="uid"&equalTo="${userId}"`)
// 			 .success( (response)=>{
// 			 	let folders = [];
// 			 	Object.keys(response).forEach((key)=>{
// 			 		response[key].id = key;
// 			 		folders.push(response[key]);
// 			 	});
// 			 	resolve(folders);
// 			 })
// 			 .error( (errorResponse)=>{
// 			 	reject(errorResponse);
// 			 });
// 		});
// 	};
// 	//Firebase: send a new item to Firebase
// 	var postNewFolder = function(newFolder){
// 		return $q((resolve, reject)=>{
// 			$http.post(`${FIREBASE_CONFIG.databaseURL}/folders.json`, JSON.stringify({
// 				title: newFolder.title,
// 				dateCreated: newFolder.dateCreated,
// 				dateUpdated: newFolder.dateUpdated,
// 				projectId: newFolder.projectId,
// 				uid: newFolder.uid
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
// 	var deleteFolder = function(folderId){
// 		return $q((resolve, reject)=>{
// 			$http.delete(`${FIREBASE_CONFIG.databaseURL}/folders/${folderId}.json`)
// 			 .success( (deleteReponse)=>{
// 			 	resolve(deleteReponse);
// 			 })
// 			 .error( (deleteError)=>{
// 			 	reject(deleteError);
// 			 });
// 		});
// 	};
// 	var getSingleFolder = function(folderId){
// 		return $q((resolve, reject)=>{
// 			$http.get(`${FIREBASE_CONFIG.databaseURL}/folders/${folderId}.json`)
// 			 .success( (getSingleReponse)=>{
// 			 	resolve(getSingleReponse);
// 			 })
// 			 .error( (getSingleError)=>{
// 			 	reject(getSingleError);
// 			 });
// 		});
// 	};
// 	var editFolder = function(editFolder){
// 		return $q((resolve, reject)=>{
// 			$http.put(`${FIREBASE_CONFIG.databaseURL}/folders/${editFolder.id}.json`, 
// 				JSON.stringify({
// 				title: editFolder.title,
// 				dateCreated: editFolder.dateCreated,
// 				dateUpdated: editFolder.dateUpdated,
// 				projectId: editFolder.projectId,
// 				uid: editFolder.uid
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
// 	return {getFolderList, postNewFolder, deleteFolder, getSingleFolder, editFolder};
// });