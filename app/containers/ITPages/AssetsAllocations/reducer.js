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
  CLEAR_STATE, // Clear state on unmount
  GET_ASSETSLIST,
  GET_ASSETSLIST_SUCCESS,
  GET_ASSETSLIST_ERROR,
  GET_ASSETSLIST_NORESET,
  GET_EMPLIST,
  GET_EMPLIST_SUCCESS,
  GET_EMPLIST_ERROR,
  GET_EMPLIST_NORESET,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  assetsallocations: {
    assetList: {
      loading: false,
      error: false,
      data: false,
      pages: false,
      search: false,
      pageIndex: 1,
    },
    empList: {
      loading: false,
      error: false,
      data: false,
      pages: false,
      search: false,
      pageIndex: 1,
    },
  },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_STATE:
      return initialState;
    case GET_ASSETSLIST:
      return state
        .setIn(['assetsallocations', 'assetList', 'loading'], true)
        .setIn(['assetsallocations', 'assetList', 'error'], false)
        .setIn(['assetsallocations', 'assetList', 'pages'], false)
        .setIn(['assetsallocations', 'assetList', 'data'], false)
        .setIn(['assetsallocations', 'assetList', 'search'], action.search)
        .setIn(['assetsallocations', 'assetList', 'pageIndex'], 1);
    case GET_ASSETSLIST_SUCCESS:
      return state
        .setIn(['assetsallocations', 'assetList', 'loading'], false)
        .setIn(['assetsallocations', 'assetList', 'pages'], action.pages)
        .setIn(['assetsallocations', 'assetList', 'data'], action.data);
    case GET_ASSETSLIST_ERROR:
      return state
        .setIn(['assetsallocations', 'assetList', 'loading'], false)
        .setIn(['assetsallocations', 'assetList', 'pages'], false)
        .setIn(['assetsallocations', 'assetList', 'data'], false)
        .setIn(['assetsallocations', 'assetList', 'pages'], false)
        .setIn(['assetsallocations', 'assetList', 'pageIndex'], 1)
        .setIn(['assetsallocations', 'assetList', 'search'], false)
        .setIn(['assetsallocations', 'assetList', 'error'], action.error);
    case GET_ASSETSLIST_NORESET:
      return state
        .setIn(['assetsallocations', 'assetList', 'loading'], true)
        .setIn(['assetsallocations', 'assetList', 'error'], false)
        .setIn(['assetsallocations', 'assetList', 'data'], false)
        .setIn(['assetsallocations', 'assetList', 'search'], action.search)
        .setIn(['assetsallocations', 'assetList', 'pageIndex'], action.page);
    case GET_EMPLIST:
      return state
        .setIn(['assetsallocations', 'empList', 'loading'], true)
        .setIn(['assetsallocations', 'empList', 'error'], false)
        .setIn(['assetsallocations', 'empList', 'pages'], false)
        .setIn(['assetsallocations', 'empList', 'data'], false)
        .setIn(['assetsallocations', 'empList', 'search'], action.search)
        .setIn(['assetsallocations', 'empList', 'pageIndex'], 1);
    case GET_EMPLIST_SUCCESS:
      return state
        .setIn(['assetsallocations', 'empList', 'loading'], false)
        .setIn(['assetsallocations', 'empList', 'pages'], action.pages)
        .setIn(['assetsallocations', 'empList', 'data'], action.data);
    case GET_EMPLIST_ERROR:
      return state
        .setIn(['assetsallocations', 'empList', 'loading'], false)
        .setIn(['assetsallocations', 'empList', 'pages'], false)
        .setIn(['assetsallocations', 'empList', 'data'], false)
        .setIn(['assetsallocations', 'empList', 'pages'], false)
        .setIn(['assetsallocations', 'empList', 'pageIndex'], 1)
        .setIn(['assetsallocations', 'empList', 'search'], false)
        .setIn(['assetsallocations', 'empList', 'error'], action.error);
    case GET_EMPLIST_NORESET:
      return state
        .setIn(['assetsallocations', 'empList', 'loading'], true)
        .setIn(['assetsallocations', 'empList', 'error'], false)
        .setIn(['assetsallocations', 'empList', 'data'], false)
        .setIn(['assetsallocations', 'empList', 'search'], action.search)
        .setIn(['assetsallocations', 'empList', 'pageIndex'], action.page);
    default:
      return state;
  }
}

export default appReducer;
