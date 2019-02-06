/**
 * Get our Employee Masterlist
 */
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import request from 'utils/request';

import {
  API_EMPLISTS,
  API_PR_EMPDTR_INFO,
  API_SHIFTREC,
  API_REPORT_WF_DTR,
  API_PR_DTR,
} from 'containers/App/constants';

import {
  sessionIsExpired,
} from 'containers/App/actions';

import { makeSelectToken, makeSelectUsername } from 'containers/App/selectors';

import {
  DTREMP_LIST,
  DTR_EMP_INFO,
  DTREMP_SHIFTRECLIST,
  DTR_REPORT,
  MANUAL_DTR,
} from './constants';

import {
  retrievalSuccess,
  retrievalFailed,
  retrievalDTRInfoSuccess,
  retrievalDTRInfoFailed,
  retrievalShiftRecsSuccess,
  retrievalShiftRecsFailed,
  retrievalDTRReportSuccess,
  retrievalDTRReportFailed,
  manualDtrOverrideSuccess,
  manualDtrOverrideError,
} from './actions';

import {
  makeSelectPageIndex,
  makeSelectedDTRDateEmp,
  makeSelectEmpID,
  makeSelectShiftRecsPageIndex,
  makeSelectSearch,
  makeSelectFilter,
  makeSelectData,
} from './selectors';

let username;
let token;
const pageSize = 20;
let pageIndex = 1;

/* eslint quote-props: ["error", "consistent"] */
/**
 * Employee Masterlist request/response handler
 */
export function* getDTREmpList() {
  // Our API URL (from app/constants.js)
  const requestURL = API_EMPLISTS;

  // Get our Page Index
  const PageIndex = yield select(makeSelectPageIndex('empList'));
  if (PageIndex !== false) {
    pageIndex = PageIndex;
  }

  const search = yield select(makeSelectSearch());
  let FirstAndLastName;
  if (search) {
    FirstAndLastName = search;
  }

  const location = yield select(makeSelectFilter());
  let ComSiteLocID;
  if (location && location !== 'All') {
    ComSiteLocID = location;
  }

  // Declare our headers defaults
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
    body: JSON.stringify({
      'SortFilter': {
        'PageIndex': pageIndex,
        'PageSize': pageSize,
        'SortBy': 'LastName', // LastName, Mobile, CreatedDate
        'SortExpression': 'ASC',
      },
      'Includes': {
        'isShortDetails': true,
        'withAvatar': true,
      },
      FirstAndLastName,
      ComSiteLocID,
    }),
  };

  try {
    // Call our request helper ('utils/request') to connect to our API
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.GetEmpProfilesResult[0];

    if (resp.ResponseCode === 200) {
      // Assign our response ObjectList and PageDetails in variable
      const objectList = resp.ObjectList;
      const pageDetails = resp.PageDetails;

      yield delay(500);
      // On success, put our retrieved data in our state tree
      yield put(retrievalSuccess(objectList, pageDetails));
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(retrievalFailed(resp));
      }
    }
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    yield put(retrievalFailed(err));
  }
}


/**
 * Employee DTR Details/Information request/response handler
 */
export function* getDTREmpInfo() {
  // Our API URL (from app/constants.js)
  const requestURL = API_PR_EMPDTR_INFO;

  const dteSelected = yield select(makeSelectedDTRDateEmp());
  const empID = yield select(makeSelectEmpID()); // TODO: make selection from the actual selected emp from list

  // Declare headers defaults
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
    body: JSON.stringify({
      'EmpProfileID': empID, // "f0378e4d-f929-4507-9185-fee04264d96f"
      'RangeFromDate': dteSelected, // "01/10/2018"
    }),
  };

  try {
    // Call our request helper ('utils/request') to connect to our API
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.GetDTRListingsResult[0];

    if (resp.ResponseCode === 200) {
      // Assign our response ObjectList and PageDetails in variable
      const objectList = resp.ObjectList;
      const pageDetails = resp.PageDetails;

      yield delay(500);
      // On success, put our retrieved data in our state tree
      yield put(retrievalDTRInfoSuccess(objectList, pageDetails));
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(retrievalDTRInfoFailed(resp));
      }
    }
  } catch (err) {
    console.error(err);// eslint-disable-line no-console
    yield put(retrievalDTRInfoFailed(err));
  }
}

