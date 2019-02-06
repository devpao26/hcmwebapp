/*
 * App Actions
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
    CREATE_RTWO,
    CREATE_RTWO_SUCCESS,
    CREATE_RTWO_ERROR,
    CREATE_RTWO_RESET,
    RTWO_REFERRENCES,
    SUCCESS_RTWOREFERRENCES,
    ERROR_RTWOREFERRENCES,
    EMPLOYEE_ERROR,
    EMPLOYEE_SUCCESS,
    EMPLOYEE_LISTS,
    EMPLOYEE_LISTS_NORESETPAGE,
  } from './constants';

/**
 * Submit RTWO request form
 */
export function createRTWOrequest(empprofileid, rtwotypeid, reason, requestdate, requesttime) {
  return {
    type: CREATE_RTWO,
    empprofileid,
    rtwotypeid,
    reason,
    requestdate,
    requesttime,
  };
}
export function createRTWOrequestSuccess(resp) {
  return {
    type: CREATE_RTWO_SUCCESS,
    resp,
  };
}
export function createRTWOrequestError(resp) {
  return {
    type: CREATE_RTWO_ERROR,
    resp,
  };
}
export function createRTWOrequestReset() {
  return {
    type: CREATE_RTWO_RESET,
  };
}

/**
 * Create Return To Work Order Request, this action starts the request saga
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

export function RTWOReferrences() {
  return {
    type: RTWO_REFERRENCES,
  };
}
export function RTWOReferrencesSuccess(data) {
  return {
    type: SUCCESS_RTWOREFERRENCES,
    data,
  };
}
export function RTWOReferrencesError(error) {
  return {
    type: ERROR_RTWOREFERRENCES,
    error,
  };
}
