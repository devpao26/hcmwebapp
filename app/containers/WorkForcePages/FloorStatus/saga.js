import { takeLatest, call, put, select, fork } from 'redux-saga/effects';

// Import Request (fetch api)
import request from 'utils/request';

import {
  API_SHIFTREC,
  API_URLAPPLIST,
  API_SCREENSHOT,
  API_WORKSTATUS,
  API_REPORT_WF_DTR,
} from 'containers/App/constants';

import {
  makeSelectToken,
  makeSelectUsername,
} from 'containers/App/selectors';

import { sessionIsExpired } from 'containers/App/actions';

import {
  WRITE_IDDATE,
  GET_SSHOT,
  GET_ACTIVEAPP,
  GET_BROWSERURL,
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
} from './constants';

import {
  makeSelectEmpId,
  makeSelectDate,
  makeSelectPageIndex,
  makeSelectDtrDate,
  makeSelectFilterBy,
} from './selectors';

import {
  getDataSuccess,
  getDataError,
  dtrExportSuccess,
  dtrExportError,
} from './actions';

let username;
let token;

/* eslint quote-props: ["error", "consistent"] */
/**
 * Retrieve Department List request/response handler
 */
export function* getFloorStatusDatas() {
  yield fork(getShiftRecord);
  yield fork(getActiveApps);
  yield fork(getBrowserURL);
  yield fork(getScreenshot);
  yield fork(getWorkStatus);
}

/**
 * Shift Record Request/Response handler
 */
export function* getShiftRecord() {
  const pageIndex = yield select(makeSelectPageIndex('activeApps'));

  // Get stored employee profile id and data
  const empId = yield select(makeSelectEmpId());
  const date = yield select(makeSelectDate());
  const filter = yield select(makeSelectFilterBy());
  let DateByShift;
  let DateFrom;
  if (!filter) DateByShift = date;
  if (filter) DateFrom = date;

  const reqShiftReqURL = API_SHIFTREC;

  const shiftReqData = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
    body: JSON.stringify({
      'SortFilter': {
        'PageIndex': pageIndex,
        'PageSize': 150,
      },
      'EmpProfileID': empId,
      DateByShift,
      DateFrom,
    }),
  };

  try {
    const apiReqShift = yield call(request, reqShiftReqURL, shiftReqData);
    const respShift = apiReqShift.GetShiftRecordListingsResult[0];

    if (respShift.ResponseCode === 200) {
      const pages = apiReqShift.GetShiftRecordListingsResult[0].PageDetails;
      yield put(getDataSuccess(SUCCESS_SHIFTREC, respShift.ObjectList, pages));
    }
    if (respShift.ErrorCode !== 0) {
      if (respShift.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getDataError(ERROR_SHIFTREC, respShift));
      }
    }
  } catch (err) {
    yield put(getDataError(ERROR_SHIFTREC, err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Application/Url Request/Response handler
 */
export function* getActiveApps() {
  const pageIndex = yield select(makeSelectPageIndex('activeApps'));

  const empId = yield select(makeSelectEmpId());
  const date = yield select(makeSelectDate());
  const filter = yield select(makeSelectFilterBy());
  let ScreenDateTimeFrom;
  let DateByShift;
  if (filter) ScreenDateTimeFrom = date;
  if (!filter) DateByShift = date;

  const reqUrlAppURL = API_URLAPPLIST;

  const otherReqData = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
    body: JSON.stringify({
      'SortFilter': {
        'PageIndex': pageIndex,
      },
      'CreatedBy': empId,
      'isUrl': false,
      ScreenDateTimeFrom,
      DateByShift,
    }),
  };

  try {
    const apiReqAppUrl = yield call(request, reqUrlAppURL, otherReqData);
    const respAppUrl = apiReqAppUrl.GetAppUrlMonitoringListingsResult[0];

    if (respAppUrl.ResponseCode === 200) {
      const pages = apiReqAppUrl.GetAppUrlMonitoringListingsResult[0].PageDetails;
      yield put(getDataSuccess(SUCCESS_ACTIVEAPP, respAppUrl.ObjectList, pages));
    }
    if (respAppUrl.ErrorCode !== 0) {
      if (respAppUrl.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getDataError(ERROR_ACTIVEAPP, respAppUrl));
      }
    }
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    yield put(getDataError(ERROR_ACTIVEAPP, err));
  }
}

export function* getBrowserURL() {
  const pageIndex = yield select(makeSelectPageIndex('browserUrl'));

  const empId = yield select(makeSelectEmpId());
  const date = yield select(makeSelectDate());
  const filter = yield select(makeSelectFilterBy());
  let ScreenDateTimeFrom;
  let DateByShift;
  if (filter) ScreenDateTimeFrom = date;
  if (!filter) DateByShift = date;

  const reqUrlAppURL = API_URLAPPLIST;

  const otherReqData = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
    body: JSON.stringify({
      'SortFilter': {
        'PageIndex': pageIndex,
      },
      'CreatedBy': empId,
      'isUrl': true,
      ScreenDateTimeFrom,
      DateByShift,
    }),
  };

  try {
    const apiReqAppUrl = yield call(request, reqUrlAppURL, otherReqData);
    const respAppUrl = apiReqAppUrl.GetAppUrlMonitoringListingsResult[0];

    if (respAppUrl.ResponseCode === 200) {
      const pages = apiReqAppUrl.GetAppUrlMonitoringListingsResult[0].PageDetails;

      yield put(getDataSuccess(SUCCESS_BROWSERURL, respAppUrl.ObjectList, pages));
    }
    if (respAppUrl.ErrorCode !== 0) {
      if (respAppUrl.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getDataError(ERROR_BROWSERURL, respAppUrl));
      }
    }
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    yield put(getDataError(ERROR_BROWSERURL, err));
  }
}

