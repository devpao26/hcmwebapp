/*
 *
 * CFORM actions
 *
 */

import { RESET_STATE, CFList } from './constants';

/**
 * Reset State on Unmount
 */
export function resetState() {
  return {
    type: RESET_STATE,
  };
}

/**
 * Retrieve Custom Form List
 */
export function getCustomFormList(type, page, search) {
  return {
    type,
    page,
    search,
  };
}

export function getCustomFormListError(error) {
  return {
    type: CFList.ERROR,
    error,
  };
}

export function getCustomFormListSuccess(data, pages) {
  return {
    type: CFList.SUCCESS,
    data,
    pages,
  };
}
