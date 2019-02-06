/*
 * ppeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  API_SUCCESS,
  API_FAILED,
  LIST_PPE,
  GET_PPEREQ,
  GET_PPEREQSUCCESS,
  GET_PPEREQERROR,
  UPDATE_ISREQ,
  UPLOAD_FILES,
  DELETE_FILE,
  UPDATE_REQSTATUS,
  APPL_EMP,
  MIGRATE_SUCCESS,
  SEARCH_FILTER,
} from './constants';

const initialState = fromJS({
  ppeRequirements: {
    loading: false,
    error: false,
    redirect: false,
    applJobId: false,
    migrate: false,
    ppeList: {
      ObjectList: false,
      PageDetails: false,
      PageIndex: false,
      SearchFilter: {
        location: false,
        value: false,
      },
      Unprocessed: false,
    },
    applReqList: {
      loading: false,
      error: false,
      ObjectList: false,
      isRequired: false,
      PreEmpReqID: false,
      PreEmpReqStatusID: false,
    },
    reqUploadFiles: {
      files: false,
      joFiles: false,
      reqId: false,
      refStatId: false,
      fileId: false,
      attachType: false,
    },
  },
});

function ppeReducer(state = initialState, action) {
  switch (action.type) {
    case LIST_PPE:
      return state
        .setIn(['ppeRequirements', 'loading'], true)
        .setIn(['ppeRequirements', 'error'], false)
        .setIn(['ppeRequirements', 'redirect'], false)
        .setIn(['ppeRequirements', 'migrate'], false)
        .setIn(['ppeRequirements', 'ppeList', 'PageIndex'], action.page)
        .setIn(['ppeRequirements', 'ppeList', 'Unprocessed'], action.unprocessed)
        .setIn(['ppeRequirements', 'ppeList', 'SearchFilter', 'location'], action.loc)
        .setIn(['ppeRequirements', 'ppeList', 'SearchFilter', 'value'], action.search)
        .setIn(['ppeRequirements', 'ppeList', 'ObjectList'], false);
    case API_SUCCESS:
      return state
        .setIn(['ppeRequirements', 'ppeList', 'ObjectList'], action.jolist)
        .setIn(['ppeRequirements', 'ppeList', 'PageDetails'], action.pages)
        .setIn(['ppeRequirements', 'loading'], false);
    case API_FAILED:
      return state
        .setIn(['ppeRequirements', 'error'], action.error)
        .setIn(['ppeRequirements', 'ppeList', 'ObjectList'], false)
        .setIn(['ppeRequirements', 'ppeList', 'PageDetails'], false)
        .setIn(['ppeRequirements', 'loading'], false);
    case GET_PPEREQ:
      return state
        .setIn(['ppeRequirements', 'applJobId'], action.applJobId)
        .setIn(['ppeRequirements', 'applReqList', 'loading'], true)
        .setIn(['ppeRequirements', 'applReqList', 'error'], false)
        .setIn(['ppeRequirements', 'applReqList', 'ObjectList'], false);
    case GET_PPEREQSUCCESS:
      return state
        .setIn(['ppeRequirements', 'applReqList', 'loading'], false)
        .setIn(['ppeRequirements', 'applReqList', 'error'], false)
        .setIn(['ppeRequirements', 'applReqList', 'ObjectList'], action.data);
    case GET_PPEREQERROR:
      return state
        .setIn(['ppeRequirements', 'applReqList', 'loading'], false)
        .setIn(['ppeRequirements', 'applReqList', 'error'], action.error)
        .setIn(['ppeRequirements', 'applReqList', 'ObjectList'], false);
    case UPDATE_ISREQ:
      return state
        .setIn(['ppeRequirements', 'applReqList', 'PreEmpReqID'], action.reqId)
        .setIn(['ppeRequirements', 'applReqList', 'isRequired'], action.arg);
    case UPLOAD_FILES:
      return state
        .setIn(['ppeRequirements', 'reqUploadFiles', 'files'], action.files)
        .setIn(['ppeRequirements', 'reqUploadFiles', 'reqId'], action.reqid)
        .setIn(['ppeRequirements', 'reqUploadFiles', 'joFiles'], action.jofiles);
    case UPDATE_REQSTATUS:
      return state
        .setIn(['ppeRequirements', 'reqUploadFiles', 'reqId'], action.reqid)
        .setIn(['ppeRequirements', 'reqUploadFiles', 'reqStatId'], action.reqstatid);
    case DELETE_FILE:
      return state
        .setIn(['ppeRequirements', 'reqUploadFiles', 'attachType'], action.attachtype)
        .setIn(['ppeRequirements', 'reqUploadFiles', 'fileId'], action.fileid);
    case APPL_EMP:
      return state;
    case MIGRATE_SUCCESS:
      return state
        .setIn(['ppeRequirements', 'migrate'], true);
    case SEARCH_FILTER:
      return state
        .setIn(['ppeRequirements', 'loading'], true)
        .setIn(['ppeRequirements', 'error'], false)
        .setIn(['ppeRequirements', 'ppeList', 'ObjectList'], false)
        .setIn(['ppeRequirements', 'ppeList', 'PageDetails'], false)
        .setIn(['ppeRequirements', 'ppeList', 'PageIndex'], 1)
        .setIn(['ppeRequirements', 'ppeList', 'Unprocessed'], action.unprocessed)
        .setIn(['ppeRequirements', 'ppeList', 'SearchFilter', 'location'], action.loc)
        .setIn(['ppeRequirements', 'ppeList', 'SearchFilter', 'value'], action.input);
    default:
      return state;
  }
}

export default ppeReducer;
