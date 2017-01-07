"use strict";
app.factory("NoteFactory", function($q, $http, FIREBASE_CONFIG){
	//Firebase: get all Items
	var getNoteList = function(userId){
		return $q((resolve, reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/notes.json?orderBy="uid"&equalTo="${userId}"`)
			 .success( (response)=>{
			 	let notes = [];
			 	Object.keys(response).forEach((key)=>{
			 		response[key].id = key;
			 		notes.push(response[key]);
			 	});
			 	resolve(notes);
			 })
			 .error( (errorResponse)=>{
			 	reject(errorResponse);
			 });
		});
	};
	//Firebase: send a new item to Firebase
	var postNewNote = function(newNote){
		return $q((resolve, reject)=>{
			$http.post(`${FIREBASE_CONFIG.databaseURL}/notes.json`, JSON.stringify({
				title: newNote.title,
				description: newNote.description,
				keywords: newNote.keywords,
				dateCreated: newNote.dateCreated,
				dateUpdated: newNote.dateUpdated,
				projectId: newNote.projectId,
				folderId: newNote.folderId,
				leadId: newNote.leadId,
				archiveId: newNote.archiveId,
				collectionId: newNote.collectionId,
				uid: newNote.uid
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
	var deleteNote = function(noteId){
		return $q((resolve, reject)=>{
			$http.delete(`${FIREBASE_CONFIG.databaseURL}/notes/${noteId}.json`)
			 .success( (deleteReponse)=>{
			 	resolve(deleteReponse);
			 })
			 .error( (deleteError)=>{
			 	reject(deleteError);
			 });
		});
	};
	var getSingleNote = function(noteId){
		return $q((resolve, reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/notes/${noteId}.json`)
			 .success( (getSingleReponse)=>{
			 	resolve(getSingleReponse);
			 })
			 .error( (getSingleError)=>{
			 	reject(getSingleError);
			 });
		});
	};
	var editNote = function(editNote){
		return $q((resolve, reject)=>{
			$http.put(`${FIREBASE_CONFIG.databaseURL}/notes/${editNote.id}.json`, 
				JSON.stringify({
				title: editNote.title,
				description: editNote.description,
				keywords: editNote.keywords,
				dateCreated: editNote.dateCreated,
				dateUpdated: editNote.dateUpdated,
				projectId: editNote.projectId,
				folderId: editNote.folderId,
				leadId: editNote.leadId,
				archiveId: editNote.archiveId,
				collectionId: editNote.collectionId,
				uid: editNote.uid
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
	return {getNoteList, postNewNote, deleteNote, getSingleNote, editNote};
});