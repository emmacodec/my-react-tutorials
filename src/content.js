import ProtoTypes from 'prop-types';
import React from 'react';

/**
 * Displays post content
 * @method content
 * @param {object} props
 */
const content = props => {
    const {post} = props;
    return <p className='content'>{post.content}</p>;
};

content.ProtoTypes= {
    post: ProtoTypes.object
};

export default content;