import ProtoTypes from 'prop-types';
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import orderBy from 'iodash/orderBy';

import {createError} from '../actions/error';
import {createNewPost,getPostsForPage} from '../actions/post';
import { showComments } from '../actions/comments';
import Ad from '../Ad'
import  CreatePost  from '../create';
import  Post, { post }  from '../post';
import Welcome from '../welcome';

export class Home extends Component {
    componentDidMount() {
        this.props.actions.getPostsForPage();
    }
    componentDidCatch(err,info) {
        this.props.actions.createError(err,info);
    }
    render() {
        return (
            <div className='home'>
                <Welcome />
                <div>
                    <CreatePost onSubmit={this.props.actions.createNewPost} />
                    {this.props.Post && (
                        <div className='posts'>
                            {this.props.Post.map(post => (
                                <post
                                    key={post.id}
                                    post={post}
                                    openCommentsDrawer={this.props.actions.showComments} 
                                    />
                            ))}
                     </div>
                )}
                <button className='block' onClick={this.props.actions.getNextPageOfPosts}>
                    Load more posts
                </button>
            </div>
            <div>
                <Ad url="https://ifelse.io.book" imageUrl="/static/assets/ads/ria.png" />
                <Ad url="https://ifelse.io.book" imageUrl="/static/assets/ads/orly.jpg" />
            </div> 
            </div>
        );
    }
}

Home.ProtoTypes = {
    posts: ProtoTypes.arrayOf(ProtoTypes.object),
    actions: ProtoTypes.shape ({
        createNewPost: ProtoTypes.func,
        getPostsForPage: ProtoTypes.func,
        showComments: ProtoTypes.func,
        createError: ProtoTypes.func,
        getNextPageOfPosts: ProtoTypes.func
   })
};
export const mapStateToProps = state => {
    const posts =orderBy(state.postIds.map(postId => state.posts[postId]),'date','desc');
    return {
        posts
    };
};
export const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(
            {
                createNewPost,
                getNextPageOfPosts,
                showComments,
                createError,
                getNextPageOfPosts: getPostsForPage.bind(this,'next')
            },
            dispatch
        )
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Home);