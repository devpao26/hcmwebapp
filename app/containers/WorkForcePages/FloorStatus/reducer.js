/*
 * Floor Status reducer
 */

import { fromJS } from 'immutable';
import {
  WRITE_IDDATE,
  GET_SHIFTREC,
  GET_SSHOT,
  GET_ACTIVEAPP,
  GET_BROWSERURL,
  GET_WORKSTAT,
  SUCCESS_SHIFTREC,
  SUCCESS_SSHOT,
  SUCCESS_ACTIVEAPP,
  SUCCESS_BROWSERURL,
  SUCCESS_WORKSTAT,
  ERROR_SHIFTREC,
  ERROR_SSHOT,
  ERROR_ACTIVEAPP,
  ERROR_BROWSERURL,
  ERROR_WORKSTAT,
  REQUEST_DTR,
  REQUEST_DTRSUCCESS,
  REQUEST_DTRERROR,
  CLEAR_URI,
} from './constants';

const initialState = fromJS({
  empFloorStatus: {
    empId: false,
    date: false,
    filter: false,
    shiftRec: {
      loading: false,
      error: false,
      data: false,
      pages: false,
      pageIndex: 1,
    },
    screenShot: {
      loading: false,
      error: false,
      data: false,
      pages: false,
      pageIndex: 1,
    },
    activeApps: {
      loading: false,
      error: false,
      data: false,
      pages: false,
      pageIndex: 1,
    },
    browserUrl: {
      loading: false,
      error: false,
      data: false,
      pages: false,
      pageIndex: 1,
    },
    workStat: {
      loading: false,
      error: false,
      data: false,
      pages: false,
      pageIndex: 1,
    },
  },
  dtr: {
    loading: false,
    error: false,
    teamId: false,
    date: false,
    uri: false,
  },
});

