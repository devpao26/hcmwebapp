/*
 * LCF Requests Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const GET_LIST = 'hcmwebapp/FormsApproval/LCF/GET_LIST';
export const GET_LISTSUCCESS = 'hcmwebapp/FormsApproval/LCF/GET_LISTSUCCESS';
export const GET_LISTERROR = 'hcmwebapp/FormsApproval/LCF/GET_LISTERROR';

export const UPDATE_REQUEST = 'hcmwebapp/FormsApproval/LCF/UPDATE_REQUEST';
export const UPDATE_REQUESTSUCCESS = 'hcmwebapp/FormsApproval/LCF/UPDATE_REQUESTSUCCESS';
export const UPDATE_REQUESTERROR = 'hcmwebapp/FormsApproval/LCF/UPDATE_REQUESTERROR';
export const CLEAR_UPDATEREQUEST = 'hcmwebapp/FormsApproval/LCF/CLEAR_UPDATEREQUEST';

export const RESET_STATE = 'hcmwebapp/FormsApproval/LCF/RESET_STATE';
