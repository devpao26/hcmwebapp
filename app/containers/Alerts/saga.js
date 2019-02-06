/**
 * Alerts and Notification Sagas
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';

import {
  API_ALERTSNOTIF,
  API_SEENALERTSNOTIF,
  API_FORMUPDATESTATUS,
} from 'containers/App/constants';

import { sessionIsExpired } from 'containers/App/actions';

import {
  makeSelectToken,
  makeSelectUsername,
} from 'containers/App/selectors';

import {
  GET_ALERTS, MARK_READ, UPDATE_STATUS,
} from './constants';

import {
  getAlertsNotifSuccess, getAlertsNotifError,
  getMarkAsReadSuccess, getMarkAsReadError,
  updateRequestStatusSuccess, updateRequestStatusError,
} from './action';

import {
  makeSelectIsRead,
  makeSelectIsAlert,
  makeSelectEmpID,
  makeSelectPageIndex,
  makeSelectData,
} from './selector';

let username;
let token;
const pageSize = 20;
let pageIndex = 1;

/* eslint quote-props: ["error", "consistent"] */
/**
 * Get Alerts/Notif request/response handler
 */
export function* getAlertsNotif() {
  const PageIndex = yield select(makeSelectPageIndex('alertsNotif'));
  if (PageIndex) pageIndex = PageIndex;

  const empID = yield select(makeSelectEmpID());
  const IsAlert = yield select(makeSelectIsAlert());
  const isRead = yield select(makeSelectIsRead());

  let IsRead;
  if (isRead) IsRead = false;

  const requestURL = API_ALERTSNOTIF;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
    body: JSON.stringify({
      'SortFilter': {
        'PageSize': pageSize,
        'PageIndex': pageIndex,
      },
      'EmpProfileID': empID,
      IsAlert,
      IsRead,
    }),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.GetAlertsAndNotifsListingsResult[0];

    if (resp.ResponseCode === 200) {
      const data = resp.ObjectList;
      const pages = resp.PageDetails;
      yield put(getAlertsNotifSuccess(data, pages));
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getAlertsNotifError(resp));
      }
    }
  } catch (err) {
    yield put(getAlertsNotifError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Update Form Request Status (approver) request/response handler
 */
export function* updateFormRequestStatus() {
  const reqData = yield select(makeSelectData('updateStatus'));

  // API URL (from app/constants.js)
  const requestURL = `${API_FORMUPDATESTATUS}${reqData.formID}/${reqData.statusID}`;

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.UpdateFormRequestStepStatusResult[0];

    if (resp.ResponseCode === 200) {
      yield put(updateRequestStatusSuccess());
    }

    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(updateRequestStatusError(resp));
      }
    }
  } catch (err) {
    yield put(updateRequestStatusError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Mark as Read Alerts/Notif request/response handler
 */
export function* getMarkAsRead() {
  const id = yield select(makeSelectData('markRead'));
  const requestURL = API_SEENALERTSNOTIF + id;

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.UpdateAlertsAndNotifsReadResult[0];

    if (resp.ResponseCode === 200) {
      yield put(getMarkAsReadSuccess());
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getMarkAsReadError(resp));
      }
    }
  } catch (err) {
    yield put(getMarkAsReadError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
* Root saga manages watcher lifecycle
*/
export default function* rootSaga() {
  // Get our stored username and token
  token = yield select(makeSelectToken());
  username = yield select(makeSelectUsername());

  yield takeLatest(GET_ALERTS, getAlertsNotif);
  yield takeLatest(MARK_READ, getMarkAsRead);
  yield takeLatest(UPDATE_STATUS, updateFormRequestStatus);
}
