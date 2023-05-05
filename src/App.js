import React, { Component } from "react";
import propTypes from 'prop-types';
import {connect} from 'react-redux';
 
import {createError} from './error';
 import Nav from './navbar';
import Loader from './loader';

/**
 * this app component serves as a root gor the project
 * @method App
 * @module letters/component
 */

class App extends Component {

  componetDidMount() {
    const embeddedState = document.getElementById('initialState');
    if (embeddedState) {
      embeddedState.remove();
    }
  }

  render() {
    if (this.props.error) {
      return (
        <div className="app">
          <createError error={this.props.error} />
        </div>
      );
    }
    return (
      <div className="app">
        {this.props.loading ? (
          <div className="loading">
             <Loader />
        
        </div>
    ):(
      this.props.children
  )}
  </div>
    );
}
}

App.propTypes ={
  children:propTypes.node
};

export const mapStateToProps= state => {
  return {
    error: state.error,
    loading: state.loading
  };
};

export default connect(mapStateToProps) (App);
