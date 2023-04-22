import ProtoTypes from 'prop-types';
import React from 'react';

import UserHeader from '../post/UserHeader';

/**
 * Displays an individual comment 
 * @method comment
 * @param {object} props
 */
const {comment} = props => {
return (
    <div className='comment' key={comment.id}>
        <UserHeader
          user={comment.user}
          profilePicture={comment.user.profilePicture}
          date={comment.date} 
          
          />
          <p className='content'> {comment.content} </p>
    </div>
);
};
comment.ProtoTypes = {
    comment: ProtoTypes.shape( {
        content: ProtoTypes.string,
        user: ProtoTypes.object,
        date: ProtoTypes.number,
        likes: ProtoTypes.number
    })
};

export default comment;