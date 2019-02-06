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
  EMPLOYEE_LISTS,
  EMPLOYEE_SUCCESS,
  EMPLOYEE_ERROR,
  EMPLOYEE_LISTS_NORESETPAGE,
  GET_WORKFLOWREFS,
  GET_WORKFLOWREFSUCCESS,
  GET_WORKFLOWREFERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  showcausememoforms: {
    submitForm: {
      loading: false,
      error: false,
      success: false,
      Employeeid: false,
      Reason: false,
      IncidentDate: false,
      PossibleSanction: false,
      PossibleRuleValidation: false,
      Employees: false,
      requestRespSuccess: false,
      requestRespError: false,
    },
    employeelists: {
      loading: false,
      error: false,
      ObjectList: false,
      PageDetails: false,
      PageIndex: false,
      search: false,
    },
    referrences: {
      loading: false,
      error: false,
      ObjectList: false,
    },
  },
});
function appReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_FORM:
      return state
        .setIn(['showcausememoforms', 'submitForm', 'loading'], true)
        .setIn(['showcausememoforms', 'submitForm', 'error'], false)
        .setIn(['showcausememoforms', 'submitForm', 'Employeeid'], action.empid)
        .setIn(['showcausememoforms', 'submitForm', 'Reason'], action.reason)
        .setIn(['showcausememoforms', 'submitForm', 'IncidentDate'], action.incidentdate)
        .setIn(['showcausememoforms', 'submitForm', 'PossibleSanction'], action.sanction)
        .setIn(['showcausememoforms', 'submitForm', 'PossibleRuleValidation'], action.violation)
        .setIn(['showcausememoforms', 'submitForm', 'Employees'], action.employees);
    case CREATE_FORM_SUCCESS:
      return state
        .setIn(['showcausememoforms', 'submitForm', 'loading'], false)
        .setIn(['showcausememoforms', 'submitForm', 'Employeeid'], false)
        .setIn(['showcausememoforms', 'submitForm', 'Reason'], false)
        .setIn(['showcausememoforms', 'submitForm', 'IncidentDate'], false)
        .setIn(['showcausememoforms', 'submitForm', 'PossibleSanction'], false)
        .setIn(['showcausememoforms', 'submitForm', 'PossibleRuleValidation'], false)
        .setIn(['showcausememoforms', 'submitForm', 'Employees'], false)
        .setIn(['showcausememoforms', 'submitForm', 'requestRespSuccess'], true)
        .setIn(['showcausememoforms', 'submitForm', 'success'], action.resp);
    case CREATE_FORM_ERROR:
      return state
        .setIn(['showcausememoforms', 'submitForm', 'loading'], false)
        .setIn(['showcausememoforms', 'submitForm', 'requestRespError'], true)
        .setIn(['showcausememoforms', 'submitForm', 'error'], action.resp);
    case CREATE_FORM_RESET:
      return state
        .setIn(['showcausememoforms', 'submitForm', 'success'], false)
        .setIn(['showcausememoforms', 'submitForm', 'loading'], false)
        .setIn(['showcausememoforms', 'submitForm', 'error'], false)
        .setIn(['showcausememoforms', 'submitForm', 'Employeeid'], false)
        .setIn(['showcausememoforms', 'submitForm', 'Reason'], false)
        .setIn(['showcausememoforms', 'submitForm', 'IncidentDate'], false)
        .setIn(['showcausememoforms', 'submitForm', 'PossibleSanction'], false)
        .setIn(['showcausememoforms', 'submitForm', 'PossibleRuleValidation'], false)
        .setIn(['showcausememoforms', 'submitForm', 'Employees'], false)
        .setIn(['showcausememoforms', 'submitForm', 'requestRespSuccess'], false)
        .setIn(['showcausememoforms', 'submitForm', 'requestRespError'], false);
    case EMPLOYEE_LISTS:
      return state
        .setIn(['showcausememoforms', 'employeelists', 'loading'], true)
        .setIn(['showcausememoforms', 'employeelists', 'error'], false)
        .setIn(['showcausememoforms', 'employeelists', 'PageDetails'], false)
        .setIn(['showcausememoforms', 'employeelists', 'PageIndex'], action.page)
        .setIn(['showcausememoforms', 'employeelists', 'search'], action.search)
        .setIn(['showcausememoforms', 'employeelists', 'ObjectList'], false);
    case EMPLOYEE_SUCCESS:
      return state
        .setIn(['showcausememoforms', 'employeelists', 'loading'], false)
        .setIn(['showcausememoforms', 'employeelists', 'PageDetails'], action.pagedetails)
        .setIn(['showcausememoforms', 'employeelists', 'ObjectList'], action.data);
    case EMPLOYEE_ERROR:
      return state
        .setIn(['showcausememoforms', 'employeelists', 'loading'], false)
        .setIn(['showcausememoforms', 'employeelists', 'error'], action.error)
        .setIn(['showcausememoforms', 'employeelists', 'PageDetails'], false);
    case EMPLOYEE_LISTS_NORESETPAGE:
      return state
        .setIn(['showcausememoforms', 'employeelists', 'loading'], true)
        .setIn(['showcausememoforms', 'employeelists', 'error'], false)
        .setIn(['showcausememoforms', 'employeelists', 'PageIndex'], action.page)
        .setIn(['showcausememoforms', 'employeelists', 'search'], action.search)
        .setIn(['showcausememoforms', 'employeelists', 'ObjectList'], false);
    case GET_WORKFLOWREFS:
      return state
        .setIn(['showcausememoforms', 'referrences', 'loading'], true)
        .setIn(['showcausememoforms', 'referrences', 'ObjectList'], false);
    case GET_WORKFLOWREFSUCCESS:
      return state
      .setIn(['showcausememoforms', 'referrences', 'loading'], false)
      .setIn(['showcausememoforms', 'referrences', 'ObjectList'], action.data);
    case GET_WORKFLOWREFERROR:
      return state
        .setIn(['showcausememoforms', 'referrences', 'loading'], false)
        .setIn(['showcausememoforms', 'referrences', 'error'], action.error);
    default:
      return state;
  }
}

export default appReducer;
