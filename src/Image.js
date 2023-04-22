import ProtoTypes from 'prop-types';
import React from 'react';

/**
 * Displays images
 * @method image
 * @param {object} props
 */
const Image = props => {
    if (props.post && props.post.Image) {
        return <img className='img-responsive' src={props.post.image} alt='' />;
    };
    return null;
};

Image.ProtoTypes = {
    post: ProtoTypes.shape({image:propTypes.string})
};

export default Image;