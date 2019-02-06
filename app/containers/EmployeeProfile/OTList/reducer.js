/*
 *
 * COE reducer
 *
 */

import { fromJS } from 'immutable';

import { RESET_STATE, OTList } from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  data: false,
  pages: false,
  pageIndex: 1,
  search: false,
});

function OTListReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_STATE:
      return initialState;
    case OTList.RETRIEVE:
      return state
        .set('loading', true)
        .set('error', false)
        .set('data', false)
        .set('pages', false)
        .set('pageIndex', action.page)
        .set('search', action.search);
    case OTList.SUCCESS:
      return state
        .set('loading', false)
        .set('data', action.data)
        .set('pages', action.pages);
    case OTList.ERROR:
      return state
        .set('loading', false)
        .set('data', false)
        .set('pages', false)
        .set('error', action.error);
    case OTList.PAGING:
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

export default OTListReducer;
