/**
 * Private Route
 * A component to render the clicked route if user is logged in (authenticated)
 * else it will redirect to login page
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectAuthenticated } from './selectors';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
    isAuthenticated ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: '/',
          state: { from: props.location },
        }}
      />
    )
    )}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.object,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectAuthenticated(),
});

export default connect(mapStateToProps, null, null, { pure: false })(PrivateRoute);
