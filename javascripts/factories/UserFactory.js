"use strict";

app.factory("UserFactory", function($q, $http, $rootScope, FIREBASE_CONFIG){
	let addUser = (authData)=>{
		return $q((resolve,reject)=>{
			$http.post(`${FIREBASE_CONFIG.databaseURL}/users.json`, 
				JSON.stringify({
					uid: authData.uid,
					displayName: authData.displayName,
					photoURL: authData.photoURL,
					hypothesisUsername: authData.hypothesisUsername,
					hypothesisToken: authData.hypothesisToken
				})
			)
			.success( (addUserResponse)=>{
				// addUserResponse.uid = authData.uid;
				resolve(addUserResponse);
			})
			.error( (addUserError)=>{
				reject(addUserError);
			});
		});
	};
	let getUser = (user)=>{
		return $q((resolve,reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/users.json?orderBy="uid"&equalTo="${user.uid}"`)
			.success((userObject)=>{
				console.log(userObject);
				let users = [];
				Object.keys(userObject).forEach( (key)=>{
					console.log(key);
					userObject[key].id = key;
					users.push(userObject[key]);
				});
				console.log(users[0]);
				users[0].email = user.email;
				if (!users[0].displayName){
					users[0].displayName = user.displayName;
				}
				// if (!users[0].photoURL){
				// 	users[0].photoURL = user.photoURL;
				// }
				resolve(users[0]);
			})
			.error((getUserError)=>{
				reject(getUserError);
			});
		});
	};
	let updateUserAvatar = (userId, newAvatar)=>{
		return $q((resolve,reject)=>{
			$http.patch(`${FIREBASE_CONFIG.databaseURL}/users/${userId}.json`, 
				JSON.stringify({
					photoURL: newAvatar
				})
			)
			.success( (updateUserAvatar)=>{
				resolve(updateUserAvatar);
			})
			.error( (updateUserAvatarError)=>{
				reject(updateUserAvatarError);
			});
		});
	};
	let updateUserHypothesis = (userId, newHypothesisCreds)=>{
		return $q((resolve,reject)=>{
			$http.patch(`${FIREBASE_CONFIG.databaseURL}/users/${userId}.json`, 
				JSON.stringify({
					hypothesisUsername: newHypothesisCreds.hypothesisUsername,
					hypothesisToken: newHypothesisCreds.hypothesisToken
				})
			)
			.success( (updateUserHypothesis)=>{
				resolve(updateUserHypothesis);
			})
			.error( (updateUserHypothesisError)=>{
				reject(updateUserHypothesisError);
			});
		});
	};
	let checkUser = (userCheck)=>{
		return $q( (resolve, reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/users.json?orderBy="uid"&equalTo="${userCheck.uid}"`)
			.success((userObject)=>{
				console.log("userObject", userObject);
				resolve(userObject);
			})
			.error((getUserError)=>{
				console.log("error", getUserError);
				reject(getUserError);
			});
		});
	};
	return {addUser, getUser, updateUserAvatar, updateUserHypothesis, checkUser};
});