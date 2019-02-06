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
  CREATE_OTFORMS,
  SUCCESS_OTFORMS,
  ERROR_OTFORMS,
  DISMISS_OTFORMS,
  RETRIEVE_OTFORMS,
  RETRIEVE_OTFORMSUCCESS,
  RESET_STATE,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  otforms: {
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
    otlists: {
      loading: false,
      error: false,
      ObjectList: false,
    },
  },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_OTFORMS:
      return state
        .setIn(['otforms', 'saveRequest', 'loading'], true)
        .setIn(['otforms', 'saveRequest', 'error'], false)
        .setIn(['otforms', 'saveRequest', 'data'], action.data);
        // .setIn(['otforms', 'saveRequest', 'startDate'], action.startdate)
        // .setIn(['otforms', 'saveRequest', 'endDate'], action.enddate)
        // .setIn(['otforms', 'saveRequest', 'OTMinutes'], action.otminutes)
        // .setIn(['otforms', 'saveRequest', 'Remarks'], action.remarks)
        // .setIn(['otforms', 'saveRequest', 'successMessage'], false);
    case RETRIEVE_OTFORMS:
      return state
        .setIn(['otforms', 'otlists', 'loading'], true)
        .setIn(['otforms', 'otlists', 'error'], false)
        .setIn(['otforms', 'otlists', 'ObjectList'], false)
        .setIn(['otforms', 'saveRequest', 'startDate'], action.startdate);
    case RETRIEVE_OTFORMSUCCESS:
      return state
        .setIn(['otforms', 'otlists', 'loading'], true)
        .setIn(['otforms', 'otlists', 'ObjectList'], action.data);
    case SUCCESS_OTFORMS:
      return state
        .setIn(['otforms', 'saveRequest', 'loading'], false)
        .setIn(['otforms', 'saveRequest', 'successCode'], action.successcode)
        .setIn(['otforms', 'saveRequest', 'successMessage'], action.succesmsg);
    case ERROR_OTFORMS:
      return state
        .setIn(['otforms', 'saveRequest', 'loading'], false)
        .setIn(['otforms', 'saveRequest', 'error'], action.error)
        .setIn(['otforms', 'saveRequest', 'errorCode'], action.errorcode)
        .setIn(['otforms', 'saveRequest', 'errorMessage'], action.errormsg);
    case DISMISS_OTFORMS:
      return state
        .setIn(['otforms', 'saveRequest', 'OTMinutes'], false)
        .setIn(['otforms', 'saveRequest', 'Remarks'], false)
        .setIn(['otforms', 'saveRequest', 'startDate'], false)
        .setIn(['otforms', 'saveRequest', 'endDate'], false)
        .setIn(['otforms', 'saveRequest', 'successCode'], false)
        .setIn(['otforms', 'saveRequest', 'successMessage'], false)
        .setIn(['otforms', 'saveRequest', 'errorCode'], false)
        .setIn(['otforms', 'saveRequest', 'errorMessage'], false);
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
}

export default appReducer;
