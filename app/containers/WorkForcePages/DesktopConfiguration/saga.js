/**
 * WorkForce Desktop Configurations Sagas
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';

import {
  API_WORKMONITORINGLIST,
  API_DEPARTMENTLIST,
  API_TEAMLIST,
  API_EMPLISTS,
  API_WORKMONITORINGFOREMP,
  API_WORKMONITORINGFORTEAM,
  API_WORKMONITORINGFORDEPARTMENT,
  API_WORKMONITORING,
} from 'containers/App/constants';

import {
  makeSelectToken,
  makeSelectUsername,
} from 'containers/App/selectors';

import { sessionIsExpired } from 'containers/App/actions';

import GroupFilter from 'components/Enums/GroupFilter';

import {
  getTemplatesSuccess,
  getTemplatesError,
  getEnrolledSuccess,
  getEnrolledError,
  getAddToListSuccess,
  getAddToListError,
  getAssignToTemplateSuccess,
  getAssignToTemplateError,
  getUnassignToTemplateSuccess,
  getUnassignToTemplateError,
  getUpdateTemplateSuccess,
  getUpdateTemplateError,
  getSaveTemplateSuccess,
  getSaveTemplateError,
  getDeleteTemplateSuccess,
  getDeleteTemplateError,
} from './actions';

import {
  Templates,
  Enrolled,
  AddToList,
  Assign,
  Unassign,
  Update,
  Save,
  Delete,
} from './constants';

import {
  makeSelectPageIndex,
  makeSelectSearch,
  makeSelectFilter,
  makeSelectID,
  makeSelectData,
} from './selectors';

// Initialize var for username/token
let username;
let token;

// Default Page Index and Size
const pageSize = 20;

/* eslint quote-props: ["error", "consistent"] */
/**
 *  Get Template List request/response handler
 */
