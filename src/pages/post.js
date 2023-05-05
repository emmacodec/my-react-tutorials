import ProtoTypes from 'prop-types';
import React,{Component} from 'react';
import { Connect, connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import { loadPost } from '../actions/post';
import Ad from '../Ad';
import post from '../post';
import Link from '../link';
import Loader from '../loader';
import { mapDispatchToProps } from './home';

/**
 * Component for a single-posts page
 * @module X-WeChat App/component
 * @type {Object}
 */
export class singlePost extends Component {
    static ProtoTypes = {
        params: ProtoTypes.shape({
            post: ProtoTypes.string
    })
};
componentDidMount() {
    // if we no post dispatch an action to load it
    if (!this.props.post) {
        this.props.actions.loadPost(this.props.router.params.postId);
    }
}
render() {
    return this.props.post ? (
        <div className='single-post'>
            <Link to="/">
                <div className='back'>
                    <i className='fa fa-arrow-left' /> Back
                </div>
            </Link>
            <post post={this.props.post} />
            <Ad
               url="https://www.github.com/emmacodec"
               imageUrl="/static/assets/ads/ria.png" 
               />
        </div>
    ) : (
        <Loader />
    );
}
}

export const mapStateToProps = (state,ownProps) => {
    return {
        // reads post directly from our store and fetch all post in
        // componentDidMount only if we have to
    };
};
export const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({loadPost},dispatch)
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(singlePost);