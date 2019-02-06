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
  CREATE_LCFFORMS, SUCCESS_LCFFORMS, ERROR_LCFFORMS, DISMISS_LCFORMS, SHOW_LCFREFSFORMS, SHOW_SUCCESS_LCFREFSFORMS,
} from './constants';

const initialState = fromJS({
  leaveconversionform: {
    saveForm: {
      loading: false,
      error: false,
      Date: false,
      successCode: false,
      successMessage: false,
      errorCode: false,
      errorMessage: false,
    },
    refslists: {
      loading: false,
      error: false,
      ObjectList: false,
    },
  },
});

function AppReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_LCFFORMS:
      return state
        .setIn(['leaveconversionform', 'saveForm', 'loading'], true)
        .setIn(['leaveconversionform', 'saveForm', 'error'], false)
        .setIn(['leaveconversionform', 'saveForm', 'Date'], action.date);
    case SHOW_LCFREFSFORMS:
      return state
          .setIn(['leaveconversionform', 'refslists', 'loading'], true)
          .setIn(['leaveconversionform', 'refslists', 'error'], false)
          .setIn(['leaveconversionform', 'refslists', 'ObjectList'], false);
    case SHOW_SUCCESS_LCFREFSFORMS:
      return state
        .setIn(['leaveconversionform', 'refslists', 'loading'], false)
        .setIn(['leaveconversionform', 'refslists', 'ObjectList'], action.resp);
    case SUCCESS_LCFFORMS:
      return state
        .setIn(['leaveconversionform', 'saveForm', 'loading'], false)
        .setIn(['leaveconversionform', 'saveForm', 'successCode'], action.successcode)
        .setIn(['leaveconversionform', 'saveForm', 'successMessage'], action.succesmsg);
    case ERROR_LCFFORMS:
      return state
        .setIn(['leaveconversionform', 'saveForm', 'loading'], false)
        .setIn(['leaveconversionform', 'saveForm', 'error'], action.error)
        .setIn(['leaveconversionform', 'saveForm', 'errorCode'], action.errorcode)
        .setIn(['leaveconversionform', 'saveForm', 'errorMessage'], action.errormsg);
    case DISMISS_LCFORMS:
      return state
        .setIn(['leaveconversionform', 'saveForm', 'successCode'], false)
        .setIn(['leaveconversionform', 'saveForm', 'successMessage'], false)
        .setIn(['leaveconversionform', 'saveForm', 'errorCode'], false)
        .setIn(['leaveconversionform', 'saveForm', 'errorMessage'], false)
        .setIn(['leaveconversionform', 'saveForm', 'Date'], false);
    default:
      return state;
  }
}
export default AppReducer;
