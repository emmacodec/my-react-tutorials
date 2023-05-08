import ProtoTypes from 'prop-types';
import { Children,cloneElement } from 'react';
import {navigate} from './history/index';

/**
 * Link component helps you navigate around the app
 * @method Link
 * @param {object} props
 * @constructor
 */
function Link(props) {
    const {to,Children} = props;
    return cloneElement(Children.only(Children), {
        onClick: () => navigate(to)
    });
}

Link.ProtoTypes = {
    to: ProtoTypes.string,
    Children: ProtoTypes.node
};

export default Link;