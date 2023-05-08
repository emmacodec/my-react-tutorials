// creating comments for reducers component
import initialState from '../constants/initiate';
import * as types from '../constants/types';

/**
 * The comments reducers is responsible for controlling comments
 * @module comments
 * @module X-WeChat/reducers
 * @param {Object}     [state=initialState.user] object
 * @param {object}      action                   redux action
 * @returns {Object}                             next action
 */
export function comments(state=initialState.comments,action) {
    switch (action.type) {
        case types.comments.GET: {
            const {comments} = action;
            // make a copy of the old state
            let nextState = Object.assign({},state);
            //for each of our incoming comments,see if we have them in our map or not;
            // if they are missing, add them in. JS maps can be read out in insertion order,
            // so we should get comments in the order thta we got them from the the API
            for (let comments of comments) {
                if (!nextState[comments.id]) {
                    nextState[comments.id] = comments;
                }
            }
            return nextState;
        }
        case types.comments.CREATE: {
            const {comments} = action;
            let nextState = Object.assign({},state);
            nextState[comments.id] = comments;
            return nextState;
        }
        default:
            return state;
    }
}

/**
 * The comentIds reducer is where we keep track of all our comments
 * and treat state more like a database.
 * rest of the logic to the comments reducer.
 * situations lead to take a different approach
 * @method comentIds
 * @module x-WeChat/reducers
 * @param {Set} [state=initialState.commentIds]    initial or previou state
 * @param {Object} action                           redux action
 * @returns {Object}                                next state or slice
 */
export function comentIds(state=initialState.comentIds,action) {
    switch (action.type) {
        case types.comments.GET: {
            const nextCommentIds = action.comments.map(Comment => Comment.id);
            let nextState = Array.from(state);
            for (let commentIds of nextCommentIds) {
                if (!state.includes(commentIds)) {
                    nextState.push(commentIds);
                }
            }
            return nextState;
        }
        case types.comments.CREATE: {
            const {comment} = action;
            let nextState = Array.from(state);
            nextState.push(comment.id);
            return nextState;
        }
        default:
            return state;
    }
}