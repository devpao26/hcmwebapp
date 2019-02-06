/*
 * AppReducer
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
  CLEAR_STATE,
  GET_EMPLIST,
  GET_EMPLIST_SUCCESS,
  GET_EMPLIST_ERROR,
  GET_EMPLIST_NORESET,
  ENROLL_EMP,
  ENROLL_EMP_SUCCESS,
  ENROLL_EMP_ERROR,
  ENROLL_EMP_RESET,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  masterList: {
    empList: {
      loading: false,
      error: false,
      data: false,
      pages: false,
      pageIndex: 1,
      search: false,
    },
    enrollEmp: {
      loading: false,
      error: false,
      success: false,
      empID: false,
    },
  },
});

function empMasterListReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_STATE:
      return initialState;
    case GET_EMPLIST:
      return state
        .setIn(['masterList', 'empList', 'loading'], true)
        .setIn(['masterList', 'empList', 'error'], false)
        .setIn(['masterList', 'empList', 'data'], false)
        .setIn(['masterList', 'empList', 'pages'], false)
        .setIn(['masterList', 'empList', 'pageIndex'], action.page)
        .setIn(['masterList', 'empList', 'search'], action.search);
    case GET_EMPLIST_SUCCESS:
      return state
        .setIn(['masterList', 'empList', 'loading'], false)
        .setIn(['masterList', 'empList', 'data'], action.data)
        .setIn(['masterList', 'empList', 'pages'], action.pages);
    case GET_EMPLIST_ERROR:
      return state
        .setIn(['masterList', 'empList', 'loading'], false)
        .setIn(['masterList', 'empList', 'error'], action.error)
        .setIn(['masterList', 'empList', 'data'], false)
        .setIn(['masterList', 'empList', 'pages'], false);
    case GET_EMPLIST_NORESET:
      return state
        .setIn(['masterList', 'empList', 'loading'], true)
        .setIn(['masterList', 'empList', 'error'], false)
        .setIn(['masterList', 'empList', 'data'], false)
        .setIn(['masterList', 'empList', 'pageIndex'], action.page)
        .setIn(['masterList', 'empList', 'search'], action.search);
    case ENROLL_EMP:
      return state
        .setIn(['masterList', 'enrollEmp', 'loading'], true)
        .setIn(['masterList', 'enrollEmp', 'error'], false)
        .setIn(['masterList', 'enrollEmp', 'empID'], action.id);
    case ENROLL_EMP_SUCCESS:
      return state
        .setIn(['masterList', 'enrollEmp', 'loading'], false)
        .setIn(['masterList', 'enrollEmp', 'success'], true)
        .setIn(['masterList', 'enrollEmp', 'empID'], false);
    case ENROLL_EMP_ERROR:
      return state
        .setIn(['masterList', 'enrollEmp', 'loading'], false)
        .setIn(['masterList', 'enrollEmp', 'error'], action.error);
    case ENROLL_EMP_RESET:
      return state
        .setIn(['masterList', 'enrollEmp', 'success'], false)
        .setIn(['masterList', 'enrollEmp', 'empID'], false);
    default:
      return state;
  }
}

export default empMasterListReducer;
