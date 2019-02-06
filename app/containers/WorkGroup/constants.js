/*
 * WorkGroup Page Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
// Clear state on unmount
export const CLEAR_STATE = 'hcmwebapp/WorkGroup/CLEAR_STATE';

// Retrieve group lists
export const GET_ORG = 'hcmwebapp/WorkGroup/GET_ORG';
export const GET_ORG_SUCCESS = 'hcmwebapp/WorkGroup/GET_ORG_SUCCESS';
export const GET_ORG_ERRROR = 'hcmwebapp/WorkGroup/GET_ORG_ERRROR';

// Retrieve Templates
export const GET_TEMPLATES = 'hcmwebapp/WorkGroup/GET_TEMPLATES';
export const GET_TEMPLATES_SUCCESS = 'hcmwebapp/WorkGroup/GET_TEMPLATES_SUCCESS';
export const GET_TEMPLATES_ERROR = 'hcmwebapp/WorkGroup/GET_TEMPLATES_ERROR';
export const GET_TEMPLATES_NORESETPAGE = 'hcmwebapp/WorkGroup/GET_TEMPLATES_NORESETPAGE';

// Assign Template
export const ASSIGN_TEMPLATE = 'hcmwebapp/WorkGroup/ASSIGN_TEMPLATE';
export const ASSIGN_TEMPLATE_SUCCESS = 'hcmwebapp/WorkGroup/ASSIGN_TEMPLATE_SUCCESS';
export const ASSIGN_TEMPLATE_ERROR = 'hcmwebapp/WorkGroup/ASSIGN_TEMPLATE_ERROR';
export const ASSIGN_TEMPLATE_CLEAR = 'hcmwebapp/WorkGroup/ASSIGN_TEMPLATE_CLEAR';

// Unassign Template
export const UNASSIGN_TEMPLATE = 'hcmwebapp/WorkGroup/UNASSIGN_TEMPLATE';
export const UNASSIGN_TEMPLATE_SUCCESS = 'hcmwebapp/WorkGroup/UNASSIGN_TEMPLATE_SUCCESS';
export const UNASSIGN_TEMPLATE_ERROR = 'hcmwebapp/WorkGroup/UNASSIGN_TEMPLATE_ERROR';
export const UNASSIGN_TEMPLATE_RESET = 'hcmwebapp/WorkGroup/UNASSIGN_TEMPLATE_RESET';

// View Template Details
export const VIEW_DETAILS = 'hcmwebapp/WorkGroup/VIEW_DETAILS';
export const VIEW_DETAILS_SUCCESS = 'hcmwebapp/WorkGroup/VIEW_DETAILS_SUCCESS';
export const VIEW_DETAILS_ERROR = 'hcmwebapp/WorkGroup/VIEW_DETAILS_ERROR';

// Retrieve employee list
export const GET_EMP = 'hcmwebapp/WorkGroup/GET_EMP';
export const GET_EMP_SUCCESS = 'hcmwebapp/WorkGroup/GET_EMP_SUCCESS';
export const GET_EMP_ERROR = 'hcmwebapp/WorkGroup/GET_EMP_ERROR';
export const GET_EMP_NORESETPAGE = 'hcmwebapp/WorkGroup/GET_EMP_NORESETPAGE'; // use this for pagination and search where we don't need to reset the pages redux state

// Enroll employees
export const ENROLL_EMP = 'hcmwebapp/WorkGroup/ENROLL_EMP';
export const ENROLL_EMP_SUCCESS = 'hcmwebapp/WorkGroup/ENROLL_EMP_SUCCESS';
export const ENROLL_EMP_ERROR = 'hcmwebapp/WorkGroup/ENROLL_EMP_ERROR';
export const ENROLL_EMP_RESET = 'hcmwebapp/WorkGroup/ENROLL_EMP_RESET';

// Unenroll employees
export const UNENROLL_EMP = 'hcmwebapp/WorkGroup/UNENROLL_EMP';
export const UNENROLL_EMP_SUCCESS = 'hcmwebapp/WorkGroup/UNENROLL_EMP_SUCCESS';
export const UNENROLL_EMP_ERROR = 'hcmwebapp/WorkGroup/UNENROLL_EMP_ERROR';
export const UNENROLL_EMP_RESET = 'hcmwebapp/WorkGroup/UNENROLL_EMP_RESET';

// Assign Employee as Head
export const ASSIGN_EMPHEAD = 'hcmwebapp/WorkGroup/ASSIGN_EMPHEAD';
export const ASSIGN_EMPHEAD_SUCCESS = 'hcmwebapp/WorkGroup/ASSIGN_EMPHEAD_SUCCESS';
export const ASSIGN_EMPHEAD_ERROR = 'hcmwebapp/WorkGroup/ASSIGN_EMPHEAD_ERROR';
export const ASSIGN_EMPHEAD_RESET = 'hcmwebapp/WorkGroup/ASSIGN_EMPHEAD_RESET';

// Create new group
export const CREATE_GROUP = 'hcmwebapp/WorkGroup/CREATE_GROUP';
export const CREATE_GROUP_SUCCESS = 'hcmwebapp/WorkGroup/CREATE_GROUP_SUCCESS';
export const CREATE_GROUP_ERROR = 'hcmwebapp/WorkGroup/CREATE_GROUP_ERROR';
export const CREATE_GROUP_RESET = 'hcmwebapp/WorkGroup/CREATE_GROUP_RESET';

// Delete group
export const DELETE_GROUP = 'hcmwebapp/WorkGroup/DELETE_GROUP';
export const DELETE_GROUP_SUCCESS = 'hcmwebapp/WorkGroup/DELETE_GROUP_SUCCESS';
export const DELETE_GROUP_ERROR = 'hcmwebapp/WorkGroup/DELETE_GROUP_ERROR';
export const DELETE_GROUP_RESET = 'hcmwebapp/WorkGroup/DELETE_GROUP_RESET';

// Rename group
export const RENAME_GROUP = 'hcmwebapp/WorkGroup/RENAME_GROUP';
export const RENAME_GROUP_SUCCESS = 'hcmwebapp/WorkGroup/RENAME_GROUP_SUCCESS';
export const RENAME_GROUP_ERROR = 'hcmwebapp/WorkGroup/RENAME_GROUP_ERROR';
export const RENAME_GROUP_RESET = 'hcmwebapp/WorkGroup/RENAME_GROUP_RESET';

// Disable Employee Account
export const DISABLE_EMP = 'hcmwebapp/WorkGroup/DISABLE_EMP';
export const DISABLE_EMP_SUCCESS = 'hcmwebapp/WorkGroup/DISABLE_EMP_SUCCESS';
export const DISABLE_EMP_ERROR = 'hcmwebapp/WorkGroup/DISABLE_EMP_ERROR';
export const DISABLE_EMP_RESET = 'hcmwebapp/WorkGroup/DISABLE_EMP_RESET';

// Transfer Retrieve Group List and Transfer Emp/Team
export const GET_TRANSFERLIST = 'hcmwebapp/WorkGroup/GET_TRANSFERLIST';
export const GET_TRANSFERLIST_SUCCESS = 'hcmwebapp/WorkGroup/GET_TRANSFERLIST_SUCCESS';
export const GET_TRANSFERLIST_ERROR = 'hcmwebapp/WorkGroup/GET_TRANSFERLIST_ERROR';
export const GET_TRANSFERLIST_NORESET = 'hcmwebapp/WorkGroup/GET_TRANSFERLIST_NORESET';

export const TRANSFER = 'hcmwebapp/WorkGroup/TRANSFER';
export const TRANSFER_SUCCESS = 'hcmwebapp/WorkGroup/TRANSFER_SUCCESS';
export const TRANSFER_ERROR = 'hcmwebapp/WorkGroup/TRANSFER_ERROR';
export const TRANSFER_RESET = 'hcmwebapp/WorkGroup/TRANSFER_RESET';
