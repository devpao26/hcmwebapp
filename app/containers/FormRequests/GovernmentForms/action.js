/*
 * App Actions
 */

import { RETRIEVE_CUSTOMFORMS, RETRIEVE_SUCCESSCUSTOMFORMS, RETRIEVE_ERRORCUSTOMFORMS, SUCCESS_CUSTOMFORMS, ERROR_CUSTOMFORMS, DISMISS_CUSTOMFORMS } from './constants';

/**
 * Other Government Forms, this action starts the request saga
 *
 * @return {object} An action object with a type of SAMPLE_ACTION
*/
export function retrieveCustomFormsReferrences() {
  return {
    type: RETRIEVE_CUSTOMFORMS,
  };
}
export function retrieveSuccessCustomFormsReferrences(data) {
  return {
    type: RETRIEVE_SUCCESSCUSTOMFORMS,
    data,
  };
}
export function retrieveErrorCustomFormsReferrences(error) {
  return {
    type: RETRIEVE_ERRORCUSTOMFORMS,
    error,
  };
}
export function successCustomForms(successcode, succesmsg) {
  return {
    type: SUCCESS_CUSTOMFORMS,
    successcode,
    succesmsg,
  };
}
export function errorCustomForms(errorcode, errormsg) {
  return {
    type: ERROR_CUSTOMFORMS,
    errorcode,
    errormsg,
  };
}
export function dismissCustomForms() {
  return {
    type: DISMISS_CUSTOMFORMS,
  };
}
