import initialState from '../constants/initiate';
import * as types from '../constants/types';

/**
 * The pagination reducers controls the global pagination state
 * @method pagination
 * @module x-WeChat/reducers
 * @param {boolean} [state=initialState.pagination]   prev/initial state
 * @param {object} action                             Redux action
 * @returns {object}                                   next state
 */
export function pagination(state=initialState.pagination,action) {
    switch (action.type) {
        case types.posts.UPDATE_LINK:
            const nextState = Object.assign({},state);
            for (let k in action.links) {
                if (action.links.hasOwnProperty(k)) {
                    // NOTE: this is due to how Json-server works w/
                    // Because the frontend of the system terminates SSL
                    // from the sever have the http protocol set and not https.
                    // so https is required.
                    // deployed
                    if (Process.env.NODE_ENV === 'production') {
                        nextState[k] = action.links[k].url.replace(/http:\/\//, 'https://');
                    } else {
                        nextState[k] = action.links[k].url;
                    }
                }
            }
            return nextState;
        default:
            return state;
    }
}