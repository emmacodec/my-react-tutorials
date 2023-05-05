import React from "react";
import { Connect, connect } from "react-redux";

/**
 * Renders an error message,if any
 * @method ErrorMessage
 * @param {Object}      props
 * @param {object}       props.error
 */
const ErrorMessage = ({error}) => {
    return (
        <div className="error">
            <h2 className="message">Something went wrong</h2>
            <p>We're working on it...!!</p>
            <pre>{error.toString()}</pre>
            <code>{error.stack || error.stacktrace || 'no error stack available'}</code>
            <button className="block">
                <a
                   href="https://github.com/emmacodec"
                   target="_blank"
                   rel="nonreferer nooperner"
                   >
                    open issues on Github
                    </a> 
            </button>
        </div>
    );
};

export default connect(state => {
    return {
        error: state.error
    };
}) (ErrorMessage);