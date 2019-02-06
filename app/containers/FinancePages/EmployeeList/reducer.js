/*
 * onBoardingReducer
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

const initialState = fromJS({
  masterList: {
    empList: {
      loading: false,
      error: false,
      data: false,
      pages: false,
      pageIndex: false,
      search: false,
      filter: false,
    },
    timedDeduct: {
      loading: false,
      error: false,
      success: false,
      data: false,
    },
    timedEarning: {
      loading: false,
      error: false,
      success: false,
      data: false,
    },
  },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case EMP_LIST:
      return state
        .setIn(['masterList', 'empList', 'loading'], true)
        .setIn(['masterList', 'empList', 'error'], false)
        .setIn(['masterList', 'empList', 'data'], false)
        .setIn(['masterList', 'empList', 'pageIndex'], action.page)
        .setIn(['masterList', 'empList', 'search'], action.search)
        .setIn(['masterList', 'empList', 'filter'], action.filter)
        .setIn(['masterList', 'timedDeduct', 'loading'], false)
        .setIn(['masterList', 'timedDeduct', 'success'], false)
        .setIn(['masterList', 'timedDeduct', 'error'], false)
        .setIn(['masterList', 'timedEarning', 'loading'], false)
        .setIn(['masterList', 'timedEarning', 'success'], false)
        .setIn(['masterList', 'timedEarning', 'error'], false);
    case EMP_SUCCESS:
      return state
        .setIn(['masterList', 'empList', 'loading'], false)
        .setIn(['masterList', 'empList', 'data'], action.data)
        .setIn(['masterList', 'empList', 'pages'], action.pages);
    case EMP_FAILED:
      return state
        .setIn(['masterList', 'empList', 'loading'], false)
        .setIn(['masterList', 'empList', 'error'], action.error);
    case EMP_TIMEDDEDUCT:
      return state
        .setIn(['masterList', 'timedDeduct', 'loading'], true)
        .setIn(['masterList', 'timedDeduct', 'error'], false)
        .setIn(['masterList', 'timedDeduct', 'data'], action.data);
    case EMP_TIMEDDEDUCTSUCCESS:
      return state
        .setIn(['masterList', 'timedDeduct', 'loading'], false)
        .setIn(['masterList', 'timedDeduct', 'success'], true)
        .setIn(['masterList', 'timedDeduct', 'data'], false);
    case EMP_TIMEDDEDUCTERROR:
      return state
        .setIn(['masterList', 'timedDeduct', 'loading'], false)
        .setIn(['masterList', 'timedDeduct', 'error'], action.error)
        .setIn(['masterList', 'timedDeduct', 'data'], false);
    case EMP_TIMEDEARN:
      return state
        .setIn(['masterList', 'timedEarning', 'loading'], true)
        .setIn(['masterList', 'timedEarning', 'error'], false)
        .setIn(['masterList', 'timedEarning', 'data'], action.data);
    case EMP_TIMEDEARNSUCCESS:
      return state
        .setIn(['masterList', 'timedEarning', 'loading'], false)
        .setIn(['masterList', 'timedEarning', 'success'], true)
        .setIn(['masterList', 'timedEarning', 'data'], false);
    case EMP_TIMEDEARNERROR:
      return state
        .setIn(['masterList', 'timedEarning', 'loading'], false)
        .setIn(['masterList', 'timedEarning', 'error'], action.error)
        .setIn(['masterList', 'timedEarning', 'data'], false);
    case CLEAR_TIMEDSUCCESS:
      return state
        .setIn(['masterList', 'timedDeduct', 'success'], false)
        .setIn(['masterList', 'timedEarning', 'success'], false);
    default:
      return state;
  }
}

export default appReducer;
