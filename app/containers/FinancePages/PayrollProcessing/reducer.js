/*
 * Finance Payroll Processing Reducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  PREMP_LIST,
  PREMP_SUCCESS,
  PREMP_FAILED,
  PAYROLLDATE_LIST,
  PAYROLLDATE_SUCCESS,
  PAYROLLDATE_FAILED,
  PRDATE_SELECTED,
  PREMP_SELECTED,
  // PRPAY_SELECTED_MN,
  // PRPAY_SELECTED_YR,
  PRPAYDAY_INFO,
  PRPAYDAY_SUCCESS,
  PRPAYDAY_FAILED,
  PRREVIEW,
  PRREVIEW_SUCCESS,
  PRREVIEW_FAILED,
  GEN_PAYSLIP,
  GEN_PAYSLIPSUCCESS,
  GEN_PAYSLIPERROR,
  RESET_PAYSLIP,
  EMP_ONSPOTDEDUCT,
  EMP_ONSPOTDEDUCTSUCCESS,
  EMP_ONSPOTDEDUCTERROR,
  EMP_ONSPOTEARNING,
  EMP_ONSPOTEARNINGSUCCESS,
  EMP_ONSPOTEARNINGERROR,
} from './constants';

const initialState = fromJS({
  payrollProcessing: {
    empList: {
      loading: false,
      error: false,
      ObjectList: false,
      PageDetails: false,
      PageIndex: false,
      search: false,
      location: false,
    },
    prPayDates: {
      loading: false,
      error: false,
      ObjectList: false,
      PageDetails: false,
      PageIndex: false,
      prSelectedPayDate: '',
      prEmpProfileSelected: false,
    },
    prPaySlip: {
      isEmail: false,
      empID: false,
      date: false,
      success: false,
      error: false,
      loading: false,
    },
    onSpotDeduct: {
      loading: false,
      error: false,
      success: false,
      data: false,
    },
    onSpotEarning: {
      loading: false,
      error: false,
      success: false,
      data: false,
    },
  },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case PREMP_LIST:
      return state
        .setIn(['payrollProcessing', 'empList', 'loading'], true)
        .setIn(['payrollProcessing', 'empList', 'error'], false)
        .setIn(['payrollProcessing', 'empList', 'PageIndex'], action.page)
        .setIn(['payrollProcessing', 'empList', 'ObjectList'], false)
        .setIn(['payrollProcessing', 'empList', 'search'], action.search)
        .setIn(['payrollProcessing', 'empList', 'location'], action.location)
        .setIn(['payrollProcessing', 'prPayReview', 'ObjectList'], false)
        .setIn(['payrollProcessing', 'prPaySlip', 'loading'], false)
        .setIn(['payrollProcessing', 'prPaySlip', 'error'], false)
        .setIn(['payrollProcessing', 'prPaySlip', 'success'], false)
        .setIn(['payrollProcessing', 'onSpotDeduct', 'data'], false)
        .setIn(['payrollProcessing', 'onSpotDeduct', 'success'], false)
        .setIn(['payrollProcessing', 'onSpotDeduct', 'error'], false)
        .setIn(['payrollProcessing', 'onSpotEarning', 'data'], false)
        .setIn(['payrollProcessing', 'onSpotEarning', 'success'], false)
        .setIn(['payrollProcessing', 'onSpotEarning', 'error'], false);
    case PREMP_SUCCESS:
      return state
        .setIn(['payrollProcessing', 'empList', 'loading'], false)
        .setIn(['payrollProcessing', 'empList', 'ObjectList'], action.data)
        .setIn(['payrollProcessing', 'empList', 'PageDetails'], action.pageDetails);
    case PREMP_FAILED:
      return state
        .setIn(['payrollProcessing', 'empList', 'loading'], false)
        .setIn(['payrollProcessing', 'empList', 'error'], action.error);
    case PAYROLLDATE_LIST:
      return state
        .setIn(['payrollProcessing', 'prPayDates', 'loading'], true)
        .setIn(['payrollProcessing', 'prPayDates', 'error'], false)
        .setIn(['payrollProcessing', 'prPayDates', 'PageIndex'], action.page)
        .setIn(['payrollProcessing', 'prPayDates', 'ObjectList'], false);
    case PAYROLLDATE_SUCCESS:
      return state
        .setIn(['payrollProcessing', 'prPayDates', 'loading'], false)
        .setIn(['payrollProcessing', 'prPayDates', 'ObjectList'], action.data)
        .setIn(['payrollProcessing', 'prPayDates', 'PageDetails'], action.pageDetails);
    case PAYROLLDATE_FAILED:
      return state
        .setIn(['payrollProcessing', 'prPayDates', 'loading'], false)
        .setIn(['payrollProcessing', 'prPayDates', 'error'], action.error);
    case PRDATE_SELECTED:
      return state
        .setIn(['payrollProcessing', 'prPayDates', 'prSelectedPayDate'], action.date);
    case PREMP_SELECTED:
      return state
        .setIn(['payrollProcessing', 'prPayDates', 'prEmpProfileSelected'], action.empProfSelected);
    case PRPAYDAY_INFO:
      return state
        .setIn(['payrollProcessing', 'prPayReview', 'loading'], true)
        .setIn(['payrollProcessing', 'prPayReview', 'error'], false)
        .setIn(['payrollProcessing', 'prPayReview', 'PageIndex'], action.page)
        .setIn(['payrollProcessing', 'prPayReview', 'ObjectList'], false);
    case PRPAYDAY_SUCCESS:
      return state
        .setIn(['payrollProcessing', 'prPayReview', 'loading'], false)
        .setIn(['payrollProcessing', 'prPayReview', 'ObjectList'], action.data)
        .setIn(['payrollProcessing', 'prPayReview', 'PageDetails'], action.pageDetails);
    case PRPAYDAY_FAILED:
      return state
        .setIn(['payrollProcessing', 'prPayReview', 'loading'], false)
        .setIn(['payrollProcessing', 'prPayReview', 'error'], action.error);
    case PRREVIEW:
      return state
        .setIn(['payrollProcessing', 'prPayReport', 'loading'], true)
        .setIn(['payrollProcessing', 'prPayReport', 'error'], false)
        .setIn(['payrollProcessing', 'prPayReport', 'PageIndex'], action.page)
        .setIn(['payrollProcessing', 'prPayReport', 'ObjectList'], false);
    case PRREVIEW_SUCCESS:
      return state
        .setIn(['payrollProcessing', 'prPayReport', 'loading'], false)
        .setIn(['payrollProcessing', 'prPayReport', 'ObjectList'], action.data)
        .setIn(['payrollProcessing', 'prPayReport', 'PageDetails'], action.pageDetails);
    case PRREVIEW_FAILED:
      return state
        .setIn(['payrollProcessing', 'prPayReport', 'loading'], false)
        .setIn(['payrollProcessing', 'prPayReport', 'error'], action.error);
    case GEN_PAYSLIP:
      return state
        .setIn(['payrollProcessing', 'prPaySlip', 'loading'], true)
        .setIn(['payrollProcessing', 'prPaySlip', 'error'], false)
        .setIn(['payrollProcessing', 'prPaySlip', 'success'], false)
        .setIn(['payrollProcessing', 'prPaySlip', 'isEmail'], action.isEmail)
        .setIn(['payrollProcessing', 'prPaySlip', 'empID'], action.empID)
        .setIn(['payrollProcessing', 'prPaySlip', 'date'], action.date);
    case GEN_PAYSLIPSUCCESS:
      return state
        .setIn(['payrollProcessing', 'prPaySlip', 'loading'], false)
        .setIn(['payrollProcessing', 'prPaySlip', 'success'], action.data)
        .setIn(['payrollProcessing', 'prPaySlip', 'isEmail'], false)
        .setIn(['payrollProcessing', 'prPaySlip', 'empID'], false);
    case GEN_PAYSLIPERROR:
      return state
        .setIn(['payrollProcessing', 'prPaySlip', 'loading'], false)
        .setIn(['payrollProcessing', 'prPaySlip', 'error'], true)
        .setIn(['payrollProcessing', 'prPaySlip', 'isEmail'], false)
        .setIn(['payrollProcessing', 'prPaySlip', 'empID'], false);
    case RESET_PAYSLIP:
      return state
        .setIn(['payrollProcessing', 'prPaySlip', 'loading'], false)
        .setIn(['payrollProcessing', 'prPaySlip', 'error'], false)
        .setIn(['payrollProcessing', 'prPaySlip', 'isEmail'], false)
        .setIn(['payrollProcessing', 'prPaySlip', 'empID'], false)
        .setIn(['payrollProcessing', 'prPaySlip', 'date'], false)
        .setIn(['payrollProcessing', 'prPaySlip', 'success'], false)
        .setIn(['payrollProcessing', 'prPayReview', 'ObjectList'], false)
        .setIn(['payrollProcessing', 'onSpotDeduct', 'success'], false)
        .setIn(['payrollProcessing', 'onSpotDeduct', 'error'], false)
        .setIn(['payrollProcessing', 'onSpotEarning', 'success'], false)
        .setIn(['payrollProcessing', 'onSpotEarning', 'error'], false);
    case EMP_ONSPOTDEDUCT:
      return state
        .setIn(['payrollProcessing', 'onSpotDeduct', 'loading'], true)
        .setIn(['payrollProcessing', 'onSpotDeduct', 'error'], false)
        .setIn(['payrollProcessing', 'onSpotDeduct', 'data'], action.data)
        .setIn(['payrollProcessing', 'onSpotDeduct', 'success'], false);
    case EMP_ONSPOTDEDUCTSUCCESS:
      return state
        .setIn(['payrollProcessing', 'onSpotDeduct', 'loading'], false)
        .setIn(['payrollProcessing', 'onSpotDeduct', 'success'], true)
        .setIn(['payrollProcessing', 'onSpotDeduct', 'data'], false);
    case EMP_ONSPOTDEDUCTERROR:
      return state
        .setIn(['payrollProcessing', 'onSpotDeduct', 'loading'], false)
        .setIn(['payrollProcessing', 'onSpotDeduct', 'error'], action.error)
        .setIn(['payrollProcessing', 'onSpotDeduct', 'success'], false);
    case EMP_ONSPOTEARNING:
      return state
        .setIn(['payrollProcessing', 'onSpotEarning', 'loading'], true)
        .setIn(['payrollProcessing', 'onSpotEarning', 'error'], false)
        .setIn(['payrollProcessing', 'onSpotEarning', 'data'], action.data)
        .setIn(['payrollProcessing', 'onSpotEarning', 'success'], false);
    case EMP_ONSPOTEARNINGSUCCESS:
      return state
        .setIn(['payrollProcessing', 'onSpotEarning', 'loading'], false)
        .setIn(['payrollProcessing', 'onSpotEarning', 'success'], true)
        .setIn(['payrollProcessing', 'onSpotEarning', 'data'], false);
    case EMP_ONSPOTEARNINGERROR:
      return state
        .setIn(['payrollProcessing', 'onSpotEarning', 'loading'], false)
        .setIn(['payrollProcessing', 'onSpotEarning', 'error'], action.error)
        .setIn(['payrollProcessing', 'onSpotEarning', 'success'], false);
    default:
      return state;
  }
}

export default appReducer;