export function* getTemplateList() {
  const page = yield select(makeSelectPageIndex('templateList'));
  const search = yield select(makeSelectSearch('templateList'));
  const sortBy = yield select(makeSelectFilter('templateList'));

  let Name;
  if (search) Name = search;

  const requestURL = API_WORKMONITORINGLIST;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
    body: JSON.stringify({
      'SortFilter': {
        'PageIndex': (page) || 1,
        'PageSize': pageSize,
        'SortBy': sortBy,
        'SortExpression': (sortBy === 'Name') ? 'ASC' : 'DESC',
      },
      Name,
    }),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.GetWorkMonitoringTemplateListingsResult[0];

    if (resp.ResponseCode === 200) {
      const data = resp.ObjectList;
      const pages = resp.PageDetails;
      yield put(getTemplatesSuccess(data, pages));
    }

    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getTemplatesError(resp));
      }
    }
  } catch (err) {
    yield put(getTemplatesError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Get Enrolled List request/response handler
 */
export function* getEnrolledList() {
  // Get the value of seach query
  const search = yield select(makeSelectSearch('enrolledList'));

  // Get Page Index
  const page = yield select(makeSelectPageIndex('enrolledList'));

  // Get the enrolled list for the template
  // based on the request (employee, workgroup or deparment)
  const filter = yield select(makeSelectFilter('enrolledList'));

  // Get the Template ID
  const templateID = yield select(makeSelectID('enrolledList'));

  let data;
  let requestURL;

  if (filter === GroupFilter.Employee) {
    requestURL = API_EMPLISTS;

    let FirstAndLastName;
    if (search) FirstAndLastName = search;

    data = {
      'SortFilter': {
        'PageIndex': (page) || 1,
        'PageSize': pageSize,
        'SortBy': 'LastName', // LastName, Mobile, CreatedDate
        'SortExpression': 'ASC',
      },
      'Includes': {
        'isShortDetails': true,
        'withAvatar': true,
        'withWorkGroup': true,
        'withWorkMonitoringTemplate': true,
      },
      'HasWorkMonitoringTemplateID': templateID,
      FirstAndLastName,
    };
  }

  if (filter === GroupFilter.Workgroup) {
    requestURL = API_TEAMLIST;

    let TeamName;
    if (search) TeamName = search;

    data = {
      'SortFilter': {
        'PageIndex': (page) || 1,
        'PageSize': pageSize,
        'SortBy': 'Name',
        'SortExpression': 'ASC',
      },
      'WorkMonitoringTemplateID': templateID,
      TeamName,
    };
  }

  if (filter === GroupFilter.Department) {
    requestURL = API_DEPARTMENTLIST;

    let Name;
    if (search) Name = search;

    data = {
      'SortFilter': {
        'PageIndex': (page) || 1,
        'PageSize': pageSize,
        'SortBy': 'Name',
        'SortExpression': 'ASC',
      },
      'WorkMonitoringTemplateID': templateID,
      Name,
    };
  }

  // Declare request headers defaults
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
    body: JSON.stringify(data),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    let resp;

    if (filter === GroupFilter.Employee) resp = apirequest.GetEmpProfilesResult[0];
    if (filter === GroupFilter.Workgroup) resp = apirequest.GetTeamsOnlyResult[0];
    if (filter === GroupFilter.Department) resp = apirequest.GetDepartmentResult[0];

    if (resp.ResponseCode === 200) {
      const object = resp.ObjectList; // Returned ObjectList
      const pages = resp.PageDetails; // Returned PageDetails

      yield put(getEnrolledSuccess(object, pages));
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getEnrolledError(resp));
      }
    }
  } catch (err) {
    yield put(getEnrolledError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Get List of Department/Workgroup/Employee (Not Using the Selected Template) request/response handler
 */
export function* getAddToList() {
  // Get the value of seach query
  const search = yield select(makeSelectSearch('addToList'));

  // Retrieve Shift Template ID
  const templateID = yield select(makeSelectID('enrolledList'));

  // Get Page Index
  const page = yield select(makeSelectPageIndex('addToList'));

  // Retrieve who request for the list
  const filter = yield select(makeSelectFilter('addToList'));

  // API URL (from app/constants.js)
  let requestURL;
  let Name;
  let TeamName;
  let FirstAndLastName;
  let Includes;
  let sortBy = 'Name';

  if (filter === GroupFilter.Department) {
    requestURL = API_DEPARTMENTLIST;
    if (search) Name = search;
  }

  if (filter === GroupFilter.Workgroup) {
    requestURL = API_TEAMLIST;
    if (search) TeamName = search;
  }

  if (filter === GroupFilter.Employee) {
    requestURL = API_EMPLISTS;
    sortBy = 'LastName';
    Includes = {
      'isShortDetails': true,
      'withAvatar': true,
      'withWorkGroup': true,
    };
    if (search) FirstAndLastName = search;
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
    body: JSON.stringify({
      'SortFilter': {
        'PageIndex': (page) || 1,
        'PageSize': pageSize,
        'SortBy': sortBy,
        'SortExpression': 'ASC',
      },
      Includes,
      'HasNoWorkMonitoringTemplateID': templateID,
      Name,
      TeamName,
      FirstAndLastName,
    }),
  };

  try {
    const apirequest = yield call(request, requestURL, options);

    let resp;
    if (filter === GroupFilter.Department) resp = apirequest.GetDepartmentResult[0];
    if (filter === GroupFilter.Workgroup) resp = apirequest.GetTeamsOnlyResult[0];
    if (filter === GroupFilter.Employee) resp = apirequest.GetEmpProfilesResult[0];

    if (resp.ResponseCode === 200) {
      const object = resp.ObjectList;
      const pages = resp.PageDetails;

      yield put(getAddToListSuccess(object, pages));
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getAddToListError(resp));
      }
    }
  } catch (err) {
    yield put(getAddToListError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Assign Entity to Template
 */
export function* getAssignToTemplate() {
  const id = yield select(makeSelectID('assign'));
  const filter = yield select(makeSelectFilter('assign'));

  let requestURL;
  if (filter === GroupFilter.Employee) {
    requestURL = API_WORKMONITORINGFOREMP + id;
  }

  if (filter === GroupFilter.Workgroup) {
    requestURL = API_WORKMONITORINGFORTEAM + id;
  }

  if (filter === GroupFilter.Department) {
    requestURL = API_WORKMONITORINGFORDEPARTMENT + id;
  }

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
    let resp;
    if (filter === GroupFilter.Employee) resp = apirequest.AssignWorkMonitoringToEmployeeResult[0];
    if (filter === GroupFilter.Workgroup) resp = apirequest.AssignWorkMonitoringToTeamResult[0];
    if (filter === GroupFilter.Department) resp = apirequest.AssignWorkMonitoringToDepartmentResult[0];

    if (resp.ResponseCode === 200) {
      yield put(getAssignToTemplateSuccess());
    }

    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getAssignToTemplateError(resp));
      }
    }
  } catch (err) {
    yield put(getAssignToTemplateError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * UnAssign Entity to Template
 */
export function* getUnassignFromTemplate() {
  const id = yield select(makeSelectID('unassign'));
  const filter = yield select(makeSelectFilter('unassign'));

  let requestURL;
  if (filter === GroupFilter.Employee) {
    requestURL = API_WORKMONITORINGFOREMP + id;
  }

  if (filter === GroupFilter.Workgroup) {
    requestURL = API_WORKMONITORINGFORTEAM + id;
  }

  if (filter === GroupFilter.Department) {
    requestURL = API_WORKMONITORINGFORDEPARTMENT + id;
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
    if (filter === GroupFilter.Employee) resp = apirequest.UnassignWorkMonitoringToEmployeeResult[0];
    if (filter === GroupFilter.Workgroup) resp = apirequest.UnassignWorkMonitoringToTeamResult[0];
    if (filter === GroupFilter.Department) resp = apirequest.UnassignWorkMonitoringToDepartmentResult[0];

    if (resp.ResponseCode === 200) {
      yield put(getUnassignToTemplateSuccess());
    }

    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getUnassignToTemplateError(resp));
      }
    }
  } catch (err) {
    yield put(getUnassignToTemplateError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Update Template
 */
export function* getUpdateTemplate() {
  const templateID = yield select(makeSelectID('update'));
  const requestBody = yield select(makeSelectData('update'));
  const requestURL = `${API_WORKMONITORING}/${templateID}`;

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
    body: JSON.stringify(requestBody),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.UpdateWorkMonitoringTemplateResult[0];

    if (resp.ResponseCode === 200) {
      yield put(getUpdateTemplateSuccess());
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getUpdateTemplateError(resp));
      }
    }
  } catch (err) {
    yield put(getUpdateTemplateError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Save Template
 */
export function* getSaveTemplate() {
  const requestBody = yield select(makeSelectData('save'));
  const requestURL = API_WORKMONITORING;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
    body: JSON.stringify(requestBody),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.AddWorkMonitoringTemplateResult[0];

    if (resp.ResponseCode === 200) {
      yield put(getSaveTemplateSuccess());
    }

    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getSaveTemplateError(resp));
      }
    }
  } catch (err) {
    yield put(getSaveTemplateError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Delete Template
 */
export function* getDeleteTemplate() {
  const templateID = yield select(makeSelectID('delete'));
  const requestURL = `${API_WORKMONITORING}/${templateID}`;

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
    const resp = apirequest.DeleteWorkMonitoringTemplateResult[0];

    if (resp.ResponseCode === 200) {
      yield put(getDeleteTemplateSuccess());
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getDeleteTemplateError(resp));
      }
    }
  } catch (err) {
    yield put(getDeleteTemplateError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* desktopConfigSagas() {
  // Watches for actions and calls functions when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount

  // Get our stored username and token
  token = yield select(makeSelectToken());
  username = yield select(makeSelectUsername());

  yield takeLatest(Templates.RETRIEVE, getTemplateList);
  yield takeLatest(Templates.PAGING, getTemplateList);
  yield takeLatest(Enrolled.RETRIEVE, getEnrolledList);
  yield takeLatest(Enrolled.PAGING, getEnrolledList);
  yield takeLatest(AddToList.RETRIEVE, getAddToList);
  yield takeLatest(AddToList.PAGING, getAddToList);
  yield takeLatest(Assign.SUBMIT, getAssignToTemplate);
  yield takeLatest(Unassign.SUBMIT, getUnassignFromTemplate);
  yield takeLatest(Update.SUBMIT, getUpdateTemplate);
  yield takeLatest(Save.SUBMIT, getSaveTemplate);
  yield takeLatest(Delete.SUBMIT, getDeleteTemplate);
}
