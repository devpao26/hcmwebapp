/**
 * Transfer Reducers
 */
import { fromJS } from 'immutable';

import {
  TOGGLE_TRANSFER,
  GET_TRANSFERLIST,
  GET_TRANSFERLIST_SUCCESS,
  GET_TRANSFERLIST_ERROR,
  GET_TRANSFERLIST_NORESET,
} from './constants';

const initialState = fromJS({
  toggleTransfer: false,
  empData: false,
  transferList: {
    loading: false,
    error: false,
    data: false,
    pages: false,
    pageIndex: 1,
    search: false,
    id: false,
    isTeam: false,
  },
  transfer: {
    loading: false,
    error: false,
    success: false,
    data: false,
  },
});

function transferReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_TRANSFER:
      return state
        .set('toggleTransfer', action.isShowing)
        .set('empData', action.empData);
    case GET_TRANSFERLIST:
      return state
        .setIn(['transferList', 'loading'], true)
        .setIn(['transferList', 'error'], false)
        .setIn(['transferList', 'pages'], false)
        .setIn(['transferList', 'data'], false)
        .setIn(['transferList', 'pageIndex'], action.page)
        .setIn(['transferList', 'search'], action.search)
        .setIn(['transferList', 'id'], action.id)
        .setIn(['transferList', 'isTeam'], action.isTeam);
    case GET_TRANSFERLIST_SUCCESS:
      return state
        .setIn(['transferList', 'loading'], false)
        .setIn(['transferList', 'data'], action.data)
        .setIn(['transferList', 'pages'], action.pages);
    case GET_TRANSFERLIST_ERROR:
      return state
        .setIn(['transferList', 'loading'], false)
        .setIn(['transferList', 'pages'], false)
        .setIn(['transferList', 'data'], false)
        .setIn(['transferList', 'error'], action.error);
    case GET_TRANSFERLIST_NORESET:
      return state
        .setIn(['transferList', 'loading'], true)
        .setIn(['transferList', 'error'], false)
        .setIn(['transferList', 'data'], false)
        .setIn(['transferList', 'pageIndex'], action.page)
        .setIn(['transferList', 'search'], action.search)
        .setIn(['transferList', 'id'], action.id)
        .setIn(['transferList', 'isTeam'], action.isTeam);
    default:
      return state;
  }
}

export default transferReducer;
