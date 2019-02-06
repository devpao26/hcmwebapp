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
  LIST_JOSSUCCESS,
  LIST_JOSFAILED,
  LIST_JOS,
  MOVED_SUCCESS,
  CHANGE_JOSTAT,
  WRITE_IDS,
  IS_NOTIF,
  SEARCH_FILTER,
} from './constants';

const initialState = fromJS({
  onBoardingList: {
    redirect: false,
    isSuccessNotif: false,
    joIds: {
      jobId: false,
      joStatId: false,
    },
    onBoarding: {
      loading: false,
      error: false,
      ObjectList: false,
      PageDetails: false,
      PageIndex: false,
      JoStatus: 'Others',
      SearchFilter: {
        location: false,
        value: false,
      },
    },
  },
});

function onBoardingReducer(state = initialState, action) {
  switch (action.type) {
    case LIST_JOS:
      return state
        .setIn(['onBoardingList', 'onBoarding', 'loading'], true)
        .setIn(['onBoardingList', 'onBoarding', 'error'], false)
        .setIn(['onBoardingList', 'onBoarding', 'PageIndex'], action.page)
        .setIn(['onBoardingList', 'onBoarding', 'SearchFilter', 'value'], action.search)
        .setIn(['onBoardingList', 'onBoarding', 'SearchFilter', 'location'], action.loc)
        .setIn(['onBoardingList', 'onBoarding', 'ObjectList'], false);
    case WRITE_IDS:
      return state
        .setIn(['onBoardingList', 'joIds', 'jobId'], action.jobId)
        .setIn(['onBoardingList', 'joIds', 'joStatId'], action.joStatId);
    case CHANGE_JOSTAT:
      return state
        .setIn(['onBoardingList', 'redirect'], false);
    case MOVED_SUCCESS:
      return state
        .setIn(['onBoardingList', 'redirect'], true);
    case IS_NOTIF:
      return state
        .setIn(['onBoardingList', 'isSuccessNotif'], action.notif)
        .setIn(['onBoardingList', 'onBoarding', 'JoStatus'], action.status);
    case LIST_JOSSUCCESS:
      return state
        .setIn(['onBoardingList', 'onBoarding', 'ObjectList'], action.jolist)
        .setIn(['onBoardingList', 'onBoarding', 'PageDetails'], action.jolistpages)
        .setIn(['onBoardingList', 'onBoarding', 'loading'], false);
    case LIST_JOSFAILED:
      return state
        .setIn(['onBoardingList', 'onBoarding', 'PageDetails'], false)
        .setIn(['onBoardingList', 'onBoarding', 'loading'], false)
        .setIn(['onBoardingList', 'onBoarding', 'error'], action.error);
    case SEARCH_FILTER:
      return state
        .setIn(['onBoardingList', 'onBoarding', 'loading'], true)
        .setIn(['onBoardingList', 'onBoarding', 'error'], false)
        .setIn(['onBoardingList', 'onBoarding', 'ObjectList'], false)
        .setIn(['onBoardingList', 'onBoarding', 'PageDetails'], false)
        .setIn(['onBoardingList', 'onBoarding', 'PageIndex'], 1)
        .setIn(['onBoardingList', 'onBoarding', 'SearchFilter', 'location'], action.loc)
        .setIn(['onBoardingList', 'onBoarding', 'SearchFilter', 'value'], action.input);
    default:
      return state;
  }
}

export default onBoardingReducer;
