"use strict";
app.factory("AnnotationFactory", function($q, $http, FIREBASE_CONFIG){
	//Firebase: get all Items
	var getAnnotationList = function(userId){
		return $q((resolve, reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/annotations.json?orderBy="uid"&equalTo="${userId}"`)
			 .success( (response)=>{
			 	let annotations = [];
			 	Object.keys(response).forEach((key)=>{
			 		response[key].id = key;
			 		annotations.push(response[key]);
			 	});
			 	resolve(annotations);
			 })
			 .error( (errorResponse)=>{
			 	reject(errorResponse);
			 });
		});
	};
	//Firebase: send a new item to Firebase
	var postNewAnnotation = function(newAnnotation){
		return $q((resolve, reject)=>{
			$http.post(`${FIREBASE_CONFIG.databaseURL}/annotations.json`, JSON.stringify({
				title: newAnnotation.title,
				projectId: newAnnotation.projectId,
				text: newAnnotation.text,
				uri: newAnnotation.uri,
				html: newAnnotation.html,
				incontext: newAnnotation.incontext,
				json: newAnnotation.json,
				tags: newAnnotation.tags,
				created: newAnnotation.created,
				updated: newAnnotation.updated,
				user: newAnnotation.user,
				references: newAnnotation.references,
				group: newAnnotation.group,
				id: newAnnotation.id,
				uid: newAnnotation.uid
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
	var deleteAnnotation = function(annotationId){
		return $q((resolve, reject)=>{
			$http.delete(`${FIREBASE_CONFIG.databaseURL}/annotations/${annotationId}.json`)
			 .success( (deleteReponse)=>{
			 	resolve(deleteReponse);
			 })
			 .error( (deleteError)=>{
			 	reject(deleteError);
			 });
		});
	};
	var getSingleAnnotation = function(annotationId){
		return $q((resolve, reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/annotations/${annotationId}.json`)
			 .success( (getSingleReponse)=>{
			 	resolve(getSingleReponse);
			 })
			 .error( (getSingleError)=>{
			 	reject(getSingleError);
			 });
		});
	};
	var editAnnotation = function(editAnnotation){
		return $q((resolve, reject)=>{
			$http.put(`${FIREBASE_CONFIG.databaseURL}/annotations/${editAnnotation.id}.json`, 
				JSON.stringify({
				title: editAnnotation.title,
				projectId: editAnnotation.projectId,
				text: editAnnotation.text,
				uri: editAnnotation.uri,
				html: editAnnotation.html,
				incontext: editAnnotation.incontext,
				json: editAnnotation.json,
				tags: editAnnotation.tags,
				created: editAnnotation.created,
				updated: editAnnotation.updated,
				user: editAnnotation.user,
				references: editAnnotation.references,
				group: editAnnotation.group,
				id: editAnnotation.id,
				uid: editAnnotation.uid
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
	return {getAnnotationList, postNewAnnotation, deleteAnnotation, getSingleAnnotation, editAnnotation};
});