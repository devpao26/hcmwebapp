/*
 * ShiftTemplate actions
 */

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

// For Clearing All State Data on Unmount
export function clearAllStateData() {
  return {
    type: CLEAR_STATEDATA,
  };
}

// Actions for Shift Templates Retrieval, Success and Error
export function getShiftTemplateLists(page, search, sort) {
  return {
    type: GET_TEMPLATES,
    page,
    search,
    sort,
  };
}

export function getShiftTemplateListsSuccess(data, pages) {
  return {
    type: GET_TEMPLATESSUCCESS,
    data,
    pages,
  };
}

export function getShiftTemplateListsError(error) {
  return {
    type: GET_TEMPLATESERROR,
    error,
  };
}

export function searchTemplateList(page, search, sort) {
  return {
    type: SEARCH_TEMPLATES,
    page,
    search,
    sort,
  };
}

export function sortTemplateList(page, search, sort) {
  return {
    type: SORT_TEMPLATES,
    page,
    search,
    sort,
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

// Retrieve Flexi Refs
export function getFlexiRefs() {
  return {
    type: GET_FLEXIREFS,
  };
}

export function getFlexiRefsSuccess(data) {
  return {
    type: GET_FLEXIREFSSUCCESS,
    data,
  };
}

export function getFlexiRefsError(error) {
  return {
    type: GET_FLEXIREFSERROR,
    error,
  };
}

// Save new Shift Template
export function saveShiftTemplate(data, isNew) {
  return {
    type: SAVE_SHIFTTEMPLATE,
    data,
    isNew,
  };
}

export function saveShiftTemplateSuccess(data) {
  return {
    type: SAVE_SHIFTTEMPLATESUCCESS,
    data,
  };
}

export function saveShiftTemplateError(error) {
  return {
    type: SAVE_SHIFTTEMPLATEERROR,
    error,
  };
}

export function clearTemplateData() {
  return {
    type: CLEAR_SHIFTTEMPLATEDATA,
  };
}

// Delete selected Shift Template
export function deleteShiftTemplate() {
  return {
    type: DELETE_SHIFTTEMPLATE,
  };
}

export function deleteShiftTemplateSuccess() {
  return {
    type: DELETE_SHIFTTEMPLATESUCCESS,
  };
}

export function deleteShiftTemplateError(error) {
  return {
    type: DELETE_SHIFTTEMPLATEERROR,
    error,
  };
}

export function clearDeleteSuccess() {
  return {
    type: CLEAR_DELETE,
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

// UnAssign Shift Template to Selected Department/Workgroup/Employee ID
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
