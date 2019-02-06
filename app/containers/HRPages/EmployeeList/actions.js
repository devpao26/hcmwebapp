/*
 * Employee Masterlist Actions
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
  CLEAR_STATE,
  GET_EMPLIST,
  GET_EMPLISTSUCCESS,
  GET_EMPLISTFAILED,
  GET_EMPSEARCH,
  SET_LEAVES,
  SET_LEAVESSUCCESS,
  SET_LEAVESERROR,
  CLEAR_LEAVESDATA,
} from './constants';

/**
 * Clear state on unmount
 */
export function getClearState() {
  return {
    type: CLEAR_STATE,
  };
}

// Employee Masterlist Retrieval
export function retrieveEmpList(page, search) {
  return {
    type: GET_EMPLIST,
    page,
    search,
  };
}

export function retrievalEmpListSuccess(data, pageDetails) {
  return {
    type: GET_EMPLISTSUCCESS,
    data,
    pageDetails,
  };
}

export function retrievalEmpListFailed(error) {
  return {
    type: GET_EMPLISTFAILED,
    error,
  };
}

export function retrieveEmpListSearch(page, search) {
  return {
    type: GET_EMPSEARCH,
    page,
    search,
  };
}


/**
 * Update Employee Leave Credits
 * @prop data       Leave Credits data
 * @return {object} Returns an object with a type of SET_LEAVES
 */
export function updateLeaves(empID, data) {
  return {
    type: SET_LEAVES,
    empID,
    data,
  };
}

/**
 * Update Employee Leave Credits Success
 * @return {object} Returns an object with a type of SET_LEAVESSUCCESS
 */
export function updateLeaveSuccess() {
  return {
    type: SET_LEAVESSUCCESS,
  };
}

/**
 * Update Employee Leave Credits
 * @prop error      Error Details
 * @return {object} Returns an object with a type of SET_LEAVESERROR
 */
export function updateLeavesError(error) {
  return {
    type: SET_LEAVESERROR,
    error,
  };
}

/**
 * Clear the Update Employee Leave Credits data
 * @return {object} Returns an object with a type of CLEAR_LEAVESDATA
 */
export function clearLeavesData() {
  return {
    type: CLEAR_LEAVESDATA,
  };
}
