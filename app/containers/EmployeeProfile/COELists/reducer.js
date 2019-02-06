/*
 *
 * COE reducer
 *
 */

import { fromJS } from 'immutable';
import { RESET_STATE, Lists } from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  data: false,
  pages: false,
  pageIndex: 1,
  search: false,
});

function coeListReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_STATE:
      return initialState;
    case Lists.RETRIEVE:
      return state
        .set('loading', true)
        .set('error', false)
        .set('data', false)
        .set('pages', false)
        .set('pageIndex', action.page)
        .set('search', action.search);
    case Lists.SUCCESS:
      return state
        .set('loading', false)
        .set('data', action.data)
        .set('pages', action.pages);
    case Lists.ERROR:
      return state
        .set('loading', false)
        .set('data', false)
        .set('pages', false)
        .set('error', action.error);
    case Lists.PAGING:
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

export default coeListReducer;
