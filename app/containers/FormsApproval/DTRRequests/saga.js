/**
 * Requests Sagas
 */
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import request from 'utils/request';

import { makeSelectToken, makeSelectUsername, makeSelectUserInfo } from 'containers/App/selectors';

import {
  API_DTRREQUESTLIST,
  API_FORMUPDATESTATUS,
} from 'containers/App/constants';

import {
  sessionIsExpired,
} from 'containers/App/actions';

import {
  GET_LIST,
  UPDATE_REQUEST,
} from './constants';

import {
  getListRequestSuccess,
  getListRequestError,
  updateRequestStatusSuccess,
  updateRequestStatusError,
} from './actions';

import {
  makeSelectPageIndex,
  makeSelectFormReqID,
  makeSelectFormStatusID,
  makeSelectSearchValue,
  makeSelectFilterValue,
} from './selectors';

// Initialize username, token and pageSize
let username;
let token;
const pageSize = 20;
let pageIndex = 1;

/* eslint quote-props: ["error", "consistent"] */
/**
 * IRF request/response handler
 */
export function* getShowRequests() {
  const userData = yield select(makeSelectUserInfo());
  const empID = userData.EmpProfileID;

  // Get Search value
  const search = yield select(makeSelectSearchValue('formLists'));
  let RequestorName;
  if (search) {
    RequestorName = search;
  }

  // Get Filter Value
  const filter = yield select(makeSelectFilterValue('formLists'));

  let FormRequestStatusID;
  let ApproverStepStatus;
  if (filter === '487284dd-ce92-42ed-98ce-44a4f21e8f48') {
    FormRequestStatusID = filter;
  } else if (filter) {
    ApproverStepStatus = filter;
  }

  // Get Page Index
  const PageIndex = yield select(makeSelectPageIndex('formLists'));

  if (PageIndex) {
    pageIndex = PageIndex;
  }

  // API URL (from app/constants.js)
  const requestURL = API_DTRREQUESTLIST;

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
        'SortBy': 'LastModDate',
        'SortExpression': 'DESC',
      },
      // 'EmpIDRelatedToRequest': empID,
      // RequestorName,
      // FormRequestStatusID,
      // ApproverStepStatus,
      // 'Includes': {
      //   'inShortDetails': true,
      //   'withAvatar': true,
      //   'withWorkGroup': true,
      //   'withJobRole': true,
      // },
    }),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.GetDTRReconcileRequestListingsResult[0];
    if (resp.ResponseCode === 200) {
      const data = resp.ObjectList;
      const pages = resp.PageDetails;
      yield delay(500);
      yield put(getListRequestSuccess(data, pages));
    }

    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else if (resp.ErrorCode === 204) {
        yield put(getListRequestSuccess(false, false));
        yield put(getListRequestError(resp));
      } else {
        yield put(getListRequestSuccess(resp));
      }
    }
  } catch (err) {
    yield put(getListRequestError(err));
    console.error(err); // eslint-disable-line no-console
  }
}
/**
 * Update Form Request Status (approver) request/response handler
 */
export function* updateFormRequestStatus() {
  // Form Request ID
  const formRequestID = yield select(makeSelectFormReqID());

  // Form Status Update ID
  const statusID = yield select(makeSelectFormStatusID());

  // API URL (from app/constants.js)
  const requestURL = `${API_FORMUPDATESTATUS}${formRequestID}/${statusID}`;

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
 * Root saga manages watcher lifecycle
 */
export default function* rootSagas() {
  // Watches for actions and calls functions when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount

  // Get stored username and token
  token = yield select(makeSelectToken());
  username = yield select(makeSelectUsername());

  // actions
  yield takeLatest(GET_LIST, getShowRequests);
  yield takeLatest(UPDATE_REQUEST, updateFormRequestStatus);
}
