/*
 * App Reducer
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
  CREATE_FORM,
  CREATE_FORM_SUCCESS,
  CREATE_FORM_ERROR,
  CREATE_FORM_RESET,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  hrfrequests: {
    submitForm: {
      loading: false,
      error: false,
      success: false,
      saveData: false,
      requestRespSuccess: false,
      requestRespError: false,
    },
  },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_FORM:
      return state
        .setIn(['hrfrequests', 'submitForm', 'loading'], true)
        .setIn(['hrfrequests', 'submitForm', 'saveData'], action.data)
        .setIn(['hrfrequests', 'submitForm', 'error'], false);
    case CREATE_FORM_SUCCESS:
      return state
        .setIn(['hrfrequests', 'submitForm', 'loading'], false)
        .setIn(['hrfrequests', 'submitForm', 'saveData'], false)
        .setIn(['hrfrequests', 'submitForm', 'requestRespSuccess'], true)
        .setIn(['hrfrequests', 'submitForm', 'success'], action.resp);
    case CREATE_FORM_ERROR:
      return state
        .setIn(['hrfrequests', 'submitForm', 'loading'], false)
        .setIn(['hrfrequests', 'submitForm', 'requestRespError'], true)
        .setIn(['hrfrequests', 'submitForm', 'error'], action.resp);
    case CREATE_FORM_RESET:
      return state
        .setIn(['hrfrequests', 'submitForm', 'loading'], false)
        .setIn(['hrfrequests', 'submitForm', 'saveData'], false)
        .setIn(['hrfrequests', 'submitForm', 'success'], false)
        .setIn(['hrfrequests', 'submitForm', 'requestRespSuccess'], false)
        .setIn(['hrfrequests', 'submitForm', 'error'], false)
        .setIn(['hrfrequests', 'submitForm', 'requestRespError'], false);
    default:
      return state;
  }
}

export default appReducer;
