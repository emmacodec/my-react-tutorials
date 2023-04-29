import ProtoTypes from 'prop-types'
import React, {component} from 'react';
import invariant from 'invariant';

/**
 * wrapa another component for configuration
 * @type {object}
 */
class Route extends component {
    render() {
        return invariant(false,"<Route> elements are for config only and shouldn't be rendered");
    }
}

Route.ProtoTypes = {
    path: ProtoTypes.string,
    component: ProtoTypes.oneOfType([ProtoTypes.element,ProtoTypes.func]),
    index: ProtoTypes.oneOfType([ProtoTypes.element,ProtoTypes.bool])
};

export default Route;