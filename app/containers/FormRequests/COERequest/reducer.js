/*
 * Coe Form Request Reducer
 *
 */

import { fromJS } from 'immutable';

import {
  CREATE_COEFORMS, SUCCESS_COEFORMS, ERROR_COEFORMS,
  DISMISS_COEFORMS, RETRIEVE_COETYPELISTS, RETRIEVE_COETYPELISTSUCCESS, RETRIEVE_COETYPELISTERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  coeforms: {
    saveForms: {
      loading: false,
      error: false,
      description: false,
      typeID: false,
      customInput: false,
      successCode: false,
      successMessage: false,
      errorCode: false,
      errorMessage: false,
    },
    reflist: {
      loading: false,
      error: false,
      ObjectList: false,
    },
  },
});

function COEFormReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_COEFORMS:
      return state
        .setIn(['coeforms', 'saveForms', 'loading'], true)
        .setIn(['coeforms', 'saveForms', 'error'], false)
        .setIn(['coeforms', 'saveForms', 'successCode'], false)
        .setIn(['coeforms', 'saveForms', 'successMessage'], false)
        .setIn(['coeforms', 'saveForms', 'description'], action.descr)
        .setIn(['coeforms', 'saveForms', 'typeID'], action.id)
        .setIn(['coeforms', 'saveForms', 'customInput'], action.custominput);
    case RETRIEVE_COETYPELISTS:
      return state
        .setIn(['coeforms', 'reflist', 'loading'], true)
        .setIn(['coeforms', 'reflist', 'error'], false)
        .setIn(['coeforms', 'reflist', 'ObjectList'], false);
    case RETRIEVE_COETYPELISTSUCCESS:
      return state
        .setIn(['coeforms', 'reflist', 'loading'], false)
        .setIn(['coeforms', 'reflist', 'error'], false)
        .setIn(['coeforms', 'reflist', 'ObjectList'], action.reflists);
    case RETRIEVE_COETYPELISTERROR:
      return state
          .setIn(['coeforms', 'reflist', 'loading'], false)
          .setIn(['coeforms', 'reflist', 'error'], action.err);
    case SUCCESS_COEFORMS:
      return state
        .setIn(['coeforms', 'saveForms', 'loading'], false)
        .setIn(['coeforms', 'saveForms', 'successMessage'], false)
        .setIn(['coeforms', 'saveForms', 'successCode'], action.successcode)
        .setIn(['coeforms', 'saveForms', 'successMessage'], action.succesmsg);
    case ERROR_COEFORMS:
      return state
        .setIn(['coeforms', 'saveForms', 'loading'], false)
        .setIn(['coeforms', 'saveForms', 'error'], action.error)
        .setIn(['coeforms', 'saveForms', 'errorCode'], action.errorcode)
        .setIn(['coeforms', 'saveForms', 'errorMessage'], action.errormsg);
    case DISMISS_COEFORMS:
      return state
        .setIn(['coeforms', 'saveForms', 'successCode'], false)
        .setIn(['coeforms', 'saveForms', 'successMessage'], false)
        .setIn(['coeforms', 'saveForms', 'errorCode'], false)
        .setIn(['coeforms', 'saveForms', 'errorMessage'], false)
        .setIn(['coeforms', 'saveForms', 'description'], false)
        .setIn(['coeforms', 'saveForms', 'typeID'], false)
        .setIn(['coeforms', 'saveForms', 'customInput'], false);
    default:
      return state;
  }
}
export default COEFormReducer;
