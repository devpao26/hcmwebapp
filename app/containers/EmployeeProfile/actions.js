/*
 *
 * EmployeeProfile actions
 *
 */

import {
  RESET_STATE,
  EmpProfile,
  LOAD_COMPS,
  UpdateProfile,
  EmpReqs,
} from './constants';

/**
 * Retrieve Employee Profile
 */
export function getEmpProfile(empID) {
  return {
    type: EmpProfile.RETRIEVE,
    empID,
  };
}

/**
 * Retrieve Employee Profile Success
 * @param {object} data   Object data of Employee
 */
export function getEmpProfileSuccess(data) {
  return {
    type: EmpProfile.SUCCESS,
    data,
  };
}

/**
 * Retrieve Employee Profile Error
 * @param {object} error  Error object
 */
export function getEmpProfileError(error) {
  return {
    type: EmpProfile.ERROR,
    error,
  };
}

/**
 * Reset the Employee Profile State on unmount
 * @return {object}   Returns an object with a type of RESET_STATE
 */
export function resetEmpProfState() {
  return {
    type: RESET_STATE,
  };
}

/**
 * Update Profile
 */
export function getUpdateEmpProf(type, data) {
  return {
    type,
    data,
  };
}
export function getUpdateEmpProfSuccess() {
  return {
    type: UpdateProfile.SUCCESS,
  };
}
export function getUpdateEmpProfError(error) {
  return {
    type: UpdateProfile.ERROR,
    error,
  };
}

/**
 * Employee Requirements List
 */
export function getEmpReqs(type, page) {
  return {
    type,
    page,
  };
}
export function getEmpReqsSuccess(data, pages) {
  return {
    type: EmpReqs.SUCCESS,
    data,
    pages,
  };
}
export function getEmpReqsError(error) {
  return {
    type: EmpReqs.ERROR,
    error,
  };
}

/**
 * Load Initial List for Sub Components
 */
export function loadInitSubComponents() {
  return {
    type: LOAD_COMPS,
  };
}
