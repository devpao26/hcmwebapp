/*
 * App Actions
 */
import {
  CREATE_COEFORMS, SUCCESS_COEFORMS, ERROR_COEFORMS,
  DISMISS_COEFORMS, RETRIEVE_COETYPELISTS, RETRIEVE_COETYPELISTSUCCESS,
  RETRIEVE_COETYPELISTERROR,
} from './constants';

/**
 * COE Request Forms, this action starts the request saga
 *
 * @return {object} An action object with a type of SAMPLE_ACTION
*/
export function createCOEForms(descr, id, custominput) {
  return {
    type: CREATE_COEFORMS,
    descr,
    id,
    custominput,
  };
}
export function retrieveCOEtypeList() {
  return {
    type: RETRIEVE_COETYPELISTS,
  };
}
export function retrieveOTFormSuccess(reflists) {
  return {
    type: RETRIEVE_COETYPELISTSUCCESS,
    reflists,
  };
}
export function retrieveOTFormError(err) {
  return {
    type: RETRIEVE_COETYPELISTERROR,
    err,
  };
}
export function successCOEForms(successcode, succesmsg) {
  return {
    type: SUCCESS_COEFORMS,
    successcode,
    succesmsg,
  };
}
export function errorCOEForms(errorcode, errormsg) {
  return {
    type: ERROR_COEFORMS,
    errorcode,
    errormsg,
  };
}
export function dismissCOEForms() {
  return {
    type: DISMISS_COEFORMS,
  };
}
