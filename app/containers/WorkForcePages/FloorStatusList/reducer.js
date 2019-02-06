/*
 * floorStatusListReducer
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
  CLEAR_STATE,
  EMP_LIST,
  EMP_SUCCESS,
  EMP_FAILED,
  EMP_SETID,
  SEARCH_FILTER,
  GET_TEAMS,
  GET_TEAMSSUCCESS,
  GET_TEAMSERROR,
  REQUEST_DTR,
  REQUEST_DTRSUCCESS,
  REQUEST_DTRERROR,
  CLEAR_URI,
} from './constants';

const initialState = fromJS({
  floorStatusList: {
    empList: {
      loading: false,
      error: false,
      ObjectList: false,
      PageDetails: false,
      PageIndex: false,
      SearchFilter: {
        value: false,
      },
    },
    teamList: {
      loading: false,
      error: false,
      ObjectList: false,
    },
    dtr: {
      loading: false,
      error: false,
      teamId: false,
      date: false,
      uri: false,
    },
    empId: false,
  },
  empFloorStatus: {
    empId: false,
  },
});

function floorStatusListReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_STATE:
      return initialState;
    case EMP_LIST:
      return state
        .setIn(['floorStatusList', 'empList', 'loading'], true)
        .setIn(['floorStatusList', 'empList', 'error'], false)
        .setIn(['floorStatusList', 'empList', 'PageIndex'], action.page)
        .setIn(['floorStatusList', 'empList', 'SearchFilter', 'value'], action.search)
        .setIn(['floorStatusList', 'empList', 'ObjectList'], false);
    case EMP_SUCCESS:
      return state
        .setIn(['floorStatusList', 'empList', 'loading'], false)
        .setIn(['floorStatusList', 'empList', 'ObjectList'], action.data)
        .setIn(['floorStatusList', 'empList', 'PageDetails'], action.pageDetails);
    case EMP_FAILED:
      return state
        .setIn(['floorStatusList', 'empList', 'loading'], false)
        .setIn(['floorStatusList', 'empList', 'error'], action.error);
    case EMP_SETID:
      return state
        .setIn(['empFloorStatus', 'empId'], action.id);
    case SEARCH_FILTER:
      return state
        .setIn(['floorStatusList', 'empList', 'loading'], true)
        .setIn(['floorStatusList', 'empList', 'error'], false)
        .setIn(['floorStatusList', 'empList', 'SearchFilter', 'value'], action.query)
        .setIn(['floorStatusList', 'empList', 'ObjectList'], false)
        .setIn(['floorStatusList', 'empList', 'PageDetails'], false)
        .setIn(['floorStatusList', 'empList', 'PageIndex'], 1);
    case GET_TEAMS:
      return state
        .setIn(['floorStatusList', 'teamList', 'loading'], true)
        .setIn(['floorStatusList', 'teamList', 'ObjectList'], false);
    case GET_TEAMSSUCCESS:
      return state
        .setIn(['floorStatusList', 'teamList', 'loading'], false)
        .setIn(['floorStatusList', 'teamList', 'ObjectList'], action.data);
    case GET_TEAMSERROR:
      return state
        .setIn(['floorStatusList', 'teamList', 'loading'], false)
        .setIn(['floorStatusList', 'teamList', 'ObjectList'], false)
        .setIn(['floorStatusList', 'teamList', 'error'], action.error);
    case REQUEST_DTR:
      return state
        .setIn(['floorStatusList', 'dtr', 'loading'], true)
        .setIn(['floorStatusList', 'dtr', 'error'], false)
        .setIn(['floorStatusList', 'dtr', 'teamId'], action.id)
        .setIn(['floorStatusList', 'dtr', 'date'], action.date);
    case REQUEST_DTRSUCCESS:
      return state
        .setIn(['floorStatusList', 'dtr', 'loading'], false)
        .setIn(['floorStatusList', 'dtr', 'uri'], action.uri)
        .setIn(['floorStatusList', 'dtr', 'teamId'], false)
        .setIn(['floorStatusList', 'dtr', 'date'], false);
    case REQUEST_DTRERROR:
      return state
        .setIn(['floorStatusList', 'dtr', 'error'], action.error)
        .setIn(['floorStatusList', 'dtr', 'loading'], false)
        .setIn(['floorStatusList', 'dtr', 'teamId'], false)
        .setIn(['floorStatusList', 'dtr', 'date'], false);
    case CLEAR_URI:
      return state
        .setIn(['floorStatusList', 'dtr', 'uri'], false);
    default:
      return state;
  }
}

export default floorStatusListReducer;
