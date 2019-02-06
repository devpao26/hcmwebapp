/*
 * ReLogin Reducer
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
  RESET_RELOGINSTATE,
  TOGGLE_MODAL,
  SUBMIT_RELOGIN,
  SUBMIT_RELOGIN_SUCCESS,
  SUBMIT_RELOGIN_ERROR,
  SUBMIT_RELOGIN_RESET,
} from './constants';

export const initialState = fromJS({
  isToggleRelogin: false,
  relogin: {
    title: false,
    message: false,
    loading: false,
    error: false,
    success: false,
    username: false,
    password: false,
  },
});

function reloginReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_RELOGINSTATE:
      return initialState;
    case TOGGLE_MODAL:
      return state
        .set('isToggleRelogin', action.toggle)
        .setIn(['relogin', 'title'], action.title)
        .setIn(['relogin', 'message'], action.message);
    case SUBMIT_RELOGIN:
      return state
        .setIn(['relogin', 'loading'], true)
        .setIn(['relogin', 'error'], false)
        .setIn(['relogin', 'username'], action.username)
        .setIn(['relogin', 'password'], action.password);
    case SUBMIT_RELOGIN_SUCCESS:
      return state
        .setIn(['relogin', 'loading'], false)
        .setIn(['relogin', 'username'], false)
        .setIn(['relogin', 'password'], false)
        .setIn(['relogin', 'success'], true);
    case SUBMIT_RELOGIN_ERROR:
      return state
        .setIn(['relogin', 'loading'], false)
        .setIn(['relogin', 'password'], false)
        .setIn(['relogin', 'success'], false)
        .setIn(['relogin', 'error'], action.error);
    case SUBMIT_RELOGIN_RESET:
      return state
        .setIn(['relogin', 'success'], false);
    default:
      return state;
  }
}

export default reloginReducer;
