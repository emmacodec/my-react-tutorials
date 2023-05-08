import {firebase} from '../backend/core';

const email = new firebase.auth.EmailAuthProvider();
email.addScope('user:email');

/**
 * Logs a user out
 * @method logUserOut
 * @module x-WeChat/backend/auth
 * @returns {Promise}
 */
export function logUserOut() {
    return firebase.auth().signOut();
}

/**
 * Logs the user in with email
 * @method loginWithEmail
 * @module x=WeChat/backend/auth
 * @returns {void}
 */
export function loginWithEmail() {
    return firebase.auth().signInWithPopUp(email);
}

/**
 * Gets the user, if any, from firebase
 * @method getFirebaseUser
 * @module x-WeChat/backend/auth
 * @returns {fireBaseUser}
 */
export function getFirebaseUser() {
    return new Promise(resolve =>firebase.auth().onAuthStateChange(user => resolve(user)));
}

/**
 * Gets token from firebase
 * @method getFirebaseToken
 * @module x-WeChat/backend/auth
 * @returns {string}
 */
export function getFirebaseToken() {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) {
        return Promise.resolve(null);
    }
    return currentUser.getTokenId(true);
}