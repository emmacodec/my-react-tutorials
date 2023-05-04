import * as types from '../constants/types';

/**
 * Put the app in a loading state
 * @method loading
 
 * @returns {Object}
 */
export function loading() {
    return {
        type: types.app.LOADING
    };
}

/**
 * Put the app in loaded state
 * @method loaded
 
 * @returns {Object}
 */
export function loaded() {
    return {
        type: types.app.LOADED
    };
}