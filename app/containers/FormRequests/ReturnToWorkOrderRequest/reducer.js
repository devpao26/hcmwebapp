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
  CREATE_RTWO,
  CREATE_RTWO_SUCCESS,
  CREATE_RTWO_ERROR,
  CREATE_RTWO_RESET,
  EMPLOYEE_LISTS,
  EMPLOYEE_SUCCESS,
  EMPLOYEE_ERROR,
  EMPLOYEE_LISTS_NORESETPAGE,
  RTWO_REFERRENCES,
  SUCCESS_RTWOREFERRENCES,
  ERROR_RTWOREFERRENCES,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  rtwoforms: {
    submitForm: {
      requestData: false,
      loading: false,
      error: false,
      success: false,
      rtwoTypeID: false,
      Employeeid: false,
      Reason: false,
      Requesttime: false,
      Requestdate: false,
      requestResp: false,
    },
    employeelists: {
      loading: false,
      error: false,
      ObjectList: false,
      PageDetails: false,
      PageIndex: false,
      search: false,
    },
    rtworeferrences: {
      loading: false,
      error: false,
      ObjectList: false,
    },
  },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_RTWO:
      return state
        .setIn(['rtwoforms', 'submitForm', 'loading'], true)
        .setIn(['rtwoforms', 'submitForm', 'error'], false)
        .setIn(['rtwoforms', 'submitForm', 'rtwoTypeID'], action.rtwotypeid)
        .setIn(['rtwoforms', 'submitForm', 'Employeeid'], action.empprofileid)
        .setIn(['rtwoforms', 'submitForm', 'Reason'], action.reason)
        .setIn(['rtwoforms', 'submitForm', 'Requesttime'], action.requesttime)
        .setIn(['rtwoforms', 'submitForm', 'Requestdate'], action.requestdate);
    case CREATE_RTWO_SUCCESS:
      return state
        .setIn(['rtwoforms', 'submitForm', 'loading'], false)
        .setIn(['rtwoforms', 'submitForm', 'rtwoTypeID'], false)
        .setIn(['rtwoforms', 'submitForm', 'Employeeid'], false)
        .setIn(['rtwoforms', 'submitForm', 'Reason'], false)
        .setIn(['rtwoforms', 'submitForm', 'Requesttime'], false)
        .setIn(['rtwoforms', 'submitForm', 'Requestdate'], false)
        .setIn(['rtwoforms', 'submitForm', 'requestRespSuccess'], true)
        .setIn(['rtwoforms', 'submitForm', 'success'], action.resp);
    case CREATE_RTWO_ERROR:
      return state
        .setIn(['rtwoforms', 'submitForm', 'loading'], false)
        .setIn(['rtwoforms', 'submitForm', 'requestRespError'], true)
        .setIn(['rtwoforms', 'submitForm', 'error'], action.resp);
    case CREATE_RTWO_RESET:
      return state
        .setIn(['rtwoforms', 'submitForm', 'success'], false)
        .setIn(['rtwoforms', 'submitForm', 'loading'], false)
        .setIn(['rtwoforms', 'submitForm', 'error'], false)
        .setIn(['rtwoforms', 'submitForm', 'rtwoTypeID'], false)
        .setIn(['rtwoforms', 'submitForm', 'Employeeid'], false)
        .setIn(['rtwoforms', 'submitForm', 'Reason'], false)
        .setIn(['rtwoforms', 'submitForm', 'Requesttime'], false)
        .setIn(['rtwoforms', 'submitForm', 'Requestdate'], false)
        .setIn(['rtwoforms', 'submitForm', 'requestRespSuccess'], false)
        .setIn(['rtwoforms', 'submitForm', 'requestRespError'], false);
    case RTWO_REFERRENCES:
      return state
        .setIn(['rtwoforms', 'rtworeferrences', 'loading'], true)
        .setIn(['rtwoforms', 'rtworeferrences', 'error'], false)
        .setIn(['rtwoforms', 'rtworeferrences', 'ObjectList'], false);
    case SUCCESS_RTWOREFERRENCES:
      return state
        .setIn(['rtwoforms', 'rtworeferrences', 'loading'], false)
        .setIn(['rtwoforms', 'rtworeferrences', 'ObjectList'], action.data);
    case ERROR_RTWOREFERRENCES:
      return state
        .setIn(['rtwoforms', 'rtworeferrences', 'loading'], false)
        .setIn(['rtwoforms', 'rtworeferrences', 'error'], action.error);
    case EMPLOYEE_LISTS:
      return state
        .setIn(['rtwoforms', 'employeelists', 'loading'], true)
        .setIn(['rtwoforms', 'employeelists', 'error'], false)
        .setIn(['rtwoforms', 'employeelists', 'PageDetails'], false)
        .setIn(['rtwoforms', 'employeelists', 'PageIndex'], action.page)
        .setIn(['rtwoforms', 'employeelists', 'search'], action.search)
        .setIn(['rtwoforms', 'employeelists', 'ObjectList'], false);
    case EMPLOYEE_SUCCESS:
      return state
        .setIn(['rtwoforms', 'employeelists', 'loading'], false)
        .setIn(['rtwoforms', 'employeelists', 'PageDetails'], action.pagedetails)
        .setIn(['rtwoforms', 'employeelists', 'ObjectList'], action.data);
    case EMPLOYEE_ERROR:
      return state
        .setIn(['rtwoforms', 'employeelists', 'loading'], false)
        .setIn(['rtwoforms', 'employeelists', 'error'], action.error)
        .setIn(['rtwoforms', 'employeelists', 'PageDetails'], false);
    case EMPLOYEE_LISTS_NORESETPAGE:
      return state
        .setIn(['rtwoforms', 'employeelists', 'loading'], true)
        .setIn(['rtwoforms', 'employeelists', 'error'], false)
        .setIn(['rtwoforms', 'employeelists', 'PageIndex'], action.page)
        .setIn(['rtwoforms', 'employeelists', 'search'], action.search)
        .setIn(['rtwoforms', 'employeelists', 'ObjectList'], false);
    default:
      return state;
  }
}

export default appReducer;
