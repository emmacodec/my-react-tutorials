import * as types from '../constants/types';
import * as API from '../http';
import { createError } from '../error';

/**
 * Show comments for a post
 * @method showComments
 
 *@param {String} postId post Id
 *@returns {Object} 
 */
export function showComments(postId) {
    return {
        type: types.comments.SHOW,
        postId
    };
}

/**
 * Toggle comments for a post open or closed
 * @method toggleComments
 
 * @param {String} postId post Id to toggle comments for
 * @returns {Object}
 */
export function toggleComments(postId) {
    return {
        type: types.comments.TOGGLE,
        postId
    };
}

/**
 * Update what comments are available to the app
 * @method UpdateAvailableComments
 
 * @param {Array<Object>}                    comments incoming comments
 * @returns {Object}
 */
export function UpdateAvailableComments(comments) {
    return {
        type: types.comments.GET,
        comments
    };
}

/**
 * Create a comment
 * @method CreateComment
 
 * @param {Object}    payload comment payload
 * @returns {Object}
 */
export function CreateComment(payload) {
    return dispatch => {
        return API.createComment(payload)
             .then(res => res.json())
             .then(Comment => {
                dispatch( {
                    type: types.comments.CREATE,
                    Comment
                });
             })
             .catch(err => dispatch(createError(err)));
    };
}

/**
 * Load the comments for a particular post
 * @method getCommentsForPost
  
 * @param {String}           postId post Id to load for
 * @returns {Object}
 */
export function getCommentsForPost(postId) {
    return dispatch => {
        return API.fetchCommentsForPost(postId)
             .then(res => res.json())
             .then(comments => dispatch(UpdateAvailableComments(comments)))
             .catch(err => dispatch(createError(err)));
    };
}