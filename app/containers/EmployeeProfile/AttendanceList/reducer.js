/*
 *
 * ATT reducer
 *
 */

import { fromJS } from 'immutable';
import { AttendanceList, RESET_STATE } from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  data: false,
  pages: false,
  pageIndex: 1,
  search: false,
});

function attListReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_STATE:
      return initialState;
    case AttendanceList.RETRIEVE:
      return state
        .set('loading', true)
        .set('error', false)
        .set('data', false)
        .set('pages', false)
        .set('pageIndex', action.page)
        .set('search', action.search);
    case AttendanceList.SUCCESS:
      return state
        .set('loading', false)
        .set('data', action.data)
        .set('pages', action.pages);
    case AttendanceList.ERROR:
      return state
        .set('loading', false)
        .set('data', false)
        .set('pages', false)
        .set('error', action.error);
    case AttendanceList.PAGING:
      return state
        .set('loading', true)
        .set('error', false)
        .set('data', false)
        .set('pageIndex', action.page)
        .set('search', action.search);
    default:
      return state;
  }
}

export default attListReducer;