function floorStatusReducer(state = initialState, action) {
  switch (action.type) {
    case WRITE_IDDATE:
      return state
        .setIn(['empFloorStatus', 'empId'], action.id)
        .setIn(['empFloorStatus', 'date'], action.date)
        .setIn(['empFloorStatus', 'filter'], action.filter)
        .setIn(['empFloorStatus', 'shiftRec', 'data'], false)
        .setIn(['empFloorStatus', 'screenShot', 'data'], false)
        .setIn(['empFloorStatus', 'activeApps', 'data'], false)
        .setIn(['empFloorStatus', 'browserUrl', 'data'], false)
        .setIn(['empFloorStatus', 'workStat', 'data'], false)
        .setIn(['empFloorStatus', 'shiftRec', 'pages'], false)
        .setIn(['empFloorStatus', 'screenShot', 'pages'], false)
        .setIn(['empFloorStatus', 'activeApps', 'pages'], false)
        .setIn(['empFloorStatus', 'browserUrl', 'pages'], false)
        .setIn(['empFloorStatus', 'workStat', 'pages'], false)
        .setIn(['empFloorStatus', 'shiftRec', 'pageIndex'], 1)
        .setIn(['empFloorStatus', 'screenShot', 'pageIndex'], 1)
        .setIn(['empFloorStatus', 'activeApps', 'pageIndex'], 1)
        .setIn(['empFloorStatus', 'browserUrl', 'pageIndex'], 1)
        .setIn(['empFloorStatus', 'workStat', 'pageIndex'], 1)
        .setIn(['empFloorStatus', 'shiftRec', 'loading'], true)
        .setIn(['empFloorStatus', 'screenShot', 'loading'], true)
        .setIn(['empFloorStatus', 'activeApps', 'loading'], true)
        .setIn(['empFloorStatus', 'browserUrl', 'loading'], true)
        .setIn(['empFloorStatus', 'workStat', 'loading'], true)
        .setIn(['empFloorStatus', 'shiftRec', 'error'], false)
        .setIn(['empFloorStatus', 'screenShot', 'error'], false)
        .setIn(['empFloorStatus', 'activeApps', 'error'], false)
        .setIn(['empFloorStatus', 'browserUrl', 'error'], false)
        .setIn(['empFloorStatus', 'workStat', 'error'], false);
    case GET_SHIFTREC:
      return state
        .setIn(['empFloorStatus', 'shiftRec', 'pageIndex'], action.page)
        .setIn(['empFloorStatus', 'shiftRec', 'loading'], true);
    case GET_SSHOT:
      return state
        .setIn(['empFloorStatus', 'screenShot', 'pageIndex'], action.page)
        .setIn(['empFloorStatus', 'screenShot', 'loading'], true);
    case GET_ACTIVEAPP:
      return state
        .setIn(['empFloorStatus', 'activeApps', 'pageIndex'], action.page)
        .setIn(['empFloorStatus', 'activeApps', 'loading'], true);
    case GET_BROWSERURL:
      return state
        .setIn(['empFloorStatus', 'browserUrl', 'pageIndex'], action.page)
        .setIn(['empFloorStatus', 'browserUrl', 'loading'], true);
    case GET_WORKSTAT:
      return state
        .setIn(['empFloorStatus', 'workStat', 'pageIndex'], action.page)
        .setIn(['empFloorStatus', 'workStat', 'loading'], true);
    case SUCCESS_SHIFTREC:
      return state
        .setIn(['empFloorStatus', 'shiftRec', 'loading'], false)
        .setIn(['empFloorStatus', 'shiftRec', 'data'], action.data)
        .setIn(['empFloorStatus', 'shiftRec', 'pages'], action.pages);
    case SUCCESS_SSHOT:
      return state
        .setIn(['empFloorStatus', 'screenShot', 'loading'], false)
        .setIn(['empFloorStatus', 'screenShot', 'data'], action.data)
        .setIn(['empFloorStatus', 'screenShot', 'pages'], action.pages);
    case SUCCESS_ACTIVEAPP:
      return state
        .setIn(['empFloorStatus', 'activeApps', 'loading'], false)
        .setIn(['empFloorStatus', 'activeApps', 'data'], action.data)
        .setIn(['empFloorStatus', 'activeApps', 'pages'], action.pages);
    case SUCCESS_BROWSERURL:
      return state
        .setIn(['empFloorStatus', 'browserUrl', 'loading'], false)
        .setIn(['empFloorStatus', 'browserUrl', 'data'], action.data)
        .setIn(['empFloorStatus', 'browserUrl', 'pages'], action.pages);
    case SUCCESS_WORKSTAT:
      return state
        .setIn(['empFloorStatus', 'workStat', 'loading'], false)
        .setIn(['empFloorStatus', 'workStat', 'data'], action.data);
    case ERROR_SHIFTREC:
      return state
        .setIn(['empFloorStatus', 'shiftRec', 'loading'], false)
        .setIn(['empFloorStatus', 'shiftRec', 'error'], action.error);
    case ERROR_SSHOT:
      return state
        .setIn(['empFloorStatus', 'screenShot', 'loading'], false)
        .setIn(['empFloorStatus', 'screenShot', 'error'], action.error);
    case ERROR_ACTIVEAPP:
      return state
        .setIn(['empFloorStatus', 'activeApps', 'loading'], false)
        .setIn(['empFloorStatus', 'activeApps', 'error'], action.error);
    case ERROR_BROWSERURL:
      return state
        .setIn(['empFloorStatus', 'browserUrl', 'loading'], false)
        .setIn(['empFloorStatus', 'browserUrl', 'error'], action.error);
    case ERROR_WORKSTAT:
      return state
        .setIn(['empFloorStatus', 'workStat', 'loading'], false)
        .setIn(['empFloorStatus', 'workStat', 'error'], action.error);
    case REQUEST_DTR:
      return state
        .setIn(['dtr', 'loading'], true)
        .setIn(['dtr', 'error'], false)
        .setIn(['dtr', 'teamId'], action.id)
        .setIn(['dtr', 'date'], action.date);
    case REQUEST_DTRSUCCESS:
      return state
        .setIn(['dtr', 'loading'], false)
        .setIn(['dtr', 'uri'], action.uri)
        .setIn(['dtr', 'teamId'], false)
        .setIn(['dtr', 'date'], false);
    case REQUEST_DTRERROR:
      return state
        .setIn(['dtr', 'error'], action.error)
        .setIn(['dtr', 'loading'], false)
        .setIn(['dtr', 'teamId'], false)
        .setIn(['dtr', 'date'], false);
    case CLEAR_URI:
      return state
        .setIn(['dtr', 'uri'], false);
    default:
      return state;
  }
}

export default floorStatusReducer;
