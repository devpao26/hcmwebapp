/*
 * Employee Masterlist Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */
import {
  EMP_LIST,
  EMP_SUCCESS,
  EMP_FAILED,
  EMP_TIMEDDEDUCT,
  EMP_TIMEDDEDUCTSUCCESS,
  EMP_TIMEDDEDUCTERROR,
  EMP_TIMEDEARN,
  EMP_TIMEDEARNSUCCESS,
  EMP_TIMEDEARNERROR,
  CLEAR_TIMEDSUCCESS,
} from './constants';

// Employee Masterlist Retrieval
export function retrieveEmpList(page, search, filter) {
  return {
    type: EMP_LIST,
    page,
    search,
    filter,
  };
}
export function retrievalSuccess(data, pages) {
  return {
    type: EMP_SUCCESS,
    data,
    pages,
  };
}
export function retrievalFailed(error) {
  return {
    type: EMP_FAILED,
    error,
  };
}

/**
 * Timed Deduct
 */
export function empTimedDeduct(data) {
  return {
    type: EMP_TIMEDDEDUCT,
    data,
  };
}
export function empTimedDeductSuccess() {
  return {
    type: EMP_TIMEDDEDUCTSUCCESS,
  };
}
export function empTimedDeductError(error) {
  return {
    type: EMP_TIMEDDEDUCTERROR,
    error,
  };
}

/**
 * Timed Earnings
 */
export function empTimedEarn(data) {
  return {
    type: EMP_TIMEDEARN,
    data,
  };
}
export function empTimedEarnSuccess() {
  return {
    type: EMP_TIMEDEARNSUCCESS,
  };
}
export function empTimedEarnError(error) {
  return {
    type: EMP_TIMEDEARNERROR,
    error,
  };
}

/**
 * Clear the Time Deduct and Earn Success
 */
export function clearTimedSuccess() {
  return {
    type: CLEAR_TIMEDSUCCESS,
  };
}
