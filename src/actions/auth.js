// creating user related actions using the firebase
import * as types from '../constants/types';
import { history } from '../history';
import {createError} from '../error';
import { loading,loaded } from '../reducers/loading';
import * as API from '../http';
import {getFirebaseUser,loginWithEmail,logUserOut,getFirebaseToken} from '../backend/auth';

/**
 * Handles the user logging in
 * @method loginSuccess
 * @param {object}          user user object from firebase
 * @param {object}          token firbase token,used for SSR
 * @returns {object}
 */
export function loginSuccess(user,token) {
    return {
        type: types.auth.LOGIN_SUCCESS,
        user,
        token,

    };
}
/**
 * Handles logout
 * @method logoutSuccess
 * @returns {object}
 */
export function logoutSuccess() {
    return {
        type: types.auth.LOGOUT_SUCCESS,
    };
}

/**
 * Logs a user out
 * @method logout
 * @returns {object}
 */
export function logout() {
    return dispatch => {
        return logUserOut()
           .then(() => {
               history.push('/login');
               dispatch(logoutSuccess());
               window.Raven.setUserContext();
           })
           .catch (err => dispatch(createError(err)));
    };
}

/**
 * Logs a user in
 * @method login
 * @returns {object}
 */
export function login() {
    return dispatch => {
        return loginWithEmail().then(async () => {
            try {
                dispatch(loading());
                const user = await getFirebaseUser();
                const token = await getFirebaseToken();
                const res = await API.loadUser(user.uid);
                if (res.status === 404) {
                    const userPayload = {
                        name: user.displayName,
                        profilePicure: user.photoURL,
                        id: user.uid
                    };
                    const  newUser = await API.createUser(userPayload).then(res => res.json());
                    dispatch(loginSuccess(newUser,token));
                    dispatch(loaded());
                    history.push('/');
                    return newUser;
                }
                const extinguisher = await res.json();
                dispatch(loginSuccess(extinguisher,token));
                dispatch(loaded());
                history.push('/');
                return extinguisher;
            } catch (err) {
                createError(err);
            }
        });
    };
}