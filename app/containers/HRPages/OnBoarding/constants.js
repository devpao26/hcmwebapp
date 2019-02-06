/*
 * OnBoarding Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
export const CLEAR_STATE = 'hcmwebapp/HRPages/OnBoarding/CLEAR_STATE';

// JO List Retrieval
export const LIST_JOS = 'hcmwebapp/HRPages/OnBoarding/LIST_JOS';
export const LIST_JOSFAILED = 'hcmwebapp/HRPages/OnBoarding/LIST_JOSFAILED';
export const LIST_JOSSUCCESS = 'hcmwebapp/HRPages/OnBoarding/LIST_JOSSUCCESS';

// JO Status Marks
export const MOVED_SUCCESS = 'hcmwebapp/HRPages/OnBoarding/MOVED_SUCCESS';
export const CHANGE_JOSTAT = 'hcmwebapp/HRPages/OnBoarding/CHANGE_JOSTAT';
export const WRITE_IDS = 'hcmwebapp/HRPages/OnBoarding/WRITE_IDS';
export const IS_NOTIF = 'hcmwebapp/HRPages/OnBoarding/IS_NOTIF';

// Search and Filter
export const SEARCH_FILTER = 'hcmwebapp/HRPages/PPERequirements/SEARCH_FILTER';
