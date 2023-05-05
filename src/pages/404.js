import React from 'react';
import  Link  from '../link';

export const NotFound = () => {
    return (
        <div className='not-found'>
            <h2>Not found :(</h2>
            <Link to="/">
                <button>go back home</button>
            </Link>
        </div>
    );
};

export default NotFound;