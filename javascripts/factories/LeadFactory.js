"use strict";
app.factory("LeadFactory", function($q, $http, FIREBASE_CONFIG){
	//Firebase: get all Items
	var getLeadList = function(userId){
		return $q((resolve, reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/leads.json?orderBy="uid"&equalTo="${userId}"`)
			 .success( (response)=>{
			 	let leads = [];
			 	Object.keys(response).forEach((key)=>{
			 		response[key].id = key;
			 		leads.push(response[key]);
			 	});
			 	resolve(leads);
			 })
			 .error( (errorResponse)=>{
			 	reject(errorResponse);
			 });
		});
	};
	//Firebase: send a new item to Firebase
	var postNewLead = function(newLead){
		return $q((resolve, reject)=>{
			$http.post(`${FIREBASE_CONFIG.databaseURL}/leads.json`, JSON.stringify({
				title: newLead.title,
				projectId: newLead.projectId,
				archiveId: newLead.archiveId,
				collectionId: newLead.collectionId,
				folderId: newLead.folderId,
				text: newLead.text,
				uri: newLead.uri,
				html: newLead.html,
				incontext: newLead.incontext,
				json: newLead.json,
				tags: newLead.tags,
				created: newLead.created,
				updated: newLead.updated,
				user: newLead.user,
				references: newLead.references,
				group: newLead.group,
				id: newLead.id,
				uid: newLead.uid
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
	var deleteLead = function(leadId){
		return $q((resolve, reject)=>{
			$http.delete(`${FIREBASE_CONFIG.databaseURL}/leads/${leadId}.json`)
			 .success( (deleteReponse)=>{
			 	resolve(deleteReponse);
			 })
			 .error( (deleteError)=>{
			 	reject(deleteError);
			 });
		});
	};
	var getSingleLead = function(leadId){
		return $q((resolve, reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/leads/${leadId}.json`)
			 .success( (getSingleReponse)=>{
			 	resolve(getSingleReponse);
			 })
			 .error( (getSingleError)=>{
			 	reject(getSingleError);
			 });
		});
	};
	var getAllLeads = function(){
		return $q((resolve, reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/leads/.json`)
			 .success( (response)=>{
			 	let leads = [];
			 	Object.keys(response).forEach((key)=>{
			 		response[key].id = key;
			 		leads.push(response[key]);
			 	});
			 	resolve(leads);
			 })
			 .error( (getSingleError)=>{
			 	reject(getSingleError);
			 });
		});
	};
	var editLead = function(editLead){
		return $q((resolve, reject)=>{
			$http.put(`${FIREBASE_CONFIG.databaseURL}/leads/${editLead.id}.json`, 
				JSON.stringify({
				title: editLead.title,
				projectId: editLead.projectId,
				archiveId: editLead.archiveId,
				collectionId: editLead.collectionId,
				folderId: editLead.folderId,
				text: editLead.text,
				uri: editLead.uri,
				html: editLead.html,
				incontext: editLead.incontext,
				json: editLead.json,
				tags: editLead.tags,
				created: editLead.created,
				updated: editLead.updated,
				user: editLead.user,
				references: editLead.references,
				group: editLead.group,
				id: editLead.id,
				uid: editLead.uid
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
	return {getLeadList, postNewLead, deleteLead, getSingleLead, editLead, getAllLeads};
});