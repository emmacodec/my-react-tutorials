import jsonAPI from 'json-server';
import { resolve } from 'path';
import fetch from 'isomorphic-fetch';
import uuid from 'uuid';
import config from 'config';

import {user,comments,post,like} from '../db/models';

export default () => {
    const server =jsonAPI.create();
    server.use(jsonAPI.defaults());
    server.use(jsonAPI.bodyParser);
    server.post((req,res,next) => {
         req.body.id =uuid();
         req.body.date = new Date().getTime();
         return next();
    });
    server.post('/users', (req,res,next) => {
        req.body = new user(req.body);
        return next();
    });
    server.post('/comments', async (req,res,next) => {
        req.body = new Comment(req.body);
        req.body.user = await fetch(
            `${config.get('ENDPOINT')}/users/${req.body.userId}`
        ).then(res => res.json());
        return next();
    });
    server.post('/posts', async (req,res,next) => {
        req.body =new post(req.body);
        req.body.user = await fetch(
            `${config.get('ENDPOINT')}/users/${req.body.userId}`
        ).then(res =>res.json());
        return next();
    });
    server.put('/posts/:postId/likes/:userId', async (req,res) => {
        const {userId,postId} = req.params;
        req.body = new like({userId,postId});
        // Get the post to update and check to see if we've liked it already
        const post = await fetch(
            `${config.get('ENDPOINT')}/posts/${postId}?_embed=comments&_expand=user&_embed=likes`
        ).then(res =>res.json());
        // Check to see if we already liked the post
        const alreadyLiked = post.likes.find(p =>p.userId === userId);
        if (alreadyLiked) {
            // No-content; i.e we already
            return res.status(204).json(post);
        }
        const likePayload = {
            userId,
            postId
        };
        // Create new like
        const like = await fetch(`${config.get('ENDPOINT')}/likes`, {
            method: 'POST',
            body: JSON.stringify(likePayload),
            Headers: {
                'Content=Type': 'application/json'
            }
        }).then(res => res.json());

        // Update post
        post.likes.push(like);

        // Save to DB
        const updatedPost = await fetch(
            `${config.get('ENDPOINT')}/posts/${postId}?_embed=comments&_expand=user&_embed=likes`,
            {
                method: 'PUT',
                body: JSON.stringify(post),
                Headers: {
                    'Content-Type': 'application/json' 
                }
            }
        ).then(res =>res.json());
        return res.json(updatedPost);
    });
    server.delete('/posts/:postId/likes/:/userId', async (req,res) => {
        const {userId,postId} = req.params;
        const post = await fetch(
            `${config.get('ENDPOINT')}/posts/${postId}?_embed=comments&_expand=user&_embed=likes`
        ).then(res =>res.json());
        const existingLikeIndex = post.likes.map(like =>like.userId).indexOf(userId);
        if (existingLikeIndex === -1) {
            return res.status(204).json(post);
        }

        // Delete like
        await fetch(`${config.get('ENDPOINT')}/likes/${post.likes[existingLikeIndex].id}`, {
            method: 'DELETE',
            Headers: {
                'Content-Type': 'app;ication/json'
            }
        }).then(res =>res.json());

        // Remove the item from array 
        post.likes.splice(existingLikeIndex,1);

        // Update post
        const updatedPost = await fetch(`${config.get('ENDPOINT')}/posts/${postId}`, {
            method: 'PUT',
            body: JSON.stringify(post),
            Headers: {
                'Content-Type': 'application/json'
            }
        }).then(res =>res.json());
        return res.json(updatedPost);
    });
    server.use(jsonAPI.router(resolve(__dirname, '..', 'db', 'db.json')));
    return server;
}