/*
 * COE Requests Reducer
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
  GET_COELIST,
  GET_COELISTSUCCESS,
  GET_COELISTERROR,
  UPDATE_REQUEST,
  UPDATE_REQUESTSUCCESS,
  UPDATE_REQUESTERROR,
  CLEAR_UPDATEREQUEST,
  RESET_STATE,
} from './constants';

const initialState = fromJS({
  formLists: {
    loading: false,
    error: false,
    ObjectList: false,
    pages: false,
    pageIndex: 1,
    search: false,
    filter: false,
  },
  updateRequestStatus: {
    loading: false,
    error: false,
    ObjectList: false,
    statusID: false,
    formReqID: false,
  },
});

function coeRequestReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COELIST:
      return state
        .setIn(['formLists', 'loading'], true)
        .setIn(['formLists', 'error'], false)
        .setIn(['formLists', 'pageIndex'], action.page)
        .setIn(['formLists', 'search'], action.search)
        .setIn(['formLists', 'filter'], action.filter);
    case GET_COELISTSUCCESS:
      return state
        .setIn(['formLists', 'loading'], false)
        .setIn(['formLists', 'ObjectList'], action.data)
        .setIn(['formLists', 'pages'], action.pages);
    case GET_COELISTERROR:
      return state
        .setIn(['formLists', 'loading'], false)
        .setIn(['formLists', 'pages'], false)
        .setIn(['formLists', 'error'], action.error);
    case UPDATE_REQUEST:
      return state
        .setIn(['updateRequestStatus', 'loading'], true)
        .setIn(['updateRequestStatus', 'error'], false)
        .setIn(['updateRequestStatus', 'formReqID'], action.formReqID)
        .setIn(['updateRequestStatus', 'statusID'], action.statusID);
    case UPDATE_REQUESTSUCCESS:
      return state
        .setIn(['updateRequestStatus', 'loading'], false)
        .setIn(['updateRequestStatus', 'ObjectList'], true);
    case UPDATE_REQUESTERROR:
      return state
        .setIn(['updateRequestStatus', 'loading'], false)
        .setIn(['updateRequestStatus', 'error'], action.error);
    case CLEAR_UPDATEREQUEST:
      return state
        .setIn(['updateRequestStatus', 'ObjectList'], false)
        .setIn(['updateRequestStatus', 'statusID'], false)
        .setIn(['updateRequestStatus', 'formReqID'], false);
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
}

export default coeRequestReducer;
