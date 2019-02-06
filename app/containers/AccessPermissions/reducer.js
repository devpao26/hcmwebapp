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
  CLEAR_STATE, // Clear state on unmount
  GET_MODULES,
  GET_MODULES_SUCCESS,
  GET_MODULES_ERROR,
  GET_EMPLIST,
  GET_EMPLIST_SUCCESS,
  GET_EMPLIST_ERROR,
  GET_EMPLIST_NORESET,
  ASSIGN_ACCESS,
  ASSIGN_ACCESS_SUCCESS,
  ASSIGN_ACCESS_ERROR,
  ASSIGN_ACCESS_RESET,
  GET_REFS,
  GET_REFS_SUCCESS,
  GET_REFS_ERROR,
  GET_SUBMODULES,
  GET_SUBMODULES_SUCCESS,
  GET_SUBMODULES_ERROR,
  UNASSIGN_TEMPLATE,
  UNASSIGN_TEMPLATE_SUCCESS,
  UNASSIGN_TEMPLATE_ERROR,
  UNASSIGN_TEMPLATE_RESET,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  isGenAdmin: false,
  adminRequester: false,
  empList: {
    loading: false,
    error: false,
    data: false,
    pages: false,
    search: false,
    pageIndex: 1,
  },
  mainModules: {
    loading: false,
    error: false,
    data: false,
  },
  subModules: {
    loading: false,
    error: false,
    data: false,
    id: false,
  },
  assign: {
    loading: false,
    error: false,
    data: false,
    success: false,
    empID: false,
  },
  refsList: {
    loading: false,
    error: false,
    permissions: false,
    timeconst: false,
  },
  remove: {
    loading: false,
    error: false,
    success: false,
    empID: false,
  },
});

function genAdminAccessReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_STATE:
      return initialState;
    case GET_MODULES:
      return state
        .setIn(['mainModules', 'loading'], true)
        .setIn(['mainModules', 'error'], false)
        .setIn(['mainModules', 'data'], false)
        .set('isGenAdmin', action.isGenAdmin)
        .set('adminRequester', action.requester);
    case GET_MODULES_SUCCESS:
      return state
        .setIn(['mainModules', 'loading'], false)
        .setIn(['mainModules', 'data'], action.data);
    case GET_MODULES_ERROR:
      return state
        .setIn(['mainModules', 'loading'], false)
        .setIn(['mainModules', 'data'], false)
        .setIn(['mainModules', 'error'], action.error);
    case GET_SUBMODULES:
      return state
        .setIn(['subModules', 'loading'], true)
        .setIn(['subModules', 'error'], false)
        .setIn(['subModules', 'data'], false)
        .setIn(['subModules', 'id'], action.parentID);
    case GET_SUBMODULES_SUCCESS:
      return state
        .setIn(['subModules', 'loading'], false)
        .setIn(['subModules', 'data'], action.data);
    case GET_SUBMODULES_ERROR:
      return state
        .setIn(['subModules', 'loading'], false)
        .setIn(['subModules', 'data'], false)
        .setIn(['subModules', 'error'], action.error);
    case GET_EMPLIST:
      return state
        .setIn(['empList', 'loading'], true)
        .setIn(['empList', 'error'], false)
        .setIn(['empList', 'pages'], false)
        .setIn(['empList', 'data'], false)
        .setIn(['empList', 'search'], action.search)
        .setIn(['empList', 'pageIndex'], 1);
    case GET_EMPLIST_SUCCESS:
      return state
        .setIn(['empList', 'loading'], false)
        .setIn(['empList', 'pages'], action.pages)
        .setIn(['empList', 'data'], action.data);
    case GET_EMPLIST_ERROR:
      return state
        .setIn(['empList', 'loading'], false)
        .setIn(['empList', 'pages'], false)
        .setIn(['empList', 'data'], false)
        .setIn(['empList', 'pages'], false)
        .setIn(['empList', 'pageIndex'], 1)
        .setIn(['empList', 'search'], false)
        .setIn(['empList', 'error'], action.error);
    case GET_EMPLIST_NORESET:
      return state
        .setIn(['empList', 'loading'], true)
        .setIn(['empList', 'error'], false)
        .setIn(['empList', 'data'], false)
        .setIn(['empList', 'search'], action.search)
        .setIn(['empList', 'pageIndex'], action.page);
    case ASSIGN_ACCESS:
      return state
        .setIn(['assign', 'loading'], true)
        .setIn(['assign', 'error'], false)
        .setIn(['assign', 'data'], action.data)
        .setIn(['assign', 'empID'], action.empID);
    case ASSIGN_ACCESS_SUCCESS:
      return state
        .setIn(['assign', 'loading'], false)
        .setIn(['assign', 'success'], true);
    case ASSIGN_ACCESS_ERROR:
      return state
        .setIn(['assign', 'loading'], false)
        .setIn(['assign', 'error'], action.error);
    case ASSIGN_ACCESS_RESET:
      return state
        .setIn(['assign', 'loading'], false)
        .setIn(['assign', 'error'], false)
        .setIn(['assign', 'data'], false)
        .setIn(['assign', 'success'], false)
        .setIn(['assign', 'empID'], false);
    case GET_REFS:
      return state
        .setIn(['refsList', 'loading'], true)
        .setIn(['refsList', 'error'], false)
        .setIn(['refsList', 'permissions'], false)
        .setIn(['refsList', 'timeconst'], false);
    case GET_REFS_SUCCESS:
      return state
        .setIn(['refsList', 'loading'], false)
        .setIn(['refsList', 'permissions'], action.permissions)
        .setIn(['refsList', 'timeconst'], action.timeconst);
    case GET_REFS_ERROR:
      return state
        .setIn(['refsList', 'loading'], false)
        .setIn(['refsList', 'error'], action.error);
    case UNASSIGN_TEMPLATE:
      return state
        .setIn(['remove', 'loading'], true)
        .setIn(['remove', 'error'], false)
        .setIn(['remove', 'empID'], action.empID);
    case UNASSIGN_TEMPLATE_SUCCESS:
      return state
        .setIn(['remove', 'loading'], false)
        .setIn(['remove', 'empID'], false)
        .setIn(['remove', 'success'], true);
    case UNASSIGN_TEMPLATE_ERROR:
      return state
        .setIn(['remove', 'loading'], false)
        .setIn(['remove', 'empID'], false)
        .setIn(['remove', 'error'], action.error);
    case UNASSIGN_TEMPLATE_RESET:
      return state
        .setIn(['remove', 'loading'], false)
        .setIn(['remove', 'empID'], false)
        .setIn(['remove', 'error'], false)
        .setIn(['remove', 'success'], false);
    default:
      return state;
  }
}

export default genAdminAccessReducer;
