/**
 * Leave Request Sagas
 */
import { call, put, select, takeLatest, fork } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import request from 'utils/request';

import { makeSelectToken, makeSelectUsername } from 'containers/App/selectors';

import {
  API_UPLOADFILE,
  API_LEAVEREQUEST,
  API_LEAVEREQLIST,
  API_WORKFLOWFORMLOAD,
} from 'containers/App/constants';

import {
  sessionIsExpired,
} from 'containers/App/actions';

import {
  GET_FORMLOAD,
  GET_DATAS,
  GET_LEAVEREQLIST,
  CREATE_REQUEST,
} from './constants';

import {
  getLeaveReqListSuccess,
  getLeaveReqListError,
  getWorkFlowFormLoadSuccess,
  getWorkFlowFormLoadError,
  createLeaveRequestSuccess,
  createLeaveRequestError,
} from './actions';

import {
  makeSelectPageIndex,
  makeSelectEmployeeID,
  makeSelectCreateData,
  makeSelectCreateFiles,
} from './selectors';

// Initialize username, token and pageSize
let username;
let token;
const pageSize = 20;

/* eslint quote-props: ["error", "consistent"] */
/**
 * Initial Retrieval of Data
 */
export function* initialRetrieval() {
  yield fork(getLeaveReqList);
  yield fork(getWorkFlowFormLoad);
}

/**
 * Leave Request List request/response handler
 */
export function* getLeaveReqList() {
  // Get employee id
  const empID = yield select(makeSelectEmployeeID());

  // Get Page Index
  let pageIndex = 1;
  const PageIndex = yield select(makeSelectPageIndex('leaveRequestList'));

  if (PageIndex !== false) {
    pageIndex = PageIndex;
  }

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
        'PageSize': pageSize,
      },
      'CreatedBy': empID,
    }),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.GetLeaveRequestListingsResult[0];

    if (resp.ResponseCode === 200) {
      const data = resp.ObjectList;
      const pages = resp.PageDetails;
      yield delay(500);
      yield put(getLeaveReqListSuccess(data, pages));
    } else if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getLeaveReqListError(resp));
      }
    }
  } catch (err) {
    yield put(getLeaveReqListError(err));
    // console.error(err);
  }
}

/**
 * WorkFlow Form Load retrieval request/response handler
 */
export function* getWorkFlowFormLoad() {
  // API URL (from app/constants.js)
  const requestURL = API_WORKFLOWFORMLOAD;

  // Default options
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.GetWorkFlowFormListRefsResult[0];

    if (resp.ResponseCode === 200) {
      const data = resp.ObjectList;
      yield put(getWorkFlowFormLoadSuccess(data));
    } else if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getWorkFlowFormLoadError(resp));
      }
    }
  } catch (err) {
    yield put(getWorkFlowFormLoadError(err));
    // console.error(err);
  }
}

/**
 * Check send request if we have files to upload,
 * then pass the specific saga to handle the request
 */
let uploadedFileResponse = false;
export function* checkSendRequest() {
  const files = yield select(makeSelectCreateFiles());

  if (files && files.length > 0) {
    yield fork(getUploadFile);
  } else {
    uploadedFileResponse = false;
    yield fork(getCreateRequest);
  }
}

/**
 * Upload File(s) request/handler
 */
export function* getUploadFile() {
  // API URL (from app/constants.js)
  const requestURL = API_UPLOADFILE;

  const files = yield select(makeSelectCreateFiles());

  const fileData = new FormData();
  Object.keys(files).forEach((i) => {
    fileData.append('files', files[i]);
  });
  // for (let i in files) {
  //   fileData.append('files', files[i]);
  // }
  fileData.append('folderType', 'empportal');

  const options = {
    method: 'POST',
    credentials: 'same-origin',
    body: fileData,
  };

  try {
    const apirequest = yield call(request, requestURL, options);

    if (apirequest.response.success === true) {
      yield uploadedFileResponse = apirequest.response;

      yield fork(getCreateRequest);
    }
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Create Leave Request request/response handler
 */
export function* getCreateRequest() {
  // Retrieve create data
  const data = yield select(makeSelectCreateData());

  // API URL (from app/constants.js)
  const requestURL = API_LEAVEREQUEST;

  const attachList = [];
  if (uploadedFileResponse !== false) {
    const files = uploadedFileResponse.uploadedFiles;
    const epoch = uploadedFileResponse.dteCreated;

    Object.keys(files).forEach((i) => {
      const filename = files[i].filename;
      const ext = filename.split('.').pop();
      attachList.push({
        Epoch: epoch,
        FileType: ext,
        FileName: filename,
        Path: files[i].previewURI,
        Size: files[i].size,
      });
    });
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
    body: JSON.stringify({
      'LeaveTypeID': data.LeaveTypeID,
      'Reason': data.Reason,
      'LeaveFrom': data.LeaveFrom,
      'LeaveTo': data.LeaveTo,
      'LeaveAttachList': attachList,
    }),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.CreateLeaveRequestResult[0];

    if (resp.ResponseCode === 200) {
      yield put(createLeaveRequestSuccess());
    } else if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(createLeaveRequestError(resp));
      }
    }
  } catch (err) {
    // console.error(err);
    yield put(createLeaveRequestError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* leaveRequestSagas() {
  // Watches for actions and calls functions when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount

  // Get stored username and token
  token = yield select(makeSelectToken());
  username = yield select(makeSelectUsername());

  // actions
  yield takeLatest(GET_DATAS, initialRetrieval);
  yield takeLatest(GET_LEAVEREQLIST, getLeaveReqList);
  yield takeLatest(GET_FORMLOAD, getWorkFlowFormLoad);
  yield takeLatest(CREATE_REQUEST, checkSendRequest);
}