/**
 * Shift Record Request/Response handler
 */
export function* getShiftRecord() {
  // Get our Page Index
  const PageIndex = yield select(makeSelectShiftRecsPageIndex());
  if (PageIndex !== false) {
    pageIndex = PageIndex;
  }

  // Get stored employee profile id and data
  const dteSelected = yield select(makeSelectedDTRDateEmp());
  const empID = yield select(makeSelectEmpID());

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
        'PageSize': pageSize,
      },
      'EmpProfileID': empID,
      'DateFrom': dteSelected,
    }),
  };

  try {
    const apiReqShift = yield call(request, reqShiftReqURL, shiftReqData);
    const respShift = apiReqShift.GetShiftRecordListingsResult[0];

    if (respShift.ResponseCode === 200) {
      const pages = apiReqShift.GetShiftRecordListingsResult[0].PageDetails;

      yield put(retrievalShiftRecsSuccess(respShift.ObjectList, pages));
    }
    if (respShift.ErrorCode !== 0) {
      if (respShift.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(retrievalShiftRecsFailed(respShift));
      }
    }
  } catch (err) {
    console.error(err);// eslint-disable-line no-console
    yield put(retrievalShiftRecsFailed(err));
  }
}

/**
 * DTR Report Request/Response handler
 */
export function* getDTRReport() {
  // Get stored employee profile id and data
  const dteSelected = yield select(makeSelectedDTRDateEmp());

  const apiDtrReport = API_REPORT_WF_DTR;

  const dtrReportGenData = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
    body: JSON.stringify({
      'DateFrom': dteSelected,
    }),
  };

  try {
    const apiReqDtrReport = yield call(request, apiDtrReport, dtrReportGenData);
    const respDTRRep = apiReqDtrReport.ExportWFAMResult[0];

    if (respDTRRep.ResponseCode === 200) {
      yield put(retrievalDTRReportSuccess(respDTRRep.ObjectList));
    }
    if (respDTRRep.ErrorCode !== 0) {
      if (respDTRRep.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(retrievalDTRReportFailed(respDTRRep));
      }
    }
  } catch (err) {
    console.error(err);// eslint-disable-line no-console
    yield put(retrievalDTRReportFailed(err));
  }
}

/**
 * Manual DTR Override request/response handler
 */
export function* getManualDtrOverride() {
  const data = yield select(makeSelectData('manualDtr'));
  const requestURL = API_PR_DTR;

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
    body: JSON.stringify(data),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.UpdateDTRManualResult[0];

    if (resp.ResponseCode === 200) {
      yield put(manualDtrOverrideSuccess());
    }

    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(manualDtrOverrideError(resp));
      }
    }
  } catch (err) {
    yield put(manualDtrOverrideError(err));
    console.error(err); // eslint-disable-line no-console
  }
}


/**
 * Root saga manages watcher lifecycle
 */
export default function* empDTRSagas() {
  // Watches for actions and calls functions when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  // Get our stored username and token
  username = yield select(makeSelectUsername());
  token = yield select(makeSelectToken());

  yield takeLatest(DTREMP_LIST, getDTREmpList);
  yield takeLatest(DTR_EMP_INFO, getDTREmpInfo);
  yield takeLatest(DTREMP_SHIFTRECLIST, getShiftRecord);
  yield takeLatest(DTR_REPORT, getDTRReport);
  yield takeLatest(MANUAL_DTR, getManualDtrOverride);
}
