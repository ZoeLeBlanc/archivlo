"use strict";

app.factory("AuthFactory", function($q, $http, $rootScope, FIREBASE_CONFIG) {
  let currentUserData = null;

//Firebase: Determine if user is authenticated.
  let isAuthenticated = () => {
      return firebase.auth().currentUser ? true : false;
  };

//Firebase: Return email, UID for user that is currently logged in.
  let getUser = () => {
    return firebase.auth().currentUser;
  };

// Kills browser cookie with firebase credentials
  let logout = () => {
    firebase.auth().signOut();
  };

//Firebase: Use input credentials to authenticate user.
  let authenticate = (credentials) => {
    return $q((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
        .then((authData) =>{
          resolve(authData);
        })
        .catch((error)=>{
          reject(error);
        });
    });
  };

//Firebase: Register a new user with email and password
  let registerWithEmail = (user) => {
    return $q((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((authData) =>{
          resolve(authData);
        })
        .catch((error)=>{
          reject(error);
        });
    });
  };
//Firebase: Let change email address
  let changeEmail = (user) => {
    return $q((resolve, reject) => {
      firebase.auth().changeEmail({
        oldEmail: user.email, 
        newEmail: user.newEmail,
        password: user.password
      })
        .then((authData) =>{
          resolve(authData);
        })
        .catch((error)=>{
          reject(error);
        });
    });
  };
  //Firebase: Let change password
  let changePassword = (user) => {
    return $q((resolve, reject) => {
      firebase.auth().changePassword({
        email: user.email, 
        oldPassword: user.oldPassword,
        newPassword: user.newPassword
      })
        .then((authData) =>{
          resolve(authData);
        })
        .catch((error)=>{
          reject(error);
        });
    });
  };
//Firebase: GOOGLE - Use input credentials to authenticate user.
  let authenticateGoogle = () => {
    return $q((resolve, reject) => {
      var provider = new firebase.auth.GoogleAuthProvider();
      console.log("provider", provider);
      firebase.auth().signInWithPopup(provider)
        .then((authData) => {
          currentUserData = authData.user;
          console.log("currentUserData", currentUserData);
          resolve(currentUserData);
        }).catch((error)=> {
          reject(error);
        });
    });
  };

  return {isAuthenticated, getUser, logout, registerWithEmail, authenticate, authenticateGoogle, changeEmail, changePassword};
});