/*
 *
 * EmployeeProfile reducer
 *
 */

import { fromJS } from 'immutable';
import {
  RESET_STATE,
  LeaveList,
  SET_LEAVES,
  SET_LEAVESSUCCESS,
  SET_LEAVESERROR,
  CLEAR_LEAVESDATA,
} from './constants';

const initialState = fromJS({
  empLeaves: {
    loading: false,
    error: false,
    data: false,
    pages: false,
    pageIndex: 1,
    filter: false,
  },
  updateLeaves: {
    loading: false,
    error: false,
    success: false,
    leavesData: false,
  },
});

function leaveInfoReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_STATE:
      return initialState;
    case LeaveList.RETRIEVE:
      return state
        .setIn(['empLeaves', 'loading'], true)
        .setIn(['empLeaves', 'error'], false)
        .setIn(['empLeaves', 'data'], false)
        .setIn(['empLeaves', 'pages'], false)
        .setIn(['empLeaves', 'filter'], action.filter)
        .setIn(['empLeaves', 'pageIndex'], action.page);
    case LeaveList.SUCCESS:
      return state
        .setIn(['empLeaves', 'loading'], false)
        .setIn(['empLeaves', 'data'], action.data)
        .setIn(['empLeaves', 'pages'], action.pages);
    case LeaveList.ERROR:
      return state
        .setIn(['empLeaves', 'loading'], false)
        .setIn(['empLeaves', 'data'], false)
        .setIn(['empLeaves', 'pages'], false)
        .setIn(['empLeaves', 'error'], action.error);
    case LeaveList.PAGING:
      return state
        .setIn(['empLeaves', 'loading'], true)
        .setIn(['empLeaves', 'error'], false)
        .setIn(['empLeaves', 'data'], false)
        .setIn(['empLeaves', 'filter'], action.filter)
        .setIn(['empLeaves', 'pageIndex'], action.page);
    case SET_LEAVES:
      return state
        .setIn(['updateLeaves', 'loading'], true)
        .setIn(['updateLeaves', 'error'], false)
        .setIn(['updateLeaves', 'leavesData'], action.data);
    case SET_LEAVESSUCCESS:
      return state
        .setIn(['updateLeaves', 'loading'], false)
        .setIn(['updateLeaves', 'leavesData'], false)
        .setIn(['updateLeaves', 'success'], true);
    case SET_LEAVESERROR:
      return state
        .setIn(['updateLeaves', 'loading'], false)
        .setIn(['updateLeaves', 'error'], action.error)
        .setIn(['updateLeaves', 'leavesData'], false);
    case CLEAR_LEAVESDATA:
      return state
        .setIn(['updateLeaves', 'loading'], false)
        .setIn(['updateLeaves', 'error'], false)
        .setIn(['updateLeaves', 'success'], false);
    default:
      return state;
  }
}

export default leaveInfoReducer;
