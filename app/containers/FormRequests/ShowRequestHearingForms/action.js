/*
 * App Actions Creators
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */
import {
    CREATE_FORM,
    CREATE_FORM_SUCCESS,
    CREATE_FORM_ERROR,
    CREATE_FORM_RESET,
    EMPLOYEE_LISTS,
    EMPLOYEE_ERROR,
    EMPLOYEE_SUCCESS,
    EMPLOYEE_LISTS_NORESETPAGE,
    GET_WORKFLOWREFS,
    GET_WORKFLOWREFSUCCESS,
    GET_WORKFLOWREFERROR,
    GET_APPROVEDSCMREFS,
    GET_APPROVEDSCMREFSUCCESS,
    GET_APPROVEDSCMREFERROR,
    GET_APPROVEDSCMREFRESET,
  } from './constants';

/**
 * Submit Show Cause Memo Request
 */
export function createFormRequest(empid, violation, dateofhearing, scmreqid, locationid, employees) {
  return {
    type: CREATE_FORM,
    empid,
    violation,
    dateofhearing,
    scmreqid,
    locationid,
    employees,
  };
}
export function createFormRequestSuccess(resp) {
  return {
    type: CREATE_FORM_SUCCESS,
    resp,
  };
}
export function createFormRequestError(resp) {
  return {
    type: CREATE_FORM_ERROR,
    resp,
  };
}
export function createFormRequestReset() {
  return {
    type: CREATE_FORM_RESET,
  };
}
/**
 * Show employee list, this action starts the request saga
 *
 * @return {object} An action object with a type of SAMPLE_ACTION
*/
export function showEmployeeLists(page, search) {
  return {
    type: EMPLOYEE_LISTS,
    page,
    search,
  };
}
export function showEmployeeListsSuccess(data, pagedetails) {
  return {
    type: EMPLOYEE_SUCCESS,
    data,
    pagedetails,
  };
}
export function showEmployeeListsError(error) {
  return {
    type: EMPLOYEE_ERROR,
    error,
  };
}
export function showEmployeeListsNoReset(page, search) {
  return {
    type: EMPLOYEE_LISTS_NORESETPAGE,
    page,
    search,
  };
}
/**
 * Show workflow referrences, this action starts the request saga
 *
 * @return {object} An action object with a type of SAMPLE_ACTION
*/
export function workflowReferrences() {
  return {
    type: GET_WORKFLOWREFS,
  };
}
export function successWorkflowReferrences(data) {
  return {
    type: GET_WORKFLOWREFSUCCESS,
    data,
  };
}
export function errorWorkflowReferrences(error) {
  return {
    type: GET_WORKFLOWREFERROR,
    error,
  };
}
/**
 * Show approved list of show cause memo listings, this action starts the request saga
 *
 * @return {object} An action object with a type of SAMPLE_ACTION
*/
export function approvedReferrences(page, search, id) {
  return {
    type: GET_APPROVEDSCMREFS,
    page,
    search,
    id,
  };
}
export function successApprovedReferrences(data) {
  return {
    type: GET_APPROVEDSCMREFSUCCESS,
    data,
  };
}
export function errorApprovedReferrences(error) {
  return {
    type: GET_APPROVEDSCMREFERROR,
    error,
  };
}
export function resetApprovedReferrences(page, search) {
  return {
    type: GET_APPROVEDSCMREFRESET,
    page,
    search,
  };
}
