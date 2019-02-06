/*
 *
 * IRF actions
 *
 */

import { RESET_STATE, IRFList } from './constants';

/**
 * Reset State on Unmount
 */
export function resetState() {
  return {
    type: RESET_STATE,
  };
}

/**
 * Retrieve IRF List
 */
export function getIRFList(type, page, search) {
  return {
    type,
    page,
    search,
  };
}

export function getIRFListError(error) {
  return {
    type: IRFList.ERROR,
    error,
  };
}

export function getIRFListSuccess(data, pages) {
  return {
    type: IRFList.SUCCESS,
    data,
    pages,
  };
}
