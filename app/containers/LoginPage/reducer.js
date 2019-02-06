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
  EMP_LOGIN,
  API_SUCCESS,
  API_FAILED,
} from '../App/constants';

import {
  UPDATE_PASSWORD,
  UPDATE_PASSWORDSUCCESS,
  UPDATE_PASSWORDERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  userData: false,
  token: '',
  Username: '',
  Password: '',
  isAuthenticated: false,
  passwordUpdate: {
    success: false,
    email: false,
    oldPassword: false,
    newPassword: false,
  },
  alertCount: 0,
  notifCount: 0,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case EMP_LOGIN:
      return state
        .set('loading', true)
        .set('error', false)
        .set('Username', action.username)
        .set('Password', action.password)
        .set('userData', false);
    case API_SUCCESS:
      return state
        .set('alertCount', action.alert)
        .set('notifCount', action.notif)
        .set('userData', action.uinfo)
        .set('loading', false)
        .set('token', action.token)
        .set('Password', false)
        .set('isAuthenticated', true);
    case API_FAILED:
      return state
        .set('error', action.error)
        .set('loading', false)
        .set('isAuthenticated', false);
    case UPDATE_PASSWORD:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['passwordUpdate', 'oldPassword'], action.oldpw)
        .setIn(['passwordUpdate', 'newPassword'], action.newpw)
        .setIn(['passwordUpdate', 'email'], action.email);
    case UPDATE_PASSWORDSUCCESS:
      return state
        .setIn(['passwordUpdate', 'email'], false)
        .setIn(['passwordUpdate', 'oldPassword'], false)
        .setIn(['passwordUpdate', 'newPassword'], false)
        .setIn(['passwordUpdate', 'success'], true);
    case UPDATE_PASSWORDERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    default:
      return state;
  }
}

export default appReducer;
