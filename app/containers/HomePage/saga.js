/**
 * Get our References and store it on Global State
 */
import { call, put, select, takeLatest, fork } from 'redux-saga/effects';

import request from 'utils/request';

import {
  API_FORMREFS,
  API_APPLFORMREFS,
  API_ONSPOTEARNTYPES,
  API_ONSPOTDEDUCTTYPES,
  API_TIMEDEARNTYPES,
  API_TIMEDDEDUCTTYPES,
  API_SHIFTREC,
  API_LEAVEREQLIST,
  API_WORKFLOWFORMLIST,
} from 'containers/App/constants';

import {
  sessionIsExpired,
} from 'containers/App/actions';

import {
  makeSelectToken,
  makeSelectUsername,
  makeSelectUserInfo,
} from 'containers/App/selectors';

import {
  GET_DATA,
  DATA_REFS,
  DATA_FORMREQSUCCESS,
  DATA_APPLFORMSUCCESS,
  DATA_ONSPOTEARNSUCCESS,
  DATA_ONSPOTDEDUCTSUCCESS,
  DATA_TIMEDEARNSUCCESS,
  DATA_TIMEDDEDUCTSUCCESS,
  DATA_CUSTOMFORMSEARNSUCCESS,
  EMP_SHIFTSUMMARYSUCCESS,
  EMP_SHIFTSUMMARYERROR,
  EMP_LEAVEHISTORYSUCCESS,
  EMP_LEAVEHISTORYERROR,
  DATA_REFSSUCCESS,
} from './constants';

import {
  getWriteSuccess,
  getWriteError,
  retrieveDataRefsSuccess,
  retrieveDataRefsError,
} from './actions';

import {
  makeSelectList,
} from './selectors';

let username;
let token;

/* eslint quote-props: ["error", "consistent"] */
/*
 * Refs request/response handler
 */
function* getRefs() {
  yield fork(getFormRefs);
  yield fork(getApplFormRefs);
  yield fork(getOnSpotEarn);
  yield fork(getOnSpotDeduct);
  yield fork(getTimedEarn);
  yield fork(getTimedDeduct);
  yield fork(getCustomForms);
}

/**
 * Form References request/response handler
 */
function* getFormRefs() {
  // Our API URL (from app/constants.js)
  const requestURL = API_FORMREFS;

  // Declare our headers defaults
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
  };

  try {
    // Call our request helper ('utils/request') to connect to our API
    const formRefRes = yield call(request, requestURL, options);
    const resp = formRefRes.JobFormLoadPrivateResult[0];

    if (resp.ResponseCode === 200) {
      // Assign our response ObjectList in variable
      const data = resp.ObjectList;

      // On success, put our retrieved data in our state tree
      yield put(retrieveDataRefsSuccess(DATA_FORMREQSUCCESS, data));
    } else if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(retrieveDataRefsError(resp));
      }
    }
  } catch (err) {
    yield put(retrieveDataRefsError(err));
  }
}

/**
 * Applicant Form Refs request/response handler
 */
function* getApplFormRefs() {
  // Our API URL (from app/constants.js)
  const requestURL = API_APPLFORMREFS;

  // Declare our headers defaults
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
  };

  try {
    // Call our request helper ('utils/request') to connect to our API
    const applFormRefRes = yield call(request, requestURL, options);
    const resp = applFormRefRes.GetApplFormRefsResult[0];

    if (resp.ResponseCode === 200) {
      // Assign our response ObjectList in variable
      const data = resp.ObjectList;

      // On success, put our retrieved data in our state tree
      yield put(retrieveDataRefsSuccess(DATA_APPLFORMSUCCESS, data));
    } else if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(retrieveDataRefsError(resp));
      }
    }
  } catch (err) {
    yield put(retrieveDataRefsError(err));
  }
}

/**
 * On Spot Earn request/response handler
 */
function* getOnSpotEarn() {
  // Our API URL (from app/constants.js)
  const requestURL = API_ONSPOTEARNTYPES;

  // Declare our headers defaults
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
  };

  try {
    // Call our request helper ('utils/request') to connect to our API
    const onSpotEarnRes = yield call(request, requestURL, options);
    const resp = onSpotEarnRes.GetOnSpotEarnTypeListingsResult[0];

    if (resp.ResponseCode === 200) {
      // Assign our response ObjectList in variable
      const data = resp.ObjectList;

      // On success, put our retrieved data in our state tree
      yield put(retrieveDataRefsSuccess(DATA_ONSPOTEARNSUCCESS, data));
    } else if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(retrieveDataRefsError(resp));
      }
    }
  } catch (err) {
    yield put(retrieveDataRefsError(err));
  }
}

/**
 * On Spot Deduct request/response handler
 */
function* getOnSpotDeduct() {
  // Our API URL (from app/constants.js)
  const requestURL = API_ONSPOTDEDUCTTYPES;

  // Declare our headers defaults
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
  };

  try {
    // Call our request helper ('utils/request') to connect to our API
    const onSpotDeductRes = yield call(request, requestURL, options);
    const resp = onSpotDeductRes.GetOnSpotDeductTypeListingsResult[0];

    if (resp.ResponseCode === 200) {
      // Assign our response ObjectList in variable
      const data = resp.ObjectList;

      // On success, put our retrieved data in our state tree
      yield put(retrieveDataRefsSuccess(DATA_ONSPOTDEDUCTSUCCESS, data));
    } else if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(retrieveDataRefsError(resp));
      }
    }
  } catch (err) {
    yield put(retrieveDataRefsError(err));
  }
}

