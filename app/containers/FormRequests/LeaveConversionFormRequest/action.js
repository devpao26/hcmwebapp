/*
 * App Actions Creators
 */
import { CREATE_LCFFORMS, SHOW_LCFREFSFORMS, SUCCESS_LCFFORMS, ERROR_LCFFORMS, DISMISS_LCFORMS, SHOW_SUCCESS_LCFREFSFORMS } from './constants';

/**
 * Leave Conversion Request Forms, this action starts the request saga
 *
 * @return {object} An action object with a type of SAMPLE_ACTION
*/
export function createLCFRequest(date) {
  return {
    type: CREATE_LCFFORMS,
    date,
  };
}
export function showLCFRefs() {
  return {
    type: SHOW_LCFREFSFORMS,
  };
}
export function showLCFRefSuccess(resp) {
  return {
    type: SHOW_SUCCESS_LCFREFSFORMS,
    resp,
  };
}
export function successLCFRequest(successcode, succesmsg) {
  return {
    type: SUCCESS_LCFFORMS,
    successcode,
    succesmsg,
  };
}
export function errorLCFRequest(errorcode, errormsg) {
  return {
    type: ERROR_LCFFORMS,
    errorcode,
    errormsg,
  };
}
export function dismissLCFRequest() {
  return {
    type: DISMISS_LCFORMS,
  };
}
