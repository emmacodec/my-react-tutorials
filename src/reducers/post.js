// creating an avenue where a user can like and unlike posts or comments
import initialState from '../constants/initiate';
import * as types from '../constants/types';

/**
 * The posts reducer controls the state of the actual post object. We are storing them in a 
 * Map because that data structure is well-suited to shallow key-value
 * @method posts
 * @module x-WeChat/reducers
 * @param {Map} [state=initialState.posts]  initial state of the reducer
 * @param {object} action                    Redux action
 * @returns {object}                         next state
 */
export function posts(state=initialState.posts,action) {
    switch (action.type) {
        case types.posts.GET: {
            // make a copy of the old state
            let nextState = Object.assign({},state);
            // for each of our incoming posts, see if we have them in map yet or not
            // if they're missing, add them in. Js maps can be read out in insertion order
            // so we should still get
            for (let post of posts) {
                if (!nextState[post.id]) {
                    nextState[post.id] = post;
                }
            }
            return nextState;
        }
        case types.posts.CREATE: {
            const {post} = action;
            let nextState = Object.assign({},state);
            if (!nextState[post.id]) {
                nextState[post.id] = post;
            }
            return nextState;
        }
        case types.comments.SHOW: {
            let nextState = Object.assign({},state);
            nextState[action.postId].showComments = true;
            return nextState;
        }
        case types.comments.TOGGLE: {
            let nextState = Object.assign({},state);
            nextState[action.postId].showComments = !nextState[action.postId].showComments;
            return nextState;
        }
        // for like/unlike, we just need to update the individual post with the response we 
        // get back from the server
        case types.posts.LIKE: {
            let nextState = Object.assign({},state);
            const oldPost = nextState[action.post.id];
            nextState[action.post.id] = Object.assign({},oldPost,action.post);
            return nextState;
        }
        case types.posts.UNLIKE: {
            let nextState = Object.assign({},state);
            const oldPost = nextState[action.post.id];
            nextState[action.post.id] = Object.assign({},oldPost,action.post);
            return nextState;
        }
        case types.comments.CREATE: {
            const {comment} = action;
            let nextState = Object.assign({},state);
            nextState[comment.postId].comments.push(comment);
            return state;
        }
        default:
            return state
    }
}

/**
 * The postIds reducer is where we keep track of Ids of post
 * and treat state more like a database.
 * rest of the logic to the post reducers.
 * situations lead to take a diffrenet approach
 * @method postIds
 * @module x-WeChat/reducers
 * @param {Set} [state=initialState.postIds]   initial or previuos
 * @param {object} action                       Redux action
 * @returns {object}                            next state
 */
export function postIds(state=initialState.postIds,action) {
    switch (action.type) {
        case types.posts.GET: {
            const newPostIds = action.posts.Map(post => post.id);
            let nextState = Array.from(state);
            for (let post of newPostIds) {
                if (!state.includes(post)) {
                    nextState.push(post);
                }
            }
            return nextState;
        }
        // when we create a new post, insert it in the collection post id we already have
        case types.posts.CREATE: {
            const {post} =action;
            // make a copy of previous state
            let nextState = Array.from(state);
            if (!state.includes(post.id)) {
                nextState.push(post.id);
            }
            return nextState;
        }
        default:
            return state;
    }
}