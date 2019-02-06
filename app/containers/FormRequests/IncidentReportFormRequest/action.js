/*
 * App Actions Creators
 */

import {
  SEARCH_QUERY, SEARCH_ERROR, EMPLOYEE_LISTS,
  EMPLOYEE_SUCCESS, CREATE_IRFREQUESTS, IRF_REFERRENCES,
  SUCCESS_IRFREFERRENCES, SUCCESS_IRFFORMS, ERROR_IRFFORMS, DISMISS_IRFFORMS,
} from './constants';

/**
 * Incident Report Form, this action starts the request saga
*/
export function searchLists(page, searchData) {
  return {
    type: SEARCH_QUERY,
    page,
    searchData,
  };
}
export function searchError(error) {
  return {
    type: SEARCH_ERROR,
    error,
  };
}
export function showEmployeeLists(page) {
  return {
    type: EMPLOYEE_LISTS,
    page,
  };
}
export function showEmployeeListsSuccess(data, pagedetails) {
  return {
    type: EMPLOYEE_SUCCESS,
    data,
    pagedetails,
  };
}
export function IRFReferrences() {
  return {
    type: IRF_REFERRENCES,
  };
}
export function successIRFReferrences(data) {
  return {
    type: SUCCESS_IRFREFERRENCES,
    data,
  };
}
export function createIRFRequests(irftypeid, requestorempid, reason, requestdate, requesttime, requestlocation, attachments) {
  return {
    type: CREATE_IRFREQUESTS,
    irftypeid,
    requestorempid,
    reason,
    requestdate,
    requesttime,
    requestlocation,
    attachments,
  };
}
export function successIRFForms(successcode, succesmsg) {
  return {
    type: SUCCESS_IRFFORMS,
    successcode,
    succesmsg,
  };
}
export function errorIRFForms(errorcode, errormsg) {
  return {
    type: ERROR_IRFFORMS,
    errorcode,
    errormsg,
  };
}
export function dismissIRFForms() {
  return {
    type: DISMISS_IRFFORMS,
  };
}
