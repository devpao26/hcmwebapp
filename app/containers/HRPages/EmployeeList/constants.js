/*
 * Employee Masterlist Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const CLEAR_STATE = 'hcmwebapp/HRPages/EmployeeList/CLEAR_STATE';

// EMP Masterlist Retrieval
export const GET_EMPLIST = 'hcmwebapp/HRPages/EmployeeList/GET_EMPLIST';
export const GET_EMPLISTSUCCESS = 'hcmwebapp/HRPages/EmployeeList/GET_EMPLISTSUCCESS';
export const GET_EMPLISTFAILED = 'hcmwebapp/HRPages/EmployeeList/GET_EMPLISTFAILED';
export const GET_EMPSEARCH = 'hcmwebapp/HRPages/EmployeeList/GET_EMPSEARCH';

// Leave Credits
export const SET_LEAVES = 'hcmwebapp/HRPages/EmployeeList/SET_LEAVES';
export const SET_LEAVESSUCCESS = 'hcmwebapp/HRPages/EmployeeList/SET_LEAVESSUCCESS';
export const SET_LEAVESERROR = 'hcmwebapp/HRPages/EmployeeList/SET_LEAVESERROR';
export const CLEAR_LEAVESDATA = 'hcmwebapp/HRPages/EmployeeList/CLEAR_LEAVESDATA';
