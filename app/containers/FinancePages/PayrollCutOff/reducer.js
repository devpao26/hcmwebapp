/*
 * Payroll Cutoff Template Reducer
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
  Template,
  Enrolled,
  AddToList,
  Assign,
  Unassign,
  Update,
  Save,
  Delete,
} from './constants';

const initialState = fromJS({
  prCutOff: {
    templateList: {
      loading: false,
      error: false,
      data: false,
      pages: false,
      pageIndex: 1,
      search: false,
      sort: false,
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

function prCutOffReducer(state = initialState, action) {
  switch (action.type) {
    case Template.RETRIEVE:
      return state
        .setIn(['prCutOff', 'templateList', 'loading'], true)
        .setIn(['prCutOff', 'templateList', 'error'], false)
        .setIn(['prCutOff', 'templateList', 'data'], false)
        .setIn(['prCutOff', 'templateList', 'pages'], false)
        .setIn(['prCutOff', 'templateList', 'pageIndex'], action.page)
        .setIn(['prCutOff', 'templateList', 'search'], action.search)
        .setIn(['prCutOff', 'templateList', 'sort'], action.sort);
    case Template.SUCCESS:
      return state
        .setIn(['prCutOff', 'templateList', 'loading'], false)
        .setIn(['prCutOff', 'templateList', 'data'], action.data)
        .setIn(['prCutOff', 'templateList', 'pages'], action.pages);
    case Template.ERROR:
      return state
        .setIn(['prCutOff', 'templateList', 'loading'], false)
        .setIn(['prCutOff', 'templateList', 'pages'], false)
        .setIn(['prCutOff', 'templateList', 'error'], action.error);
    case Template.PAGING:
      return state
        .setIn(['prCutOff', 'templateList', 'loading'], true)
        .setIn(['prCutOff', 'templateList', 'data'], false)
        .setIn(['prCutOff', 'templateList', 'pageIndex'], action.page)
        .setIn(['prCutOff', 'templateList', 'search'], action.search)
        .setIn(['prCutOff', 'templateList', 'sort'], action.sort);
    case Enrolled.RETRIEVE:
      return state
        .setIn(['prCutOff', 'enrolledList', 'loading'], true)
        .setIn(['prCutOff', 'enrolledList', 'error'], false)
        .setIn(['prCutOff', 'enrolledList', 'data'], false)
        .setIn(['prCutOff', 'enrolledList', 'pages'], false)
        .setIn(['prCutOff', 'enrolledList', 'id'], action.id)
        .setIn(['prCutOff', 'enrolledList', 'pageIndex'], action.page)
        .setIn(['prCutOff', 'enrolledList', 'search'], action.search)
        .setIn(['prCutOff', 'enrolledList', 'filter'], action.filter);
    case Enrolled.SUCCESS:
      return state
        .setIn(['prCutOff', 'enrolledList', 'loading'], false)
        .setIn(['prCutOff', 'enrolledList', 'data'], action.data)
        .setIn(['prCutOff', 'enrolledList', 'pages'], action.pages);
    case Enrolled.ERROR:
      return state
        .setIn(['prCutOff', 'enrolledList', 'loading'], false)
        .setIn(['prCutOff', 'enrolledList', 'data'], false)
        .setIn(['prCutOff', 'enrolledList', 'pages'], false)
        .setIn(['prCutOff', 'enrolledList', 'error'], action.error);
    case Enrolled.PAGING:
      return state
        .setIn(['prCutOff', 'enrolledList', 'loading'], true)
        .setIn(['prCutOff', 'enrolledList', 'error'], false)
        .setIn(['prCutOff', 'enrolledList', 'data'], false)
        .setIn(['prCutOff', 'enrolledList', 'id'], action.id)
        .setIn(['prCutOff', 'enrolledList', 'pageIndex'], action.page)
        .setIn(['prCutOff', 'enrolledList', 'search'], action.search)
        .setIn(['prCutOff', 'enrolledList', 'filter'], action.filter);
    case AddToList.RETRIEVE:
      return state
        .setIn(['prCutOff', 'addToList', 'loading'], true)
        .setIn(['prCutOff', 'addToList', 'error'], false)
        .setIn(['prCutOff', 'addToList', 'data'], false)
        .setIn(['prCutOff', 'addToList', 'pages'], false)
        .setIn(['prCutOff', 'addToList', 'pageIndex'], action.page)
        .setIn(['prCutOff', 'addToList', 'search'], action.search)
        .setIn(['prCutOff', 'addToList', 'filter'], action.filter);
    case AddToList.SUCCESS:
      return state
        .setIn(['prCutOff', 'addToList', 'loading'], false)
        .setIn(['prCutOff', 'addToList', 'data'], action.data)
        .setIn(['prCutOff', 'addToList', 'pages'], action.pages);
    case AddToList.ERROR:
      return state
        .setIn(['prCutOff', 'addToList', 'loading'], false)
        .setIn(['prCutOff', 'addToList', 'data'], false)
        .setIn(['prCutOff', 'addToList', 'pages'], false)
        .setIn(['prCutOff', 'addToList', 'error'], action.error);
    case AddToList.PAGING:
      return state
        .setIn(['prCutOff', 'addToList', 'loading'], true)
        .setIn(['prCutOff', 'addToList', 'error'], false)
        .setIn(['prCutOff', 'addToList', 'data'], false)
        .setIn(['prCutOff', 'addToList', 'pageIndex'], action.page)
        .setIn(['prCutOff', 'addToList', 'search'], action.search)
        .setIn(['prCutOff', 'addToList', 'filter'], action.filter);
    case Assign.SUBMIT:
      return state
        .setIn(['prCutOff', 'assign', 'loading'], true)
        .setIn(['prCutOff', 'assign', 'error'], false)
        .setIn(['prCutOff', 'assign', 'success'], false)
        .setIn(['prCutOff', 'assign', 'id'], action.id)
        .setIn(['prCutOff', 'assign', 'filter'], action.filter);
    case Assign.SUCCESS:
      return state
        .setIn(['prCutOff', 'assign', 'loading'], false)
        .setIn(['prCutOff', 'assign', 'id'], false)
        .setIn(['prCutOff', 'assign', 'filter'], false)
        .setIn(['prCutOff', 'assign', 'success'], true);
    case Assign.ERROR:
      return state
        .setIn(['prCutOff', 'assign', 'loading'], false)
        .setIn(['prCutOff', 'assign', 'id'], false)
        .setIn(['prCutOff', 'assign', 'filter'], false)
        .setIn(['prCutOff', 'assign', 'error'], action.error);
    case Assign.RESET:
      return state
        .setIn(['prCutOff', 'assign', 'loading'], false)
        .setIn(['prCutOff', 'assign', 'success'], false)
        .setIn(['prCutOff', 'assign', 'error'], false);
    case Unassign.SUBMIT:
      return state
        .setIn(['prCutOff', 'unassign', 'loading'], true)
        .setIn(['prCutOff', 'unassign', 'error'], false)
        .setIn(['prCutOff', 'unassign', 'success'], false)
        .setIn(['prCutOff', 'unassign', 'id'], action.id)
        .setIn(['prCutOff', 'unassign', 'filter'], action.filter);
    case Unassign.SUCCESS:
      return state
        .setIn(['prCutOff', 'unassign', 'loading'], false)
        .setIn(['prCutOff', 'unassign', 'id'], false)
        .setIn(['prCutOff', 'unassign', 'filter'], false)
        .setIn(['prCutOff', 'unassign', 'success'], true);
    case Unassign.ERROR:
      return state
        .setIn(['prCutOff', 'unassign', 'loading'], false)
        .setIn(['prCutOff', 'unassign', 'id'], false)
        .setIn(['prCutOff', 'unassign', 'filter'], false)
        .setIn(['prCutOff', 'unassign', 'error'], action.error);
    case Unassign.RESET:
      return state
        .setIn(['prCutOff', 'unassign', 'loading'], false)
        .setIn(['prCutOff', 'unassign', 'success'], false)
        .setIn(['prCutOff', 'unassign', 'error'], false);
    case Update.SUBMIT:
      return state
        .setIn(['prCutOff', 'update', 'loading'], true)
        .setIn(['prCutOff', 'update', 'error'], false)
        .setIn(['prCutOff', 'update', 'success'], false)
        .setIn(['prCutOff', 'update', 'id'], action.id)
        .setIn(['prCutOff', 'update', 'data'], action.data);
    case Update.SUCCESS:
      return state
        .setIn(['prCutOff', 'update', 'loading'], false)
        .setIn(['prCutOff', 'update', 'id'], false)
        .setIn(['prCutOff', 'update', 'data'], false)
        .setIn(['prCutOff', 'update', 'success'], true);
    case Update.ERROR:
      return state
        .setIn(['prCutOff', 'update', 'loading'], false)
        .setIn(['prCutOff', 'update', 'id'], false)
        .setIn(['prCutOff', 'update', 'data'], false)
        .setIn(['prCutOff', 'update', 'error'], action.error);
    case Update.RESET:
      return state
        .setIn(['prCutOff', 'update', 'success'], false)
        .setIn(['prCutOff', 'update', 'error'], false);
    case Save.SUBMIT:
      return state
        .setIn(['prCutOff', 'save', 'loading'], true)
        .setIn(['prCutOff', 'save', 'error'], false)
        .setIn(['prCutOff', 'save', 'success'], false)
        .setIn(['prCutOff', 'save', 'data'], action.data);
    case Save.SUCCESS:
      return state
        .setIn(['prCutOff', 'save', 'loading'], false)
        .setIn(['prCutOff', 'save', 'data'], false)
        .setIn(['prCutOff', 'save', 'success'], true);
    case Save.ERROR:
      return state
        .setIn(['prCutOff', 'save', 'loading'], false)
        .setIn(['prCutOff', 'save', 'data'], false)
        .setIn(['prCutOff', 'save', 'error'], action.error);
    case Save.RESET:
      return state
        .setIn(['prCutOff', 'save', 'success'], false)
        .setIn(['prCutOff', 'save', 'error'], false);
    case Delete.SUBMIT:
      return state
        .setIn(['prCutOff', 'delete', 'loading'], true)
        .setIn(['prCutOff', 'delete', 'error'], false)
        .setIn(['prCutOff', 'delete', 'success'], false)
        .setIn(['prCutOff', 'delete', 'id'], action.id);
    case Delete.SUCCESS:
      return state
        .setIn(['prCutOff', 'delete', 'loading'], false)
        .setIn(['prCutOff', 'delete', 'id'], false)
        .setIn(['prCutOff', 'delete', 'success'], true);
    case Delete.ERROR:
      return state
        .setIn(['prCutOff', 'delete', 'loading'], false)
        .setIn(['prCutOff', 'delete', 'id'], false)
        .setIn(['prCutOff', 'delete', 'error'], action.error);
    case Delete.RESET:
      return state
        .setIn(['prCutOff', 'delete', 'loading'], false)
        .setIn(['prCutOff', 'delete', 'error'], false)
        .setIn(['prCutOff', 'delete', 'success'], false);
    default:
      return state;
  }
}

export default prCutOffReducer;
