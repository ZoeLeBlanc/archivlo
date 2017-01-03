"use strict";
app.factory("StorageFactory", function($q, $http, FIREBASE_CONFIG){
	let uploadImage = (userId, imageFile)=>{
		return $q( (resolve, reject)=>{
			var storageRef = firebase.storage().ref(`${userId}/images/${imageFile.name}`);
		
			var uploadTask = storageRef.putString(imageFile.data, 'base64');
			// Listen for state changes, errors, and completion of the upload.
			uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
			  function(snapshot) {
			    console.log("snapshot", snapshot);
			  }, function(error) {
			  	console.log("error", error);
			  	reject(error);
			}, function() {
			  // Upload completed successfully, now we can get the download URL
			  console.log(uploadTask.snapshot);
			  var downloadURL = uploadTask.snapshot.downloadURL;
			 	resolve(downloadURL);
			});
		});
	};
	return {uploadImage};
});