/*
 * employeeListReducer
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
  GET_EMPLISTSUCCESS,
  GET_EMPLISTFAILED,
  GET_EMPSEARCH,
  SET_LEAVES,
  SET_LEAVESSUCCESS,
  SET_LEAVESERROR,
  CLEAR_LEAVESDATA,
} from './constants';

const initialState = fromJS({
  masterList: {
    empID: false,
    empList: {
      loading: false,
      error: false,
      ObjectList: false,
      PageDetails: false,
      PageIndex: false,
      search: false,
    },
    updateLeaves: {
      loading: false,
      error: false,
      success: false,
      ObjectList: false,
    },
  },
});

function employeeListReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_STATE:
      return initialState;
    case GET_EMPLIST:
      return state
        .setIn(['masterList', 'empList', 'loading'], true)
        .setIn(['masterList', 'empList', 'error'], false)
        .setIn(['masterList', 'empList', 'PageIndex'], action.page)
        .setIn(['masterList', 'empList', 'search'], action.search)
        .setIn(['masterList', 'empList', 'ObjectList'], false);
    case GET_EMPLISTSUCCESS:
      return state
        .setIn(['masterList', 'empList', 'loading'], false)
        .setIn(['masterList', 'empList', 'ObjectList'], action.data)
        .setIn(['masterList', 'empList', 'PageDetails'], action.pageDetails);
    case GET_EMPLISTFAILED:
      return state
        .setIn(['masterList', 'empList', 'loading'], false)
        .setIn(['masterList', 'empList', 'error'], action.error);
    case GET_EMPSEARCH:
      return state
        .setIn(['masterList', 'empList', 'loading'], true)
        .setIn(['masterList', 'empList', 'error'], false)
        .setIn(['masterList', 'empList', 'PageIndex'], action.page)
        .setIn(['masterList', 'empList', 'search'], action.search)
        .setIn(['masterList', 'empList', 'ObjectList'], false)
        .setIn(['masterList', 'empList', 'PageDetails'], false);
    case SET_LEAVES:
      return state
        .setIn(['masterList', 'updateLeaves', 'loading'], true)
        .setIn(['masterList', 'updateLeaves', 'error'], false)
        .setIn(['masterList', 'updateLeaves', 'ObjectList'], action.data)
        .setIn(['masterList', 'empID'], action.empID);
    case SET_LEAVESSUCCESS:
      return state
        .setIn(['masterList', 'updateLeaves', 'loading'], false)
        .setIn(['masterList', 'updateLeaves', 'success'], true);
    case SET_LEAVESERROR:
      return state
        .setIn(['masterList', 'updateLeaves', 'loading'], false)
        .setIn(['masterList', 'updateLeaves', 'error'], action.error)
        .setIn(['masterList', 'updateLeaves', 'ObjectList'], false);
    case CLEAR_LEAVESDATA:
      return state
        .setIn(['masterList', 'updateLeaves', 'loading'], false)
        .setIn(['masterList', 'updateLeaves', 'error'], false)
        .setIn(['masterList', 'updateLeaves', 'ObjectList'], false)
        .setIn(['masterList', 'updateLeaves', 'success'], false)
        .setIn(['masterList', 'empID'], false);
    default:
      return state;
  }
}

export default employeeListReducer;
