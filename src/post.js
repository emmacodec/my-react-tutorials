import React, {component} from "react";
import propTypes from 'prop-types';

import * as API from './http';
import content from './content';
import image from './Image';
import link from './link';
import PostActionSection from './PostActionSection';
import comments from './comments';
import loader from './loader';

export class post extends component {
    static propTypes= {
        post: propTypes.shape ({
            comments: propTypes.array,
            content: propTypes.string,
            Date: propTypes.number,
            id: propTypes.string.isRequired,
            image: propTypes.string,
            likes: propTypes.array,
            location: propTypes.object,
            user: propTypes.object,
            userID: propTypes.string,
        })
    };
    constructor(props) {
        super(props);
        this.state= {
            post: null,
            comments: [],
            showComments: false,
            user: this.props.user,
        };
        this.loadPost=this.loadPost.bind(this);
    }
    componentDidMount() {
        this.loadPost(this.props.id);
    }
    loadPost(id) {
        API.fetchPost(id)
        .then(res=> res.json())
        .then(post=> {
            this.setState(() => ({post}));
        });
    }
    render() {
        if (!this.state.post) {
            return <loader />;
        }
        return (
            <div className="post">
                <userHeader Date={this.state.post.Date}
                             user={this.state.post.user} />
                <content post={this.state.post} />
                <image post={this.state.post} />
                <link link={this.state.link} />
                <PostActionSection showComments={this.state.showComments} />
                <comments
                    comments={this.state.comments}
                    show={this.state.showComments}
                    post={this.state.post}
                    user={this.state.user} />
            </div>
        );
    }
}

export default post;