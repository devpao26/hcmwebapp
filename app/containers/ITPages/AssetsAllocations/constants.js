/*
 * Page Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
// Clear state on unmount
export const CLEAR_STATE = 'hcmwebapp/AssetsAllocations/CLEAR_STATE';

// Get the Assets Listings
export const GET_ASSETSLIST = 'hcmwebapp/AssetsAllocations/GET_EMPLIST';
export const GET_ASSETSLIST_SUCCESS = 'hcmwebapp/AssetsAllocations/GET_ASSETSLIST_SUCCESS';
export const GET_ASSETSLIST_ERROR = 'hcmwebapp/AssetsAllocations/GET_ASSETSLIST_ERROR';
export const GET_ASSETSLIST_NORESET = 'hcmwebapp/AssetsAllocations/GET_ASSETSLIST_NORESET';

// Get the EMP List
export const GET_EMPLIST = 'hcmwebapp/AssetsAllocations/GET_EMPLIST';
export const GET_EMPLIST_SUCCESS = 'hcmwebapp/AssetsAllocations/GET_EMPLIST_SUCCESS';
export const GET_EMPLIST_ERROR = 'hcmwebapp/AssetsAllocations/GET_EMPLIST_ERROR';
export const GET_EMPLIST_NORESET = 'hcmwebapp/AssetsAllocations/GET_EMPLIST_NORESET';