/**
 * Timed Earn request/response handler
 */
function* getTimedEarn() {
  // Our API URL (from app/constants.js)
  const requestURL = API_TIMEDEARNTYPES;

  // Declare our headers defaults
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
  };

  try {
    // Call our request helper ('utils/request') to connect to our API
    const timedEarnRes = yield call(request, requestURL, options);
    const resp = timedEarnRes.GetTimedEarnTypeListingsResult[0];

    if (resp.ResponseCode === 200) {
      // Assign our response ObjectList in variable
      const data = resp.ObjectList;

      // On success, put our retrieved data in our state tree
      yield put(retrieveDataRefsSuccess(DATA_TIMEDEARNSUCCESS, data));
    } else if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(retrieveDataRefsError(resp));
      }
    }
  } catch (err) {
    yield put(retrieveDataRefsError(err));
  }
}

/**
 * Timed Deduct request/response handler
 */
function* getTimedDeduct() {
  // Our API URL (from app/constants.js)
  const requestURL = API_TIMEDDEDUCTTYPES;

  // Declare our headers defaults
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
  };

  try {
    // Call our request helper ('utils/request') to connect to our API
    const timedDeductRes = yield call(request, requestURL, options);
    const resp = timedDeductRes.GetTimedDeductTypeListingsResult[0];

    if (resp.ResponseCode === 200) {
      // Assign our response ObjectList in variable
      const data = resp.ObjectList;

      // On success, put our retrieved data in our state tree
      yield put(retrieveDataRefsSuccess(DATA_TIMEDDEDUCTSUCCESS, data));
    } else if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(retrieveDataRefsError(resp));
      }
    }
  } catch (err) {
    yield put(retrieveDataRefsError(err));
  }
}

/**
 * Custom Forms request/response handler
 */
function* getCustomForms() {
  // Our API URL (from app/constants.js)
  const requestURL = API_WORKFLOWFORMLIST;

  // Declare our headers defaults
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
  };

  try {
    // Call our request helper ('utils/request') to connect to our API
    const customFormReq = yield call(request, requestURL, options);
    const resp = customFormReq.GetWorkFlowFormsResult[0];

    if (resp.ResponseCode === 200) {
      // Assign our response ObjectList in variable
      const data = resp.ObjectList;

      // On success, put our retrieved data in our state tree
      yield put(retrieveDataRefsSuccess(DATA_CUSTOMFORMSEARNSUCCESS, data));
      yield put(retrieveDataRefsSuccess(DATA_REFSSUCCESS, true));
    } else if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(retrieveDataRefsError(resp));
      }
    }
  } catch (err) {
    yield put(retrieveDataRefsError(err));
  }
}

/**
 * Get Datas handler
 */
function* getDatas() {
  yield fork(getShiftRecord);
  yield fork(getLeaveReqList);
}

/**
 * Shift Record Request/Response handler
 */
function* getShiftRecord() {
  const shiftSummaryObject = yield select(makeSelectList('empShiftSummary'));
  const pageIndex = shiftSummaryObject.get('pageIndex');
  const date = shiftSummaryObject.get('date');

  // Get stored employee profile id and data
  const userData = yield select(makeSelectUserInfo());

  const requestURL = API_SHIFTREC;

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
        'PageSize': 50,
      },
      'EmpProfileID': userData.EmpProfileID,
      'DateByShift': date,
    }),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.GetShiftRecordListingsResult[0];

    if (resp.ResponseCode === 200) {
      const data = resp.ObjectList;
      const pages = resp.PageDetails;

      yield put(getWriteSuccess(EMP_SHIFTSUMMARYSUCCESS, data, pages));
    } else if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getWriteError(EMP_SHIFTSUMMARYERROR, resp));
      }
    }
  } catch (err) {
    yield put(getWriteError(EMP_SHIFTSUMMARYERROR, err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Leave Request List request/response handler
 */
function* getLeaveReqList() {
  const leaveHistoryObject = yield select(makeSelectList('empLeaveHistory'));
  const pageIndex = leaveHistoryObject.get('pageIndex');

  // Get stored employee profile id and data
  const userData = yield select(makeSelectUserInfo());

  // API URL (from app/constants.js)
  const requestURL = API_LEAVEREQLIST;

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
        'PageSize': 5,
      },
      'CreatedBy': userData.EmpProfileID,
    }),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.GetLeaveRequestListingsResult[0];

    if (resp.ResponseCode === 200) {
      const data = resp.ObjectList;
      const pages = resp.PageDetails;

      yield put(getWriteSuccess(EMP_LEAVEHISTORYSUCCESS, data, pages));
    } else if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getWriteError(EMP_LEAVEHISTORYERROR, resp));
      }
    }
  } catch (err) {
    yield put(getWriteError(EMP_LEAVEHISTORYERROR, err));
    console.error(err); // eslint-disable-line no-console
  }
}


/**
 * Root saga manages watcher lifecycle
 */
export default function* homeSagas() {
  // Watches for actions and calls their function when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount

  // Get stored username and token in global state
  username = yield select(makeSelectUsername());
  token = yield select(makeSelectToken());

  yield takeLatest(DATA_REFS, getRefs);
  yield takeLatest(GET_DATA, getDatas);
}
