/*
 * General Admin Access and Permissions Actions
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
  CLEAR_STATE,
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

/**
 * Clear the state on component unmount
 */
export function clearState() {
  return {
    type: CLEAR_STATE,
  };
}

/**
 * Retrieve the Main Modules for Access and Permissions
 * @prop {boolean}  isGenAdmin  If we retrieve for general admin
 * @return {object}             Returns an object with a type of GET_MODULES
 */
export function getMainModules(isGenAdmin, requester) {
  return {
    type: GET_MODULES,
    isGenAdmin,
    requester,
  };
}
export function getMainModulesSuccess(data) {
  return {
    type: GET_MODULES_SUCCESS,
    data,
  };
}
export function getMainModulesError(error) {
  return {
    type: GET_MODULES_ERROR,
    error,
  };
}

/**
 * Get Sub Modules
 */
export function getSubModules(parentID) {
  return {
    type: GET_SUBMODULES,
    parentID,
  };
}
export function getSubModulesSuccess(data) {
  return {
    type: GET_SUBMODULES_SUCCESS,
    data,
  };
}
export function getSubModulesError(error) {
  return {
    type: GET_SUBMODULES_ERROR,
    error,
  };
}

/**
 * Retrieve the employee list
 */
export function getEmpList(search) {
  return {
    type: GET_EMPLIST,
    search,
  };
}
export function getEmpListSuccess(data, pages) {
  return {
    type: GET_EMPLIST_SUCCESS,
    data,
    pages,
  };
}
export function getEmpListError(error) {
  return {
    type: GET_EMPLIST_ERROR,
    error,
  };
}
export function getEmpListNoReset(page, search) {
  return {
    type: GET_EMPLIST_NORESET,
    page,
    search,
  };
}

/**
 * Assign Access to Employee
 * @return {object}   Returns an object with a type of ASSIGN_ACCESS
 */
export function getAssignAccess(empID, data) {
  return {
    type: ASSIGN_ACCESS,
    data,
    empID,
  };
}
export function getAssignAcessSuccess() {
  return {
    type: ASSIGN_ACCESS_SUCCESS,
  };
}
export function getAssignAccessError(error) {
  return {
    type: ASSIGN_ACCESS_ERROR,
    error,
  };
}
export function getAssignAccessReset() {
  return {
    type: ASSIGN_ACCESS_RESET,
  };
}

/**
 * Get the Access Permission and Time Constraints refs
 */
export function getRefs() {
  return {
    type: GET_REFS,
  };
}
export function getRefsSuccess(permissions, timeconst) {
  return {
    type: GET_REFS_SUCCESS,
    permissions,
    timeconst,
  };
}
export function getRefsError(error) {
  return {
    type: GET_REFS_ERROR,
    error,
  };
}

/**
 * Remove Template from Employee
 */
export function getRemoveTemplate(empID) {
  return {
    type: UNASSIGN_TEMPLATE,
    empID,
  };
}
export function getRemoveTemplateSuccess() {
  return {
    type: UNASSIGN_TEMPLATE_SUCCESS,
  };
}
export function getRemoveTemplateError(error) {
  return {
    type: UNASSIGN_TEMPLATE_ERROR,
    error,
  };
}
export function getRemoveTemplateReset() {
  return {
    type: UNASSIGN_TEMPLATE_RESET,
  };
}
