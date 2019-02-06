/*
 * workStatusReducer
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
  CLEAR_STATEDATA,
  GET_TEMPLATES,
  GET_TEMPLATESSUCCESS,
  GET_TEMPLATESERROR,
  SEARCH_TEMPLATES,
  SORT_TEMPLATES,
  GET_ENROLLED,
  GET_ENROLLEDSUCCESS,
  GET_ENROLLEDERROR,
  GOTO_PAGEENROLLED,
  SEARCH_ENROLLED,
  GET_ADDTOLIST,
  GET_ADDTOLISTSUCCESS,
  GET_ADDTOLISTERROR,
  SEARCH_ADDTOLIST,
  ADD_TOTEMPLATE,
  ADD_TOTEMPLATESUCCESS,
  ADD_TOTEMPLATEERROR,
  CLEAR_ADDTOTEMPLATE,
  GET_WORKFORMLOAD,
  GET_WORKFORMLOADSUCCESS,
  GET_WORKFORMLOADERROR,
  DELETE_TEMPLATE,
  DELETE_TEMPLATESUCCESS,
  DELETE_TEMPLATEERROR,
  CLEAR_DELETE,
  SAVE_WORKSTATTEMPLATE,
  SAVE_WORKSTATTEMPLATESUCCESS,
  SAVE_WORKSTATTEMPLATEERROR,
  CLEAR_WORKSTATTEMPLATEDATA,
  UNASSIGN_TEMPLATE,
  UNASSIGN_TEMPLATESUCCESS,
  UNASSIGN_TEMPLATEERROR,
  CLEAR_UNASSIGN,
} from './constants';

const initialState = fromJS({
  workStatusTemplate: {
    workStatusTemplateID: '',
    deleteLoading: false,
    deleteError: false,
    deleteSuccess: false,
    templateList: {
      loading: false,
      error: false,
      data: false,
      pages: false,
      pageIndex: 1,
      search: false,
      sort: false,
    },
    formLoads: {
      loading: false,
      error: false,
      data: false,
    },
    enrolledList: {
      loading: false,
      error: false,
      data: false,
      pages: false,
      pageIndex: 1,
      requester: false,
      search: false,
    },
    addToList: {
      loading: false,
      error: false,
      data: false,
      pages: false,
      pageIndex: 1,
      requestCat: false,
      search: false,
    },
    addToTemplate: {
      loading: false,
      error: false,
      data: false,
      addToId: false,
    },
    templateSaving: {
      loading: false,
      error: false,
      data: false,
      isNewTemplate: false,
      templateData: false,
    },
    unassignTemplate: {
      loading: false,
      error: false,
      data: false,
      idToUnassign: false,
    },
  },
});

function workStatusReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_STATEDATA:
      return state
        .setIn(['workStatusTemplate', 'templateList', 'search'], false)
        .setIn(['workStatusTemplate', 'templateList', 'data'], false)
        .setIn(['workStatusTemplate', 'templateList', 'pages'], false)
        .setIn(['workStatusTemplate', 'templateList', 'sort'], 'LastModDate')
        .setIn(['workStatusTemplate', 'enrolledList', 'search'], false)
        .setIn(['workStatusTemplate', 'enrolledList', 'data'], false)
        .setIn(['workStatusTemplate', 'enrolledList', 'pages'], false)
        .setIn(['workStatusTemplate', 'enrolledList', 'requester'], false)
        .setIn(['workStatusTemplate', 'workStatusTemplateID'], '');
    case GET_TEMPLATES:
      return state
        .setIn(['workStatusTemplate', 'workStatusTemplateID'], '')
        .setIn(['workStatusTemplate', 'templateList', 'loading'], true)
        .setIn(['workStatusTemplate', 'templateList', 'error'], false)
        .setIn(['workStatusTemplate', 'templateList', 'data'], false)
        .setIn(['workStatusTemplate', 'templateList', 'search'], false)
        .setIn(['workStatusTemplate', 'templateList', 'sort'], 'LastModDate')
        .setIn(['workStatusTemplate', 'templateList', 'pageIndex'], action.page);
    case GET_TEMPLATESSUCCESS:
      return state
        .setIn(['workStatusTemplate', 'templateList', 'loading'], false)
        .setIn(['workStatusTemplate', 'templateList', 'data'], action.data)
        .setIn(['workStatusTemplate', 'templateList', 'pages'], action.pages);
    case GET_TEMPLATESERROR:
      return state
        .setIn(['workStatusTemplate', 'templateList', 'loading'], false)
        .setIn(['workStatusTemplate', 'templateList', 'error'], action.error)
        .setIn(['workStatusTemplate', 'templateList', 'data'], false)
        .setIn(['workStatusTemplate', 'templateList', 'pages'], false);
    case SEARCH_TEMPLATES:
      return state
        .setIn(['workStatusTemplate', 'templateList', 'loading'], true)
        .setIn(['workStatusTemplate', 'templateList', 'error'], false)
        .setIn(['workStatusTemplate', 'templateList', 'data'], false)
        .setIn(['workStatusTemplate', 'templateList', 'pages'], false)
        .setIn(['workStatusTemplate', 'templateList', 'pageIndex'], false)
        .setIn(['workStatusTemplate', 'templateList', 'search'], action.query);
    case SORT_TEMPLATES:
      return state
        .setIn(['workStatusTemplate', 'workStatusTemplateID'], '')
        .setIn(['workStatusTemplate', 'templateList', 'loading'], true)
        .setIn(['workStatusTemplate', 'templateList', 'error'], false)
        .setIn(['workStatusTemplate', 'templateList', 'data'], false)
        .setIn(['workStatusTemplate', 'templateList', 'pages'], false)
        .setIn(['workStatusTemplate', 'templateList', 'pageIndex'], false)
        .setIn(['workStatusTemplate', 'templateList', 'search'], false)
        .setIn(['workStatusTemplate', 'templateList', 'sort'], action.sort);
    case GET_WORKFORMLOAD:
      return state
        .setIn(['workStatusTemplate', 'formLoads', 'loading'], true)
        .setIn(['workStatusTemplate', 'formLoads', 'error'], false)
        .setIn(['workStatusTemplate', 'formLoads', 'data'], false);
    case GET_WORKFORMLOADSUCCESS:
      return state
        .setIn(['workStatusTemplate', 'formLoads', 'loading'], false)
        .setIn(['workStatusTemplate', 'formLoads', 'data'], action.data);
    case GET_WORKFORMLOADERROR:
      return state
        .setIn(['workStatusTemplate', 'formLoads', 'loading'], false)
        .setIn(['workStatusTemplate', 'formLoads', 'error'], action.error);
    case GET_ENROLLED:
      return state
        .setIn(['workStatusTemplate', 'enrolledList', 'loading'], true)
        .setIn(['workStatusTemplate', 'enrolledList', 'error'], false)
        .setIn(['workStatusTemplate', 'enrolledList', 'data'], false)
        .setIn(['workStatusTemplate', 'enrolledList', 'pages'], false)
        .setIn(['workStatusTemplate', 'enrolledList', 'pageIndex'], false)
        .setIn(['workStatusTemplate', 'enrolledList', 'search'], false)
        .setIn(['workStatusTemplate', 'enrolledList', 'requester'], action.requester)
        .setIn(['workStatusTemplate', 'workStatusTemplateID'], action.id);
    case GOTO_PAGEENROLLED:
      return state
        .setIn(['workStatusTemplate', 'enrolledList', 'loading'], true)
        .setIn(['workStatusTemplate', 'enrolledList', 'error'], false)
        .setIn(['workStatusTemplate', 'enrolledList', 'data'], false)
        .setIn(['workStatusTemplate', 'enrolledList', 'pageIndex'], action.page);
    case GET_ENROLLEDSUCCESS:
      return state
        .setIn(['workStatusTemplate', 'enrolledList', 'loading'], false)
        .setIn(['workStatusTemplate', 'enrolledList', 'data'], action.data)
        .setIn(['workStatusTemplate', 'enrolledList', 'pages'], action.pages);
    case GET_ENROLLEDERROR:
      return state
        .setIn(['workStatusTemplate', 'enrolledList', 'loading'], false)
        .setIn(['workStatusTemplate', 'enrolledList', 'error'], action.error);
    case SEARCH_ENROLLED:
      return state
        .setIn(['workStatusTemplate', 'enrolledList', 'loading'], true)
        .setIn(['workStatusTemplate', 'enrolledList', 'data'], false)
        .setIn(['workStatusTemplate', 'enrolledList', 'pages'], false)
        .setIn(['workStatusTemplate', 'enrolledList', 'pageIndex'], false)
        .setIn(['workStatusTemplate', 'enrolledList', 'search'], action.query);
    case GET_ADDTOLIST:
      return state
        .setIn(['workStatusTemplate', 'addToList', 'loading'], true)
        .setIn(['workStatusTemplate', 'addToList', 'error'], false)
        .setIn(['workStatusTemplate', 'addToList', 'data'], false)
        .setIn(['workStatusTemplate', 'addToList', 'search'], false)
        .setIn(['workStatusTemplate', 'addToList', 'requestCat'], action.requestCat)
        .setIn(['workStatusTemplate', 'addToList', 'pageIndex'], action.page);
    case GET_ADDTOLISTSUCCESS:
      return state
        .setIn(['workStatusTemplate', 'addToList', 'loading'], false)
        .setIn(['workStatusTemplate', 'addToList', 'data'], action.data)
        .setIn(['workStatusTemplate', 'addToList', 'pages'], action.pages);
    case GET_ADDTOLISTERROR:
      return state
        .setIn(['workStatusTemplate', 'addToList', 'loading'], false)
        .setIn(['workStatusTemplate', 'addToList', 'error'], action.error);
    case SEARCH_ADDTOLIST:
      return state
        .setIn(['workStatusTemplate', 'addToList', 'loading'], true)
        .setIn(['workStatusTemplate', 'addToList', 'error'], false)
        .setIn(['workStatusTemplate', 'addToList', 'data'], false)
        .setIn(['workStatusTemplate', 'addToList', 'pages'], false)
        .setIn(['workStatusTemplate', 'addToList', 'pageIndex'], false)
        .setIn(['workStatusTemplate', 'addToList', 'search'], action.query);
    case ADD_TOTEMPLATE:
      return state
        .setIn(['workStatusTemplate', 'addToTemplate', 'loading'], true)
        .setIn(['workStatusTemplate', 'addToTemplate', 'error'], false)
        .setIn(['workStatusTemplate', 'addToTemplate', 'addToId'], action.id);
    case ADD_TOTEMPLATESUCCESS:
      return state
        .setIn(['workStatusTemplate', 'addToTemplate', 'loading'], false)
        .setIn(['workStatusTemplate', 'addToTemplate', 'addToId'], false)
        .setIn(['workStatusTemplate', 'addToTemplate', 'data'], true);
    case ADD_TOTEMPLATEERROR:
      return state
        .setIn(['workStatusTemplate', 'addToTemplate', 'loading'], false)
        .setIn(['workStatusTemplate', 'addToTemplate', 'error'], action.error);
    case CLEAR_ADDTOTEMPLATE:
      return state
        .setIn(['workStatusTemplate', 'addToTemplate', 'loading'], false)
        .setIn(['workStatusTemplate', 'addToTemplate', 'error'], false)
        .setIn(['workStatusTemplate', 'addToTemplate', 'data'], false)
        .setIn(['workStatusTemplate', 'addToTemplate', 'addToId'], false);
    case DELETE_TEMPLATE:
      return state
        .setIn(['workStatusTemplate', 'deleteLoading'], true)
        .setIn(['workStatusTemplate', 'deleteError'], false);
    case DELETE_TEMPLATESUCCESS:
      return state
        .setIn(['workStatusTemplate', 'deleteLoading'], false)
        .setIn(['workStatusTemplate', 'deleteSuccess'], true);
    case DELETE_TEMPLATEERROR:
      return state
        .setIn(['workStatusTemplate', 'deleteLoading'], true)
        .setIn(['workStatusTemplate', 'deleteError'], action.error);
    case CLEAR_DELETE:
      return state
        .setIn(['workStatusTemplate', 'workStatusTemplateID'], false)
        .setIn(['workStatusTemplate', 'deleteSuccess'], false);
    case SAVE_WORKSTATTEMPLATE:
      return state
        .setIn(['workStatusTemplate', 'templateSaving', 'loading'], true)
        .setIn(['workStatusTemplate', 'templateSaving', 'error'], false)
        .setIn(['workStatusTemplate', 'templateSaving', 'isNewTemplate'], action.isNew)
        .setIn(['workStatusTemplate', 'templateSaving', 'templateData'], action.data);
    case SAVE_WORKSTATTEMPLATESUCCESS:
      return state
        .setIn(['workStatusTemplate', 'templateSaving', 'loading'], false)
        .setIn(['workStatusTemplate', 'templateSaving', 'data'], true);
    case SAVE_WORKSTATTEMPLATEERROR:
      return state
        .setIn(['workStatusTemplate', 'templateSaving', 'loading'], false)
        .setIn(['workStatusTemplate', 'templateSaving', 'error'], action.error);
    case CLEAR_WORKSTATTEMPLATEDATA:
      return state
        .setIn(['workStatusTemplate', 'templateSaving', 'data'], false)
        .setIn(['workStatusTemplate', 'templateSaving', 'templateData'], false);
    case UNASSIGN_TEMPLATE:
      return state
        .setIn(['workStatusTemplate', 'unassignTemplate', 'loading'], true)
        .setIn(['workStatusTemplate', 'unassignTemplate', 'error'], false)
        .setIn(['workStatusTemplate', 'unassignTemplate', 'data'], false)
        .setIn(['workStatusTemplate', 'unassignTemplate', 'idToUnassign'], action.id);
    case UNASSIGN_TEMPLATESUCCESS:
      return state
        .setIn(['workStatusTemplate', 'unassignTemplate', 'loading'], false)
        .setIn(['workStatusTemplate', 'unassignTemplate', 'data'], true);
    case UNASSIGN_TEMPLATEERROR:
      return state
        .setIn(['workStatusTemplate', 'unassignTemplate', 'loading'], false)
        .setIn(['workStatusTemplate', 'unassignTemplate', 'error'], action.error);
    case CLEAR_UNASSIGN:
      return state
        .setIn(['workStatusTemplate', 'unassignTemplate', 'loading'], false)
        .setIn(['workStatusTemplate', 'unassignTemplate', 'error'], false)
        .setIn(['workStatusTemplate', 'unassignTemplate', 'data'], false)
        .setIn(['workStatusTemplate', 'unassignTemplate', 'idToUnassign'], false);
    default:
      return state;
  }
}

export default workStatusReducer;
