"use strict";
app.factory("TagFactory", function($q, $http, FIREBASE_CONFIG){
	//Firebase: get all Items
	var getTagList = function(userId){
		return $q((resolve, reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/tags.json?orderBy="uid"&equalTo="${userId}"`)
			 .success( (response)=>{
			 	let tags = [];
			 	Object.keys(response).forEach((key)=>{
			 		response[key].id = key;
			 		tags.push(response[key]);
			 	});
			 	resolve(tags);
			 })
			 .error( (errorResponse)=>{
			 	reject(errorResponse);
			 });
		});
	};
	//Firebase: send a new item to Firebase
	var postNewTag = function(newTag){
		return $q((resolve, reject)=>{
			$http.post(`${FIREBASE_CONFIG.databaseURL}/tags.json`, JSON.stringify({
				tag: newTag.tag,
				projectId: newTag.projectId,
				folderId: newTag.folderId,
				noteId: newTag.noteId,
				leadId: newTag.leadId,
				archiveId: newTag.archiveId,
				collectionId: newTag.collectionId,
				uid: newTag.uid
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
	var deleteTag = function(tagId){
		return $q((resolve, reject)=>{
			$http.delete(`${FIREBASE_CONFIG.databaseURL}/tags/${tagId}.json`)
			 .success( (deleteReponse)=>{
			 	resolve(deleteReponse);
			 })
			 .error( (deleteError)=>{
			 	reject(deleteError);
			 });
		});
	};
	var getSingleTag = function(tagId){
		return $q((resolve, reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/tags/${tagId}.json`)
			 .success( (getSingleReponse)=>{
			 	resolve(getSingleReponse);
			 })
			 .error( (getSingleError)=>{
			 	reject(getSingleError);
			 });
		});
	};
	var editTag = function(editTag){
		return $q((resolve, reject)=>{
			$http.put(`${FIREBASE_CONFIG.databaseURL}/tags/${editTag.id}.json`, 
				JSON.stringify({
				tag: editTag.tag,
				projectId: editTag.projectId,
				folderId: editTag.folderId,
				noteId: editTag.noteId,
				leadId: editTag.leadId,
				archiveId: editTag.archiveId,
				collectionId: editTag.collectionId,
				uid: editTag.uid
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
	return {getTagList, postNewTag, deleteTag, getSingleTag, editTag};
});