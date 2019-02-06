/*
 * Worksttus Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */
import {
  CLEAR_STATEDATA,
  GET_TEMPLATES,
  GET_TEMPLATESSUCCESS,
  GET_TEMPLATESERROR,
  SEARCH_TEMPLATES,
  SORT_TEMPLATES,
  GET_WORKFORMLOAD,
  GET_WORKFORMLOADSUCCESS,
  GET_WORKFORMLOADERROR,
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

// For Clearing All State Data on Unmount
export function clearAllStateData() {
  return {
    type: CLEAR_STATEDATA,
  };
}

// Template List
export function getWorkStatusTemplateList(page) {
  return {
    type: GET_TEMPLATES,
    page,
  };
}

export function getWorkStatusTemplateListSuccess(data, pages) {
  return {
    type: GET_TEMPLATESSUCCESS,
    data,
    pages,
  };
}

export function getWorkStatusTemplateListError(error) {
  return {
    type: GET_TEMPLATESERROR,
    error,
  };
}

export function searchWorkStatusTemplateList(query) {
  return {
    type: SEARCH_TEMPLATES,
    query,
  };
}

export function sortWorkStatusTemplateList(sort) {
  return {
    type: SORT_TEMPLATES,
    sort,
  };
}

// Actions for retrieving work status form load
export function getWorkFormLoad() {
  return {
    type: GET_WORKFORMLOAD,
  };
}

export function getWorkFormLoadSuccess(data) {
  return {
    type: GET_WORKFORMLOADSUCCESS,
    data,
  };
}

export function getWorkFormLoadError(error) {
  return {
    type: GET_WORKFORMLOADERROR,
    error,
  };
}

// Actions for retrieving enrolled list for the template
export function getEnrolledInTemplate(requester, id) {
  return {
    type: GET_ENROLLED,
    requester,
    id,
  };
}

export function gotoPageInEnrolledLists(page) {
  return {
    type: GOTO_PAGEENROLLED,
    page,
  };
}

export function getEnrolledInTemplateSuccess(data, pages) {
  return {
    type: GET_ENROLLEDSUCCESS,
    data,
    pages,
  };
}

export function getEnrolledInTemplateError(error) {
  return {
    type: GET_ENROLLEDERROR,
    error,
  };
}

export function searchEnrolledLists(query) {
  return {
    type: SEARCH_ENROLLED,
    query,
  };
}

// Get List of Department/Workgroup/Employee to be Enrolled on Template
export function getAddToList(page, requestCat) {
  return {
    type: GET_ADDTOLIST,
    page,
    requestCat,
  };
}

export function getAddToListSuccess(data, pages) {
  return {
    type: GET_ADDTOLISTSUCCESS,
    data,
    pages,
  };
}

export function getAddToListError(error) {
  return {
    type: GET_ADDTOLISTERROR,
    error,
  };
}

export function searchAddToTemplateList(query) {
  return {
    type: SEARCH_ADDTOLIST,
    query,
  };
}

export function addToTemplate(id) {
  return {
    type: ADD_TOTEMPLATE,
    id,
  };
}

export function addToTemplateSuccess(data) {
  return {
    type: ADD_TOTEMPLATESUCCESS,
    data,
  };
}

export function addToTemplateError(error) {
  return {
    type: ADD_TOTEMPLATEERROR,
    error,
  };
}

export function clearAddToTemplateData() {
  return {
    type: CLEAR_ADDTOTEMPLATE,
  };
}

// Delete selected Template
export function deleteTemplate() {
  return {
    type: DELETE_TEMPLATE,
  };
}

export function deleteTemplateSuccess() {
  return {
    type: DELETE_TEMPLATESUCCESS,
  };
}

export function deleteTemplateError(error) {
  return {
    type: DELETE_TEMPLATEERROR,
    error,
  };
}

export function clearDeleteSuccess() {
  return {
    type: CLEAR_DELETE,
  };
}

// Create/Save Edit Work Status Template
export function saveWorkStatTemplate(data, isNew) {
  return {
    type: SAVE_WORKSTATTEMPLATE,
    data,
    isNew,
  };
}

export function saveWorkStatTemplateSuccess() {
  return {
    type: SAVE_WORKSTATTEMPLATESUCCESS,
  };
}

export function saveWorkStatTemplateError(error) {
  return {
    type: SAVE_WORKSTATTEMPLATEERROR,
    error,
  };
}

export function clearSaveTemplateData() {
  return {
    type: CLEAR_WORKSTATTEMPLATEDATA,
  };
}

// UnAssign Template to Selected Department/Workgroup/Employee ID
export function unAssignTemplate(id) {
  return {
    type: UNASSIGN_TEMPLATE,
    id,
  };
}

export function unAssignTemplateSuccess() {
  return {
    type: UNASSIGN_TEMPLATESUCCESS,
  };
}

export function unAssignTemplateError(error) {
  return {
    type: UNASSIGN_TEMPLATEERROR,
    error,
  };
}

export function clearUnassign() {
  return {
    type: CLEAR_UNASSIGN,
  };
}
