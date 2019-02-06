/*
 *
 * OT actions
 *
 */

import { RESET_STATE, OTList } from './constants';

/**
 * Reset State on Unmount
 */
export function resetState() {
  return {
    type: RESET_STATE,
  };
}

/**
 * Retrieve OT List
 * @param {Object} page Sends the Page Index
 */
export function getOTList(type, page, search) {
  return {
    type,
    page,
    search,
  };
}

export function getOTListError(error) {
  return {
    type: OTList.ERROR,
    error,
  };
}

export function getOTListSuccess(data, pages) {
  return {
    type: OTList.SUCCESS,
    data,
    pages,
  };
}
