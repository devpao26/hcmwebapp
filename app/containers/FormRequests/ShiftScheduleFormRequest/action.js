/*
 * Action Creators
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
    CREATE_SHIFT,
    CREATE_SHIFT_SUCCESS,
    CREATE_SHIFT_ERROR,
    CREATE_SHIFT_RESET,
    EMPLOYEE_ERROR,
    EMPLOYEE_SUCCESS,
    EMPLOYEE_LISTS,
    EMPLOYEE_LISTS_NORESETPAGE,
    SHIFT_LISTS,
    SHIFT_SUCCESS,
    SHIFT_ERROR,
    SHIFT_LISTS_NORESETPAGE,
  } from './constants';


/**
 * Create Shift Request, this action starts the request saga
 *
 * @return {object} An action object with a type of SAMPLE_ACTION
*/
export function createShiftRequest(defaultid, employeeid, shifttempid, datefrom, dateto, isrequestotheremp) {
  return {
    type: CREATE_SHIFT,
    defaultid,
    employeeid,
    shifttempid,
    datefrom,
    dateto,
    isrequestotheremp,
  };
}
export function createShiftrequestSuccess(resp) {
  return {
    type: CREATE_SHIFT_SUCCESS,
    resp,
  };
}
export function createShiftrequestError(resp) {
  return {
    type: CREATE_SHIFT_ERROR,
    resp,
  };
}
export function createShiftrequestReset() {
  return {
    type: CREATE_SHIFT_RESET,
  };
}
/**
 * Show employee listings, this action starts the request saga
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
 * Show employee listings, this action starts the request saga
 *
 * @return {object} An action object with a type of SAMPLE_ACTION
*/
export function showShiftLists(page, search) {
  return {
    type: SHIFT_LISTS,
    page,
    search,
  };
}
export function showShiftListSuccess(data, pagedetails) {
  return {
    type: SHIFT_SUCCESS,
    data,
    pagedetails,
  };
}
export function showShiftListError(error) {
  return {
    type: SHIFT_ERROR,
    error,
  };
}
export function showShiftListNoReset(page, search) {
  return {
    type: SHIFT_LISTS_NORESETPAGE,
    page,
    search,
  };
}
