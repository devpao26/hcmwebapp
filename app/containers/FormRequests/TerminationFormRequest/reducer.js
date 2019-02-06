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
  CREATE_FORM,
  CREATE_FORM_SUCCESS,
  CREATE_FORM_ERROR,
  CREATE_FORM_RESET,
  EMPLOYEE_LISTS,
  EMPLOYEE_SUCCESS,
  EMPLOYEE_ERROR,
  EMPLOYEE_LISTS_NORESETPAGE,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  terminationform: {
    submitForm: {
      loading: false,
      error: false,
      success: false,
      Employeeid: false,
      Note: false,
      Attachments: false,
      requestRespSuccess: false,
      requestRespError: false,
    },
    employeelists: {
      loading: false,
      error: false,
      ObjectList: false,
      PageDetails: false,
      PageIndex: false,
      search: false,
    },
  },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_FORM:
      return state
        .setIn(['terminationform', 'submitForm', 'loading'], true)
        .setIn(['terminationform', 'submitForm', 'error'], false)
        .setIn(['terminationform', 'submitForm', 'Employeeid'], action.empid)
        .setIn(['terminationform', 'submitForm', 'Note'], action.note)
        .setIn(['terminationform', 'submitForm', 'Attachments'], action.files);
    case CREATE_FORM_SUCCESS:
      return state
        .setIn(['terminationform', 'submitForm', 'loading'], false)
        .setIn(['terminationform', 'submitForm', 'Employeeid'], false)
        .setIn(['terminationform', 'submitForm', 'Note'], false)
        .setIn(['terminationform', 'submitForm', 'Attachments'], false)
        .setIn(['terminationform', 'submitForm', 'requestRespSuccess'], true)
        .setIn(['terminationform', 'submitForm', 'success'], action.resp);
    case CREATE_FORM_ERROR:
      return state
        .setIn(['terminationform', 'submitForm', 'loading'], false)
        .setIn(['terminationform', 'submitForm', 'requestRespError'], true)
        .setIn(['terminationform', 'submitForm', 'error'], action.resp);
    case CREATE_FORM_RESET:
      return state
        .setIn(['terminationform', 'submitForm', 'success'], false)
        .setIn(['terminationform', 'submitForm', 'loading'], false)
        .setIn(['terminationform', 'submitForm', 'error'], false)
        .setIn(['terminationform', 'submitForm', 'Employeeid'], false)
        .setIn(['terminationform', 'submitForm', 'Note'], false)
        .setIn(['terminationform', 'submitForm', 'Attachments'], false)
        .setIn(['terminationform', 'submitForm', 'requestRespSuccess'], false)
        .setIn(['terminationform', 'submitForm', 'requestRespError'], false);
    case EMPLOYEE_LISTS:
      return state
        .setIn(['terminationform', 'employeelists', 'loading'], true)
        .setIn(['terminationform', 'employeelists', 'error'], false)
        .setIn(['terminationform', 'employeelists', 'PageDetails'], false)
        .setIn(['terminationform', 'employeelists', 'PageIndex'], action.page)
        .setIn(['terminationform', 'employeelists', 'search'], action.search)
        .setIn(['terminationform', 'employeelists', 'ObjectList'], false);
    case EMPLOYEE_SUCCESS:
      return state
        .setIn(['terminationform', 'employeelists', 'loading'], false)
        .setIn(['terminationform', 'employeelists', 'PageDetails'], action.pagedetails)
        .setIn(['terminationform', 'employeelists', 'ObjectList'], action.data);
    case EMPLOYEE_ERROR:
      return state
        .setIn(['terminationform', 'employeelists', 'loading'], false)
        .setIn(['terminationform', 'employeelists', 'error'], action.error)
        .setIn(['terminationform', 'employeelists', 'PageDetails'], false);
    case EMPLOYEE_LISTS_NORESETPAGE:
      return state
        .setIn(['terminationform', 'employeelists', 'loading'], true)
        .setIn(['terminationform', 'employeelists', 'error'], false)
        .setIn(['terminationform', 'employeelists', 'PageIndex'], action.page)
        .setIn(['terminationform', 'employeelists', 'search'], action.search)
        .setIn(['terminationform', 'employeelists', 'ObjectList'], false);
    default:
      return state;
  }
}

export default appReducer;
