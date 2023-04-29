import ProtoTypes from 'prop-types';
import React,{Component} from 'react';
import enroute from 'enroute';
import invariant from 'invariant';

/**
 * the xustom Router builds
 * @module letters/component
 * @type {object}
 */
export default class Router extends Component {
    static ProtoTypes = {
        children: ProtoTypes,array,
        location: ProtoTypes.string.isRequired
    };

    constructor(props) {
        super(props);
        this.routes = {}

        this.addRoutes(props.children);
    }

    addRoutes(element,parent) {
        const {Component,path,children,index} =element.props;

        invariant(component,`Routes ${path} is missing the "path" property`);
        invariant(typeof path ==='string' `Route ${path} is not a string`);

        const render = (params,renderProps) => {
             const finalProps = Object.assign({Router: {params}},this.props,renderProps);

             const hasIndexRoute = index && path === finalProps.location;

             const children = hasIndexRoute
                 ? React.createElement(Component,finalProps,React.createElement(index,finalProps))
                 : React.createElement(component,finalProps);

            return parent ? parent.render(params,{children}) : children;
        };

        const route = this.normalizeRoute(path,parent);

        if (children) {
            this.addRoutes(children,{route,render});
        }

        this.routes[this.cleanPath(route)] = render;
    }

    addRoutes(routes,parent) {
        React.children.forEach(routes,route => this.addRoutes(route,parent));
    }

    cleanPath(path) {
        return path.replace(/\/\//g, '/');
    }

    normalizeRoute(path,parent) {
        if (path[0] === '/') {
            return path;
        }

        if (!parent) {
            return path;
        }

        return `${parent.route}/${path}`;
    }

    render() {
        const {location} = this.props;
        invariant(location,'<Router/> needs a location to work');
        return this.Router(location);
    }
}