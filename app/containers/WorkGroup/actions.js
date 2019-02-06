/*
 * Workgroup Actions
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
  // GET_REFS, GET_REFS_SUCCESS, GET_REFS_ERROR,
  GET_ORG, GET_ORG_SUCCESS, GET_ORG_ERRROR,
  GET_EMP, GET_EMP_SUCCESS, GET_EMP_ERROR, GET_EMP_NORESETPAGE,
  ENROLL_EMP, ENROLL_EMP_SUCCESS, ENROLL_EMP_ERROR, ENROLL_EMP_RESET,
  UNENROLL_EMP, UNENROLL_EMP_SUCCESS, UNENROLL_EMP_ERROR, UNENROLL_EMP_RESET,
  GET_TEMPLATES, GET_TEMPLATES_SUCCESS, GET_TEMPLATES_ERROR, GET_TEMPLATES_NORESETPAGE,
  ASSIGN_TEMPLATE, ASSIGN_TEMPLATE_SUCCESS, ASSIGN_TEMPLATE_ERROR, ASSIGN_TEMPLATE_CLEAR,
  UNASSIGN_TEMPLATE, UNASSIGN_TEMPLATE_SUCCESS, UNASSIGN_TEMPLATE_ERROR, UNASSIGN_TEMPLATE_RESET,
  ASSIGN_EMPHEAD, ASSIGN_EMPHEAD_SUCCESS, ASSIGN_EMPHEAD_ERROR, ASSIGN_EMPHEAD_RESET,
  CREATE_GROUP, CREATE_GROUP_SUCCESS, CREATE_GROUP_ERROR, CREATE_GROUP_RESET,
  DELETE_GROUP, DELETE_GROUP_SUCCESS, DELETE_GROUP_ERROR, DELETE_GROUP_RESET,
  RENAME_GROUP, RENAME_GROUP_SUCCESS, RENAME_GROUP_ERROR, RENAME_GROUP_RESET,
  DISABLE_EMP, DISABLE_EMP_SUCCESS, DISABLE_EMP_ERROR, DISABLE_EMP_RESET,
  VIEW_DETAILS,
  VIEW_DETAILS_SUCCESS,
  VIEW_DETAILS_ERROR,
  GET_TRANSFERLIST,
  GET_TRANSFERLIST_SUCCESS,
  GET_TRANSFERLIST_ERROR,
  TRANSFER,
  TRANSFER_SUCCESS,
  TRANSFER_ERROR,
  TRANSFER_RESET,
  GET_TRANSFERLIST_NORESET,
} from './constants';

/**
 * Clear the state on component unmount
 */
export function clearState() {
  return {
    type: CLEAR_STATE,
  };
}

// #region Get Organizations / Success / Error
/**
 * Get Organizations
 * @param {string}  id        ID of the team we are retrieving
 * @param {boolean} isTeam    Check if we are retrieving a dept or team
 * @return {object}           Returns an object with a type of GET_ORG
 */
export function getGroupList(id, isTeam) {
  return {
    type: GET_ORG,
    id,
    isTeam,
  };
}
export function getGroupListSuccess(data) {
  return {
    type: GET_ORG_SUCCESS,
    data,
  };
}
export function getGroupListError(error) {
  return {
    type: GET_ORG_ERRROR,
    error,
  };
}
// #endregion

// #region Get Employees / Enrollment / Unenroll / Disable
/**
 * Get Employee List (enrolled or not yet)
 * @param {string}  id          ID of the group
 * @param {boolean} isTeam      Check if we are retrieving for dept or team
 * @param {boolean} isEnrolled  Check if what we are retrieving are the enrolled employees only
 * @param {boolean} isAll       Show all employees (true/false)
 * @param {string}  search      Search value
 * @param {number}  page        Page index of the list
 */
