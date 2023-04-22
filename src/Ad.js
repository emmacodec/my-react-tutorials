import ProtoTypes from 'prop-types';
import React from 'react';

/**
 * Dummy ad component
 * @method Ad
 * @param {object} props
 */
const Ad = props => {
    return(
        <div className='ad'>
            <a target='_blank' rel='noreferre noopener' href='{props.url}'>
                <img
                   className='img-responsive'
                   src='{props.imageUrl}'>

                   </img>
            </a>
            <small>ads by letters</small>

        </div>
    );
};
Ad.ProtoTypes = {
    ImageUrl: ProtoTypes.string,
    Url: ProtoTypes.string,
};

export default Ad;