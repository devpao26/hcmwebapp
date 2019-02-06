/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  SESSION_EXPIRED,
  SERVER_ERROR,
  USER_LOGOUT,
  USER_LOGOUT_RESET,
  CHANGE_ALERTCOUNT,
  CHANGE_NOTIFCOUNT,
} from 'containers/App/constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  userData: false,
  token: '',
  Username: '',
  Password: '',
  isAuthenticated: false,
  isSessionExpired: false,
  isServerError: false,
  isApiServerError: false,
  isAccessDenied: false,
  isUserLoggingOut: false,
  alertCount: 0,
  notifCount: 0,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SESSION_EXPIRED:
      return state
        .set('isSessionExpired', true);
    case SERVER_ERROR:
      return state
        .set('isServerError', action.error);
    case USER_LOGOUT:
      return state
        .set('isUserLoggingOut', true);
    case USER_LOGOUT_RESET:
      return state
        .set('isUserLoggingOut', false);
    case CHANGE_ALERTCOUNT:
      return state
        .set('alertCount', action.count);
    case CHANGE_NOTIFCOUNT:
      return state
        .set('notifCount', action.count);
    default:
      return state;
  }
}

export default appReducer;
