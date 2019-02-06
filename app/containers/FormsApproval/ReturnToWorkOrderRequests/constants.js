/*
 * RTWO Requests Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const GET_LIST = 'hcmwebapp/FormsApproval/RTWO/GET_LIST';
export const GET_LISTSUCCESS = 'hcmwebapp/FormsApproval/RTWO/GET_LISTSUCCESS';
export const GET_LISTERROR = 'hcmwebapp/FormsApproval/RTWO/GET_LISTERROR';

export const UPDATE_REQUEST = 'hcmwebapp/FormsApproval/RTWO/UPDATE_REQUEST';
export const UPDATE_REQUESTSUCCESS = 'hcmwebapp/FormsApproval/RTWO/UPDATE_REQUESTSUCCESS';
export const UPDATE_REQUESTERROR = 'hcmwebapp/FormsApproval/RTWO/UPDATE_REQUESTERROR';
export const CLEAR_UPDATEREQUEST = 'hcmwebapp/FormsApproval/RTWO/CLEAR_UPDATEREQUEST';

export const RESET_STATE = 'hcmwebapp/FormsApproval/RTWO/RESET_STATE';
