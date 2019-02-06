/*
 * Payroll Cutoff Template Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
export const RESET_STATE = 'hcmwebapp/FinancePages/PayrollCutoff/RESET_STATE';

export const Template = Object.freeze({
  RETRIEVE: 'hcmwebapp/FinancePages/PayrollCutoff/TEMPLATE_RETRIEVE',
  SUCCESS: 'hcmwebapp/FinancePages/PayrollCutoff/TEMPLATE_SUCCESS',
  ERROR: 'hcmwebapp/FinancePages/PayrollCutoff/TEMPLATE_ERROR',
  PAGING: 'hcmwebapp/FinancePages/PayrollCutoff/TEMPLATE_PAGING',
});

export const Enrolled = Object.freeze({
  RETRIEVE: 'hcmwebapp/FinancePages/PayrollCutoff/ENROLLED_RETRIEVE',
  SUCCESS: 'hcmwebapp/FinancePages/PayrollCutoff/ENROLLED_SUCCESS',
  ERROR: 'hcmwebapp/FinancePages/PayrollCutoff/ENROLLED_ERROR',
  PAGING: 'hcmwebapp/FinancePages/PayrollCutoff/ENROLLED_PAGING',
});

export const AddToList = Object.freeze({
  RETRIEVE: 'hcmwebapp/FinancePages/PayrollCutoff/ADDTO_RETRIEVE',
  SUCCESS: 'hcmwebapp/FinancePages/PayrollCutoff/ADDTO_SUCCESS',
  ERROR: 'hcmwebapp/FinancePages/PayrollCutoff/ADDTO_ERROR',
  PAGING: 'hcmwebapp/FinancePages/PayrollCutoff/ADDTO_PAGING',
});

export const Assign = Object.freeze({
  SUBMIT: 'hcmwebapp/FinancePages/PayrollCutoff/ASSIGN_SUBMIT',
  SUCCESS: 'hcmwebapp/FinancePages/PayrollCutoff/ASSIGN_SUCCESS',
  ERROR: 'hcmwebapp/FinancePages/PayrollCutoff/ASSIGN_ERROR',
  RESET: 'hcmwebapp/FinancePages/PayrollCutoff/ASSIGN_RESET',
});

export const Unassign = Object.freeze({
  SUBMIT: 'hcmwebapp/FinancePages/PayrollCutoff/UNASSIGN_SUBMIT',
  SUCCESS: 'hcmwebapp/FinancePages/PayrollCutoff/UNASSIGN_SUCCESS',
  ERROR: 'hcmwebapp/FinancePages/PayrollCutoff/UNASSIGN_ERROR',
  RESET: 'hcmwebapp/FinancePages/PayrollCutoff/UNASSIGN_RESET',
});

export const Update = Object.freeze({
  SUBMIT: 'hcmwebapp/FinancePages/PayrollCutoff/UPDATE_SUBMIT',
  SUCCESS: 'hcmwebapp/FinancePages/PayrollCutoff/UPDATE_SUCCESS',
  ERROR: 'hcmwebapp/FinancePages/PayrollCutoff/UPDATE_ERROR',
  RESET: 'hcmwebapp/FinancePages/PayrollCutoff/UPDATE_RESET',
});

export const Save = Object.freeze({
  SUBMIT: 'hcmwebapp/FinancePages/PayrollCutoff/SAVE_SUBMIT',
  SUCCESS: 'hcmwebapp/FinancePages/PayrollCutoff/SAVE_SUCCESS',
  ERROR: 'hcmwebapp/FinancePages/PayrollCutoff/SAVE_ERROR',
  RESET: 'hcmwebapp/FinancePages/PayrollCutoff/SAVE_RESET',
});

export const Delete = Object.freeze({
  SUBMIT: 'hcmwebapp/FinancePages/PayrollCutoff/DELETE_SUBMIT',
  SUCCESS: 'hcmwebapp/FinancePages/PayrollCutoff/DELETE_SUCCESS',
  ERROR: 'hcmwebapp/FinancePages/PayrollCutoff/DELETE_ERROR',
  RESET: 'hcmwebapp/FinancePages/PayrollCutoff/DELETE_RESET',
});
