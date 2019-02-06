/*
 * ShiftTemplate reducer
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
  GET_FLEXIREFS,
  GET_FLEXIREFSSUCCESS,
  GET_FLEXIREFSERROR,
  SAVE_SHIFTTEMPLATE,
  SAVE_SHIFTTEMPLATESUCCESS,
  SAVE_SHIFTTEMPLATEERROR,
  CLEAR_SHIFTTEMPLATEDATA,
  DELETE_SHIFTTEMPLATE,
  DELETE_SHIFTTEMPLATESUCCESS,
  DELETE_SHIFTTEMPLATEERROR,
  CLEAR_DELETE,
  GET_ADDTOLIST,
  GET_ADDTOLISTSUCCESS,
  GET_ADDTOLISTERROR,
  SEARCH_ADDTOLIST,
  ADD_TOTEMPLATE,
  ADD_TOTEMPLATESUCCESS,
  ADD_TOTEMPLATEERROR,
  CLEAR_ADDTOTEMPLATE,
  UNASSIGN_TEMPLATE,
  UNASSIGN_TEMPLATESUCCESS,
  UNASSIGN_TEMPLATEERROR,
  CLEAR_UNASSIGN,
} from './constants';

const initialState = fromJS({
  shiftTemplate: {
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
      pageIndex: 1,
      requester: false,
      search: false,
    },
    shiftTemplateID: false,
    flexiRefs: false,
    shiftTemplateSaving: {
      isNewShiftTemplate: false,
      shiftTemplateData: false,
      loading: false,
      error: false,
      data: false,
    },
    deleteLoading: false,
    deleteError: false,
    deleteSuccess: false,
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
    unassignTemplate: {
      loading: false,
      error: false,
      data: false,
      idToUnassign: false,
    },
  },
});

function shiftTemplateReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_STATEDATA:
      return initialState;
    case GET_TEMPLATES:
      return state
        .setIn(['shiftTemplate', 'templateList', 'loading'], true)
        .setIn(['shiftTemplate', 'templateList', 'error'], false)
        .setIn(['shiftTemplate', 'templateList', 'data'], false)
        .setIn(['shiftTemplate', 'templateList', 'search'], action.search)
        .setIn(['shiftTemplate', 'templateList', 'sort'], action.sort)
        .setIn(['shiftTemplate', 'templateList', 'pageIndex'], action.page);
    case GET_TEMPLATESSUCCESS:
      return state
        .setIn(['shiftTemplate', 'templateList', 'loading'], false)
        .setIn(['shiftTemplate', 'templateList', 'data'], action.data)
        .setIn(['shiftTemplate', 'templateList', 'pages'], action.pages);
    case GET_TEMPLATESERROR:
      return state
        .setIn(['shiftTemplate', 'templateList', 'loading'], false)
        .setIn(['shiftTemplate', 'templateList', 'error'], action.error)
        .setIn(['shiftTemplate', 'templateList', 'data'], false)
        .setIn(['shiftTemplate', 'templateList', 'pages'], false);
    case SEARCH_TEMPLATES:
      return state
        .setIn(['shiftTemplate', 'shiftTemplateID'], false)
        .setIn(['shiftTemplate', 'templateList', 'loading'], true)
        .setIn(['shiftTemplate', 'templateList', 'error'], false)
        .setIn(['shiftTemplate', 'templateList', 'data'], false)
        .setIn(['shiftTemplate', 'templateList', 'pages'], false)
        .setIn(['shiftTemplate', 'templateList', 'pageIndex'], action.page)
        .setIn(['shiftTemplate', 'templateList', 'search'], action.search)
        .setIn(['shiftTemplate', 'templateList', 'sort'], action.sort);
    case SORT_TEMPLATES:
      return state
        .setIn(['shiftTemplate', 'shiftTemplateID'], false)
        .setIn(['shiftTemplate', 'templateList', 'loading'], true)
        .setIn(['shiftTemplate', 'templateList', 'error'], false)
        .setIn(['shiftTemplate', 'templateList', 'data'], false)
        .setIn(['shiftTemplate', 'templateList', 'pages'], false)
        .setIn(['shiftTemplate', 'templateList', 'pageIndex'], action.page)
        .setIn(['shiftTemplate', 'templateList', 'search'], action.search)
        .setIn(['shiftTemplate', 'templateList', 'sort'], action.sort);
    case GET_ENROLLED:
      return state
        .setIn(['shiftTemplate', 'enrolledList', 'loading'], true)
        .setIn(['shiftTemplate', 'enrolledList', 'error'], false)
        .setIn(['shiftTemplate', 'enrolledList', 'data'], false)
        .setIn(['shiftTemplate', 'enrolledList', 'pageIndex'], false)
        .setIn(['shiftTemplate', 'enrolledList', 'search'], false)
        .setIn(['shiftTemplate', 'enrolledList', 'pages'], false)
        .setIn(['shiftTemplate', 'enrolledList', 'requester'], action.requester)
        .setIn(['shiftTemplate', 'shiftTemplateID'], action.id);
    case GOTO_PAGEENROLLED:
      return state
        .setIn(['shiftTemplate', 'enrolledList', 'loading'], true)
        .setIn(['shiftTemplate', 'enrolledList', 'error'], false)
        .setIn(['shiftTemplate', 'enrolledList', 'data'], false)
        .setIn(['shiftTemplate', 'enrolledList', 'pageIndex'], action.page);
    case GET_ENROLLEDSUCCESS:
      return state
        .setIn(['shiftTemplate', 'enrolledList', 'loading'], false)
        .setIn(['shiftTemplate', 'enrolledList', 'data'], action.data)
        .setIn(['shiftTemplate', 'enrolledList', 'pages'], action.pages);
    case GET_ENROLLEDERROR:
      return state
        .setIn(['shiftTemplate', 'enrolledList', 'loading'], false)
        .setIn(['shiftTemplate', 'enrolledList', 'pages'], false)
        .setIn(['shiftTemplate', 'enrolledList', 'error'], action.error);
    case SEARCH_ENROLLED:
      return state
        .setIn(['shiftTemplate', 'enrolledList', 'loading'], true)
        .setIn(['shiftTemplate', 'enrolledList', 'data'], false)
        .setIn(['shiftTemplate', 'enrolledList', 'pages'], false)
        .setIn(['shiftTemplate', 'enrolledList', 'pageIndex'], false)
        .setIn(['shiftTemplate', 'enrolledList', 'search'], action.query);
    case GET_FLEXIREFS:
      return state
        .setIn(['shiftTemplate', 'flexiRefs'], false);
    case GET_FLEXIREFSSUCCESS:
      return state
        .setIn(['shiftTemplate', 'flexiRefs'], action.data);
    case GET_FLEXIREFSERROR:
      return state
        .setIn(['shiftTemplate', 'flexiRefs'], action.error);
    case SAVE_SHIFTTEMPLATE:
      return state
        .setIn(['shiftTemplate', 'shiftTemplateSaving', 'loading'], true)
        .setIn(['shiftTemplate', 'shiftTemplateSaving', 'error'], false)
        .setIn(['shiftTemplate', 'shiftTemplateSaving', 'isNewShiftTemplate'], action.isNew)
        .setIn(['shiftTemplate', 'shiftTemplateSaving', 'shiftTemplateData'], action.data);
    case SAVE_SHIFTTEMPLATESUCCESS:
      return state
        .setIn(['shiftTemplate', 'shiftTemplateSaving', 'loading'], false)
        .setIn(['shiftTemplate', 'shiftTemplateSaving', 'data'], true);
    case SAVE_SHIFTTEMPLATEERROR:
      return state
        .setIn(['shiftTemplate', 'shiftTemplateSaving', 'loading'], false)
        .setIn(['shiftTemplate', 'shiftTemplateSaving', 'error'], action.error);
    case CLEAR_SHIFTTEMPLATEDATA:
      return state
        .setIn(['shiftTemplate', 'shiftTemplateSaving', 'loading'], false)
        .setIn(['shiftTemplate', 'shiftTemplateSaving', 'error'], false)
        .setIn(['shiftTemplate', 'shiftTemplateSaving', 'data'], false)
        .setIn(['shiftTemplate', 'shiftTemplateID'], false)
        .setIn(['shiftTemplate', 'shiftTemplateSaving', 'isNewShiftTemplate'], false)
        .setIn(['shiftTemplate', 'shiftTemplateSaving', 'shiftTemplateData'], false);
    case DELETE_SHIFTTEMPLATE:
      return state
        .setIn(['shiftTemplate', 'deleteLoading'], true)
        .setIn(['shiftTemplate', 'deleteError'], false);
    case DELETE_SHIFTTEMPLATESUCCESS:
      return state
        .setIn(['shiftTemplate', 'deleteLoading'], false)
        .setIn(['shiftTemplate', 'deleteSuccess'], true);
    case DELETE_SHIFTTEMPLATEERROR:
      return state
        .setIn(['shiftTemplate', 'deleteLoading'], true)
        .setIn(['shiftTemplate', 'deleteError'], action.error);
    case CLEAR_DELETE:
      return state
        .setIn(['shiftTemplate', 'shiftTemplateID'], false)
        .setIn(['shiftTemplate', 'deleteSuccess'], false);
    case GET_ADDTOLIST:
      return state
        .setIn(['shiftTemplate', 'addToList', 'loading'], true)
        .setIn(['shiftTemplate', 'addToList', 'error'], false)
        .setIn(['shiftTemplate', 'addToList', 'data'], false)
        .setIn(['shiftTemplate', 'addToList', 'search'], false)
        .setIn(['shiftTemplate', 'addToList', 'requestCat'], action.requestCat)
        .setIn(['shiftTemplate', 'addToList', 'pageIndex'], action.page);
    case GET_ADDTOLISTSUCCESS:
      return state
        .setIn(['shiftTemplate', 'addToList', 'loading'], false)
        .setIn(['shiftTemplate', 'addToList', 'data'], action.data)
        .setIn(['shiftTemplate', 'addToList', 'pages'], action.pages);
    case GET_ADDTOLISTERROR:
      return state
        .setIn(['shiftTemplate', 'addToList', 'loading'], false)
        .setIn(['shiftTemplate', 'addToList', 'error'], action.error);
    case SEARCH_ADDTOLIST:
      return state
        .setIn(['shiftTemplate', 'addToList', 'loading'], true)
        .setIn(['shiftTemplate', 'addToList', 'error'], false)
        .setIn(['shiftTemplate', 'addToList', 'data'], false)
        .setIn(['shiftTemplate', 'addToList', 'pages'], false)
        .setIn(['shiftTemplate', 'addToList', 'pageIndex'], false)
        .setIn(['shiftTemplate', 'addToList', 'search'], action.query);
    case ADD_TOTEMPLATE:
      return state
        .setIn(['shiftTemplate', 'addToTemplate', 'loading'], true)
        .setIn(['shiftTemplate', 'addToTemplate', 'error'], false)
        .setIn(['shiftTemplate', 'addToTemplate', 'addToId'], action.id);
    case ADD_TOTEMPLATESUCCESS:
      return state
        .setIn(['shiftTemplate', 'addToTemplate', 'loading'], false)
        .setIn(['shiftTemplate', 'addToTemplate', 'addToId'], false)
        .setIn(['shiftTemplate', 'addToTemplate', 'data'], true);
    case ADD_TOTEMPLATEERROR:
      return state
        .setIn(['shiftTemplate', 'addToTemplate', 'loading'], false)
        .setIn(['shiftTemplate', 'addToTemplate', 'error'], action.error);
    case CLEAR_ADDTOTEMPLATE:
      return state
        .setIn(['shiftTemplate', 'addToTemplate', 'loading'], false)
        .setIn(['shiftTemplate', 'addToTemplate', 'error'], false)
        .setIn(['shiftTemplate', 'addToTemplate', 'data'], false)
        .setIn(['shiftTemplate', 'addToTemplate', 'addToId'], false);
    case UNASSIGN_TEMPLATE:
      return state
        .setIn(['shiftTemplate', 'unassignTemplate', 'loading'], true)
        .setIn(['shiftTemplate', 'unassignTemplate', 'error'], false)
        .setIn(['shiftTemplate', 'unassignTemplate', 'data'], false)
        .setIn(['shiftTemplate', 'unassignTemplate', 'idToUnassign'], action.id);
    case UNASSIGN_TEMPLATESUCCESS:
      return state
        .setIn(['shiftTemplate', 'unassignTemplate', 'loading'], false)
        .setIn(['shiftTemplate', 'unassignTemplate', 'data'], true);
    case UNASSIGN_TEMPLATEERROR:
      return state
        .setIn(['shiftTemplate', 'unassignTemplate', 'loading'], false)
        .setIn(['shiftTemplate', 'unassignTemplate', 'error'], action.error);
    case CLEAR_UNASSIGN:
      return state
        .setIn(['shiftTemplate', 'unassignTemplate', 'loading'], false)
        .setIn(['shiftTemplate', 'unassignTemplate', 'error'], false)
        .setIn(['shiftTemplate', 'unassignTemplate', 'data'], false)
        .setIn(['shiftTemplate', 'unassignTemplate', 'idToUnassign'], false);
    default:
      return state;
  }
}

export default shiftTemplateReducer;
