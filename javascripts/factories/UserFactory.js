"use strict";

app.factory("UserFactory", function($q, $http, FIREBASE_CONFIG){
	let addUser = (authData)=>{
		return $q((resolve,reject)=>{
			$http.post(`${FIREBASE_CONFIG.databaseURL}/users.json`, 
				JSON.stringify({
					uid: authData.uid,
					username: authData.username,
					hypothesisUsername: authData.hypothesisUsername,
					hypothesisToken: authData.hypothesisToken
				})
			)
			.success( (addUserResponse)=>{
				resolve(addUserResponse);
			})
			.error( (addUserError)=>{
				reject(addUserError);
			});
		});
	};
	let updateUser = (updateData,userId)=>{
		return $q((resolve,reject)=>{
			$http.patch(`${FIREBASE_CONFIG.databaseURL}/users/${userId}.json`, 
				JSON.stringify({
					hypothesisUsername: updateData.hypothesisUsername,
					hypothesisToken: updateData.hypothesisToken
				})
			)
			.success( (updateUserResponse)=>{
				resolve(updateUserResponse);
			})
			.error( (addUserError)=>{
				reject(addUserError);
			});
		});
	};
	let getUser = (userId, userEmail)=>{
		return $q((resolve,reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/users.json?orderBy="uid"&equalTo="${userId}"`)
			.success((userObject)=>{
				let users = [];
				Object.keys(userObject).forEach( (key)=>{
					users.push(userObject[key]);
				});
				console.log(userEmail);
				users[0].email = userEmail;
				resolve(users[0]);
			})
			.error((getUserError)=>{
				reject(getUserError);
			});
		});

	};
	let userUploadProfile = (userId, imageReference)=>{

	};
	return {addUser, getUser, updateUser};
});