/**
 * Transfer Actions
 */

import {
  TOGGLE_TRANSFER,
  GET_TRANSFERLIST,
  GET_TRANSFERLIST_SUCCESS,
  GET_TRANSFERLIST_ERROR,
  GET_TRANSFERLIST_NORESET,
} from './constants';

/**
 * Toggle Transfer Modal
 * @prop {boolean}  isShowing   True/False show/hide transfer modal
 * @prop {object}   empData     Should contain empIDs, empNames, currentID, current isTeam
 *  Object JSON format for the empData
 *  emp: [
 *    { id: GUID, name: Employee Name (string) },
 *    { id: GUID, name: Employee Name (string) },
 *  ],
 *  current: [
 *    { id: Team/Dept ID, name: Team/Dept Name, isTeam: true/false (if it is a team id value is true else false)}
 *    { id: Team/Dept ID, name: Team/Dept Name, isTeam: true/false (if it is a team id value is true else false)}
 *  ]
 *  NOTE: the current property should only have one object if we are coming from workgroup page
 */
export function toggleTransferModal(isShowing, empData) {
  return {
    type: TOGGLE_TRANSFER,
    isShowing,
    empData,
  };
}

/**
 * Retrieve Transfer Group List
 * @param {string}  id      Group ID to be retrieve
 * @param {boolean} isTeam  Check if we are retrieving a team/dept
 * @param {number}  page    Page number to be retrieve
 * @param {string}  search  Search string of page retrieval
 */
export function getTransferList(id, isTeam, page, search) {
  return {
    type: GET_TRANSFERLIST,
    id,
    isTeam,
    page,
    search,
  };
}
export function getTransferListSuccess(data, pages) {
  return {
    type: GET_TRANSFERLIST_SUCCESS,
    data,
    pages,
  };
}
export function getTransferListError(error) {
  return {
    type: GET_TRANSFERLIST_ERROR,
    error,
  };
}
export function getTransferListNoReset(id, isTeam, page, search) {
  return {
    type: GET_TRANSFERLIST_NORESET,
    id,
    isTeam,
    page,
    search,
  };
}