export function getEmpList(id, isTeam, isEnrolled, isAll, search, page) {
  return {
    type: GET_EMP,
    id,
    isTeam,
    isEnrolled,
    isAll,
    search,
    page,
  };
}
export function getEmpListSuccess(data, pages) {
  return {
    type: GET_EMP_SUCCESS,
    data,
    pages,
  };
}
export function getEmpListError(error) {
  return {
    type: GET_EMP_ERROR,
    error,
  };
}
export function getEmpListNoResetPages(id, isTeam, isEnrolled, isAll, search, page) {
  return {
    type: GET_EMP_NORESETPAGE,
    id,
    isTeam,
    isEnrolled,
    isAll,
    search,
    page,
  };
}

/**
 * Enroll employees
 */
export function getEnrollEmps(ids, isTeam, deptID, teamID) {
  return {
    type: ENROLL_EMP,
    ids,
    isTeam,
    deptID,
    teamID,
  };
}
export function getEnrollEmpsSuccess() {
  return {
    type: ENROLL_EMP_SUCCESS,
  };
}
export function getEnrollEmpsError(error, data) {
  return {
    type: ENROLL_EMP_ERROR,
    error,
    data,
  };
}
export function getEnrollEmpReset() {
  return {
    type: ENROLL_EMP_RESET,
  };
}

/**
 * UnEnroll employees
 */
export function getUnEnrollEmps(ids, isTeam, deptID, teamID) {
  return {
    type: UNENROLL_EMP,
    ids,
    isTeam,
    deptID,
    teamID,
  };
}
export function getUnEnrollEmpsSuccess() {
  return {
    type: UNENROLL_EMP_SUCCESS,
  };
}
export function getUnEnrollEmpsError(error, data) {
  return {
    type: UNENROLL_EMP_ERROR,
    error,
    data,
  };
}
export function getUnEnrollEmpReset() {
  return {
    type: UNENROLL_EMP_RESET,
  };
}

/**
 * Assign Employee as Head
 */
export function getAssignEmpHead(empID, groupID, isTeam) {
  return {
    type: ASSIGN_EMPHEAD,
    empID,
    groupID,
    isTeam,
  };
}
export function getAssignEmpHeadSuccess() {
  return {
    type: ASSIGN_EMPHEAD_SUCCESS,
  };
}
export function getAssignEmpHeadError(error) {
  return {
    type: ASSIGN_EMPHEAD_ERROR,
    error,
  };
}
export function getAssignEmpHeadReset() {
  return {
    type: ASSIGN_EMPHEAD_RESET,
  };
}

/**
 * Disable employee account
 */
export function getDisableAccount(empID, empStatus) {
  return {
    type: DISABLE_EMP,
    empID,
    empStatus,
  };
}
export function getDisableAccountSuccess() {
  return {
    type: DISABLE_EMP_SUCCESS,
  };
}
export function getDisableAccountError(error) {
  return {
    type: DISABLE_EMP_ERROR,
    error,
  };
}
export function getDisableAccountReset() {
  return {
    type: DISABLE_EMP_RESET,
  };
}
// #endregion

// #region Get/Assign/View Templates / Success / Error
/**
 * Get template list
 */
export function getTemplates(page, search, tempName) {
  return {
    type: GET_TEMPLATES,
    page,
    search,
    tempName,
  };
}
export function getTemplatesSuccess(data, pages) {
  return {
    type: GET_TEMPLATES_SUCCESS,
    data,
    pages,
  };
}
export function getTemplatesError(error) {
  return {
    type: GET_TEMPLATES_ERROR,
    error,
  };
}
export function getTemplatesNoReset(page, search, tempName) {
  return {
    type: GET_TEMPLATES_NORESETPAGE,
    page,
    search,
    tempName,
  };
}
/**
 * Assign Template
 */
export function getAssignTemplate(templateID, assignToID, assignTo, templateCat) {
  return {
    type: ASSIGN_TEMPLATE,
    templateID,
    assignToID,
    assignTo,
    templateCat,
  };
}
export function getAssignTemplateSuccess() {
  return {
    type: ASSIGN_TEMPLATE_SUCCESS,
  };
}
export function getAssignTemplateError(error) {
  return {
    type: ASSIGN_TEMPLATE_ERROR,
    error,
  };
}
export function getAssignTemplateReset() {
  return {
    type: ASSIGN_TEMPLATE_CLEAR,
  };
}
/**
 * Unassign Template
 */
