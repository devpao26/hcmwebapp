/*
 * RTWO Form Page Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const CREATE_RTWO = 'hcmwebapp/FormRequests/ReturnToWorkOrderRequest/CREATE_RTWO';
export const CREATE_RTWO_SUCCESS = 'hcmwebapp/FormRequests/ReturnToWorkOrderRequest/CREATE_RTWO_SUCCESS';
export const CREATE_RTWO_ERROR = 'hcmwebapp/FormRequests/ReturnToWorkOrderRequest/CREATE_RTWO_ERROR';
export const CREATE_RTWO_RESET = 'hcmwebapp/FormRequests/ReturnToWorkOrderRequest/CREATE_RTWO_RESET';

export const RTWO_REFERRENCES = 'hcmwebapp/FormRequests/ReturnToWorkOrderRequest/RTWO_REFERRENCES';
export const SUCCESS_RTWOREFERRENCES = 'hcmwebapp/FormRequests/ReturnToWorkOrderRequest/SUCCESS_RTWOREFERRENCES';
export const ERROR_RTWOREFERRENCES = 'hcmwebapp/FormRequests/ReturnToWorkOrderRequest/ERROR_RTWOREFERRENCES';

export const EMPLOYEE_LISTS = 'hcmwebapp/FormRequests/ReturnToWorkOrderRequest/EMPLOYEE_LISTS';
export const EMPLOYEE_SUCCESS = 'hcmwebapp/FormRequests/ReturnToWorkOrderRequest/EMPLOYEE_SUCCESS';
export const EMPLOYEE_ERROR = 'hcmwebapp/FormRequests/ReturnToWorkOrderRequest/EMPLOYEE_ERROR';
export const EMPLOYEE_LISTS_NORESETPAGE = 'hcmwebapp/FormRequests/ReturnToWorkOrderRequest/EMPLOYEE_LISTS_NORESETPAGE';

