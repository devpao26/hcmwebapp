/**
 * Get our Applicants Data for JO Signing
 */
import { call, put, select, takeLatest, fork } from 'redux-saga/effects';

// Import Request (fetch api)
import request from 'utils/request';

import {
  API_JOSIGNED,
  API_PPEREQ,
  API_REQUPDATE,
  API_UPLOADFILE,
  API_DELETEFILE,
  API_DELETEJOFILE,
  API_UPLOADREQATTACHS,
  API_JOSTATCHANGE,
  API_APPLTOEMP,
  JO_STATUSPPE,
} from 'containers/App/constants';

import {
  sessionIsExpired,
} from 'containers/App/actions';

import { makeSelectToken, makeSelectUsername } from 'containers/App/selectors';

import {
  LIST_PPE,
  GET_PPEREQ,
  UPDATE_ISREQ,
  UPLOAD_FILES,
  DELETE_FILE,
  UPDATE_REQSTATUS,
  APPL_EMP,
  SEARCH_FILTER,
} from './constants';

import {
  retrieveSuccess,
  retrieveError,
  reqApplReqListSuccess,
  reqApplReqListError,
  migrateSuccessfull,
  reqApplReqList,
} from './actions';

import {
  makeSelectPageIndex,
  makeSelectApplJobId,
  makeSelectIsRequiredId,
  makeSelectIsRequiredBool,
  makeSelectIfUploadIsJo,
  makeSelectUploadFiles,
  makeSelectReqId,
  makeSelectReqStatId,
  makeSelectFileId,
  makeSelectAttachType,
  makeSelectSearchLocation,
  makeSelectSearchValue,
  makeSelectUnprocessed,
} from './selectors';

let username;
let token;
const pageSize = 20;
let pageIndex = 1;

/* eslint quote-props: ["error", "consistent"] */
/**
 * JO Signed List request/response handler
 */
