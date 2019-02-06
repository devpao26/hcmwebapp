/**
 * Get our Emp Profile Related Info
 */
import { call, put, select, takeLatest } from 'redux-saga/effects';

// Import Request (fetch api)
import request from 'utils/request';

import {
  API_EMPLISTS,
  API_EMPPROFILE,
  API_EMPPPEREQS,
} from 'containers/App/constants';

import { makeSelectToken, makeSelectUsername } from 'containers/App/selectors';
import {
  sessionIsExpired,
} from 'containers/App/actions';

import { makeSelectEmpID, makeSelectData } from './selectors';
import { getEmpProfileSuccess, getEmpProfileError, getUpdateEmpProfSuccess, getUpdateEmpProfError, getEmpReqsSuccess, getEmpReqsError } from './actions';
import { EmpProfile, UpdateProfile, EmpReqs } from './constants';

let username;
let token;

/* eslint quote-props: ["error", "consistent"] */
/**
 * Get Employee Profile
 */
function* getEmpProfile() {
  const empID = yield select(makeSelectEmpID());
  const requestURL = `${API_EMPLISTS}?id=${empID}`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      username,
      token,
    },
    body: JSON.stringify({
      'Includes': {
        // 'isShortDetails': true,
        'withAddress': true,
        'withAvatar': true,
        'withEmpIDs': true,
        'withWorkGroup': true,
        'withEmploymentStatus': true,
        'withJobRole': true,
        'withEmpLeaves': true,
        'withComSiteLoc': true,
      },
    }),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.GetEmpProfilesResult[0];

    if (resp.ResponseCode === 200) {
      const data = resp.ObjectList[0];
      yield put(getEmpProfileSuccess(data));
    } else if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getEmpProfileError(resp));
      }
    }
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Update Employee Profile request/response handler
 */
function* getUpdateEmpProfile() {
  const requestBody = yield select(makeSelectData('update'));
  const empID = yield select(makeSelectEmpID());

  const requestURL = API_EMPPROFILE + empID;

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      username,
      token,
    },
    body: JSON.stringify(requestBody),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.UpdateEmpProfileResult[0];

    if (resp.ResponseCode === 200) {
      yield put(getUpdateEmpProfSuccess());
    } else if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getUpdateEmpProfError(resp));
      }
    }
  } catch (err) {
    yield put(getUpdateEmpProfError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Employee Pre Employment Requirements
 */
function* getEmpReqs() {
  const empID = yield select(makeSelectEmpID());
  const requestURL = `${API_EMPPPEREQS}?id=${empID}`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      username,
      token,
    },
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.GetEmpPPEReqListingsResult[0];

    if (resp.ResponseCode === 200) {
      const data = resp.ObjectList;
      const pages = resp.PageDetails;
      yield put(getEmpReqsSuccess(data, pages));
    } else if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getEmpReqsError(resp));
      }
    }
  } catch (err) {
    yield put(getEmpReqsError(err));
    // console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* empProfSagas() {
  // Watches for actions and calls the function when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount

  // Get our stored username and token
  token = yield select(makeSelectToken());
  username = yield select(makeSelectUsername());

  yield takeLatest(EmpProfile.RETRIEVE, getEmpProfile);
  yield takeLatest(UpdateProfile.SUBMIT, getUpdateEmpProfile);
  yield takeLatest(EmpReqs.RETRIEVE, getEmpReqs);
  yield takeLatest(EmpReqs.PAGING, getEmpReqs);
}
