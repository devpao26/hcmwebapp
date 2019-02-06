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
  GET_ORG, GET_ORG_SUCCESS, GET_ORG_ERRROR, // Get the workgroups
  GET_EMP, GET_EMP_SUCCESS, GET_EMP_ERROR, GET_EMP_NORESETPAGE, // Get employee list with page and search
  ENROLL_EMP, ENROLL_EMP_SUCCESS, ENROLL_EMP_ERROR, ENROLL_EMP_RESET, // Enroll an employee to dept/team
  UNENROLL_EMP, UNENROLL_EMP_SUCCESS, UNENROLL_EMP_ERROR, UNENROLL_EMP_RESET, // Unenroll employee from dept/team
  GET_TEMPLATES, GET_TEMPLATES_SUCCESS, GET_TEMPLATES_ERROR, GET_TEMPLATES_NORESETPAGE, // Retrieval of templates list
  ASSIGN_TEMPLATE, ASSIGN_TEMPLATE_SUCCESS, ASSIGN_TEMPLATE_ERROR, ASSIGN_TEMPLATE_CLEAR, // Assigning of template to dept/team/emp
  UNASSIGN_TEMPLATE, UNASSIGN_TEMPLATE_SUCCESS, UNASSIGN_TEMPLATE_ERROR, UNASSIGN_TEMPLATE_RESET, // Unassigning of template from dept/team
  ASSIGN_EMPHEAD, ASSIGN_EMPHEAD_SUCCESS, ASSIGN_EMPHEAD_ERROR, ASSIGN_EMPHEAD_RESET, // Assigning of Emp as Head for selected group
  CREATE_GROUP, CREATE_GROUP_SUCCESS, CREATE_GROUP_ERROR, CREATE_GROUP_RESET, // Creation of dept/team/subteams
  DELETE_GROUP, DELETE_GROUP_SUCCESS, DELETE_GROUP_ERROR, DELETE_GROUP_RESET, // Deletion of dept/team/subteams
  RENAME_GROUP, RENAME_GROUP_SUCCESS, RENAME_GROUP_ERROR, RENAME_GROUP_RESET, // Renaming of dept/team/subteams
  DISABLE_EMP, DISABLE_EMP_SUCCESS, DISABLE_EMP_ERROR, DISABLE_EMP_RESET, // Disable employees
  VIEW_DETAILS, VIEW_DETAILS_SUCCESS, VIEW_DETAILS_ERROR,
  GET_TRANSFERLIST, GET_TRANSFERLIST_SUCCESS, GET_TRANSFERLIST_ERROR, GET_TRANSFERLIST_NORESET,
  TRANSFER,
  TRANSFER_SUCCESS,
  TRANSFER_ERROR,
  TRANSFER_RESET,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  groupList: {
    loading: false,
    error: false,
    data: false,
    isTeam: false,
    id: false,
  },
  rename: {
    loading: false,
    error: false,
    name: false,
    isTeam: false,
    success: false,
    id: false,
  },
  delete: {
    loading: false,
    error: false,
    id: false,
    isTeam: false,
    success: false,
  },
  create: {
    loading: false,
    error: false,
    name: false,
    success: false,
    isTeam: false,
    id: false,
  },
  assignTemplate: {
    loading: false,
    error: false,
    assignTo: false,
    id: false,
    templateID: false,
    name: false, // template name (calendar, shift, payroll, etc...)
    success: false,
  },
  unassignTemplate: {
    loading: false,
    error: false,
    id: false,
    isTeam: false,
    name: false, // template name (calendar, shift, payroll, etc...)
    success: false,
  },
  empList: {
    loading: false,
    error: false,
    data: false,
    pages: false,
    pageIndex: 1,
    search: false,
    id: false,
    isTeam: false,
    isEnrolled: false,
    isAll: false,
  },
  enrollEmp: {
    loading: false,
    error: false,
    success: false,
    isTeam: false,
    teamID: false,
    deptID: false,
    data: false,
  },
  unenrollEmp: {
    loading: false,
    error: false,
    success: false,
    isTeam: false,
    teamID: false,
    deptID: false,
    data: false,
  },
  assignHead: {
    loading: false,
    error: false,
    success: false,
    id: false,
    isTeam: false,
    empID: false,
  },
  disableEmp: {
    loading: false,
    error: false,
    empID: false,
    status: false,
    success: false,
  },
  templateList: {
    loading: false,
    error: false,
    data: false,
    pages: false,
    pageIndex: 1,
    search: false,
    name: false,
  },
  viewDetails: {
    loading: false,
    error: false,
    data: false,
    id: false,
    isTeam: false,
  },
  transfer: {
    loading: false,
    error: false,
    success: false,
    id: false,
    oldGroupID: false,
    newGroupID: false,
    oldIsTeam: false,
    newIsTeam: false,
  },
  transferList: {
    loading: false,
    error: false,
    data: false,
    pages: false,
    pageIndex: 1,
    search: false,
    isTeam: false,
    id: false,
  },
});

function workgroupReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_STATE:
      return initialState;
    case GET_ORG:
      return state
        .setIn(['groupList', 'loading'], true)
        .setIn(['groupList', 'error'], false)
        .setIn(['groupList', 'data'], false)
        .setIn(['groupList', 'isTeam'], action.isTeam)
        .setIn(['groupList', 'id'], action.id);
    case GET_ORG_SUCCESS:
      return state
        .setIn(['groupList', 'loading'], false)
        .setIn(['groupList', 'data'], action.data);
    case GET_ORG_ERRROR:
      return state
        .setIn(['groupList', 'loading'], false)
        .setIn(['groupList', 'data'], false)
        .setIn(['groupList', 'error'], action.error);
    case GET_EMP:
      return state
        .setIn(['empList', 'loading'], true)
        .setIn(['empList', 'error'], false)
        .setIn(['empList', 'data'], false)
        .setIn(['empList', 'pages'], false)
        .setIn(['empList', 'pageIndex'], action.page)
        .setIn(['empList', 'search'], action.search)
        .setIn(['empList', 'isTeam'], action.isTeam)
        .setIn(['empList', 'id'], action.id)
        .setIn(['empList', 'isEnrolled'], action.isEnrolled)
        .setIn(['empList', 'isAll'], action.isAll);
    case GET_EMP_SUCCESS:
      return state
        .setIn(['empList', 'loading'], false)
        .setIn(['empList', 'pages'], action.pages)
        .setIn(['empList', 'data'], action.data);
    case GET_EMP_ERROR:
      return state
        .setIn(['empList', 'loading'], false)
        .setIn(['empList', 'error'], action.error)
        .setIn(['empList', 'pages'], false)
        .setIn(['empList', 'data'], false);
    case GET_EMP_NORESETPAGE:
      return state
        .setIn(['empList', 'loading'], true)
        .setIn(['empList', 'error'], false)
        .setIn(['empList', 'data'], false)
        .setIn(['empList', 'pageIndex'], action.page)
        .setIn(['empList', 'search'], action.search)
        .setIn(['empList', 'isTeam'], action.isTeam)
        .setIn(['empList', 'id'], action.id)
        .setIn(['empList', 'isEnrolled'], action.isEnrolled)
        .setIn(['empList', 'isAll'], action.isAll);
    case ENROLL_EMP:
      return state
        .setIn(['enrollEmp', 'loading'], true)
        .setIn(['enrollEmp', 'error'], false)
        .setIn(['enrollEmp', 'success'], false)
        .setIn(['enrollEmp', 'data'], action.ids)
        .setIn(['enrollEmp', 'isTeam'], action.isTeam)
        .setIn(['enrollEmp', 'deptID'], action.deptID)
        .setIn(['enrollEmp', 'teamID'], action.teamID);
    case ENROLL_EMP_SUCCESS:
      return state
        .setIn(['enrollEmp', 'loading'], false)
        .setIn(['enrollEmp', 'success'], true)
        .setIn(['enrollEmp', 'data'], false)
        .setIn(['enrollEmp', 'isTeam'], false)
        .setIn(['enrollEmp', 'deptID'], false)
        .setIn(['enrollEmp', 'teamID'], false);
    case ENROLL_EMP_ERROR:
      return state
        .setIn(['enrollEmp', 'loading'], false)
        .setIn(['enrollEmp', 'success'], false)
        .setIn(['enrollEmp', 'error'], action.error)
        .setIn(['enrollEmp', 'data'], action.data)
        .setIn(['enrollEmp', 'isTeam'], false)
        .setIn(['enrollEmp', 'deptID'], false)
        .setIn(['enrollEmp', 'teamID'], false);
    case ENROLL_EMP_RESET:
      return state
        .setIn(['enrollEmp', 'success'], false)
        .setIn(['enrollEmp', 'data'], false)
        .setIn(['enrollEmp', 'error'], false);
    case UNENROLL_EMP:
      return state
        .setIn(['unenrollEmp', 'loading'], true)
        .setIn(['unenrollEmp', 'error'], false)
        .setIn(['unenrollEmp', 'success'], false)
        .setIn(['unenrollEmp', 'data'], action.ids)
        .setIn(['unenrollEmp', 'isTeam'], action.isTeam)
        .setIn(['unenrollEmp', 'deptID'], action.deptID)
        .setIn(['unenrollEmp', 'teamID'], action.teamID);
    case UNENROLL_EMP_SUCCESS:
      return state
        .setIn(['unenrollEmp', 'loading'], false)
        .setIn(['unenrollEmp', 'success'], true)
        .setIn(['unenrollEmp', 'data'], false)
        .setIn(['unenrollEmp', 'isTeam'], false)
        .setIn(['unenrollEmp', 'deptID'], false)
        .setIn(['unenrollEmp', 'teamID'], false);
    case UNENROLL_EMP_ERROR:
      return state
        .setIn(['unenrollEmp', 'loading'], false)
        .setIn(['unenrollEmp', 'success'], false)
        .setIn(['unenrollEmp', 'error'], action.error)
        .setIn(['unenrollEmp', 'data'], action.data)
        .setIn(['unenrollEmp', 'isTeam'], false)
        .setIn(['unenrollEmp', 'deptID'], false)
        .setIn(['unenrollEmp', 'teamID'], false);
    case UNENROLL_EMP_RESET:
      return state
        .setIn(['unenrollEmp', 'success'], false)
        .setIn(['unenrollEmp', 'error'], false);
    case ASSIGN_EMPHEAD:
      return state
        .setIn(['assignHead', 'loading'], true)
        .setIn(['assignHead', 'error'], false)
        .setIn(['assignHead', 'isTeam'], action.isTeam)
        .setIn(['assignHead', 'empID'], action.empID)
        .setIn(['assignHead', 'id'], action.groupID);
    case ASSIGN_EMPHEAD_SUCCESS:
      return state
        .setIn(['assignHead', 'loading'], false)
        .setIn(['assignHead', 'success'], true);
    case ASSIGN_EMPHEAD_ERROR:
      return state
        .setIn(['assignHead', 'loading'], true)
        .setIn(['assignHead', 'error'], action.error);
    case ASSIGN_EMPHEAD_RESET:
      return state
        .setIn(['assignHead', 'isTeam'], false)
        .setIn(['assignHead', 'success'], false)
        .setIn(['assignHead', 'error'], false);
    case DISABLE_EMP:
      return state
        .setIn(['disableEmp', 'loading'], true)
        .setIn(['disableEmp', 'error'], false)
        .setIn(['disableEmp', 'empID'], action.empID)
        .setIn(['disableEmp', 'status'], action.status);
    case DISABLE_EMP_SUCCESS:
      return state
        .setIn(['disableEmp', 'loading'], false)
        .setIn(['disableEmp', 'success'], true)
        .setIn(['disableEmp', 'empID'], false)
        .setIn(['disableEmp', 'status'], false);
    case DISABLE_EMP_ERROR:
      return state
        .setIn(['disableEmp', 'loading'], false)
        .setIn(['disableEmp', 'empID'], false)
        .setIn(['disableEmp', 'status'], false)
        .setIn(['disableEmp', 'error'], action.error);
    case DISABLE_EMP_RESET:
      return state
        .setIn(['disableEmp', 'loading'], false)
        .setIn(['disableEmp', 'error'], false)
        .setIn(['disableEmp', 'success'], false)
        .setIn(['disableEmp', 'empID'], false)
        .setIn(['disableEmp', 'status'], false);
    case GET_TEMPLATES:
      return state
        .setIn(['templateList', 'loading'], true)
        .setIn(['templateList', 'error'], false)
        .setIn(['templateList', 'data'], false)
        .setIn(['templateList', 'pages'], false)
        .setIn(['templateList', 'pageIndex'], action.page)
        .setIn(['templateList', 'search'], action.search)
        .setIn(['templateList', 'name'], action.tempName);
    case GET_TEMPLATES_SUCCESS:
      return state
        .setIn(['templateList', 'loading'], false)
        .setIn(['templateList', 'data'], action.data)
        .setIn(['templateList', 'pages'], action.pages);
    case GET_TEMPLATES_ERROR:
      return state
        .setIn(['templateList', 'loading'], false)
        .setIn(['templateList', 'tempName'], false)
        .setIn(['templateList', 'pages'], false)
        .setIn(['templateList', 'data'], false)
        .setIn(['templateList', 'error'], action.error);
    case GET_TEMPLATES_NORESETPAGE:
      return state
        .setIn(['templateList', 'loading'], true)
        .setIn(['templateList', 'error'], false)
        .setIn(['templateList', 'data'], false)
        .setIn(['templateList', 'pageIndex'], action.page)
        .setIn(['templateList', 'search'], action.search)
        .setIn(['templateList', 'name'], action.tempName);
    case ASSIGN_TEMPLATE:
      return state
        .setIn(['assignTemplate', 'loading'], true)
        .setIn(['assignTemplate', 'error'], false)
        .setIn(['assignTemplate', 'templateID'], action.templateID)
        .setIn(['assignTemplate', 'id'], action.assignToID)
        .setIn(['assignTemplate', 'assignTo'], action.assignTo)
        .setIn(['assignTemplate', 'name'], action.templateCat);
    case ASSIGN_TEMPLATE_SUCCESS:
      return state
        .setIn(['assignTemplate', 'loading'], false)
        .setIn(['assignTemplate', 'success'], true)
        .setIn(['assignTemplate', 'templateID'], false)
        .setIn(['assignTemplate', 'id'], false)
        .setIn(['assignTemplate', 'assignTo'], false)
        .setIn(['assignTemplate', 'name'], false);
    case ASSIGN_TEMPLATE_ERROR:
      return state
        .setIn(['assignTemplate', 'loading'], false)
        .setIn(['assignTemplate', 'success'], false)
        .setIn(['assignTemplate', 'templateID'], false)
        .setIn(['assignTemplate', 'id'], false)
        .setIn(['assignTemplate', 'assignTo'], false)
        .setIn(['assignTemplate', 'name'], false)
        .setIn(['assignTemplate', 'error'], action.error);
    case ASSIGN_TEMPLATE_CLEAR:
      return state
        .setIn(['assignTemplate', 'loading'], false)
        .setIn(['assignTemplate', 'success'], false)
        .setIn(['assignTemplate', 'templateID'], false)
        .setIn(['assignTemplate', 'id'], false)
        .setIn(['assignTemplate', 'assignTo'], false)
        .setIn(['assignTemplate', 'name'], false)
        .setIn(['assignTemplate', 'error'], false);
    case UNASSIGN_TEMPLATE:
      return state
        .setIn(['unassignTemplate', 'loading'], true)
        .setIn(['unassignTemplate', 'error'], false)
        .setIn(['unassignTemplate', 'success'], false)
        .setIn(['unassignTemplate', 'id'], action.id)
        .setIn(['unassignTemplate', 'isTeam'], action.isTeam)
        .setIn(['unassignTemplate', 'name'], action.name);
    case UNASSIGN_TEMPLATE_SUCCESS:
      return state
        .setIn(['unassignTemplate', 'loading'], false)
        .setIn(['unassignTemplate', 'success'], true)
        .setIn(['unassignTemplate', 'id'], false)
        .setIn(['unassignTemplate', 'isTeam'], false)
        .setIn(['unassignTemplate', 'name'], false);
    case UNASSIGN_TEMPLATE_ERROR:
      return state
        .setIn(['unassignTemplate', 'loading'], false)
        .setIn(['unassignTemplate', 'error'], action.error);
    case UNASSIGN_TEMPLATE_RESET:
      return state
        .setIn(['unassignTemplate', 'loading'], false)
        .setIn(['unassignTemplate', 'error'], false)
        .setIn(['unassignTemplate', 'success'], false)
        .setIn(['unassignTemplate', 'id'], false)
        .setIn(['unassignTemplate', 'isTeam'], false)
        .setIn(['unassignTemplate', 'name'], false);
    case VIEW_DETAILS:
      return state
        .setIn(['viewDetails', 'loading'], true)
        .setIn(['viewDetails', 'error'], false)
        .setIn(['viewDetails', 'data'], false)
        .setIn(['viewDetails', 'id'], action.id)
        .setIn(['viewDetails', 'isTeam'], action.isTeam);
    case VIEW_DETAILS_SUCCESS:
      return state
        .setIn(['viewDetails', 'loading'], false)
        .setIn(['viewDetails', 'data'], action.data)
        .setIn(['viewDetails', 'id'], false)
        .setIn(['viewDetails', 'isTeam'], false);
    case VIEW_DETAILS_ERROR:
      return state
        .setIn(['viewDetails', 'loading'], false)
        .setIn(['viewDetails', 'error'], action.error)
        .setIn(['viewDetails', 'id'], false)
        .setIn(['viewDetails', 'isTeam'], false);
    case CREATE_GROUP:
      return state
        .setIn(['create', 'loading'], true)
        .setIn(['create', 'error'], false)
        .setIn(['create', 'success'], false)
        .setIn(['create', 'id'], action.groupID)
        .setIn(['create', 'name'], action.name)
        .setIn(['create', 'isTeam'], action.isTeam);
    case CREATE_GROUP_SUCCESS:
      return state
        .setIn(['create', 'loading'], false)
        .setIn(['create', 'success'], true);
    case CREATE_GROUP_ERROR:
      return state
        .setIn(['create', 'loading'], false)
        .setIn(['create', 'error'], action.error);
    case CREATE_GROUP_RESET:
      return state
        .setIn(['create', 'loading'], false)
        .setIn(['create', 'error'], false)
        .setIn(['create', 'success'], false)
        .setIn(['create', 'id'], false)
        .setIn(['create', 'name'], false)
        .setIn(['create', 'isTeam'], false);
    case DELETE_GROUP:
      return state
        .setIn(['delete', 'loading'], true)
        .setIn(['delete', 'error'], false)
        .setIn(['delete', 'success'], false)
        .setIn(['delete', 'id'], action.id)
        .setIn(['delete', 'isTeam'], action.isTeam);
    case DELETE_GROUP_SUCCESS:
      return state
        .setIn(['delete', 'loading'], false)
        .setIn(['delete', 'success'], true)
        .setIn(['delete', 'id'], false)
        .setIn(['delete', 'isTeam'], false);
    case DELETE_GROUP_ERROR:
      return state
        .setIn(['delete', 'loading'], false)
        .setIn(['delete', 'error'], action.error);
    case DELETE_GROUP_RESET:
      return state
        .setIn(['delete', 'loading'], false)
        .setIn(['delete', 'success'], false)
        .setIn(['delete', 'error'], false);
    case RENAME_GROUP:
      return state
        .setIn(['rename', 'loading'], true)
        .setIn(['rename', 'error'], false)
        .setIn(['rename', 'name'], action.name)
        .setIn(['rename', 'id'], action.id)
        .setIn(['rename', 'isTeam'], action.isTeam);
    case RENAME_GROUP_SUCCESS:
      return state
        .setIn(['rename', 'loading'], false)
        .setIn(['rename', 'success'], true);
    case RENAME_GROUP_ERROR:
      return state
        .setIn(['rename', 'loading'], false)
        .setIn(['rename', 'error'], action.error);
    case RENAME_GROUP_RESET:
      return state
        .setIn(['rename', 'loading'], false)
        .setIn(['rename', 'error'], false)
        .setIn(['rename', 'success'], false)
        .setIn(['rename', 'id'], false)
        .setIn(['rename', 'isTeam'], false);
    case GET_TRANSFERLIST:
      return state
        .setIn(['transferList', 'loading'], true)
        .setIn(['transferList', 'error'], false)
        .setIn(['transferList', 'data'], false)
        .setIn(['transferList', 'pages'], false)
        .setIn(['transferList', 'id'], action.id)
        .setIn(['transferList', 'isTeam'], action.isTeam)
        .setIn(['transferList', 'pageIndex'], action.page)
        .setIn(['transferList', 'search'], action.search);
    case GET_TRANSFERLIST_SUCCESS:
      return state
        .setIn(['transferList', 'loading'], false)
        .setIn(['transferList', 'data'], action.data)
        .setIn(['transferList', 'pages'], action.pages);
    case GET_TRANSFERLIST_ERROR:
      return state
        .setIn(['transferList', 'loading'], false)
        .setIn(['transferList', 'error'], action.error)
        .setIn(['transferList', 'data'], false)
        .setIn(['transferList', 'pages'], false);
    case GET_TRANSFERLIST_NORESET:
      return state
        .setIn(['transferList', 'loading'], true)
        .setIn(['transferList', 'error'], false)
        .setIn(['transferList', 'data'], false)
        .setIn(['transferList', 'id'], action.id)
        .setIn(['transferList', 'isTeam'], action.isTeam)
        .setIn(['transferList', 'pageIndex'], action.page)
        .setIn(['transferList', 'search'], action.search);
    case TRANSFER:
      return state
        .setIn(['transfer', 'loading'], true)
        .setIn(['transfer', 'error'], false)
        .setIn(['transfer', 'id'], action.empID)
        .setIn(['transfer', 'oldGroupID'], action.oldGroupID)
        .setIn(['transfer', 'newGroupID'], action.newGroupID)
        .setIn(['transfer', 'oldIsTeam'], action.oldIsTeam)
        .setIn(['transfer', 'newIsTeam'], action.newIsTeam);
    case TRANSFER_SUCCESS:
      return state
        .setIn(['transfer', 'loading'], false)
        .setIn(['transfer', 'success'], true);
    case TRANSFER_ERROR:
      return state
        .setIn(['transfer', 'loading'], false)
        .setIn(['transfer', 'error'], action.error);
    case TRANSFER_RESET:
      return state
        .setIn(['transfer', 'loading'], false)
        .setIn(['transfer', 'success'], false)
        .setIn(['transfer', 'id'], false)
        .setIn(['transfer', 'oldGroupID'], false)
        .setIn(['transfer', 'newGroupID'], false)
        .setIn(['transfer', 'oldIsTeam'], false)
        .setIn(['transfer', 'newIsTeam'], false);
    default:
      return state;
  }
}

export default workgroupReducer;
