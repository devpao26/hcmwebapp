/*
 * Forms Approval Reducer
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
  RequestList,
  RESET_STATE,
} from './constants';

const initialState = fromJS({
  formLists: {
    loading: false,
    error: false,
    data: false,
    pages: false,
    pageIndex: 1,
    search: false,
    filter: false,
  },
});

function leaveRequestsReducer(state = initialState, action) {
  switch (action.type) {
    case RequestList.RETRIEVE:
      return state
        .setIn(['formLists', 'loading'], true)
        .setIn(['formLists', 'error'], false)
        .setIn(['formLists', 'data'], false)
        .setIn(['formLists', 'pages'], false)
        .setIn(['formLists', 'search'], action.search)
        .setIn(['formLists', 'filter'], action.filter)
        .setIn(['formLists', 'pageIndex'], action.page);
    case RequestList.SUCCESS:
      return state
        .setIn(['formLists', 'loading'], false)
        .setIn(['formLists', 'pages'], action.pages)
        .setIn(['formLists', 'data'], action.data);
    case RequestList.ERROR:
      return state
        .setIn(['formLists', 'loading'], false)
        .setIn(['formLists', 'pages'], false)
        .setIn(['formLists', 'error'], action.error);
    case RequestList.PAGING:
      return state
        .setIn(['formLists', 'loading'], true)
        .setIn(['formLists', 'error'], false)
        .setIn(['formLists', 'data'], false)
        .setIn(['formLists', 'search'], action.search)
        .setIn(['formLists', 'filter'], action.filter)
        .setIn(['formLists', 'pageIndex'], action.page);
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
}

export default leaveRequestsReducer;
