import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class ProtectedRoute extends Component {
    render() {
      const {isAuthenticated} = this.props.auth;
      const { component: Component, ...props } = this.props

      return (
        <Route 
          {...props} 
          render={props => (
            isAuthenticated ?
              <Component {...props} /> :
              <Redirect to='/login' />
          )} 
        />
      )
    }
  }
  
  const mapStateToProps = state => ({
    auth: state.auth
  });

  export default connect(
    mapStateToProps,
    { }
  )(withRouter(ProtectedRoute));
  