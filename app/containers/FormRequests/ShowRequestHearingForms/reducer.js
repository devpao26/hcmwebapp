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
  GET_APPROVEDSCMREFS,
  GET_APPROVEDSCMREFSUCCESS,
  GET_APPROVEDSCMREFERROR,
  GET_APPROVEDSCMREFRESET,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  showhearingform: {
    submitForm: {
      loading: false,
      error: false,
      success: false,
      Employeeid: false,
      Violation: false,
      DateOfHearing: false,
      SCMRequestID: false,
      HearingLocID: false,
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
    approvedrefs: {
      loading: false,
      error: false,
      ApprovedID: false,
      ObjectList: false,
      PageDetails: false,
      PageIndex: false,
      search: false,
    },
  },
});
function appReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_FORM:
      return state
        .setIn(['showhearingform', 'submitForm', 'loading'], true)
        .setIn(['showhearingform', 'submitForm', 'error'], false)
        .setIn(['showhearingform', 'submitForm', 'Employeeid'], action.empid)
        .setIn(['showhearingform', 'submitForm', 'Violation'], action.violation)
        .setIn(['showhearingform', 'submitForm', 'SCMRequestID'], action.scmreqid)
        .setIn(['showhearingform', 'submitForm', 'DateOfHearing'], action.dateofhearing)
        .setIn(['showhearingform', 'submitForm', 'HearingLocID'], action.locationid)
        .setIn(['showhearingform', 'submitForm', 'Employees'], action.employees);
    case CREATE_FORM_SUCCESS:
      return state
        .setIn(['showhearingform', 'submitForm', 'loading'], false)
        .setIn(['showhearingform', 'submitForm', 'Employeeid'], false)
        .setIn(['showhearingform', 'submitForm', 'Violation'], false)
        .setIn(['showhearingform', 'submitForm', 'SCMRequestID'], false)
        .setIn(['showhearingform', 'submitForm', 'DateOfHearing'], false)
        .setIn(['showhearingform', 'submitForm', 'HearingLocID'], false)
        .setIn(['showhearingform', 'submitForm', 'Employees'], false)
        .setIn(['showhearingform', 'submitForm', 'requestRespSuccess'], true)
        .setIn(['showhearingform', 'submitForm', 'success'], action.resp);
    case CREATE_FORM_ERROR:
      return state
        .setIn(['showhearingform', 'submitForm', 'loading'], false)
        .setIn(['showhearingform', 'submitForm', 'requestRespError'], true)
        .setIn(['showhearingform', 'submitForm', 'error'], action.resp);
    case CREATE_FORM_RESET:
      return state
        .setIn(['showhearingform', 'submitForm', 'success'], false)
        .setIn(['showhearingform', 'submitForm', 'loading'], false)
        .setIn(['showhearingform', 'submitForm', 'error'], false)
        .setIn(['showhearingform', 'submitForm', 'loading'], false)
        .setIn(['showhearingform', 'submitForm', 'Employeeid'], false)
        .setIn(['showhearingform', 'submitForm', 'Violation'], false)
        .setIn(['showhearingform', 'submitForm', 'SCMRequestID'], false)
        .setIn(['showhearingform', 'submitForm', 'DateOfHearing'], false)
        .setIn(['showhearingform', 'submitForm', 'HearingLocID'], false)
        .setIn(['showhearingform', 'submitForm', 'Employees'], false)
        .setIn(['showhearingform', 'submitForm', 'requestRespSuccess'], false)
        .setIn(['showhearingform', 'submitForm', 'requestRespError'], false);
    case EMPLOYEE_LISTS:
      return state
        .setIn(['showhearingform', 'employeelists', 'loading'], true)
        .setIn(['showhearingform', 'employeelists', 'error'], false)
        .setIn(['showhearingform', 'employeelists', 'PageDetails'], false)
        .setIn(['showhearingform', 'employeelists', 'PageIndex'], action.page)
        .setIn(['showhearingform', 'employeelists', 'search'], action.search)
        .setIn(['showhearingform', 'employeelists', 'ObjectList'], false);
    case EMPLOYEE_SUCCESS:
      return state
        .setIn(['showhearingform', 'employeelists', 'loading'], false)
        .setIn(['showhearingform', 'employeelists', 'PageDetails'], action.pagedetails)
        .setIn(['showhearingform', 'employeelists', 'ObjectList'], action.data);
    case EMPLOYEE_ERROR:
      return state
        .setIn(['showhearingform', 'employeelists', 'loading'], false)
        .setIn(['showhearingform', 'employeelists', 'error'], action.error)
        .setIn(['showhearingform', 'employeelists', 'PageDetails'], false);
    case EMPLOYEE_LISTS_NORESETPAGE:
      return state
        .setIn(['showhearingform', 'employeelists', 'loading'], true)
        .setIn(['showhearingform', 'employeelists', 'error'], false)
        .setIn(['showhearingform', 'employeelists', 'PageIndex'], action.page)
        .setIn(['showhearingform', 'employeelists', 'search'], action.search)
        .setIn(['showhearingform', 'employeelists', 'ObjectList'], false);
    case GET_WORKFLOWREFS:
      return state
        .setIn(['showhearingform', 'referrences', 'loading'], true)
        .setIn(['showhearingform', 'referrences', 'ObjectList'], false);
    case GET_WORKFLOWREFSUCCESS:
      return state
      .setIn(['showhearingform', 'referrences', 'loading'], false)
      .setIn(['showhearingform', 'referrences', 'ObjectList'], action.data);
    case GET_WORKFLOWREFERROR:
      return state
        .setIn(['showhearingform', 'referrences', 'loading'], false)
        .setIn(['showhearingform', 'referrences', 'error'], action.error);
    case GET_APPROVEDSCMREFS:
      return state
      .setIn(['showhearingform', 'approvedrefs', 'loading'], true)
      .setIn(['showhearingform', 'approvedrefs', 'error'], false)
      .setIn(['showhearingform', 'approvedrefs', 'PageDetails'], false)
      .setIn(['showhearingform', 'approvedrefs', 'ApprovedID'], action.id)
      .setIn(['showhearingform', 'approvedrefs', 'PageIndex'], action.page)
      .setIn(['showhearingform', 'approvedrefs', 'search'], action.search)
      .setIn(['showhearingform', 'approvedrefs', 'ObjectList'], false);
    case GET_APPROVEDSCMREFSUCCESS:
      return state
      .setIn(['showhearingform', 'approvedrefs', 'loading'], false)
      .setIn(['showhearingform', 'approvedrefs', 'Employeeid'], false)
      .setIn(['showhearingform', 'approvedrefs', 'PageDetails'], action.pagedetails)
      .setIn(['showhearingform', 'approvedrefs', 'ObjectList'], action.data);
    case GET_APPROVEDSCMREFERROR:
      return state
      .setIn(['showhearingform', 'approvedrefs', 'loading'], false)
      .setIn(['showhearingform', 'approvedrefs', 'error'], action.error)
      .setIn(['showhearingform', 'approvedrefs', 'PageIndex'], false)
      .setIn(['showhearingform', 'approvedrefs', 'PageDetails'], false);
    case GET_APPROVEDSCMREFRESET:
      return state
        .setIn(['showhearingform', 'employeelists', 'loading'], true)
        .setIn(['showhearingform', 'employeelists', 'error'], false)
        .setIn(['showhearingform', 'employeelists', 'PageIndex'], action.page)
        .setIn(['showhearingform', 'employeelists', 'search'], action.search)
        .setIn(['showhearingform', 'employeelists', 'ObjectList'], false);
    default:
      return state;
  }
}

export default appReducer;
