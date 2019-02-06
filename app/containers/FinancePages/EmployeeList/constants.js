/*
 * Employee Masterlist Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

// EMP Finance Masterlist Retrieval
export const EMP_LIST = 'hcmwebapp/FinancePages/EmployeeList/EMP_LIST';
export const EMP_SUCCESS = 'hcmwebapp/FinancePages/EmployeeList/EMP_SUCCESS';
export const EMP_FAILED = 'hcmwebapp/FinancePages/EmployeeList/EMP_FAILED';

// Time Deductions and Earnings
export const EMP_TIMEDDEDUCT = 'hcmwebapp/FinancePages/EmployeeList/EMP_TIMEDDEDUCT';
export const EMP_TIMEDDEDUCTSUCCESS = 'hcmwebapp/FinancePages/EmployeeList/EMP_TIMEDDEDUCTSUCCESS';
export const EMP_TIMEDDEDUCTERROR = 'hcmwebapp/FinancePages/EmployeeList/EMP_TIMEDDEDUCTERROR';

export const EMP_TIMEDEARN = 'hcmwebapp/FinancePages/EmployeeList/EMP_TIMEDEARN';
export const EMP_TIMEDEARNSUCCESS = 'hcmwebapp/FinancePages/EmployeeList/EMP_TIMEDEARNSUCCESS';
export const EMP_TIMEDEARNERROR = 'hcmwebapp/FinancePages/EmployeeList/EMP_TIMEDEARNERROR';

export const CLEAR_TIMEDSUCCESS = 'hcmwebapp/FinancePages/EmployeeList/CLEAR_TIMEDSUCCESS';
