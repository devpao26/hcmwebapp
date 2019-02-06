/*
 *
 * EmployeeProfile reducer
 *
 */

import { fromJS } from 'immutable';
import {
  RESET_STATE,
  EmpProfile,
  UpdateProfile,
  EmpReqs,
} from './constants';

const initialState = fromJS({
  profile: {
    loading: false,
    error: false,
    data: false,
  },
  update: {
    loading: false,
    error: false,
    data: false,
    success: false,
  },
  empReqs: {
    loading: false,
    error: false,
    data: false,
    pages: false,
    pageIndex: 1,
  },
  empID: false,
});

function employeeProfileReducer(state = initialState, action) {
  switch (action.type) {
    case EmpProfile.RETRIEVE:
      return state
        .setIn(['profile', 'loading'], true)
        .setIn(['profile', 'error'], false)
        .setIn(['profile', 'data'], false)
        .set('empID', action.empID);
    case EmpProfile.SUCCESS:
      return state
        .setIn(['profile', 'loading'], false)
        .setIn(['profile', 'data'], action.data);
    case EmpProfile.ERROR:
      return state
        .setIn(['profile', 'loading'], false)
        .setIn(['profile', 'error'], action.error);
    case UpdateProfile.SUBMIT:
      return state
        .setIn(['update', 'loading'], true)
        .setIn(['update', 'error'], false)
        .setIn(['update', 'success'], false)
        .setIn(['update', 'data'], action.data);
    case UpdateProfile.SUCCESS:
      return state
        .setIn(['update', 'loading'], false)
        .setIn(['update', 'data'], false)
        .setIn(['update', 'success'], true);
    case UpdateProfile.ERROR:
      return state
        .setIn(['update', 'loading'], false)
        .setIn(['update', 'data'], false)
        .setIn(['update', 'error'], action.error);
    case UpdateProfile.RESET:
      return state
        .setIn(['update', 'loading'], false)
        .setIn(['update', 'error'], false)
        .setIn(['update', 'success'], false)
        .setIn(['update', 'data'], false);
    case EmpReqs.RETRIEVE:
      return state
        .setIn(['empReqs', 'loading'], true)
        .setIn(['empReqs', 'error'], false)
        .setIn(['empReqs', 'data'], false)
        .setIn(['empReqs', 'pages'], false)
        .setIn(['empReqs', 'pageIndex'], action.page);
    case EmpReqs.SUCCESS:
      return state
        .setIn(['empReqs', 'loading'], false)
        .setIn(['empReqs', 'data'], action.data)
        .setIn(['empReqs', 'pages'], action.pages);
    case EmpReqs.ERROR:
      return state
        .setIn(['empReqs', 'loading'], false)
        .setIn(['empReqs', 'data'], false)
        .setIn(['empReqs', 'pages'], false)
        .setIn(['empReqs', 'pageIndex'], 1)
        .setIn(['empReqs', 'error'], action.error);
    case EmpReqs.PAGING:
      return state
        .setIn(['empReqs', 'loading'], true)
        .setIn(['empReqs', 'error'], false)
        .setIn(['empReqs', 'data'], false)
        .setIn(['empReqs', 'pageIndex'], action.page);
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
}

export default employeeProfileReducer;
