"use strict";

app.factory("UserFactory", function($q, $http, FIREBASE_CONFIG){
	let addUser = (authData)=>{
		return $q((resolve,reject)=>{
			$http.post(`${FIREBASE_CONFIG.databaseURL}/users.json`, 
				JSON.stringify({
					uid: authData.uid,
					username: authData.username
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
	let getUser = (userId)=>{
		return $q((resolve,reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/users.json?orderBy="uid"&equalTo="${userId}"`)
			.success((userObject)=>{
				let users = [];
				Object.keys(userObject).forEach( (key)=>{
					users.push(userObject[key]);
				});
				resolve(users[0]);
			})
			.error((getUserError)=>{
				reject(getUserError);
			});
		});

	};
	return {addUser:addUser, getUser:getUser};
});