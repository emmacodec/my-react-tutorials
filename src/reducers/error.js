import initialState from '../constants/initiate';
import * as types from '../constants/types';

/**
 * The user is responsible 
 * @method error
 * @module x-WeChat/reducers
 * @param {Object} [state=initialState.user]  object
 * @param {Object} action                     Redux action
 * @returns {object}                          next state
 */
export function error (state=initialState.error,action) {
    switch (action.type) {
        case types.app.ERROR:
            return action.error;
            default:
                return state;
    }
}