/*
 *
 * SHIFTSUMM reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_SHIFTSUMMLIST,
  SHIFTSUMMLIST_SUCCESS,
  SHIFTSUMMLIST_ERROR,
} from './constants';

const initialState = fromJS({
  shiftsummList: {
    loading: false,
    error: false,
    data: false,
    filter: false,
    pages: false,
    selectedItem: false,
  },
});


function shiftsummReducer(state = initialState, action) {
    switch (action.type) {
  
      case GET_SHIFTSUMMLIST:
        return state
          .setIn(['shiftsummList', 'loading'], true)
          .setIn(['shiftsummList', 'error'], false)
          .setIn(['shiftsummList', 'data'], false)
          
          .setIn(['shiftsummList', 'filter'], action.filter)
          .setIn(['shiftsummList', 'selectedItem'], false);
      case SHIFTSUMMLIST_SUCCESS:
        return state
          .setIn(['shiftsummList', 'loading'], false)
          .setIn(['shiftsummList', 'error'], false)
          .setIn(['shiftsummList', 'data'], action.data)
          .setIn(['shiftsummList', 'pages'], action.page)
          .setIn(['shiftsummList', 'filter'], false)
          .setIn(['shiftsummList', 'selectedItem'], false);
      case SHIFTSUMMLIST_ERROR:
        return state
          .setIn(['shiftsummList', 'loading'], false)
          .setIn(['shiftsummList', 'error'], action.error)
          .setIn(['shiftsummList', 'data'], false)
          .setIn(['shiftsummList', 'pages'], false)
          .setIn(['shiftsummList', 'filter'], false)
          .setIn(['shiftsummList', 'selectedItem'], false);
  
  
      default:
        return state;
    }
  }
  
  export default shiftsummReducer;