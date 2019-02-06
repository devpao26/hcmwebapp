/*
 * App Reducers
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
  SEARCH_QUERY, SEARCH_ERROR, EMPLOYEE_LISTS,
  EMPLOYEE_SUCCESS, EMPLOYEE_ERROR, CREATE_IRFREQUESTS,
  IRF_REFERRENCES, SUCCESS_IRFREFERRENCES, SUCCESS_IRFFORMS,
  ERROR_IRFFORMS, DISMISS_IRFFORMS,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  irfforms: {
    loading: false,
    error: false,
    successCode: false,
    successMessage: false,
    errorCode: false,
    errorMessage: false,
    employeelists: {
      loading: false,
      error: false,
      ObjectList: false,
      PageDetails: false,
      PageIndex: false,
      searchData: false,
    },
    saveRequest: {
      loading: false,
      error: false,
      irfTypeID: false,
      attachmentFile: false,
      requestorEmpID: false,
      Reason: false,
      Requesttime: false,
      Requestlocation: false,
      Requestdate: false,
      response: false,
    },
    irfreferrences: {
      loading: false,
      error: false,
      ObjectList: false,
    },
  },
});

function AppReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_QUERY:
      return state
        .setIn(['irfforms', 'employeelists', 'loading'], true)
        .setIn(['irfforms', 'employeelists', 'error'], false)
        .setIn(['irfforms', 'employeelists', 'searchData'], action.searchData)
        .setIn(['irfforms', 'employeelists', 'PageIndex'], action.page);
    case SEARCH_ERROR:
      return state
        .setIn(['irfforms', 'employeelists', 'loading'], false)
        .setIn(['irfforms', 'employeelists', 'ObjectList'], false)
        .setIn(['irfforms', 'employeelists', 'PageDetails'], false)
        .setIn(['irfforms', 'employeelists', 'error'], action.error);
    case EMPLOYEE_LISTS:
      return state
        .setIn(['irfforms', 'employeelists', 'loading'], true)
        .setIn(['irfforms', 'employeelists', 'error'], false)
        .setIn(['irfforms', 'employeelists', 'PageDetails'], false)
        .setIn(['irfforms', 'employeelists', 'ObjectList'], false)
        .setIn(['irfforms', 'employeelists', 'PageIndex'], action.page);
    case EMPLOYEE_SUCCESS:
      return state
        .setIn(['irfforms', 'employeelists', 'loading'], false)
        .setIn(['irfforms', 'employeelists', 'PageDetails'], action.pagedetails)
        .setIn(['irfforms', 'searchData'], action.searchData)
        .setIn(['irfforms', 'employeelists', 'ObjectList'], action.data);
    case EMPLOYEE_ERROR:
      return state
        .setIn(['irfforms', 'employeelists', 'loading'], false)
        .setIn(['irfforms', 'employeelists', 'error'], action.error);
    case CREATE_IRFREQUESTS:
      return state
        .setIn(['irfforms', 'loading'], true)
        .setIn(['irfforms', 'saveRequest', 'error'], false)
        .setIn(['irfforms', 'saveRequest', 'attachmentFile'], action.attachments)
        .setIn(['irfforms', 'saveRequest', 'irfTypeID'], action.irftypeid)
        .setIn(['irfforms', 'saveRequest', 'requestorEmpID'], action.requestorempid)
        .setIn(['irfforms', 'saveRequest', 'Reason'], action.reason)
        .setIn(['irfforms', 'saveRequest', 'Requesttime'], action.requesttime)
        .setIn(['irfforms', 'saveRequest', 'Requestlocation'], action.requestlocation)
        .setIn(['irfforms', 'saveRequest', 'Requestdate'], action.requestdate);
    case IRF_REFERRENCES:
      return state
        .setIn(['irfforms', 'error'], false)
        .setIn(['irfforms', 'irfreferrences', 'ObjectList'], false);
    case SUCCESS_IRFREFERRENCES:
      return state
        .setIn(['irfforms', 'loading'], false)
        .setIn(['irfforms', 'irfreferrences', 'ObjectList'], action.data);
    case SUCCESS_IRFFORMS:
      return state
        .setIn(['irfforms', 'successCode'], action.successcode)
        .setIn(['irfforms', 'successMessage'], action.succesmsg);
    case ERROR_IRFFORMS:
      return state
        .setIn(['irfforms', 'employeelists', 'loading'], false)
        .setIn(['irfforms', 'employeelists', 'error'], action.error)
        .setIn(['irfforms', 'errorCode'], action.errorcode)
        .setIn(['irfforms', 'errorMessage'], action.errormsg);
    case DISMISS_IRFFORMS:
      return state
        .setIn(['irfforms', 'successCode'], false)
        .setIn(['irfforms', 'successMessage'], false)
        .setIn(['irfforms', 'errorCode'], false)
        .setIn(['irfforms', 'errorMessage'], false);
    default:
      return state;
  }
}

export default AppReducer;
