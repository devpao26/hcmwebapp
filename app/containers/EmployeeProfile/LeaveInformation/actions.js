/*
 *
 * EmployeeProfile actions
 *
 */

import {
  RESET_STATE,
  LeaveList,
  SET_LEAVES,
  SET_LEAVESSUCCESS,
  SET_LEAVESERROR,
  CLEAR_LEAVESDATA,
} from './constants';

/**
 * Reset State on Unmount
 */
export function resetLeavesState() {
  return {
    type: RESET_STATE,
  };
}

/**
 * Get the Employee Leave Request List
 * @param {number}  page  Page index of data to be retrieved
 * @return {object}       Returns an object with a type of GET_LEAVEREQLIST
 */
export function getEmpLeaveReqList(type, page, search, filter) {
  return {
    type,
    page,
    search,
    filter,
  };
}

/**
 * Get the Employee Leave Request List Success
 * @param {array}   data    ObjectList of the retrieved data
 * @param {object}  pages   PageDetails of retrieved data
 * @return {obejct}         Returns an object with a type of GET_LEAVEREQLISTSUCCESS
 */
export function getEmpLeaveReqListSuccess(data, pages) {
  return {
    type: LeaveList.SUCCESS,
    data,
    pages,
  };
}

/**
 * Get the Employee Leave Request List Error
 * @param {object}  error   Error details of retrieved data
 * @return {obejct}         Returns an object with a type of GET_LEAVEREQLISTERROR
 */
export function getEmpLeaveReqListError(error) {
  return {
    type: LeaveList.ERROR,
    error,
  };
}

/**
 * Update Employee Leave Credits
 * @prop data       Leave Credits data
 * @return {object} Returns an object with a type of SET_LEAVES
 */
export function updateLeaves(data) {
  return {
    type: SET_LEAVES,
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
