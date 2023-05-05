import React from "react";
import { Connect, connect } from "react-redux";

import {logout} from './actions/auth';
import { Link } from "./link";
import LOgo from './logo';

/**
 * App navigation
 * @method  navigation
 * @param {Object}   props
 * @param {object}   props.user         user object
 * @param {function} props.handleLogout logout action
 */
export const navigation = ({user,handleLogout}) => (
    <nav className="navbar">
        <logo logoOnly={false} />
        {user.authenticated ? (
            <span className="user-nav-widget">
                <span>{user.name}</span>
                <img width={40} className="img-circle" src={user.profilePicture} alt={user.name} />
                <span onClick={handleLogout}>
                    <i className="fa fa-sign-out" />
                </span>
            </span>
        ) : (
            <Link to="/login">
                <button type="button">Log in or sign up</button>
            </Link>
        )}
    </nav>
    );
    export const mapStateToProps = state => ({user: state.user});
    export const mapDispatchToProps = dispatch => ({
        handleLogout() {
            dispatch(logout());
        }
});
export default connect(mapStateToProps,mapDispatchToProps)(navigation);