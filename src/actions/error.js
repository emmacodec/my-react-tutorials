// Creating the error action
import * as types from '../constants/types';
/**
 * Create an error
 * @method createError
 
 * @param {0bject}    error   Error object, either from a component or application code
 * @param {String}     info error description
 * @returns {Object}
 */
export function createError(error,info) {
    return {
        type: types.app.Error,
        error,
        info
    };
}