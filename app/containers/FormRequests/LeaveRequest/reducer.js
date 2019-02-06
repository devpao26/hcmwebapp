/*
 * Leave Request Reducer
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
  GET_DATAS,
  GET_LEAVEREQLIST,
  GET_LEAVEREQLISTSUCCESS,
  GET_LEAVEREQLISTERROR,
  GET_FORMLOAD,
  GET_FORMLOADSUCCESS,
  GET_FORMLOADERROR,
  CREATE_REQUEST,
  CREATE_REQUESTSUCCESS,
  CREATE_REQUESTERROR,
  CLEAR_REQUEST,
  RESET_STATE,
} from './constants';

const initialState = fromJS({
  leaveRequest: {
    employeeID: false,
    workFlowFormLoad: {
      loading: false,
      error: false,
      data: false,
    },
    leaveRequestList: {
      loading: false,
      error: false,
      data: false,
      pages: false,
      pageIndex: 1,
    },
    saveRequest: {
      loading: false,
      error: false,
      data: false,
      createData: false,
      createFiles: false,
    },
  },
});

function leaveRequestReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DATAS:
      return state
        .setIn(['leaveRequest', 'employeeID'], action.empID)
        .setIn(['leaveRequest', 'leaveRequestList', 'loading'], true)
        .setIn(['leaveRequest', 'leaveRequestList', 'error'], false)
        .setIn(['leaveRequest', 'leaveRequestList', 'pageIndex'], action.page)
        .setIn(['leaveRequest', 'workFlowFormLoad', 'loading'], true)
        .setIn(['leaveRequest', 'workFlowFormLoad', 'error'], false);
    case GET_LEAVEREQLIST:
      return state
        .setIn(['leaveRequest', 'leaveRequestList', 'loading'], true)
        .setIn(['leaveRequest', 'leaveRequestList', 'error'], false)
        .setIn(['leaveRequest', 'leaveRequestList', 'data'], false)
        .setIn(['leaveRequest', 'leaveRequestList', 'pageIndex'], action.page);
    case GET_LEAVEREQLISTSUCCESS:
      return state
        .setIn(['leaveRequest', 'leaveRequestList', 'loading'], false)
        .setIn(['leaveRequest', 'leaveRequestList', 'data'], action.data)
        .setIn(['leaveRequest', 'leaveRequestList', 'pages'], action.pages);
    case GET_LEAVEREQLISTERROR:
      return state
        .setIn(['leaveRequest', 'leaveRequestList', 'loading'], false)
        .setIn(['leaveRequest', 'leaveRequestList', 'error'], action.error);
    case GET_FORMLOAD:
      return state
        .setIn(['leaveRequest', 'workFlowFormLoad', 'loading'], true)
        .setIn(['leaveRequest', 'workFlowFormLoad', 'error'], false)
        .setIn(['leaveRequest', 'workFlowFormLoad', 'data'], false);
    case GET_FORMLOADSUCCESS:
      return state
        .setIn(['leaveRequest', 'workFlowFormLoad', 'loading'], false)
        .setIn(['leaveRequest', 'workFlowFormLoad', 'data'], action.data);
    case GET_FORMLOADERROR:
      return state
        .setIn(['leaveRequest', 'workFlowFormLoad', 'loading'], false)
        .setIn(['leaveRequest', 'workFlowFormLoad', 'error'], action.error);
    case CREATE_REQUEST:
      return state
        .setIn(['leaveRequest', 'saveRequest', 'loading'], true)
        .setIn(['leaveRequest', 'saveRequest', 'error'], false)
        .setIn(['leaveRequest', 'saveRequest', 'createData'], action.data)
        .setIn(['leaveRequest', 'saveRequest', 'createFiles'], action.files);
    case CREATE_REQUESTSUCCESS:
      return state
        .setIn(['leaveRequest', 'saveRequest', 'loading'], false)
        .setIn(['leaveRequest', 'saveRequest', 'createData'], false)
        .setIn(['leaveRequest', 'saveRequest', 'createFiles'], false)
        .setIn(['leaveRequest', 'saveRequest', 'data'], true);
    case CREATE_REQUESTERROR:
      return state
        .setIn(['leaveRequest', 'saveRequest', 'loading'], false)
        .setIn(['leaveRequest', 'saveRequest', 'createData'], false)
        .setIn(['leaveRequest', 'saveRequest', 'createFiles'], false)
        .setIn(['leaveRequest', 'saveRequest', 'error'], action.error);
    case CLEAR_REQUEST:
      return state
        .setIn(['leaveRequest', 'saveRequest', 'loading'], false)
        .setIn(['leaveRequest', 'saveRequest', 'error'], false)
        .setIn(['leaveRequest', 'saveRequest', 'data'], false)
        .setIn(['leaveRequest', 'saveRequest', 'createData'], false)
        .setIn(['leaveRequest', 'saveRequest', 'createFiles'], false);
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
}

export default leaveRequestReducer;
