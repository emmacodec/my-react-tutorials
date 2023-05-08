import initialState from '../constants/initiate';
import * as types from '../constants/types';

/**
 * The loading controls the global loading state
 * @method loading
 * @module X-WeChat/reducers
 * @param {boolean} [state=initialState.loading]  prev/initial state
 * @param {Object} action                          Redux action
 * @returns {object}                               next action
 */
export function loading(state=initialState.loading,action) {
    switch (action.type) {
        case types.app.LOADING:
            return true;
            case types.app.LOADED:
                return false;
            default:
                return state;
    }
}