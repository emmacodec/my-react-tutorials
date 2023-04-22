import ProtoTypes from 'prop-types';
import React from 'react';
import humanize from 'humanize-duration'

/**
 * Common user headre component to use in post and comments
 * @method userHeader
 * @param {object} props
 */
const userHeader = props => {
    const {date,user} = props;
    return (
        <div className='user-header'>
            <div className='user-info-section'>
            <img src={user.profilePicture} width={25} height={25} className='img-circle' />
            <a> {user.name}</a>
        </div>
        
        
        <small className='date'>
            {humanize(new Date() - new Date(date),{
                 largest: 1,
                 round: true,
                 units: ['d','h','m']
            })}{''}
            ago
        </small>
        </div>
    );
};

userHeader.ProtoTypes = {
    date: ProtoTypes.number,
    user: ProtoTypes.shape( {
        profilePicture: ProtoTypes.string.isRequired,
        name: ProtoTypes.string
    })
};

userHeader.defaultProps = {
    user: {
        profilePicture: '/static/assets/users/4.jpeg'
    }
};

export default userHeader;

        
    
