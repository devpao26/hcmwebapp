/*
 * WorkForce Desktop Configurations Reducer
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
  RESET_STATE,
  Templates,
  Enrolled,
  AddToList,
  Assign,
  Unassign,
  Update,
  Save,
  Delete,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  desktopConfig: {
    templateList: {
      loading: false,
      error: false,
      data: false,
      pages: false,
      search: false,
      pageIndex: 1,
      filter: false,
    },
    enrolledList: {
      loading: false,
      error: false,
      data: false,
      pages: false,
      search: false,
      pageIndex: 1,
      filter: false,
      id: false,
    },
    addToList: {
      loading: false,
      error: false,
      data: false,
      pages: false,
      search: false,
      filter: false,
      pageIndex: 1,
    },
    assign: {
      loading: false,
      error: false,
      success: false,
      id: false,
      filter: false,
    },
    unassign: {
      loading: false,
      error: false,
      success: false,
      id: false,
      filter: false,
    },
    update: {
      loading: false,
      error: false,
      data: false,
      success: false,
      id: false,
    },
    save: {
      loading: false,
      error: false,
      data: false,
      success: false,
    },
    delete: {
      loading: false,
      error: false,
      success: false,
      id: false,
    },
  },
});

function desktopConfigurationReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_STATE:
      return initialState;
    case Templates.RETRIEVE:
      return state
        .setIn(['desktopConfig', 'templateList', 'loading'], true)
        .setIn(['desktopConfig', 'templateList', 'error'], false)
        .setIn(['desktopConfig', 'templateList', 'data'], false)
        .setIn(['desktopConfig', 'templateList', 'pages'], false)
        .setIn(['desktopConfig', 'templateList', 'pageIndex'], action.page)
        .setIn(['desktopConfig', 'templateList', 'search'], action.search)
        .setIn(['desktopConfig', 'templateList', 'filter'], action.sort);
    case Templates.SUCCESS:
      return state
        .setIn(['desktopConfig', 'templateList', 'loading'], false)
        .setIn(['desktopConfig', 'templateList', 'data'], action.data)
        .setIn(['desktopConfig', 'templateList', 'pages'], action.pages);
    case Templates.ERROR:
      return state
        .setIn(['desktopConfig', 'templateList', 'loading'], false)
        .setIn(['desktopConfig', 'templateList', 'data'], false)
        .setIn(['desktopConfig', 'templateList', 'pages'], false)
        .setIn(['desktopConfig', 'templateList', 'error'], action.error);
    case Templates.PAGING:
      return state
        .setIn(['desktopConfig', 'templateList', 'loading'], true)
        .setIn(['desktopConfig', 'templateList', 'error'], false)
        .setIn(['desktopConfig', 'templateList', 'data'], false)
        .setIn(['desktopConfig', 'templateList', 'pageIndex'], action.page)
        .setIn(['desktopConfig', 'templateList', 'search'], action.search);
    case Enrolled.RETRIEVE:
      return state
        .setIn(['desktopConfig', 'enrolledList', 'loading'], true)
        .setIn(['desktopConfig', 'enrolledList', 'error'], false)
        .setIn(['desktopConfig', 'enrolledList', 'data'], false)
        .setIn(['desktopConfig', 'enrolledList', 'pages'], false)
        .setIn(['desktopConfig', 'enrolledList', 'id'], action.id)
        .setIn(['desktopConfig', 'enrolledList', 'pageIndex'], action.page)
        .setIn(['desktopConfig', 'enrolledList', 'search'], action.search)
        .setIn(['desktopConfig', 'enrolledList', 'filter'], action.filter);
    case Enrolled.SUCCESS:
      return state
        .setIn(['desktopConfig', 'enrolledList', 'loading'], false)
        .setIn(['desktopConfig', 'enrolledList', 'data'], action.data)
        .setIn(['desktopConfig', 'enrolledList', 'pages'], action.pages);
    case Enrolled.ERROR:
      return state
        .setIn(['desktopConfig', 'enrolledList', 'loading'], false)
        .setIn(['desktopConfig', 'enrolledList', 'data'], false)
        .setIn(['desktopConfig', 'enrolledList', 'pages'], false)
        .setIn(['desktopConfig', 'enrolledList', 'error'], action.error);
    case Enrolled.PAGING:
      return state
        .setIn(['desktopConfig', 'enrolledList', 'loading'], true)
        .setIn(['desktopConfig', 'enrolledList', 'error'], false)
        .setIn(['desktopConfig', 'enrolledList', 'data'], false)
        .setIn(['desktopConfig', 'enrolledList', 'id'], action.id)
        .setIn(['desktopConfig', 'enrolledList', 'pageIndex'], action.page)
        .setIn(['desktopConfig', 'enrolledList', 'search'], action.search)
        .setIn(['desktopConfig', 'enrolledList', 'filter'], action.filter);
    case AddToList.RETRIEVE:
      return state
        .setIn(['desktopConfig', 'addToList', 'loading'], true)
        .setIn(['desktopConfig', 'addToList', 'error'], false)
        .setIn(['desktopConfig', 'addToList', 'data'], false)
        .setIn(['desktopConfig', 'addToList', 'pages'], false)
        .setIn(['desktopConfig', 'addToList', 'pageIndex'], action.page)
        .setIn(['desktopConfig', 'addToList', 'search'], action.search)
        .setIn(['desktopConfig', 'addToList', 'filter'], action.filter);
    case AddToList.SUCCESS:
      return state
        .setIn(['desktopConfig', 'addToList', 'loading'], false)
        .setIn(['desktopConfig', 'addToList', 'data'], action.data)
        .setIn(['desktopConfig', 'addToList', 'pages'], action.pages);
    case AddToList.ERROR:
      return state
        .setIn(['desktopConfig', 'addToList', 'loading'], false)
        .setIn(['desktopConfig', 'addToList', 'data'], false)
        .setIn(['desktopConfig', 'addToList', 'pages'], false)
        .setIn(['desktopConfig', 'addToList', 'error'], action.error);
    case AddToList.PAGING:
      return state
        .setIn(['desktopConfig', 'addToList', 'loading'], true)
        .setIn(['desktopConfig', 'addToList', 'error'], false)
        .setIn(['desktopConfig', 'addToList', 'data'], false)
        .setIn(['desktopConfig', 'addToList', 'pageIndex'], action.page)
        .setIn(['desktopConfig', 'addToList', 'search'], action.search)
        .setIn(['desktopConfig', 'addToList', 'filter'], action.filter);
    case Assign.SUBMIT:
      return state
        .setIn(['desktopConfig', 'assign', 'loading'], true)
        .setIn(['desktopConfig', 'assign', 'error'], false)
        .setIn(['desktopConfig', 'assign', 'success'], false)
        .setIn(['desktopConfig', 'assign', 'id'], action.id)
        .setIn(['desktopConfig', 'assign', 'filter'], action.filter);
    case Assign.SUCCESS:
      return state
        .setIn(['desktopConfig', 'assign', 'loading'], false)
        .setIn(['desktopConfig', 'assign', 'id'], false)
        .setIn(['desktopConfig', 'assign', 'filter'], false)
        .setIn(['desktopConfig', 'assign', 'success'], true);
    case Assign.ERROR:
      return state
        .setIn(['desktopConfig', 'assign', 'loading'], false)
        .setIn(['desktopConfig', 'assign', 'id'], false)
        .setIn(['desktopConfig', 'assign', 'filter'], false)
        .setIn(['desktopConfig', 'assign', 'error'], action.error);
    case Assign.RESET:
      return state
        .setIn(['desktopConfig', 'assign', 'loading'], false)
        .setIn(['desktopConfig', 'assign', 'success'], false)
        .setIn(['desktopConfig', 'assign', 'error'], false);
    case Unassign.SUBMIT:
      return state
        .setIn(['desktopConfig', 'unassign', 'loading'], true)
        .setIn(['desktopConfig', 'unassign', 'error'], false)
        .setIn(['desktopConfig', 'unassign', 'success'], false)
        .setIn(['desktopConfig', 'unassign', 'id'], action.id)
        .setIn(['desktopConfig', 'unassign', 'filter'], action.filter);
    case Unassign.SUCCESS:
      return state
        .setIn(['desktopConfig', 'unassign', 'loading'], false)
        .setIn(['desktopConfig', 'unassign', 'id'], false)
        .setIn(['desktopConfig', 'unassign', 'filter'], false)
        .setIn(['desktopConfig', 'unassign', 'success'], true);
    case Unassign.ERROR:
      return state
        .setIn(['desktopConfig', 'unassign', 'loading'], false)
        .setIn(['desktopConfig', 'unassign', 'id'], false)
        .setIn(['desktopConfig', 'unassign', 'filter'], false)
        .setIn(['desktopConfig', 'unassign', 'error'], action.error);
    case Unassign.RESET:
      return state
        .setIn(['desktopConfig', 'unassign', 'loading'], false)
        .setIn(['desktopConfig', 'unassign', 'success'], false)
        .setIn(['desktopConfig', 'unassign', 'error'], false);
    case Update.SUBMIT:
      return state
        .setIn(['desktopConfig', 'update', 'loading'], true)
        .setIn(['desktopConfig', 'update', 'error'], false)
        .setIn(['desktopConfig', 'update', 'success'], false)
        .setIn(['desktopConfig', 'update', 'id'], action.id)
        .setIn(['desktopConfig', 'update', 'data'], action.data);
    case Update.SUCCESS:
      return state
        .setIn(['desktopConfig', 'update', 'loading'], false)
        .setIn(['desktopConfig', 'update', 'id'], false)
        .setIn(['desktopConfig', 'update', 'data'], false)
        .setIn(['desktopConfig', 'update', 'success'], true);
    case Update.ERROR:
      return state
        .setIn(['desktopConfig', 'update', 'loading'], false)
        .setIn(['desktopConfig', 'update', 'id'], false)
        .setIn(['desktopConfig', 'update', 'data'], false)
        .setIn(['desktopConfig', 'update', 'error'], action.error);
    case Update.RESET:
      return state
        .setIn(['desktopConfig', 'update', 'success'], false)
        .setIn(['desktopConfig', 'update', 'error'], false);
    case Save.SUBMIT:
      return state
        .setIn(['desktopConfig', 'save', 'loading'], true)
        .setIn(['desktopConfig', 'save', 'error'], false)
        .setIn(['desktopConfig', 'save', 'success'], false)
        .setIn(['desktopConfig', 'save', 'data'], action.data);
    case Save.SUCCESS:
      return state
        .setIn(['desktopConfig', 'save', 'loading'], false)
        .setIn(['desktopConfig', 'save', 'data'], false)
        .setIn(['desktopConfig', 'save', 'success'], true);
    case Save.ERROR:
      return state
        .setIn(['desktopConfig', 'save', 'loading'], false)
        .setIn(['desktopConfig', 'save', 'data'], false)
        .setIn(['desktopConfig', 'save', 'error'], action.error);
    case Save.RESET:
      return state
        .setIn(['desktopConfig', 'save', 'success'], false)
        .setIn(['desktopConfig', 'save', 'error'], false);
    case Delete.SUBMIT:
      return state
        .setIn(['desktopConfig', 'delete', 'loading'], true)
        .setIn(['desktopConfig', 'delete', 'error'], false)
        .setIn(['desktopConfig', 'delete', 'success'], false)
        .setIn(['desktopConfig', 'delete', 'id'], action.id);
    case Delete.SUCCESS:
      return state
        .setIn(['desktopConfig', 'delete', 'loading'], false)
        .setIn(['desktopConfig', 'delete', 'id'], false)
        .setIn(['desktopConfig', 'delete', 'success'], true);
    case Delete.ERROR:
      return state
        .setIn(['desktopConfig', 'delete', 'loading'], false)
        .setIn(['desktopConfig', 'delete', 'id'], false)
        .setIn(['desktopConfig', 'delete', 'error'], action.error);
    case Delete.RESET:
      return state
        .setIn(['desktopConfig', 'delete', 'loading'], false)
        .setIn(['desktopConfig', 'delete', 'error'], false)
        .setIn(['desktopConfig', 'delete', 'success'], false);
    default:
      return state;
  }
}

export default desktopConfigurationReducer;
