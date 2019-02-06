/*
 * DTR Reducer
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
  DTREMP_LIST,
  DTREMP_SUCCESS,
  DTREMP_FAILED,
  DTR_EMP_INFO,
  DTR_EMP_SELDATE,
  DTR_SEL_EMPPROF,
  DTRINFO_FAILED,
  DTRINFO_SUCCESS,
  DTREMP_SHIFTRECLIST,
  DTREMP_SHIFTREC_SUCCESS,
  DTREMP_SHIFTREC_FAILED,
  DTR_REPORT,
  DTR_REPORT_SUCCESS,
  DTR_REPORT_FAILED,
  CLEAR_DTR_REPORT,
  MANUAL_DTR,
  MANUAL_DTRSUCCESS,
  MANUAL_DTRERROR,
  CLEAR_MANUAL_DTR,
} from './constants';


const initialState = fromJS({
  dtr: {
    empID: false,
    empList: {
      loading: false,
      error: false,
      data: false,
      PageDetails: false,
      PageIndex: false,
      search: false,
      filter: false,
    },
    empDtrInfo: {
      loading: false,
      error: false,
      ObjectList: false,
      PageDetails: false,
      selDateDTREmp: false,
    },
    empShiftRecs: {
      loading: false,
      error: false,
      ObjectList: false,
    },
    dtrReport: {
      loading: false,
      error: false,
      ObjectList: false,
    },
    manualDtr: {
      loading: false,
      error: false,
      data: false,
      success: false,
    },
  },
});

function dtrReducer(state = initialState, action) {
  switch (action.type) {
    case DTREMP_LIST:
      return state
        .setIn(['dtr', 'empList', 'loading'], true)
        .setIn(['dtr', 'empList', 'error'], false)
        .setIn(['dtr', 'empList', 'PageIndex'], action.page)
        .setIn(['dtr', 'empList', 'search'], action.search)
        .setIn(['dtr', 'empList', 'filter'], action.filter)
        .setIn(['dtr', 'empList', 'data'], false)
        .setIn(['dtr', 'empDtrInfo', 'ObjectList'], false)
        .setIn(['dtr', 'empDtrInfo', 'PageDetails'], false)
        .setIn(['dtr', 'empDtrInfo', 'error'], false)
        .setIn(['dtr', 'empShiftRecs', 'PageIndex'], false)
        .setIn(['dtr', 'empShiftRecs', 'ObjectList'], false)
        .setIn(['dtr', 'empShiftRecs', 'error'], false);
    case DTREMP_SUCCESS:
      return state
        .setIn(['dtr', 'empList', 'loading'], false)
        .setIn(['dtr', 'empList', 'data'], action.data)
        .setIn(['dtr', 'empList', 'PageDetails'], action.pageDetails);
    case DTREMP_FAILED:
      return state
        .setIn(['dtr', 'empList', 'loading'], false)
        .setIn(['dtr', 'empList', 'error'], action.error);
    case DTR_EMP_INFO:
      return state
        .setIn(['dtr', 'empDtrInfo', 'loading'], true)
        .setIn(['dtr', 'empDtrInfo', 'error'], false)
        .setIn(['dtr', 'empDtrInfo', 'ObjectList'], false);
    case DTRINFO_FAILED:
      return state
        .setIn(['dtr', 'empDtrInfo', 'loading'], false)
        .setIn(['dtr', 'empDtrInfo', 'error'], action.error);
    case DTRINFO_SUCCESS:
      return state
        .setIn(['dtr', 'empDtrInfo', 'loading'], false)
        .setIn(['dtr', 'empDtrInfo', 'ObjectList'], action.data)
        .setIn(['dtr', 'empDtrInfo', 'PageDetails'], action.pageDetails);
    case DTR_EMP_SELDATE:
      return state
        .setIn(['dtr', 'empDtrInfo', 'selDateDTREmp'], action.dateDTR);
    case DTR_SEL_EMPPROF:
      return state
        .setIn(['dtr', 'empShiftRecs', 'PageDetails'], false)
        .setIn(['dtr', 'empID'], action.empID);
    case DTREMP_SHIFTRECLIST:
      return state
        .setIn(['dtr', 'empShiftRecs', 'loading'], true)
        .setIn(['dtr', 'empShiftRecs', 'error'], false)
        .setIn(['dtr', 'empShiftRecs', 'PageIndex'], action.page)
        .setIn(['dtr', 'empShiftRecs', 'ObjectList'], false);
    case DTREMP_SHIFTREC_SUCCESS:
      return state
        .setIn(['dtr', 'empShiftRecs', 'loading'], false)
        .setIn(['dtr', 'empShiftRecs', 'ObjectList'], action.data)
        .setIn(['dtr', 'empShiftRecs', 'PageDetails'], action.pageDetails);
    case DTREMP_SHIFTREC_FAILED:
      return state
        .setIn(['dtr', 'empShiftRecs', 'loading'], false)
        .setIn(['dtr', 'empShiftRecs', 'error'], action.error);
    case DTR_REPORT:
      return state
        .setIn(['dtr', 'dtrReport', 'loading'], true)
        .setIn(['dtr', 'dtrReport', 'error'], false)
        .setIn(['dtr', 'dtrReport', 'ObjectList'], action.data);
    case CLEAR_DTR_REPORT:
      return state
        .setIn(['dtr', 'dtrReport', 'ObjectList'], false);
    case DTR_REPORT_SUCCESS:
      return state
        .setIn(['dtr', 'dtrReport', 'loading'], false)
        .setIn(['dtr', 'dtrReport', 'ObjectList'], action.reportDetails);
    case DTR_REPORT_FAILED:
      return state
        .setIn(['dtr', 'dtrReport', 'loading'], false)
        .setIn(['dtr', 'dtrReport', 'error'], action.error);
    case MANUAL_DTR:
      return state
        .setIn(['dtr', 'manualDtr', 'loading'], true)
        .setIn(['dtr', 'manualDtr', 'error'], false)
        .setIn(['dtr', 'manualDtr', 'data'], action.data);
    case MANUAL_DTRSUCCESS:
      return state
        .setIn(['dtr', 'manualDtr', 'loading'], false)
        .setIn(['dtr', 'manualDtr', 'data'], false)
        .setIn(['dtr', 'manualDtr', 'success'], true);
    case MANUAL_DTRERROR:
      return state
        .setIn(['dtr', 'manualDtr', 'loading'], false)
        .setIn(['dtr', 'manualDtr', 'error'], action.error);
    case CLEAR_MANUAL_DTR:
      return state
        .setIn(['dtr', 'manualDtr', 'loading'], false)
        .setIn(['dtr', 'manualDtr', 'error'], false)
        .setIn(['dtr', 'manualDtr', 'data'], false)
        .setIn(['dtr', 'manualDtr', 'success'], false);
    default:
      return state;
  }
}

export default dtrReducer;