export function getUnassignTemplate(id, isTeam, name) {
  return {
    type: UNASSIGN_TEMPLATE,
    id,
    isTeam,
    name,
  };
}
export function getUnassignTemplateSuccess() {
  return {
    type: UNASSIGN_TEMPLATE_SUCCESS,
  };
}
export function getUnassignTemplateError(error) {
  return {
    type: UNASSIGN_TEMPLATE_ERROR,
    error,
  };
}
export function getUnassignTemplateReset() {
  return {
    type: UNASSIGN_TEMPLATE_RESET,
  };
}

/**
 * View Template Details
 */
export function getViewDetails(id, isTeam) {
  return {
    type: VIEW_DETAILS,
    id,
    isTeam,
  };
}
export function getViewDetailsSuccess(data) {
  return {
    type: VIEW_DETAILS_SUCCESS,
    data,
  };
}
export function getViewDetailsError(error) {
  return {
    type: VIEW_DETAILS_ERROR,
    error,
  };
}
// #endregion

// #region Create/Delete/Reset group
/**
 * Create Group
 * @param {string}  name
 * @param {bool}    isTeam
 * @param {string}  groupID
 */
export function getCreateNew(name, isTeam, groupID) {
  return {
    type: CREATE_GROUP,
    name,
    isTeam,
    groupID,
  };
}
export function getCreateNewSuccess() {
  return {
    type: CREATE_GROUP_SUCCESS,
  };
}
export function getCreateNewError(error) {
  return {
    type: CREATE_GROUP_ERROR,
    error,
  };
}
export function getCreateNewReset() {
  return {
    type: CREATE_GROUP_RESET,
  };
}
/**
 * Delete Group
 */
export function getDeleteGroup(id, isTeam) {
  return {
    type: DELETE_GROUP,
    id,
    isTeam,
  };
}
export function getDeleteGroupSuccess() {
  return {
    type: DELETE_GROUP_SUCCESS,
  };
}
export function getDeleteGroupError(error) {
  return {
    type: DELETE_GROUP_ERROR,
    error,
  };
}
export function getDeleteGroupReset() {
  return {
    type: DELETE_GROUP_RESET,
  };
}
/**
 * Rename Group
 */
export function getRenameGroup(name, id, isTeam) {
  return {
    type: RENAME_GROUP,
    name,
    id,
    isTeam,
  };
}
export function getRenameGroupSuccess() {
  return {
    type: RENAME_GROUP_SUCCESS,
  };
}
export function getRenameGroupError(error) {
  return {
    type: RENAME_GROUP_ERROR,
    error,
  };
}
export function getRenameReset() {
  return {
    type: RENAME_GROUP_RESET,
  };
}
// #endregion

// #region Transfer Emp/Team and List Retrieval
/**
 * Retrieve Transfer Group List
 */
export function getTransferList(id, isTeam, page, search) {
  return {
    type: GET_TRANSFERLIST,
    id,
    isTeam,
    page,
    search,
  };
}
export function getTransferListSuccess(data, pages) {
  return {
    type: GET_TRANSFERLIST_SUCCESS,
    data,
    pages,
  };
}
export function getTransferListError(error) {
  return {
    type: GET_TRANSFERLIST_ERROR,
    error,
  };
}
export function getTransferListNoReset(id, isTeam, page, search) {
  return {
    type: GET_TRANSFERLIST_NORESET,
    id,
    isTeam,
    page,
    search,
  };
}

/**
 * Transfer Emp/Team
 */
export function getTransfer(empID, oldIsTeam, oldGroupID, newIsTeam, newGroupID) {
  return {
    type: TRANSFER,
    empID,
    oldIsTeam,
    oldGroupID,
    newIsTeam,
    newGroupID,
  };
}
export function getTransferSuccess() {
  return {
    type: TRANSFER_SUCCESS,
  };
}
export function getTransferError(error) {
  return {
    type: TRANSFER_ERROR,
    error,
  };
}
export function getTransferReset() {
  return {
    type: TRANSFER_RESET,
  };
}
// #endregion
