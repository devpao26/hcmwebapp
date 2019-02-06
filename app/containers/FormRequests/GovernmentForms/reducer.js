/*
 * AppReducer
*/

import { fromJS } from 'immutable';

import { CREATE_CUSTOMFORMS, RETRIEVE_CUSTOMFORMS, RETRIEVE_SUCCESSCUSTOMFORMS, RETRIEVE_ERRORCUSTOMFORMS, SUCCESS_CUSTOMFORMS, ERROR_CUSTOMFORMS, DISMISS_CUSTOMFORMS } from './constants';

// Initial State of the App
const initialState = fromJS({
  customforms: {
    saveForm: {
      loading: false,
      error: false,
      customFormId: false,
      attachmentFile: false,
      reasons: false,
      createFiles: false,
      // response: false,
      successCode: false,
      successMessage: false,
      errorCode: false,
      errorMessage: false,
    },
    customFormsRefs: {
      loadingRefs: false,
      error: false,
      ObjectList: false,
    },
  },
});

function governmentFormsReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_CUSTOMFORMS:
      return state
        .setIn(['customforms', 'saveForm', 'loading'], true)
        .setIn(['customforms', 'saveForm', 'error'], false)
        .setIn(['customforms', 'saveForm', 'customFormId'], action.customformid)
        .setIn(['customforms', 'saveForm', 'attachmentFile'], action.attachments)
        .setIn(['customforms', 'saveForm', 'reasons'], action.reason);
    // case CREATE_CUSTOMFORMSUCCESS:
    //   return state
    //     .setIn(['customforms', 'saveForm', 'loading'], false)
    //     .setIn(['customforms', 'saveForm', 'error'], false)
    //     .setIn(['customforms', 'saveForm', 'customFormId'], false)
    //     .setIn(['customforms', 'saveForm', 'attachmentFile'], false)
    //     .setIn(['customforms', 'saveForm', 'reasons'], false);
    //     // .setIn(['customforms', 'saveForm', 'response'], true);
    case RETRIEVE_CUSTOMFORMS:
      return state
        .setIn(['customforms', 'customFormsRefs', 'loadingRefs'], true)
        .setIn(['customforms', 'customFormsRefs', 'error'], false)
        .setIn(['customforms', 'customFormsRefs', 'ObjectList'], false);
    case RETRIEVE_SUCCESSCUSTOMFORMS:
      return state
        .setIn(['customforms', 'customFormsRefs', 'loadingRefs'], false)
        .setIn(['customforms', 'customFormsRefs', 'ObjectList'], action.data);
    case RETRIEVE_ERRORCUSTOMFORMS:
      return state
        .setIn(['customforms', 'customFormsRefs', 'error'], action.error);
    case SUCCESS_CUSTOMFORMS:
      return state
        .setIn(['customforms', 'saveForm', 'loading'], false)
        .setIn(['customforms', 'saveForm', 'successCode'], action.successcode)
        .setIn(['customforms', 'saveForm', 'successMessage'], action.succesmsg);
    case ERROR_CUSTOMFORMS:
      return state
        .setIn(['customforms', 'saveForm', 'loading'], false)
        .setIn(['customforms', 'saveForm', 'error'], action.error)
        .setIn(['customforms', 'saveForm', 'errorCode'], action.errorcode)
        .setIn(['customforms', 'saveForm', 'errorMessage'], action.errormsg);
    case DISMISS_CUSTOMFORMS:
      return state
        .setIn(['customforms', 'saveForm', 'attachmentFile'], false)
        .setIn(['customforms', 'saveForm', 'reasons'], false)
        .setIn(['customforms', 'saveForm', 'successCode'], false)
        .setIn(['customforms', 'saveForm', 'successMessage'], false)
        .setIn(['customforms', 'saveForm', 'errorCode'], false)
        .setIn(['customforms', 'saveForm', 'errorMessage'], false);
    default:
      return state;
  }
}

export default governmentFormsReducer;
