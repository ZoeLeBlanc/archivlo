"use strict";
app.factory("ProjectFactory", function($q, $http, FIREBASE_CONFIG){
	//Firebase: get all Items
	var getProjectList = function(userId){
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
	//Firebase: send a new item to Firebase
	var postNewProject = function(newProject){
		return $q((resolve, reject)=>{
			$http.post(`${FIREBASE_CONFIG.databaseURL}/projects.json`, JSON.stringify({
				title: newProject.title,
				description: newProject.description,
				keywords: newProject.keywords,
				dateCreated: newProject.dateCreated,
				dateUpdated: newProject.dateUpdated,
				private: newProject.private,
				uid: newProject.uid,
				coverPhoto: newProject.coverPhoto,
				statusId: newProject.statusId
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
	var deleteProject = function(projectId){
		return $q((resolve, reject)=>{
			$http.delete(`${FIREBASE_CONFIG.databaseURL}/projects/${projectId}.json`)
			 .success( (deleteReponse)=>{
			 	resolve(deleteReponse);
			 })
			 .error( (deleteError)=>{
			 	reject(deleteError);
			 });
		});
	};
	var getSingleProject = function(projectId){
		return $q((resolve, reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/projects/${projectId}.json`)
			 .success( (getSingleReponse)=>{
			 	resolve(getSingleReponse);
			 })
			 .error( (getSingleError)=>{
			 	reject(getSingleError);
			 });
		});
	};
	var editProject = function(editProject){
		return $q((resolve, reject)=>{
			$http.put(`${FIREBASE_CONFIG.databaseURL}/projects/${editProject.id}.json`, 
				JSON.stringify({
				title: editProject.title,
				description: editProject.description,
				keywords: editProject.keywords,
				dateCreated: editProject.dateCreated,
				dateUpdated: editProject.dateUpdated,
				private: editProject.private,
				uid: editProject.uid,
				coverPhoto: editProject.coverPhoto,
				statusId: editProject.statusId
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
	//Firebase: get all Items
	var getAllProjectList = function(userId){
		return $q((resolve, reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/projects.json`)
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
	return {getProjectList, postNewProject, deleteProject, getSingleProject, editProject, getAllProjectList};
});