export function* getJoSigned() {
  // Our API URL (from app/constants.js)
  const requestURL = API_JOSIGNED;

  // Get our Page Index
  const PageIndex = yield select(makeSelectPageIndex());
  if (PageIndex !== false) {
    pageIndex = PageIndex;
  }

  // Check if we have search values and filter value
  const location = yield select(makeSelectSearchLocation());
  let ComSiteLocID;
  if (location) ComSiteLocID = location;

  const value = yield select(makeSelectSearchValue());
  let FirstAndLastName;
  if (value) FirstAndLastName = value;

  const unprocessed = yield select(makeSelectUnprocessed());
  let IsMigrated;
  if (unprocessed !== 'all') IsMigrated = unprocessed;

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
        'SortBy': 'JOCreatedDate', // LastName, Mobile, CreatedDate (Application Date), JOCreatedDate (Signed Date)
        'SortExpression': 'DESC', // ASC or DESC value
      },
      'JOStatusID': JO_STATUSPPE,
      IsMigrated,
      ComSiteLocID,
      FirstAndLastName,
    }),
  };

  try {
    // Call our request helper ('utils/request') to connect to our API
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.GetSignedJOListResult[0];

    if (resp.ResponseCode === 200) {
      // Assign our response ObjectList and PageDetails in variable
      const joObjectList = resp.ObjectList;
      const joPageDetails = resp.PageDetails;

      // On success, put our retrieved data in our state tree
      yield put(retrieveSuccess(joObjectList, joPageDetails));
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(retrieveError(resp));
      }
    }
  } catch (err) {
    yield put(retrieveError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Applicant PPE Requirement List Retrieval
 */
export function* getApplReqList() {
  const applJobId = yield select(makeSelectApplJobId());

  const requestURL = API_PPEREQ + applJobId;

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
    const resp = apirequest.GetApplPreEmpReqsResult[0];

    if (resp.ResponseCode === 200) {
      const data = resp.ObjectList;

      yield put(reqApplReqListSuccess(data));
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(reqApplReqListError(resp));
      }
    }
  } catch (err) {
    yield put(reqApplReqListError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Update requirement IsRequired
 */
export function* getUpdateIsRequired() {
  const applJobId = yield select(makeSelectApplJobId());
  const isReqBool = yield select(makeSelectIsRequiredBool());
  const PreEmpReqId = yield select(makeSelectIsRequiredId());

  const requestURL = API_REQUPDATE + applJobId;

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
    body: JSON.stringify({
      'UpdateIsRequired': isReqBool,
      'PreEmpReqID': PreEmpReqId,
    }),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.UpdatePreEmpReqsResult[0];
    if (resp.ResponseCode === 200) {
      yield fork(getApplReqList);
      // yield put(reqApplReqList(applJobId));
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      }
    }
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Upload File(s) request/handler
 */
let uploadedFileResponse;
export function* getUploadFile() {
  const files = yield select(makeSelectUploadFiles());

  const requestURL = API_UPLOADFILE;

  const fileData = new FormData();

  if (files) {
    Object.keys(files).forEach((i) => {
      fileData.append('files', files[i]);
    });
  }
  fileData.append('folderType', 'empportal');

  const options = {
    method: 'POST',
    credentials: 'same-origin',
    body: fileData,
  };

  try {
    const apirequest = yield call(request, requestURL, options);

    if (apirequest.response.success === true) {
      uploadedFileResponse = apirequest.response;

      yield fork(passInfoOfUploadedFile);
    }
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

export function* passInfoOfUploadedFile() {
  const jofile = yield select(makeSelectIfUploadIsJo());
  const id = yield select(makeSelectApplJobId());
  const reqId = yield select(makeSelectReqId());

  const items = [];
  const files = uploadedFileResponse.uploadedFiles;
  const epoch = uploadedFileResponse.dteCreated;

  if (files) {
    Object.keys(files).forEach((i) => {
      const filename = files[i].filename;
      const ext = filename.split('.').pop();
      items.push({
        Epoch: epoch,
        FileType: ext,
        FileName: filename,
        Path: files[i].previewURI,
        Size: files[i].size,
        PreEmpApplReqID: reqId,
      });
    });
  }

  let method;
  let data;
  let requestURL;
  if (jofile) {
    method = 'PUT';
    data = JSON.stringify({
      'JOAttachsList': items,
      'JOStatusID': reqId,
    });
    requestURL = API_JOSTATCHANGE + id;
  }
  if (!jofile) {
    method = 'POST';
    data = JSON.stringify({
      'PreEmpApplReqAttachsList': items,
    });
    requestURL = API_UPLOADREQATTACHS + id;
  }

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
    body: data,
  };

  try {
    const apirequest = yield call(request, requestURL, options);

    let resp;
    if (jofile) resp = apirequest.UpdateProfileJOStatusResult[0];
    if (!jofile) resp = apirequest.UploadApplReqAttachsResult[0];

    if (resp.ResponseCode === 200) {
      // yield fork(getApplReqList);
      yield put(reqApplReqList(id));
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      }
    }
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Delete Req Uploaded File
 */
export function* getDeleteFile() {
  const applJobId = yield select(makeSelectApplJobId());
  const id = yield select(makeSelectFileId());
  const attachType = yield select(makeSelectAttachType());

  let requestURL = API_DELETEFILE + id;
  if (attachType === 'JOAttach') {
    requestURL = API_DELETEJOFILE + id;
  }

  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    let resp;
    if (attachType === 'JOAttach') {
      resp = apirequest.DeleteJOAttachResult[0];
    } else {
      resp = apirequest.DeleteReqAttachsResult[0];
    }

    if (resp.ResponseCode === 200) {
      yield fork(getApplReqList);
      // yield put(reqApplReqList(applJobId));
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      }
    }
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Requirement List Uploaded File Status request/handler
 */
export function* getUpdateReqStatus() {
  // Get our stored username and token
  // const token = yield select(makeSelectToken());
  // const username = yield select(makeSelectUsername());

  const id = yield select(makeSelectApplJobId());
  const reqid = yield select(makeSelectReqId());
  const reqstatid = yield select(makeSelectReqStatId());

  const requestURL = API_REQUPDATE + id;

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
    body: JSON.stringify({
      'PreEmpReqID': reqid,
      'PreEmpReqStatusID': reqstatid,
    }),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.UpdatePreEmpReqsResult[0];

    if (resp.ResponseCode === 200) {
      yield fork(getApplReqList);
      // yield put(reqApplReqList(id));
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      }
    }
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Migrate Applicant to Employee request/handler
 */
export function* getMigrateAppl() {
  // Get our stored username and token
  // const token = yield select(makeSelectToken());
  // const username = yield select(makeSelectUsername());

  const id = yield select(makeSelectApplJobId());

  const requestURL = API_APPLTOEMP + id;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.MigrateApplToEmpResult[0];

    if (resp.ResponseCode === 200) {
      yield put(migrateSuccessfull());
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      }
    }
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* ppeSagas() {
  // Watches for actions and calls the function when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount

  token = yield select(makeSelectToken());
  username = yield select(makeSelectUsername());

  yield takeLatest(LIST_PPE, getJoSigned);
  yield takeLatest(SEARCH_FILTER, getJoSigned);
  yield takeLatest(GET_PPEREQ, getApplReqList);
  yield takeLatest(UPDATE_ISREQ, getUpdateIsRequired);
  yield takeLatest(UPLOAD_FILES, getUploadFile);
  yield takeLatest(UPDATE_REQSTATUS, getUpdateReqStatus);
  yield takeLatest(DELETE_FILE, getDeleteFile);
  yield takeLatest(APPL_EMP, getMigrateAppl);
}
