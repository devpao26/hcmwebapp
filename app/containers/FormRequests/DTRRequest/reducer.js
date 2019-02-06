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
  CREATE_FORMS,
  SUCCESS_FORMS,
  ERROR_FORMS,
  DISMISS_FORMS,
  RETRIEVE_FORMS,
  RETRIEVE_FORMSUCCESS,
  RESET_STATE,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  dtrforms: {
    saveRequest: {
      loading: false,
      error: false,
      data: false,
      startDate: false,
      endDate: false,
      OTMinutes: false,
      Remarks: false,
      successCode: false,
      successMessage: false,
      errorCode: false,
      errorMessage: false,
    },
    lists: {
      loading: false,
      error: false,
      ObjectList: false,
    },
  },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_FORMS:
      return state
        .setIn(['dtrforms', 'saveRequest', 'loading'], true)
        .setIn(['dtrforms', 'saveRequest', 'error'], false)
        .setIn(['dtrforms', 'saveRequest', 'data'], action.data);
    case RETRIEVE_FORMS:
      return state
        .setIn(['dtrforms', 'lists', 'loading'], true)
        .setIn(['dtrforms', 'lists', 'error'], false)
        .setIn(['dtrforms', 'lists', 'ObjectList'], false)
        .setIn(['dtrforms', 'saveRequest', 'startDate'], action.startdate);
    case RETRIEVE_FORMSUCCESS:
      return state
        .setIn(['dtrforms', 'lists', 'loading'], true)
        .setIn(['dtrforms', 'lists', 'ObjectList'], action.data);
    case SUCCESS_FORMS:
      return state
        .setIn(['dtrforms', 'saveRequest', 'loading'], false)
        .setIn(['dtrforms', 'saveRequest', 'successCode'], action.successcode)
        .setIn(['dtrforms', 'saveRequest', 'successMessage'], action.succesmsg);
    case ERROR_FORMS:
      return state
        .setIn(['dtrforms', 'saveRequest', 'loading'], false)
        .setIn(['dtrforms', 'saveRequest', 'error'], action.error)
        .setIn(['dtrforms', 'saveRequest', 'errorCode'], action.errorcode)
        .setIn(['dtrforms', 'saveRequest', 'errorMessage'], action.errormsg);
    case DISMISS_FORMS:
      return state
        .setIn(['dtrforms', 'saveRequest', 'OTMinutes'], false)
        .setIn(['dtrforms', 'saveRequest', 'Remarks'], false)
        .setIn(['dtrforms', 'saveRequest', 'startDate'], false)
        .setIn(['dtrforms', 'saveRequest', 'endDate'], false)
        .setIn(['dtrforms', 'saveRequest', 'successCode'], false)
        .setIn(['dtrforms', 'saveRequest', 'successMessage'], false)
        .setIn(['dtrforms', 'saveRequest', 'errorCode'], false)
        .setIn(['dtrforms', 'saveRequest', 'errorMessage'], false);
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
}

export default appReducer;
