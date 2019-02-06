/*
 *
 * Work Group reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_WGLIST,
  WGLIST_SUCCESS,
  WGLIST_ERROR,
} from './constants';

const initialState = fromJS({
  wgList: {
    loading: false,
    error: false,
    data: false,
    filter: false,
    pages: false,
    selectedItem: false,
  },
});


function WGListReducer(state = initialState, action) {
    switch (action.type) {
  
      case GET_WGLIST:
        return state
          .setIn(['wgList', 'loading'], true)
          .setIn(['wgList', 'error'], false)
          .setIn(['wgList', 'data'], false)
          
          .setIn(['wgList', 'filter'], action.filter)
          .setIn(['wgList', 'selectedItem'], false);
      case WGLIST_SUCCESS:
        return state
          .setIn(['wgList', 'loading'], false)
          .setIn(['wgList', 'error'], false)
          .setIn(['wgList', 'data'], action.data)
          .setIn(['wgList', 'pages'], action.page)
          .setIn(['wgList', 'filter'], false)
          .setIn(['wgList', 'selectedItem'], false);
      case WGLIST_ERROR:
        return state
          .setIn(['wgList', 'loading'], false)
          .setIn(['wgList', 'error'], action.error)
          .setIn(['wgList', 'data'], false)
          .setIn(['wgList', 'pages'], false)
          .setIn(['wgList', 'filter'], false)
          .setIn(['wgList', 'selectedItem'], false);
  
  
      default:
        return state;
    }
  }
  
  export default WGListReducer;