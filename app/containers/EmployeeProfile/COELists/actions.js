/*
 *
 * COE actions
 *
 */

import { RESET_STATE, Lists } from './constants';

/**
 * Reset State on Unmount
 */
export function resetState() {
  return {
    type: RESET_STATE,
  };
}

/**
 * Retrieve COE List
 * @param {Object} page Sends the Page Index
 */
export function getCOEList(type, page, search) {
  return {
    type,
    page,
    search,
  };
}
export function getCOEListSuccess(data, pages) {
  return {
    type: Lists.SUCCESS,
    data,
    pages,
  };
}
export function getCOEListError(error) {
  return {
    type: Lists.ERROR,
    error,
  };
}
