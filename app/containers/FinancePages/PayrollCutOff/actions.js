/*
 * Payroll Cutoff Template Actions
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
  RESET_STATE,
  Template,
  Enrolled,
  AddToList,
  Assign,
  Unassign,
  Update,
  Save,
  Delete,
} from './constants';

/**
 * Reset State on Component Unmount
 */
export function resetState() {
  return {
    type: RESET_STATE,
  };
}

/**
 * Template List Retrival
 * @param {string} type
 * @param {number} page
 * @param {string} search
 * @param {string} sort
 */
export function getTemplateList(type, page, search, sort) {
  return {
    type,
    page,
    search,
    sort,
  };
}
export function getTemplateListSuccess(data, pages) {
  return {
    type: Template.SUCCESS,
    data,
    pages,
  };
}
export function getTemplateListError(error) {
  return {
    type: Template.ERROR,
    error,
  };
}

/**
 * Retrieval of Enrolled List
 */
export function getEnrolledList(type, id, page, search, filter) {
  return {
    type,
    id,
    page,
    search,
    filter,
  };
}
export function getEnrolledListSuccess(data, pages) {
  return {
    type: Enrolled.SUCCESS,
    data,
    pages,
  };
}
export function getEnrolledListError(error) {
  return {
    type: Enrolled.ERROR,
    error,
  };
}

/**
 * Add To List
 */
export function getAddToList(type, page, search, filter) {
  return {
    type,
    page,
    search,
    filter,
  };
}

export function getAddToListSuccess(data, pages) {
  return {
    type: AddToList.SUCCESS,
    data,
    pages,
  };
}

export function getAddToListError(error) {
  return {
    type: AddToList.ERROR,
    error,
  };
}

/**
 * Assign Entity to Template
 */
export function getAssignToTemplate(id, filter) {
  return {
    type: Assign.SUBMIT,
    id,
    filter,
  };
}
export function getAssignToTemplateSuccess() {
  return {
    type: Assign.SUCCESS,
  };
}
export function getAssignToTemplateError(error) {
  return {
    type: Assign.ERROR,
    error,
  };
}
export function getAssignToTemplateReset() {
  return {
    type: Assign.RESET,
  };
}

/**
 * Unassign Entity from template
 */
export function getUnassignToTemplate(id, filter) {
  return {
    type: Unassign.SUBMIT,
    id,
    filter,
  };
}
export function getUnassignToTemplateSuccess() {
  return {
    type: Unassign.SUCCESS,
  };
}
export function getUnassignToTemplateError(error) {
  return {
    type: Unassign.ERROR,
    error,
  };
}
export function getUnassignToTemplateReset() {
  return {
    type: Unassign.RESET,
  };
}
/**
 * Update Template
 */
export function getUpdateTemplate(id, data) {
  return {
    type: Update.SUBMIT,
    id,
    data,
  };
}
export function getUpdateTemplateSuccess() {
  return {
    type: Update.SUCCESS,
  };
}
export function getUpdateTemplateError(error) {
  return {
    type: Update.ERROR,
    error,
  };
}
export function getUpdateTemplateReset() {
  return {
    type: Update.RESET,
  };
}

/**
 * Saving of Template
 */
export function getSaveTemplate(data) {
  return {
    type: Save.SUBMIT,
    data,
  };
}
export function getSaveTemplateSuccess() {
  return {
    type: Save.SUCCESS,
  };
}
export function getSaveTemplateError(error) {
  return {
    type: Save.ERROR,
    error,
  };
}
export function getSaveTemplateReset() {
  return {
    type: Save.RESET,
  };
}

/**
 * Delete Template
 */
export function getDeleteTemplate(id) {
  return {
    type: Delete.SUBMIT,
    id,
  };
}
export function getDeleteTemplateSuccess() {
  return {
    type: Delete.SUCCESS,
  };
}
export function getDeleteTemplateError(error) {
  return {
    type: Delete.ERROR,
    error,
  };
}
export function getDeleteTemplateReset() {
  return {
    type: Delete.RESET,
  };
}

