/*
 * General Admin Access and Permissions Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
// Clear state on unmount
export const CLEAR_STATE = 'hcmwebapp/AccessPermissions/CLEAR_STATE';

// Get the Main Modules
export const GET_MODULES = 'hcmwebapp/AccessPermissions/GET_MODULES';
export const GET_MODULES_SUCCESS = 'hcmwebapp/AccessPermissions/GET_MODULES_SUCCESS';
export const GET_MODULES_ERROR = 'hcmwebapp/AccessPermissions/GET_MODULES_ERROR';

// Get the Sub Modules
export const GET_SUBMODULES = 'hcmwebapp/AccessPermissions/GET_SUBMODULES';
export const GET_SUBMODULES_SUCCESS = 'hcmwebapp/AccessPermissions/GET_SUBMODULES_SUCCESS';
export const GET_SUBMODULES_ERROR = 'hcmwebapp/AccessPermissions/GET_SUBMODULES_ERROR';

// Get the EMP List
export const GET_EMPLIST = 'hcmwebapp/AccessPermissions/GET_EMPLIST';
export const GET_EMPLIST_SUCCESS = 'hcmwebapp/AccessPermissions/GET_EMPLIST_SUCCESS';
export const GET_EMPLIST_ERROR = 'hcmwebapp/AccessPermissions/GET_EMPLIST_ERROR';
export const GET_EMPLIST_NORESET = 'hcmwebapp/AccessPermissions/GET_EMPLIST_NORESET';

// Assign access to Employee
export const ASSIGN_ACCESS = 'hcmwebapp/AccessPermissions/ASSIGN_ACCESS';
export const ASSIGN_ACCESS_SUCCESS = 'hcmwebapp/AccessPermissions/ASSIGN_ACCESS_SUCCESS';
export const ASSIGN_ACCESS_ERROR = 'hcmwebapp/AccessPermissions/ASSIGN_ACCESS_ERROR';
export const ASSIGN_ACCESS_RESET = 'hcmwebapp/AccessPermissions/ASSIGN_ACCESS_RESET';

// Get the Permission Reference and Time Constraints
export const GET_REFS = 'hcmwebapp/AccessPermissions/GET_REFS';
export const GET_REFS_SUCCESS = 'hcmwebapp/AccessPermissions/GET_REFS_SUCCESS';
export const GET_REFS_ERROR = 'hcmwebapp/AccessPermissions/GET_REFS_ERROR';

// Remove the Template from Employee if there is no Sub Module left in the employees template
export const UNASSIGN_TEMPLATE = 'hcmwebapp/AccessPermissions/UNASSIGN_TEMPLATE';
export const UNASSIGN_TEMPLATE_SUCCESS = 'hcmwebapp/AccessPermissions/UNASSIGN_TEMPLATE_SUCCESS';
export const UNASSIGN_TEMPLATE_ERROR = 'hcmwebapp/AccessPermissions/UNASSIGN_TEMPLATE_ERROR';
export const UNASSIGN_TEMPLATE_RESET = 'hcmwebapp/AccessPermissions/UNASSIGN_TEMPLATE_RESET';
