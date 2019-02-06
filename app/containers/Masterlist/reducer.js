/*
 * Employee MasterList reducer
 */

import { fromJS } from 'immutable';

import { MasterList, RESET_STATE } from './constants';

// The initial state of the App
export const initialState = fromJS({
  loading: false,
  error: false,
  data: false,
  pages: false,
  requestBody: false,
});

function empMasterListReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_STATE:
      return initialState;
    case MasterList.RETRIEVE:
      return state
        .set('loading', false)
        .set('error', false)
        .set('data', false)
        .set('pages', false)
        .set('requestBody', action.data);
    case MasterList.SUCCESS:
      return state
        .set('loading', false)
        .set('requestBody', false)
        .set('data', action.data)
        .set('pages', action.pages);
    case MasterList.ERROR:
      return state
        .set('loading', false)
        .set('data', false)
        .set('pages', false)
        .set('requestBody', false)
        .set('error', action.error);
    case MasterList.PAGING:
      return state
        .set('loading', false)
        .set('error', false)
        .set('data', false)
        .set('requestBody', action.data);
    default:
      return state;
  }
}
export default empMasterListReducer;
