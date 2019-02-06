/*
 * AppReducer
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
  GET_DATA,
  DATA_REFS,
  DATA_REFSERROR,
  DATA_REFSSUCCESS,
  DATA_FORMREQSUCCESS,
  DATA_APPLFORMSUCCESS,
  DATA_ONSPOTEARNSUCCESS,
  DATA_ONSPOTDEDUCTSUCCESS,
  DATA_TIMEDEARNSUCCESS,
  DATA_TIMEDDEDUCTSUCCESS,
  DATA_CUSTOMFORMSEARNSUCCESS,
  EMP_SHIFTSUMMARYSUCCESS,
  EMP_SHIFTSUMMARYERROR,
  EMP_LEAVEHISTORYSUCCESS,
  EMP_LEAVEHISTORYERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  empShiftSummary: {
    loading: false,
    error: false,
    data: false,
    pages: false,
    pageIndex: 1,
    date: false,
  },
  empLeaveHistory: {
    loading: false,
    error: false,
    data: false,
    pages: false,
    pageIndex: 1,
  },
  refsList: {
    loading: false,
    error: false,
    success: false,
    formLoad: false,
    applForm: false,
    onSpotEarnTypes: false,
    onSpotDeductTypes: false,
    timedEarnTypes: false,
    timedDeductTypes: false,
    customFormRefs: false,
  },
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DATA:
      return state
        .setIn(['empShiftSummary', 'date'], action.date)
        .setIn(['empShiftSummary', 'loading'], true)
        .setIn(['empShiftSummary', 'error'], false)
        .setIn(['empLeaveHistory', 'loading'], true)
        .setIn(['empLeaveHistory', 'error'], false);
    case DATA_REFS:
      return state
        .setIn(['refsList', 'loading'], true)
        .setIn(['refsList', 'error'], false);
    case DATA_REFSSUCCESS:
      return state
        .setIn(['refsList', 'loading'], false)
        .setIn(['refsList', 'success'], action.data);
    case DATA_FORMREQSUCCESS:
      return state
        .setIn(['refsList', 'formLoad'], action.data);
    case DATA_APPLFORMSUCCESS:
      return state
        .setIn(['refsList', 'applForm'], action.data);
    case DATA_ONSPOTEARNSUCCESS:
      return state
        .setIn(['refsList', 'onSpotEarnTypes'], action.data);
    case DATA_ONSPOTDEDUCTSUCCESS:
      return state
        .setIn(['refsList', 'onSpotDeductTypes'], action.data);
    case DATA_TIMEDEARNSUCCESS:
      return state
        .setIn(['refsList', 'timedEarnTypes'], action.data);
    case DATA_TIMEDDEDUCTSUCCESS:
      return state
        .setIn(['refsList', 'timedDeductTypes'], action.data);
    case DATA_CUSTOMFORMSEARNSUCCESS:
      return state
        .setIn(['refsList', 'customFormRefs'], action.data);
    case DATA_REFSERROR:
      return state
        .setIn(['refsList', 'error'], action.error)
        .setIn(['refsList', 'loading'], false);
    case EMP_SHIFTSUMMARYSUCCESS:
      return state
        .setIn(['empShiftSummary', 'loading'], false)
        .setIn(['empShiftSummary', 'data'], action.data)
        .setIn(['empShiftSummary', 'pages'], action.pages);
    case EMP_SHIFTSUMMARYERROR:
      return state
        .setIn(['empShiftSummary', 'loading'], false)
        .setIn(['empShiftSummary', 'error'], action.error);
    case EMP_LEAVEHISTORYSUCCESS:
      return state
        .setIn(['empLeaveHistory', 'loading'], false)
        .setIn(['empLeaveHistory', 'data'], action.data)
        .setIn(['empLeaveHistory', 'pages'], action.pages);
    case EMP_LEAVEHISTORYERROR:
      return state
        .setIn(['empLeaveHistory', 'loading'], false)
        .setIn(['empLeaveHistory', 'error'], action.error);
    default:
      return state;
  }
}

export default homeReducer;
