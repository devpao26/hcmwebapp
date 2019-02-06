/*
 *
 * ATTENDANCE actions
 *
 */

import { RESET_STATE, AttendanceList } from './constants';

/**
 * Reset State on Unmount
 */
export function resetState() {
  return {
    type: RESET_STATE,
  };
}

/**
 * Retrieve Attendance List
 */
export function getATTList(type, page, search) {
  return {
    type,
    page,
    search,
  };
}

export function getATTListError(error) {
  return {
    type: AttendanceList.ERROR,
    error,
  };
}

export function getATTListSuccess(data, pages) {
  return {
    type: AttendanceList.SUCCESS,
    data,
    pages,
  };
}
