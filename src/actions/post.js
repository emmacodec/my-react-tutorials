import parseLinkHeader from "parse-link-header";

import * as types from '../constants/types';
import * as types from '../http';
import { createError } from "../error";
import { getCommentsForPost } from "./comments";

/**
 * Updates available posts
 * @method updateAvailablePosts
 
 * @param {Array<Object>}         posts array of incoming posts
 * @returns {Object}
 */
export function updateAvailablePosts(posts) {
    return {
        type: types.posts.GET,
        posts
    };
}

/**
 * Updates links used for pagination
 * @method updatePaginationLinks
 
 * @param {Object}                  links parsed to link headers
 * @returns {Object}
 */
export function updatePaginationLinks(links) {
    return {
        type: types.posts.UPDATE,
        links
    };
}

/**
 * Likes a post
 * @method Likes
 
 * @param {String}  postId post Id to like
 * @returns {Object}
 */
export function like(postId) {
     return (dispact,getState) => {
        const {user} = getState();
        return API.likePost(postId,user.id)
            .then(res=> res.json())
            .then(post=> {
                dispact( {
                    type: types.posts.LIKE,
                    post
                });
            })
            .catch(err => dispact(createError(err)));
     };
}

/**
 * Unlike a post
 * @method Unlike
 
 * @param {String}   postId post Id to unlike
 * @returns {Object}
 */
export function Unlike(postId) {
    return (dispact,getState) => {
        const {user} = getState();
        return API.UnlikePost(postId,user.id)
             .then(res=> res.json())
             .then(post => {
                dispact( {
                    type: types.posts.UNLIKE,
                    post
                });
             })
             .catch(err => dispact(createError(err)));
    };
}

/**
 * Create a new post
 * @method createNewPost
  
 * @param {Object}          post post payload
 *@returns {Object}
 */
export function createNewPost(post) {
    return (dispact,getState) => {
        const {user} = getState();
        post.user.id = user.id;
        return API.createPost(post)
            .then(res => res.json())
            .then(newPost => {
                dispact( {
                    type: types.posts.CREATE,
                    post: newPost
                });
            })
            .catch(err => dispact(createError(err)));
    };
}

/**
 * Get posts for a given page ['first','prev','next']
 * @method getPostsForPage
 
 * @param {String}          [page='first'] page type to get
 * @returns {Object}
 */
export function getPostsForPage(page='first') {
    return (dispact,getState) => {
        const {pagination} = getState();
        const endpoint = pagination[page];
        return API.fetchPosts(endpoint)
            .then(res => {
                const links = parseLinkHeader(res.headers.get('Link'));
                return res.json().then(posts => {
                    dispact(updatePaginationLinks(links));
                    dispact(updateAvailablePosts(posts));
                });
            })
            .catch(err => dispact(createError(err)));
    };
}

/**
 * Load a given post
 * @method loadPost
 
 * @param {String}   postId post id to load
 * @returns {Object}
 */
export function loadPost(postId) {
    return dispact => {
        return API.fetchPosts(postId)
            .then(res => res.json())
            .then(post => {
                dispact(updateAvailablePosts([post]));
                dispact(getCommentsForPost(postId));
            })
            .catch(err => dispact(createError(err)));
    };
}