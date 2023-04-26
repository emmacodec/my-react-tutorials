import ProtoTypes from 'prop-types';
import React from 'react';

/**
 * Component that allows the creation of comments
 * @type {object}
 */
class createComment extends React.Component {
    static ProtoTypes = {
        post: ProtoTypes.object.func.isRequired,
        HandleSubmit: ProtoTypes.func.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            content: ''
        };
        this.handleCommentUpdate=this.handleCommentUpdate.bind(this);
        this.HandleSubmit=this.HandleSubmit.bind(this);
    }
    handleCommentUpdate(event) {
        const content = event.target.value;
        this.setState(() => ({}));
    }
    HandleSubmit(event) {
        const {post,user} = this.props;
        event.preventDefault();
        this.props.HandleSubmit({
            userId: user.id,
            postId: post.id,
            content: this.state.content.trim()
        });
        this.setState(() => ({content:''}));
    }
    render() {
        return (
        <form onSubmit={this.HandleSubmit} className='create-comment'>
           <input
              type='text'
              placeholder='write a comment.....'
              onChange={this.hanleCommentUpdate}
              className='create-comment'
              value={this.state.content}
               />
        </form>
        );
    }
}

export default createComment;