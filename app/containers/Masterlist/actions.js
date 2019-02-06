/**
 * Employee MasterList actions
 */

import { MasterList, RESET_STATE } from './constants';

/**
 * Reset State on Unmount
 */
export function resetEmpListState() {
  return {
    type: RESET_STATE,
  };
}

/**
 * Retrieve Employee MasterList
 * @param {string}  type    The return type
 * @param {object}  data    Request body object for the API
 */
export function getEmpMasterList(type, data) {
  return {
    type,
    data,
  };
}

/**
 * Retrieve Employee MasterList Success
 * @param {array}   data    Employee array
 * @param {object}  pages   Page details
 */
export function getEmpMasterListSuccess(data, pages) {
  return {
    type: MasterList.SUCCESS,
    data,
    pages,
  };
}

/**
 * Retrieve Employee MasterList Error
 * @param {object}  error   Error details
 */
export function getEmpMasterListError(error) {
  return {
    type: MasterList.ERROR,
    error,
  };
}
