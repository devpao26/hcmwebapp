/**
 * Toaster Reducer
 */
import { fromJS } from 'immutable';

import { SHOW_TOASTER, HIDE_TOASTER } from './constants';

// The initial state
const initialState = fromJS({
  toggleToaster: false,
  toasterData: false,
});

function toasterReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_TOASTER:
      return state
        .set('toggleToaster', true)
        .set('toasterData', action.data);
    case HIDE_TOASTER:
      return state
        .set('toggleToaster', false)
        .set('toasterData', false);
    default:
      return state;
  }
}

export default toasterReducer;