/**
 * Screenshot Request/Response handler
 */
export function* getScreenshot() {
  const pageIndex = yield select(makeSelectPageIndex('screenShot'));

  const empId = yield select(makeSelectEmpId());
  const date = yield select(makeSelectDate());
  const filter = yield select(makeSelectFilterBy());
  let ScreenDateTimeFrom;
  let DateByShift;
  if (filter) ScreenDateTimeFrom = date;
  if (!filter) DateByShift = date;

  const reqScreenShotURL = API_SCREENSHOT;

  const otherReqData = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
    body: JSON.stringify({
      'SortFilter': {
        'PageIndex': pageIndex,
      },
      'CreatedBy': empId,
      ScreenDateTimeFrom,
      DateByShift,
    }),
  };

  try {
    const apiReqSshot = yield call(request, reqScreenShotURL, otherReqData);
    const respSshot = apiReqSshot.GetScreenShotsListingsResult[0];

    if (respSshot.ResponseCode === 200) {
      const pages = apiReqSshot.GetScreenShotsListingsResult[0].PageDetails;

      yield put(getDataSuccess(SUCCESS_SSHOT, respSshot.ObjectList, pages));
    }
    if (respSshot.ErrorCode !== 0) {
      if (respSshot.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getDataError(ERROR_SSHOT, respSshot));
      }
    }
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    yield put(getDataError(ERROR_SSHOT, err));
  }
}

/**
 * Work Status Request/Response handler
 */
export function* getWorkStatus() {
  const empId = yield select(makeSelectEmpId());
  const date = yield select(makeSelectDate());
  const reqWorkStatURL = API_WORKSTATUS;

  const otherReqData = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
    body: JSON.stringify({
      'CreatedBy': empId,
      'CreatedDateFrom': date,
    }),
  };

  try {
    const apiReqWorkStat = yield call(request, reqWorkStatURL, otherReqData);
    const respWorkStat = apiReqWorkStat.GetWorkStatusTemplateListingsResult[0];

    if (respWorkStat.ResponseCode === 200) {
      const pages = apiReqWorkStat.GetWorkStatusTemplateListingsResult[0].PageDetails;

      yield put(getDataSuccess(SUCCESS_WORKSTAT, respWorkStat.ObjectList, pages));
    }
    if (respWorkStat.ErrorCode !== 0) {
      if (respWorkStat.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getDataError(ERROR_WORKSTAT, respWorkStat));
      }
    }
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    yield put(getDataError(ERROR_WORKSTAT, err));
  }
}

/**
 * DTR Export request/response handler
 */
export function* getDtrExport() {
  const date = yield select(makeSelectDtrDate());
  const empId = yield select(makeSelectEmpId());
  const requestURL = API_REPORT_WF_DTR;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'username': username,
      'token': token,
    },
    body: JSON.stringify({
      'DateFrom': date,
      'EmpProfileID': empId,
    }),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.ExportWFAMResult[0];
    if (resp.ResponseCode === 200) {
      const uri = resp.ObjectList[0];
      yield put(dtrExportSuccess(uri));
    }

    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(dtrExportError(resp));
      }
    }
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    yield put(dtrExportError(err));
  }
}

// Individual exports for testing
export default function* floorStatusSagas() {
  // Watches for actions and calls their function when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount

  // Get stored username and token in global state
  username = yield select(makeSelectUsername());
  token = yield select(makeSelectToken());

  yield takeLatest(WRITE_IDDATE, getFloorStatusDatas);
  yield takeLatest(GET_ACTIVEAPP, getActiveApps);
  yield takeLatest(GET_BROWSERURL, getBrowserURL);
  yield takeLatest(GET_SSHOT, getScreenshot);
  yield takeLatest(REQUEST_DTR, getDtrExport);
}
