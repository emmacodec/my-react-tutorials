import fetch from 'isomorphic-fetch';
import cookies from 'js-cookie';

/**
 * Generate a fetch configuration object so we can share headers
 * @method generateFetchConfig
 * @param {string}    method HTTP verb
 * @param {object}    [body=null] payload for post/put
 * @return {object}               config
 */
function generateFetchConfig(method,body=null) {
    const upCaseMethod = method.toUpperCase();
    const token =cookies.get('letters-token');
    const config = {
        method: upCaseMethod,
        Headers: {
            'content-Type': 'application/json',
            'letters-Token': token
        },
        Credential: 'same-origin'
    };
    if (['POST', 'PUT'].includes(upCaseMethod)) {
        config.body = JSON.stringify(body);
    }
    return config;
}

/**
 * Creates a pst with the given payload
 * @method CreatePost
 * @param {object}    payload Post payload
 * @return {Response}       Fetch Response
 */
export function CreatePost(payload) {
    // send the new post to the API
    return fetch(`${process.env.ENDPOINT}/posts`,generateFetchConfig('POST',payload));
}

/**
 * Fetch post from the API
 * @method fetchPosts
 * @param {string}    endpoint URL provided by Redux; the API will yield further endpoints
 * @return {Response}  fetch API response
 */
export function fetchPosts(endpoint) {
    return fetch(endpoint);
}

/**
 * fetch a post from the API
 * @method fetchPost
 * @param {string}  id post ID 
 * @return {Response} fetch response object
 */
export function fetchPost(id) {
    return fetch(
        `${process.env.ENDPOINT}/posts/${id}?_embed=comments&_expand=user&_embed=likes`,
        generateFetchConfig('GET')
    );
}

/**
 * fetch a post from API
 * @method fetchCommentsForPost
 * @param {string}  postId post ID
 * @return {Response}  fetch response object
 */
export function fetchCommentsForPost(postId) {
    return fetch(
        `${process.env.ENDPOINT}/comments?postId=${postId}&_expand=user`,
        generateFetchConfig('GET')
    );
}

/**
 * creates a post with the given payload
 * @method createComment
 * @param {object}  payload post payload
 * @returns {Response} 
 */
export function createComment(payload) {
    //send the new post to the API 
    return fetch(`${process.env.ENDPOINT}/comments`, generateFetchConfig('POST',payload));
}

/**
 * like a post
 * @method likePost
 * @param {string} postId post's ID
 * @param {string} userId user's ID
 * @returns {Response}    fech response
 */
export function likePost(postId,userId) {
    // cerate a new like for the user/post
    return fetch(
        `${process.env.ENDPOINT}/posts/${postId}/likes/${userId}`,
        generateFetchConfig('PUT', {userId,postId})
    );
}

/**
 * unlikes a post for a given user
 * @method unlikePost
 * @param {string}  postId
 * @param {string} userID
 * @returns {Response}
 */
export function unlikePost(postId,userId) {
    return fetch(
        `${process.env.ENDPOINT}/posts/${postId}/likes/${userId}`,
        generateFetchConfig('DELETE')
    );
}

/**
 * fetch a user from API
 * @method loadUser
 * @param {string}  id post ID
 * @returns {Response}  fetch response object
 */
export function loadUser(id) {
    return fetch(`${process.env.ENDPOINT}/users/${id}`, generateFetchConfig('GET'));
}

/**
 * fetch a user from the API
 * @method createUser
 * @param {object}  payload new user payload
 * @returns {Response}  fetch response object
 */
export function createUser(payload) {
    return fetch(`${process.env.ENDPOINT}/users`, generateFetchConfig('POST',payload));
}