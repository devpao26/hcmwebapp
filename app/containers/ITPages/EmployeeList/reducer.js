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
  GET_EMPLIST_SEARCH,
  CHANGE_STATUS,
  CHANGE_STATUS_SUCCESS,
  CHANGE_STATUS_ERROR,
  CHANGE_STATUS_RESET,
  SEND_NEWPASS,
  SEND_NEWPASS_SUCCESS,
  SEND_NEWPASS_ERROR,
  SEND_NEWPASS_RESET,
  GET_REFS,
  GET_REFS_SUCCESS,
  GET_REFS_ERROR,
  UPDATE_EMPEMAIL,
  UPDATE_EMPEMAIL_SUCCESS,
  UPDATE_EMPEMAIL_ERROR,
  UPDATE_EMPEMAIL_RESET,
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
      filter: false,
    },
    changeStatus: {
      loading: false,
      error: false,
      empID: false,
      email: false,
      status: false,
      success: false,
    },
    newPass: {
      loading: false,
      error: false,
      empID: false,
      success: false,
    },
    refs: {
      loading: false,
      error: false,
      data: false,
    },
    updateEmail: {
      loading: false,
      error: false,
      empID: false,
      email: false,
      success: false,
    },
  },
});

function itAdminAppReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_STATE:
      return initialState;
    case GET_EMPLIST:
      return state
        .setIn(['masterList', 'empList', 'loading'], true)
        .setIn(['masterList', 'empList', 'error'], false)
        .setIn(['masterList', 'empList', 'data'], false)
        .setIn(['masterList', 'empList', 'pageIndex'], action.page)
        .setIn(['masterList', 'empList', 'search'], action.search)
        .setIn(['masterList', 'empList', 'filter'], action.filter);
    case GET_EMPLIST_SUCCESS:
      return state
        .setIn(['masterList', 'empList', 'loading'], false)
        .setIn(['masterList', 'empList', 'data'], action.data)
        .setIn(['masterList', 'empList', 'pages'], action.pages);
    case GET_EMPLIST_ERROR:
      return state
        .setIn(['masterList', 'empList', 'loading'], false)
        .setIn(['masterList', 'empList', 'pages'], false)
        .setIn(['masterList', 'empList', 'error'], action.error);
    case GET_EMPLIST_SEARCH:
      return state
        .setIn(['masterList', 'empList', 'loading'], true)
        .setIn(['masterList', 'empList', 'error'], false)
        .setIn(['masterList', 'empList', 'data'], false)
        .setIn(['masterList', 'empList', 'pages'], false)
        .setIn(['masterList', 'empList', 'pageIndex'], action.page)
        .setIn(['masterList', 'empList', 'search'], action.search)
        .setIn(['masterList', 'empList', 'filter'], action.filter);
    case GET_REFS:
      return state
        .setIn(['masterList', 'refs', 'loading'], true)
        .setIn(['masterList', 'refs', 'error'], false)
        .setIn(['masterList', 'refs', 'data'], false);
    case GET_REFS_SUCCESS:
      return state
        .setIn(['masterList', 'refs', 'loading'], false)
        .setIn(['masterList', 'refs', 'data'], action.data);
    case GET_REFS_ERROR:
      return state
        .setIn(['masterList', 'refs', 'loading'], false)
        .setIn(['masterList', 'refs', 'error'], action.error);
    case CHANGE_STATUS:
      return state
        .setIn(['masterList', 'changeStatus', 'loading'], true)
        .setIn(['masterList', 'changeStatus', 'error'], false)
        .setIn(['masterList', 'changeStatus', 'success'], false)
        .setIn(['masterList', 'changeStatus', 'empID'], action.empID)
        .setIn(['masterList', 'changeStatus', 'email'], action.email)
        .setIn(['masterList', 'changeStatus', 'status'], action.status);
    case CHANGE_STATUS_SUCCESS:
      return state
        .setIn(['masterList', 'changeStatus', 'loading'], false)
        .setIn(['masterList', 'changeStatus', 'success'], true);
    case CHANGE_STATUS_ERROR:
      return state
        .setIn(['masterList', 'changeStatus', 'loading'], false)
        .setIn(['masterList', 'changeStatus', 'error'], action.error);
    case CHANGE_STATUS_RESET:
      return state
        .setIn(['masterList', 'changeStatus', 'loading'], false)
        .setIn(['masterList', 'changeStatus', 'error'], false)
        .setIn(['masterList', 'changeStatus', 'success'], false)
        .setIn(['masterList', 'changeStatus', 'empID'], false)
        .setIn(['masterList', 'changeStatus', 'email'], false)
        .setIn(['masterList', 'changeStatus', 'status'], false);
    case SEND_NEWPASS:
      return state
        .setIn(['masterList', 'newPass', 'loading'], true)
        .setIn(['masterList', 'newPass', 'error'], false)
        .setIn(['masterList', 'newPass', 'success'], false)
        .setIn(['masterList', 'newPass', 'empID'], action.empID);
    case SEND_NEWPASS_SUCCESS:
      return state
        .setIn(['masterList', 'newPass', 'loading'], false)
        .setIn(['masterList', 'newPass', 'success'], true);
    case SEND_NEWPASS_ERROR:
      return state
        .setIn(['masterList', 'newPass', 'loading'], false)
        .setIn(['masterList', 'newPass', 'error'], action.error);
    case SEND_NEWPASS_RESET:
      return state
        .setIn(['masterList', 'newPass', 'loading'], false)
        .setIn(['masterList', 'newPass', 'error'], false)
        .setIn(['masterList', 'newPass', 'success'], false)
        .setIn(['masterList', 'newPass', 'empID'], false);
    case UPDATE_EMPEMAIL:
      return state
        .setIn(['masterList', 'updateEmail', 'loading'], true)
        .setIn(['masterList', 'updateEmail', 'error'], false)
        .setIn(['masterList', 'updateEmail', 'empID'], action.empID)
        .setIn(['masterList', 'updateEmail', 'email'], action.newEmail);
    case UPDATE_EMPEMAIL_SUCCESS:
      return state
        .setIn(['masterList', 'updateEmail', 'loading'], false)
        .setIn(['masterList', 'updateEmail', 'success'], true);
    case UPDATE_EMPEMAIL_ERROR:
      return state
        .setIn(['masterList', 'updateEmail', 'loading'], false)
        .setIn(['masterList', 'updateEmail', 'error'], action.error);
    case UPDATE_EMPEMAIL_RESET:
      return state
        .setIn(['masterList', 'updateEmail', 'loading'], false)
        .setIn(['masterList', 'updateEmail', 'error'], false)
        .setIn(['masterList', 'updateEmail', 'empID'], false)
        .setIn(['masterList', 'updateEmail', 'email'], false)
        .setIn(['masterList', 'updateEmail', 'success'], false);
    default:
      return state;
  }
}
export default itAdminAppReducer;
