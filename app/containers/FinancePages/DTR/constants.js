/*
 * Finance DTR Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

// EMP Finance Masterlist Retrieval
export const DTREMP_LIST = 'hcmwebapp/FinancePages/DTR/EMP_LIST';
export const DTREMP_SUCCESS = 'hcmwebapp/FinancePages/DTR/EMP_SUCCESS';
export const DTREMP_FAILED = 'hcmwebapp/FinancePages/DTR/EMP_FAILED';

// Employee DTR Info Retrieval
export const DTR_EMP_INFO = 'hcmwebapp/FinancePages/DTR/DTR_EMP_INFO';
export const DTR_EMP_SELDATE = 'hcmwebapp/FinancePages/DTR/DTR_EMP_SELDATE';
export const DTR_SEL_EMPPROF = 'hcmwebapp/FinancePages/DTR/DTR_SEL_EMPPROF';
export const DTRINFO_SUCCESS = 'hcmwebapp/FinancePages/DTR/DTRINFO_SUCCESS';
export const DTRINFO_FAILED = 'hcmwebapp/FinancePages/DTR/DTRINFO_FAILED';

// EMP DTR Shift Summary Retrieval
export const DTREMP_SHIFTRECLIST = 'hcmwebapp/FinancePages/DTR/DTREMP_SHIFTRECLIST';
export const DTREMP_SHIFTREC_SUCCESS = 'hcmwebapp/FinancePages/DTR/DTREMP_SHIFTREC_SUCCESS';
export const DTREMP_SHIFTREC_FAILED = 'hcmwebapp/FinancePages/DTR/DTREMP_SHIFTREC_FAILED';

// EMP DTR Report Generation
export const DTR_REPORT = 'hcmwebapp/FinancePages/DTR/DTR_REPORT';
export const DTR_REPORT_SUCCESS = 'hcmwebapp/FinancePages/DTR/DTR_REPORT_SUCCESS';
export const DTR_REPORT_FAILED = 'hcmwebapp/FinancePages/DTR/DTR_REPORT_FAILED';
export const CLEAR_DTR_REPORT = 'hcmwebapp/FinancePages/DTR/CLEAR_DTR_REPORT';

// Manual DTR Override
export const MANUAL_DTR = 'hcmwebapp/FinancePages/DTR/MANUAL_DTR';
export const MANUAL_DTRSUCCESS = 'hcmwebapp/FinancePages/DTR/MANUAL_DTRSUCCESS';
export const MANUAL_DTRERROR = 'hcmwebapp/FinancePages/DTR/MANUAL_DTRERROR';
export const CLEAR_MANUAL_DTR = 'hcmwebapp/FinancePages/DTR/CLEAR_MANUAL_DTR';
