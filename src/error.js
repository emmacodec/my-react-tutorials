import * as types from '../constants/types';

/**
 * create an error
 * @method createError
 
 *@param {object} error Error objects,either from component or alphabet code
 *@param {string} info error description
 *@return {object} 
 */
export function createError(error,info) {
    return {
        type: types.app.Error,
        error,
        info
    };
}