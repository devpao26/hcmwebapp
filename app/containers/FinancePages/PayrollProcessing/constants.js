/*
 * Finance Payroll Processing Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

/**
 * Payroll Dates Retrieval
 */
export const PAYROLLDATE_LIST = 'hcmwebapp/FinancePages/PayrollProcessing/PAYROLLDATE_LIST';
export const PAYROLLDATE_SUCCESS = 'hcmwebapp/FinancePages/PayrollProcessing/PAYROLLDATE_SUCCESS';
export const PAYROLLDATE_FAILED = 'hcmwebapp/FinancePages/PayrollProcessing/PAYROLLDATE_FAILED';

/**
 * Employee List Retrieval
 */
export const PREMP_LIST = 'hcmwebapp/FinancePages/PayrollProcessing/PREMP_LIST';
export const PREMP_SUCCESS = 'hcmwebapp/FinancePages/PayrollProcessing/PREMP_SUCCESS';
export const PREMP_FAILED = 'hcmwebapp/FinancePages/PayrollProcessing/PREMP_FAILED';

/**
 * Payroll Review Info Retrieval
 */
export const PRDATE_SELECTED = 'hcmwebapp/FinancePages/PayrollProcessing/PRDATE_SELECTED';
export const PREMP_SELECTED = 'hcmwebapp/FinancePages/PayrollProcessing/PREMP_SELECTED';
export const PRPAYDAY_INFO = 'hcmwebapp/FinancePages/PayrollProcessing/PRPAYDAY_INFO';
export const PRPAYDAY_SUCCESS = 'hcmwebapp/FinancePages/PayrollProcessing/PRPAYDAY_SUCCESS';
export const PRPAYDAY_FAILED = 'hcmwebapp/FinancePages/PayrollProcessing/PRPAYDAY_FAILED';

/**
 * Variables on State Info Retrieval
 */
// Variable Selected Month
export const PRPAY_SELECTED_MN = 'hcmwebapp/FinancePages/PayrollProcessing/PRPAY_SELECTED_MN';
// Variable Selected Year
export const PRPAY_SELECTED_YR = 'hcmwebapp/FinancePages/PayrollProcessing/PRPAY_SELECTED_YR';

/**
 * Payroll Review Report Retrieval
 */
export const PRREVIEW = 'hcmwebapp/FinancePages/PayrollProcessing/PRREVIEW';
export const PRREVIEW_SUCCESS = 'hcmwebapp/FinancePages/PayrollProcessing/PRREVIEW_SUCCESS';
export const PRREVIEW_FAILED = 'hcmwebapp/FinancePages/PayrollProcessing/PRREVIEW_FAILED';

/**
 * Generate Payslip Report for Employee
 */
export const GEN_PAYSLIP = 'hcmwebapp/FinancePages/PayrollProcessing/GEN_PAYSLIP';
export const GEN_PAYSLIPSUCCESS = 'hcmwebapp/FinancePages/PayrollProcessing/GEN_PAYSLIPSUCCESS';
export const GEN_PAYSLIPERROR = 'hcmwebapp/FinancePages/PayrollProcessing/GEN_PAYSLIPERROR';
export const RESET_PAYSLIP = 'hcmwebapp/FinancePages/PayrollProcess/RESET_PAYSLIP';

/**
 * Employee On Spot Deduct & Earnings
 */
export const EMP_ONSPOTDEDUCT = 'hcmwebapp/FinancePages/PayrollProcessing/EMP_ONSPOTDEDUCT';
export const EMP_ONSPOTDEDUCTSUCCESS = 'hcmwebapp/FinancePages/PayrollProcessing/EMP_ONSPOTDEDUCTSUCCESS';
export const EMP_ONSPOTDEDUCTERROR = 'hcmwebapp/FinancePages/PayrollProcessing/EMP_ONSPOTDEDUCTERROR';

export const EMP_ONSPOTEARNING = 'hcmwebapp/FinancePages/PayrollProcessing/EMP_ONSPOTEARNING';
export const EMP_ONSPOTEARNINGSUCCESS = 'hcmwebapp/FinancePages/PayrollProcessing/EMP_ONSPOTEARNINGSUCCESS';
export const EMP_ONSPOTEARNINGERROR = 'hcmwebapp/FinancePages/PayrollProcessing/EMP_ONSPOTEARNINGERROR';
