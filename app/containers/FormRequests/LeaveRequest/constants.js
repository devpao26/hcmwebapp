/*
 * Leave Request Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const GET_DATAS = 'hcmwebapp/Forms/LeaveRequest/GET_DATAS';

export const GET_LEAVEREQLIST = 'hcmwebapp/Forms/LeaveRequest/GET_LEAVEREQLIST';
export const GET_LEAVEREQLISTSUCCESS = 'hcmwebapp/Forms/LeaveRequest/GET_LEAVEREQLISTSUCCESS';
export const GET_LEAVEREQLISTERROR = 'hcmwebapp/Forms/LeaveRequest/GET_LEAVEREQLISTERROR';

export const GET_FORMLOAD = 'hcmwebapp/Forms/LeaveRequest/GET_FORMLOAD';
export const GET_FORMLOADSUCCESS = 'hcmwebapp/Forms/LeaveRequest/GET_FORMLOADSUCCESS';
export const GET_FORMLOADERROR = 'hcmwebapp/Forms/LeaveRequest/GET_FORMLOADERROR';

export const CREATE_REQUEST = 'hcmwebapp/Forms/LeaveRequest/CREATE_REQUEST';
export const CREATE_REQUESTSUCCESS = 'hcmwebapp/Forms/LeaveRequest/CREATE_REQUESTSUCCESS';
export const CREATE_REQUESTERROR = 'hcmwebapp/Forms/LeaveRequest/CREATE_REQUESTERROR';
export const CLEAR_REQUEST = 'hcmwebapp/Forms/LeaveRequest/CLEAR_REQUEST';

export const RESET_STATE = 'hcmwebapp/Forms/LeaveRequest/RESET_STATE';
