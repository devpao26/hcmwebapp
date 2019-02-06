/*
 * SHIFT Form Page Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
// Create Shift Request
export const CREATE_SHIFT = 'hcmwebapp/FormRequests/ShiftScheduleFormRequest/CREATE_SHIFT';
export const CREATE_SHIFT_SUCCESS = 'hcmwebapp/FormRequests/ShiftScheduleFormRequest/CREATE_SHIFT_SUCCESS';
export const CREATE_SHIFT_ERROR = 'hcmwebapp/FormRequests/ShiftScheduleFormRequest/CREATE_SHIFT_ERROR';
export const CREATE_SHIFT_RESET = 'hcmwebapp/FormRequests/ShiftScheduleFormRequest/CREATE_SHIFT_RESET';
// Show Employee Listings
export const EMPLOYEE_LISTS = 'hcmwebapp/FormRequests/ShiftScheduleFormRequest/EMPLOYEE_LISTS';
export const EMPLOYEE_SUCCESS = 'hcmwebapp/FormRequests/ShiftScheduleFormRequest/EMPLOYEE_SUCCESS';
export const EMPLOYEE_ERROR = 'hcmwebapp/FormRequests/ShiftScheduleFormRequest/EMPLOYEE_ERROR';
export const EMPLOYEE_LISTS_NORESETPAGE = 'hcmwebapp/FormRequests/ShiftScheduleFormRequest/EMPLOYEE_LISTS_NORESETPAGE';
// Show Shift Listings
export const SHIFT_LISTS = 'hcmwebapp/FormRequests/ShiftScheduleFormRequest/SHIFT_LISTS';
export const SHIFT_SUCCESS = 'hcmwebapp/FormRequests/ShiftScheduleFormRequest/SHIFT_SUCCESS';
export const SHIFT_ERROR = 'hcmwebapp/FormRequests/ShiftScheduleFormRequest/SHIFT_ERROR';
export const SHIFT_LISTS_NORESETPAGE = 'hcmwebapp/FormRequests/ShiftScheduleFormRequest/SHIFT_LISTS_NORESETPAGE';

