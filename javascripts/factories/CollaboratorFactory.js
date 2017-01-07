// "use strict";
// app.factory("CollaboratorFactory", function($q, $http, FIREBASE_CONFIG){
// 	//Firebase: get all Items
// 	var getCollaboratorList = function(userId){
// 		return $q((resolve, reject)=>{
// 			$http.get(`${FIREBASE_CONFIG.databaseURL}/collaborators.json?orderBy="uid"&equalTo="${userId}"`)
// 			 .success( (response)=>{
// 			 	let collaborators = [];
// 			 	Object.keys(response).forEach((key)=>{
// 			 		response[key].id = key;
// 			 		collaborators.push(response[key]);
// 			 	});
// 			 	resolve(collaborators);
// 			 })
// 			 .error( (errorResponse)=>{
// 			 	reject(errorResponse);
// 			 });
// 		});
// 	};
// 	//Firebase: send a new item to Firebase
// 	var postNewCollaborator = function(newCollaborator){
// 		return $q((resolve, reject)=>{
// 			$http.post(`${FIREBASE_CONFIG.databaseURL}/collaborators.json`, JSON.stringify({
// 				userId: newCollaborator.userId,
// 				displayName: newCollaborator.displayName,
// 				projectId: newCollaborator.projectId,
// 				uid: newCollaborator.uid
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
// 	var deleteCollaborator = function(collaboratorId){
// 		return $q((resolve, reject)=>{
// 			$http.delete(`${FIREBASE_CONFIG.databaseURL}/collaborators/${collaboratorId}.json`)
// 			 .success( (deleteReponse)=>{
// 			 	resolve(deleteReponse);
// 			 })
// 			 .error( (deleteError)=>{
// 			 	reject(deleteError);
// 			 });
// 		});
// 	};
// 	var getSingleCollaborator = function(collaboratorId){
// 		return $q((resolve, reject)=>{
// 			$http.get(`${FIREBASE_CONFIG.databaseURL}/collaborators/${collaboratorId}.json`)
// 			 .success( (getSingleReponse)=>{
// 			 	resolve(getSingleReponse);
// 			 })
// 			 .error( (getSingleError)=>{
// 			 	reject(getSingleError);
// 			 });
// 		});
// 	};
// 	var editCollaborator = function(editCollaborator){
// 		return $q((resolve, reject)=>{
// 			$http.put(`${FIREBASE_CONFIG.databaseURL}/collaborators/${editCollaborator.id}.json`, 
// 				JSON.stringify({
// 				userId: editCollaborator.userId,
// 				displayName: editCollaborator.displayName,
// 				projectId: editCollaborator.projectId,
// 				uid: editCollaborator.uid
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
// 	return {getCollaboratorList, postNewCollaborator, deleteCollaborator, getSingleCollaborator, editCollaborator};
// });