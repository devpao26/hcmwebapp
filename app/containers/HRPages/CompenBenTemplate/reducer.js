/*
 * Compensation and Benefit Reducer
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
  GET_BENEFITTYPES,
  GET_BENEFITTYPESSUCCESS,
  GET_BENEFITTYPESERROR,
  GET_TEMPLATES,
  GET_TEMPLATESSUCCESS,
  GET_TEMPLATESERROR,
  GET_ENROLLEDEMP,
  GET_ENROLLEDEMPRESET,
  GET_ENROLLEDEMPSUCCESS,
  GET_ENROLLEDEMPERROR,
  GET_EMPLIST,
  GET_EMPLISTSUCCESS,
  GET_EMPLISTERROR,
  CLEAR_EMPLIST,
  ADD_TOTEMPLATE,
  ADD_TOTEMPLATESUCCESS,
  ADD_TOTEMPLATEERROR,
  CLEAR_ADDTO,
  EMP_UNASSIGN,
  EMP_UNASSIGNSUCCESS,
  EMP_UNASSIGNERROR,
  CLEAR_UNASSIGN,
  CREATE_NEWTEMP,
  CREATE_NEWTEMPSUCCESS,
  CREATE_NEWTEMPERROR,
  DELETE_TEMPLATE,
  DELETE_TEMPLATESUCCESS,
  DELETE_TEMPLATEERROR,
} from './constants';

const initialSate = fromJS({
  compenBen: {
    templateID: false,
    templateList: {
      loading: false,
      error: false,
      data: false,
      pages: false,
      pageIndex: 1,
      search: false,
      sortBy: false,
    },
    enrolledList: {
      loading: false,
      error: false,
      data: false,
      pages: false,
      pageIndex: 1,
      search: false,
    },
    employeeList: {
      loading: false,
      error: false,
      data: false,
      pages: false,
      pageIndex: false,
      search: false,
    },
    addToTemplate: {
      loading: false,
      error: false,
      data: false,
      empID: false,
    },
    unAssignList: {
      loading: false,
      error: false,
      data: false,
      empID: false,
    },
    editNewTemplate: {
      loading: false,
      error: false,
      data: false,
      templateData: false,
      isNew: false,
    },
    benefitTypes: {
      loading: false,
      error: false,
      data: false,
    },
    deleteTemplate: {
      loading: false,
      error: false,
      data: false,
    },
  },
});

function compenBenReducer(state = initialSate, action) {
  switch (action.type) {
    case GET_BENEFITTYPES:
      return state
        .setIn(['compenBen', 'benefitTypes', 'loading'], true)
        .setIn(['compenBen', 'benefitTypes', 'error'], false)
        .setIn(['compenBen', 'benefitTypes', 'data'], false);
    case GET_BENEFITTYPESSUCCESS:
      return state
        .setIn(['compenBen', 'benefitTypes', 'loading'], false)
        .setIn(['compenBen', 'benefitTypes', 'data'], action.data);
    case GET_BENEFITTYPESERROR:
      return state
        .setIn(['compenBen', 'benefitTypes', 'loading'], false)
        .setIn(['compenBen', 'benefitTypes', 'error'], action.error);
    case GET_TEMPLATES:
      return state
        .setIn(['compenBen', 'templateList', 'loading'], true)
        .setIn(['compenBen', 'templateList', 'error'], false)
        .setIn(['compenBen', 'templateList', 'data'], false)
        .setIn(['compenBen', 'templateList', 'pageIndex'], action.page)
        .setIn(['compenBen', 'templateList', 'search'], action.search)
        .setIn(['compenBen', 'templateList', 'sortBy'], action.sortBy)
        .setIn(['compenBen', 'enrolledList', 'pages'], false)
        .setIn(['compenBen', 'templateID'], false)
        // Reset the create/edit of template state
        .setIn(['compenBen', 'editNewTemplate', 'loading'], false)
        .setIn(['compenBen', 'editNewTemplate', 'error'], false)
        .setIn(['compenBen', 'editNewTemplate', 'data'], false)
        .setIn(['compenBen', 'editNewTemplate', 'templateData'], false)
        // Reset the delete template state
        .setIn(['compenBen', 'deleteTemplate', 'loading'], false)
        .setIn(['compenBen', 'deleteTemplate', 'error'], false)
        .setIn(['compenBen', 'deleteTemplate', 'data'], false);
    case GET_TEMPLATESSUCCESS:
      return state
        .setIn(['compenBen', 'templateList', 'loading'], false)
        .setIn(['compenBen', 'templateList', 'data'], action.data)
        .setIn(['compenBen', 'templateList', 'pages'], action.pages)
        .setIn(['compenBen', 'templateID'], action.id);
    case GET_TEMPLATESERROR:
      return state
        .setIn(['compenBen', 'templateList', 'loading'], false)
        .setIn(['compenBen', 'templateList', 'error'], action.error);
    case GET_ENROLLEDEMP:
      return state
        .setIn(['compenBen', 'enrolledList', 'loading'], true)
        .setIn(['compenBen', 'enrolledList', 'error'], false)
        .setIn(['compenBen', 'enrolledList', 'data'], false)
        .setIn(['compenBen', 'enrolledList', 'pageIndex'], action.page)
        .setIn(['compenBen', 'enrolledList', 'search'], action.search)
        .setIn(['compenBen', 'templateID'], action.id);
    case GET_ENROLLEDEMPRESET:
      return state
        .setIn(['compenBen', 'enrolledList', 'loading'], true)
        .setIn(['compenBen', 'enrolledList', 'error'], false)
        .setIn(['compenBen', 'enrolledList', 'data'], false)
        .setIn(['compenBen', 'enrolledList', 'pages'], false)
        .setIn(['compenBen', 'enrolledList', 'pageIndex'], action.page)
        .setIn(['compenBen', 'enrolledList', 'search'], action.search)
        .setIn(['compenBen', 'templateID'], action.id);
    case GET_ENROLLEDEMPSUCCESS:
      return state
        .setIn(['compenBen', 'enrolledList', 'loading'], false)
        .setIn(['compenBen', 'enrolledList', 'data'], action.data)
        .setIn(['compenBen', 'enrolledList', 'pages'], action.pages);
    case GET_ENROLLEDEMPERROR:
      return state
        .setIn(['compenBen', 'enrolledList', 'loading'], false)
        .setIn(['compenBen', 'enrolledList', 'pages'], false)
        .setIn(['compenBen', 'enrolledList', 'data'], false)
        .setIn(['compenBen', 'enrolledList', 'error'], action.error);
    case GET_EMPLIST:
      return state
        .setIn(['compenBen', 'employeeList', 'loading'], true)
        .setIn(['compenBen', 'employeeList', 'error'], false)
        .setIn(['compenBen', 'employeeList', 'data'], false)
        .setIn(['compenBen', 'employeeList', 'search'], action.search)
        .setIn(['compenBen', 'employeeList', 'pageIndex'], action.page)
        .setIn(['compenBen', 'templateID'], action.id);
    case GET_EMPLISTSUCCESS:
      return state
        .setIn(['compenBen', 'employeeList', 'loading'], false)
        .setIn(['compenBen', 'employeeList', 'data'], action.data)
        .setIn(['compenBen', 'employeeList', 'pages'], action.pages);
    case GET_EMPLISTERROR:
      return state
        .setIn(['compenBen', 'employeeList', 'loading'], false)
        .setIn(['compenBen', 'employeeList', 'pages'], false)
        .setIn(['compenBen', 'employeeList', 'error'], action.error);
    case CLEAR_EMPLIST:
      return state
        .setIn(['compenBen', 'employeeList', 'loading'], false)
        .setIn(['compenBen', 'employeeList', 'error'], false)
        .setIn(['compenBen', 'employeeList', 'data'], false)
        .setIn(['compenBen', 'employeeList', 'search'], false)
        .setIn(['compenBen', 'employeeList', 'pageIndex'], 1)
        .setIn(['compenBen', 'employeeList', 'pages'], false);
    case ADD_TOTEMPLATE:
      return state
        .setIn(['compenBen', 'addToTemplate', 'loading'], true)
        .setIn(['compenBen', 'addToTemplate', 'error'], false)
        .setIn(['compenBen', 'addToTemplate', 'data'], false)
        .setIn(['compenBen', 'addToTemplate', 'empID'], action.id);
    case ADD_TOTEMPLATESUCCESS:
      return state
        .setIn(['compenBen', 'addToTemplate', 'loading'], false)
        .setIn(['compenBen', 'addToTemplate', 'data'], true)
        .setIn(['compenBen', 'addToTemplate', 'empID'], false);
    case ADD_TOTEMPLATEERROR:
      return state
        .setIn(['compenBen', 'addToTemplate', 'loading'], false)
        .setIn(['compenBen', 'addToTemplate', 'data'], false)
        .setIn(['compenBen', 'addToTemplate', 'error'], action.error);
    case CLEAR_ADDTO:
      return state
        .setIn(['compenBen', 'addToTemplate', 'loading'], false)
        .setIn(['compenBen', 'addToTemplate', 'error'], false)
        .setIn(['compenBen', 'addToTemplate', 'data'], false)
        .setIn(['compenBen', 'addToTemplate', 'empID'], false);
    case EMP_UNASSIGN:
      return state
        .setIn(['compenBen', 'unAssignList', 'loading'], true)
        .setIn(['compenBen', 'unAssignList', 'error'], false)
        .setIn(['compenBen', 'unAssignList', 'data'], false)
        .setIn(['compenBen', 'unAssignList', 'empID'], action.id);
    case EMP_UNASSIGNSUCCESS:
      return state
        .setIn(['compenBen', 'unAssignList', 'loading'], false)
        .setIn(['compenBen', 'unAssignList', 'data'], true)
        .setIn(['compenBen', 'unAssignList', 'empID'], false);
    case EMP_UNASSIGNERROR:
      return state
        .setIn(['compenBen', 'unAssignList', 'loading'], false)
        .setIn(['compenBen', 'unAssignList', 'error'], action.error);
    case CLEAR_UNASSIGN:
      return state
        .setIn(['compenBen', 'unAssignList', 'loading'], false)
        .setIn(['compenBen', 'unAssignList', 'error'], false)
        .setIn(['compenBen', 'unAssignList', 'data'], false)
        .setIn(['compenBen', 'unAssignList', 'empID'], false);
    case CREATE_NEWTEMP:
      return state
        .setIn(['compenBen', 'editNewTemplate', 'loading'], true)
        .setIn(['compenBen', 'editNewTemplate', 'error'], false)
        .setIn(['compenBen', 'editNewTemplate', 'data'], false)
        .setIn(['compenBen', 'editNewTemplate', 'templateData'], action.data)
        .setIn(['compenBen', 'editNewTemplate', 'isNew'], action.isNew);
    case CREATE_NEWTEMPSUCCESS:
      return state
        .setIn(['compenBen', 'editNewTemplate', 'loading'], false)
        .setIn(['compenBen', 'editNewTemplate', 'data'], true)
        .setIn(['compenBen', 'editNewTemplate', 'templateData'], false);
    case CREATE_NEWTEMPERROR:
      return state
        .setIn(['compenBen', 'editNewTemplate', 'loading'], false)
        .setIn(['compenBen', 'editNewTemplate', 'error'], action.error)
        .setIn(['compenBen', 'editNewTemplate', 'templateData'], false);
    case DELETE_TEMPLATE:
      return state
        .setIn(['compenBen', 'deleteTemplate', 'loading'], true)
        .setIn(['compenBen', 'deleteTemplate', 'error'], false)
        .setIn(['compenBen', 'deleteTemplate', 'data'], false);
    case DELETE_TEMPLATESUCCESS:
      return state
        .setIn(['compenBen', 'deleteTemplate', 'loading'], false)
        .setIn(['compenBen', 'deleteTemplate', 'data'], true);
    case DELETE_TEMPLATEERROR:
      return state
        .setIn(['compenBen', 'deleteTemplate', 'loading'], false)
        .setIn(['compenBen', 'deleteTemplate', 'error'], action.error)
        .setIn(['compenBen', 'deleteTemplate', 'data'], false);
    default:
      return state;
  }
}

export default compenBenReducer;
