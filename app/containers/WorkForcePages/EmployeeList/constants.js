/*
 * WF ADMIN (EMPLOYEE MASTER LIST) Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
export const CLEAR_STATE = 'hcmwebapp/WorkForcePage/EmployeeList/CLEAR_STATE';

export const GET_EMPLIST = 'hcmwebapp/WorkForcePage/EmployeeList/GET_EMPLIST';
export const GET_EMPLIST_SUCCESS = 'hcmwebapp/WorkForcePage/EmployeeList/GET_EMPLIST_SUCCESS';
export const GET_EMPLIST_ERROR = 'hcmwebapp/WorkForcePage/EmployeeList/GET_EMPLIST_ERROR';
export const GET_EMPLIST_NORESET = 'hcmwebapp/WorkForcePage/EmployeeList/GET_EMPLIST_NORESET';

export const ENROLL_EMP = 'hcmwebapp/WorkForcePage/EmployeeList/ENROLL_EMP';
export const ENROLL_EMP_SUCCESS = 'hcmwebapp/WorkForcePage/EmployeeList/ENROLL_EMP_SUCCESS';
export const ENROLL_EMP_ERROR = 'hcmwebapp/WorkForcePage/EmployeeList/ENROLL_EMP_ERROR';
export const ENROLL_EMP_RESET = 'hcmwebapp/WorkForcePage/EmployeeList/ENROLL_EMP_RESET';
