/*
 * Floor Status actions
 */

import {
  WRITE_IDDATE,
  REQUEST_DTR,
  REQUEST_DTRSUCCESS,
  REQUEST_DTRERROR,
  CLEAR_URI,
} from './constants';

// Write the EMP Profile ID and the Date to retrieve employee summaries
export function writeIdDate(id, date, filter) {
  return {
    type: WRITE_IDDATE,
    id,
    date,
    filter,
  };
}

/**
 * One selector for all pagination in floor status page
 * @param = page (num)
 *          actionType (const imported from constants)
 */
export function getPagination(page, actionType) {
  return {
    type: actionType,
    page,
  };
}

/**
 * Write to state the saga api success datas
 * @param = actionType (const imported from constants.js)
 *          data (can either be array of datas or error object data)
 *          pages (object data of PageDetails)
 */
export function getDataSuccess(actionType, data, pages) {
  return {
    type: actionType,
    data,
    pages,
  };
}

/**
 * Write to state the saga api error data
 * @param = actionType (const imported from constants.js)
 *          error (this are server and sessions expired errors)
 */
export function getDataError(actionType, error) {
  return {
    type: actionType,
    error,
  };
}

/**
 * Request a DTR in the api of the employee and selected date
 * @param = date (date to pass for dtr)
 *          id (employee profile id)
 */
export function dtrExport(date, id) {
  return {
    type: REQUEST_DTR,
    date,
    id,
  };
}

export function dtrExportSuccess(uri) {
  return {
    type: REQUEST_DTRSUCCESS,
    uri,
  };
}

export function dtrExportError(error) {
  return {
    type: REQUEST_DTRERROR,
    error,
  };
}

export function clearDtrUri() {
  return {
    type: CLEAR_URI,
  };
}
