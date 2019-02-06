/*
 * Compenben Actions
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

/**
 * Get the Benefit Types
 * @return {object} Returns an object with a type of GET_BENEFITTYPES
 */
export function getBenefitTypes() {
  return {
    type: GET_BENEFITTYPES,
  };
}

/**
 * Get the Benefit types success
 * @param data      ObjectList of the retrieved data
 * @return {object} Returns an object with a type of GET_BENEFITTYPESSUCCESS
 */
export function getBenefitTypesSuccess(data) {
  return {
    type: GET_BENEFITTYPESSUCCESS,
    data,
  };
}

/**
 * Get the Benefit types error
 * @return {object} Returns an object with a type of GET_BENEFITTYPESERROR
 */
export function getBenefitTypesError(error) {
  return {
    type: GET_BENEFITTYPESERROR,
    error,
  };
}

/**
 * Get Template List
 * @param page      Page Index of to be requested
 * @param search    Value of string to be searched
 * @param sort      Sort template displays
 * @return {object} Returns a type object
 */
export function getTemplateList(page, search, sortBy) {
  return {
    type: GET_TEMPLATES,
    page,
    search,
    sortBy,
  };
}

/**
 * Get Template List Success
 * @param data      ObjectList of retrieved data
 * @param pages     PageDetails of retrieved data
 * @param id        Template ID of first object in retrieved data
 * @return {object} Returns a type object
 */
export function getTemplateListSuccess(data, pages, id) {
  return {
    type: GET_TEMPLATESSUCCESS,
    data,
    pages,
    id,
  };
}

/**
 * Get Template List Error
 * @param error     An error object of retrieved data
 * @return {object} Returns a type object
 */
export function getTemplateListError(error) {
  return {
    type: GET_TEMPLATESERROR,
    error,
  };
}

/**
 * Retrieve Enrolled Employees
 * @param id          Template ID
 * @param page        Page number to be displayed
 * @param search      Value to be search
 * @returns {object}  Returns a type object
 */
export function getEnrolledEmp(id, page, search) {
  return {
    type: GET_ENROLLEDEMP,
    id,
    page,
    search,
  };
}

/**
 * Retrieve Enrolled Employees and reset the PageDetails
 * @param id          Template ID
 * @param page        Page number to be displayed
 * @param search      Value to be search
 * @returns {object}  Returns a type object
 */
export function getEnrolledEmpReset(id, page, search, reset) {
  return {
    type: GET_ENROLLEDEMPRESET,
    id,
    page,
    search,
    reset,
  };
}

/**
 * Retrieve Enrolled Employees Success
 * @param data      ObjectList of retrieved data
 * @param pages     PageDetails of retrieved data
 * @return {object} Returns a type object
 */
export function getEnrolledEmpSuccess(data, pages) {
  return {
    type: GET_ENROLLEDEMPSUCCESS,
    data,
    pages,
  };
}

/**
 * Retrieve Enrolled Employees Error
 * @param error     Error Details of retrieved data
 * @return {object} Returnes a type object
 */
export function getEnrolledEmpError(error) {
  return {
    type: GET_ENROLLEDEMPERROR,
    error,
  };
}

/**
 * Retrieve Employee List
 * @param id {string}     The template id
 * @param page {number}   Page number to be displayed
 * @param search {string} Value to be search
 * @return {object}       Returns a type object
 */
export function getEmployeeList(id, page, search) {
  return {
    type: GET_EMPLIST,
    id,
    page,
    search,
  };
}

/**
 * Retrieve Employee List Success
 * @param data {array}    An ObjectList of retrieved data
 * @param pages {object}  The page details of the retrieved data
 * @return {object}       Returns a type object
 */
export function getEmployeeListSuccess(data, pages) {
  return {
    type: GET_EMPLISTSUCCESS,
    data,
    pages,
  };
}

/**
 * Retrieve Employee List Error
 * @param error {object}  Error details
 * @returns {object}      Returns a type object
 */
