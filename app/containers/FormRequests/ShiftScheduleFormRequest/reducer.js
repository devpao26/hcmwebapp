/*
 * App Reducer
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
  CREATE_SHIFT,
  CREATE_SHIFT_SUCCESS,
  CREATE_SHIFT_ERROR,
  CREATE_SHIFT_RESET,
  EMPLOYEE_LISTS,
  EMPLOYEE_SUCCESS,
  EMPLOYEE_ERROR,
  EMPLOYEE_LISTS_NORESETPAGE,
  SHIFT_LISTS,
  SHIFT_SUCCESS,
  SHIFT_ERROR,
  SHIFT_LISTS_NORESETPAGE,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  shiftforms: {
    saveRequest: {
      loading: false,
      error: false,
      requestRespError: false,
      success: false,
      requestRespSuccess: false,
      defaultID: false,
      employeeID: false,
      shiftID: false,
      dateFrom: false,
      dateTo: false,
      requestAnotherEmp: false,
    },
    employeelists: {
      loading: false,
      error: false,
      ObjectList: false,
      PageDetails: false,
      PageIndex: false,
      search: false,
    },
    shiftlists: {
      loading: false,
      error: false,
      ObjectList: false,
      PageDetails: false,
      PageIndex: false,
      search: false,
    },
  },
});

function AppReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_SHIFT:
      return state
        .setIn(['shiftforms', 'saveRequest', 'loading'], true)
        .setIn(['shiftforms', 'saveRequest', 'error'], false)
        .setIn(['shiftforms', 'saveRequest', 'defaultID'], action.defaultid)
        .setIn(['shiftforms', 'saveRequest', 'employeeID'], action.employeeid)
        .setIn(['shiftforms', 'saveRequest', 'shiftID'], action.shifttempid)
        .setIn(['shiftforms', 'saveRequest', 'dateFrom'], action.datefrom)
        .setIn(['shiftforms', 'saveRequest', 'dateTo'], action.dateto)
        .setIn(['shiftforms', 'saveRequest', 'requestAnotherEmp'], action.isrequestotheremp);
    case CREATE_SHIFT_SUCCESS:
      return state
        .setIn(['shiftforms', 'saveRequest', 'loading'], false)
        .setIn(['shiftforms', 'saveRequest', 'requestEmpID'], false)
        .setIn(['shiftforms', 'saveRequest', 'shiftID'], false)
        .setIn(['shiftforms', 'saveRequest', 'dateFrom'], false)
        .setIn(['shiftforms', 'saveRequest', 'dateTo'], false)
        .setIn(['shiftforms', 'saveRequest', 'requestAnotherEmp'], false)
        .setIn(['shiftforms', 'saveRequest', 'requestRespSuccess'], true)
        .setIn(['shiftforms', 'saveRequest', 'success'], action.resp);
    case CREATE_SHIFT_ERROR:
      return state
        .setIn(['shiftforms', 'saveRequest', 'loading'], false)
        .setIn(['shiftforms', 'saveRequest', 'requestRespError'], true)
        .setIn(['shiftforms', 'saveRequest', 'error'], action.resp);
    case CREATE_SHIFT_RESET:
      return state
        .setIn(['shiftforms', 'saveRequest', 'success'], false)
        .setIn(['shiftforms', 'saveRequest', 'loading'], false)
        .setIn(['shiftforms', 'saveRequest', 'error'], false)
        .setIn(['shiftforms', 'saveRequest', 'requestEmpID'], false)
        .setIn(['shiftforms', 'saveRequest', 'shiftID'], false)
        .setIn(['shiftforms', 'saveRequest', 'dateFrom'], false)
        .setIn(['shiftforms', 'saveRequest', 'dateTo'], false)
        .setIn(['shiftforms', 'saveRequest', 'requestAnotherEmp'], false)
        .setIn(['shiftforms', 'saveRequest', 'requestRespSuccess'], false)
        .setIn(['shiftforms', 'saveRequest', 'success'], false)
        .setIn(['shiftforms', 'saveRequest', 'requestRespError'], false)
        .setIn(['shiftforms', 'saveRequest', 'error'], false);
    case EMPLOYEE_LISTS:
      return state
        .setIn(['shiftforms', 'employeelists', 'loading'], true)
        .setIn(['shiftforms', 'employeelists', 'error'], false)
        .setIn(['shiftforms', 'employeelists', 'PageDetails'], false)
        .setIn(['shiftforms', 'employeelists', 'PageIndex'], action.page)
        .setIn(['shiftforms', 'employeelists', 'search'], action.search)
        .setIn(['shiftforms', 'employeelists', 'ObjectList'], false);
    case EMPLOYEE_SUCCESS:
      return state
        .setIn(['shiftforms', 'employeelists', 'loading'], false)
        .setIn(['shiftforms', 'employeelists', 'PageDetails'], action.pagedetails)
        .setIn(['shiftforms', 'employeelists', 'ObjectList'], action.data);
    case EMPLOYEE_ERROR:
      return state
        .setIn(['shiftforms', 'employeelists', 'loading'], false)
        .setIn(['shiftforms', 'employeelists', 'error'], action.error)
        .setIn(['shiftforms', 'employeelists', 'PageDetails'], false);
    case EMPLOYEE_LISTS_NORESETPAGE:
      return state
        .setIn(['shiftforms', 'employeelists', 'loading'], true)
        .setIn(['shiftforms', 'employeelists', 'error'], false)
        .setIn(['shiftforms', 'employeelists', 'PageIndex'], action.page)
        .setIn(['shiftforms', 'employeelists', 'search'], action.search)
        .setIn(['shiftforms', 'employeelists', 'ObjectList'], false);
    case SHIFT_LISTS:
      return state
        .setIn(['shiftforms', 'shiftlists', 'loading'], true)
        .setIn(['shiftforms', 'shiftlists', 'error'], false)
        .setIn(['shiftforms', 'shiftlists', 'PageDetails'], false)
        .setIn(['shiftforms', 'shiftlists', 'PageIndex'], action.page)
        .setIn(['shiftforms', 'shiftlists', 'search'], action.search)
        .setIn(['shiftforms', 'shiftlists', 'ObjectList'], false);
    case SHIFT_SUCCESS:
      return state
        .setIn(['shiftforms', 'shiftlists', 'loading'], false)
        .setIn(['shiftforms', 'shiftlists', 'PageDetails'], action.pagedetails)
        .setIn(['shiftforms', 'shiftlists', 'ObjectList'], action.data);
    case SHIFT_ERROR:
      return state
        .setIn(['shiftforms', 'shiftlists', 'loading'], false)
        .setIn(['shiftforms', 'shiftlists', 'error'], action.error)
        .setIn(['shiftforms', 'shiftlists', 'PageDetails'], false);
    case SHIFT_LISTS_NORESETPAGE:
      return state
        .setIn(['shiftforms', 'shiftlists', 'loading'], true)
        .setIn(['shiftforms', 'shiftlists', 'error'], false)
        .setIn(['shiftforms', 'shiftlists', 'PageIndex'], action.page)
        .setIn(['shiftforms', 'shiftlists', 'search'], action.search)
        .setIn(['shiftforms', 'shiftlists', 'ObjectList'], false);
    default:
      return state;
  }
}

export default AppReducer;
