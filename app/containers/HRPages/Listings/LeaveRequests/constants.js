/*
 * Forms Approval Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const GET_LEAVEREQLIST = 'hcmwebapp/FormsApproval/LeaveRequest/GET_LEAVEREQLIST';
export const GET_LEAVEREQLISTSUCCESS = 'hcmwebapp/FormsApproval/LeaveRequest/GET_LEAVEREQLISTSUCCESS';
export const GET_LEAVEREQLISTERROR = 'hcmwebapp/FormsApproval/LeaveRequest/GET_LEAVEREQLISTERROR';

export const RESET_STATE = 'hcmwebapp/FormsApproval/LeaveRequest/RESET_STATE';
