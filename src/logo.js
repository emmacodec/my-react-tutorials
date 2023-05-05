import ProtoTypes from 'prop-types';
import React from 'react';

import Link from './link';

/**
 * X-WeChat App
 * @method logo
 * @param {Object}   props
 */
const logo = props => {
    return (
        <Link to="/>">
            <div className='logo' style={{fontSize: `${props.size}em`}}>
                L
            </div>
        </Link>
    );
};

logo.ProtoTypes = {
    size: ProtoTypes.number
};

logo.defaultProps = {
    size: 1.75
};

export default logo;