export function getEmployeeListError(error) {
  return {
    type: GET_EMPLISTERROR,
    error,
  };
}

/**
 * Clear the Employee List state
 * @return {object} Returns an object with a type of CLEAR_EMPLIST
 */
export function clearEmployeeList() {
  return {
    type: CLEAR_EMPLIST,
  };
}

/**
 * Assign Employee to Selected template
 * @param id    Employee ID
 * @return {object} Returns an object with a type of ADD_TOTEMPLATE
 */
export function assignEmpToTemplate(id) {
  return {
    type: ADD_TOTEMPLATE,
    id,
  };
}

/**
 * Assign Employee to Selected Template success
 * @return {object} Returns an object with a type of ADD_TOTEMPLATESUCCESS
 */
export function assignEmpToTemplateSuccess() {
  return {
    type: ADD_TOTEMPLATESUCCESS,
  };
}

/**
 * Assign Employee to Selected Template error
 * @param error     Error details
 * @return {object} Returns an object with a type of ADD_TOTEMPLATESUCCESS
 */
export function assignEmpToTemplateError(error) {
  return {
    type: ADD_TOTEMPLATEERROR,
    error,
  };
}

/**
 * Clear Assign Employee state
 * @return {object} Returns an object with a type of CLEAR_ADDTO
 */
export function clearAssignEmpToTemplate() {
  return {
    type: CLEAR_ADDTO,
  };
}

/**
 * Unassign Employee to Selected Template
 * @param id        Employee ID
 * @return {object} Returns a type object
 */
export function unAssignToTemplate(id) {
  return {
    type: EMP_UNASSIGN,
    id,
  };
}

/**
 * Unassign Employee to Selected Template Success
 * @return {object} Returns a type object
 */
export function unAssignToTemplateSuccess() {
  return {
    type: EMP_UNASSIGNSUCCESS,
  };
}

/**
 * Unassign Employee to Selected Template Error
 * @param error     Error Details
 * @return {object} Returns a type object
 */
export function unAssignToTemplateError(error) {
  return {
    type: EMP_UNASSIGNERROR,
    error,
  };
}

/**
 * Clear Unassign Data
 * @return {object} Returns a type object
 */
export function clearUnassignData() {
  return {
    type: CLEAR_UNASSIGN,
  };
}

/**
 * Create new template
 * @param data      An object data of the template we are creating
 * @param isNew     A boolean to tell if we are editing or creating a new template
 * @return {object} Returns an object with a type of CREATE_NEWTEMP
 */
export function createNewTemplate(data, isNew) {
  return {
    type: CREATE_NEWTEMP,
    data,
    isNew,
  };
}

/**
 * Create new template success
 * @return {object} Returns an object with a type of CREATE_NEWTEMPSUCCESS
 */
export function createNewTemplateSuccess() {
  return {
    type: CREATE_NEWTEMPSUCCESS,
  };
}

/**
 * Create new template error
 * @param error     An object with the error details
 * @return {object} Returns an object with a type of CREATE_NEWTEMPERROR
 */
export function createNewTemplateError(error) {
  return {
    type: CREATE_NEWTEMPERROR,
    error,
  };
}

/**
 * Delete Template
 * @returns {object} Returns an object with a type of DELETE_TEMPLATE
 */
export function deleteTemplate() {
  return {
    type: DELETE_TEMPLATE,
  };
}

/**
 * Delete Template success
 * @return {object} Returns an object with a type of DELETE_TEMPLATESUCCESS
 */
export function deleteTemplateSuccess() {
  return {
    type: DELETE_TEMPLATESUCCESS,
  };
}

/**
 * Delete Template error
 * @param error     An object of the error detail
 * @return {object} Returns an object with a type of DELETE_TEMPLATEERROR
 */
export function deleteTemplateError(error) {
  return {
    type: DELETE_TEMPLATEERROR,
    error,
  };
}
