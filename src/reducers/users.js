// user related event that's login and logout 
import Cookies from 'js-cookie';

import initialState from '../constants/initiate';
import * as types from '../constants/types';
import {isServer} from '../utils/environment';

/**
 * The user is responsible 
 * @method user
 * @module X-WeChat/reducers
 * @param {object} [state=initialState.user]   state
 * @param {Object} action                      redux action
 * @returns {object}                           next state
 */
export function user(state=initialState.user,action) {
    switch (action.type) {
        case types.auth.LOGIN_SUCCESS:
            const {user,token} = action;
            if (!isServer()) {
                Cookies.set('X-Wechat-token',token);
            }
            return Object.assign({},state.user, {
                authenticated: true,
                name: user.name,
                id: user.id,
                profilePicture: user.profilePicture || '/static/assets/users/4.jpeg',
                token
            });
            case types.auth.LOGOUT_SUCCESS:
                Cookies.remove('X-WeChat-token');
                return initialState.user;
                default:
                    return state;
    }
}