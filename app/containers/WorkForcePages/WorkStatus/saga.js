/**
 * Workstatus Sagas
 */
import { call, put, select, takeLatest, fork } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import request from 'utils/request';

import {
  API_WORKSTATUS,
  API_EMPLISTS,
  API_TEAMLIST,
  API_DEPARTMENTLIST,
  API_WORKSTATUSFORDEPARTMENT,
  API_WORKSTATUSFORTEAM,
  API_WORKSTATUSFOREMPLOYEE,
  API_WORKSTATUSFORMLOAD,
  API_WORKSTATUSTEMPLATE,
} from 'containers/App/constants';

import { makeSelectToken, makeSelectUsername } from 'containers/App/selectors';
import { sessionIsExpired } from 'containers/App/actions';

import {
  GET_TEMPLATES,
  SEARCH_TEMPLATES,
  SORT_TEMPLATES,
  GET_ENROLLED,
  GOTO_PAGEENROLLED,
  SEARCH_ENROLLED,
  GET_ADDTOLIST,
  SEARCH_ADDTOLIST,
  ADD_TOTEMPLATE,
  DELETE_TEMPLATE,
  SAVE_WORKSTATTEMPLATE,
  UNASSIGN_TEMPLATE,
} from './constants';

import {
  getWorkStatusTemplateListSuccess,
  getWorkStatusTemplateListError,
  getWorkFormLoadSuccess,
  getWorkFormLoadError,
  getEnrolledInTemplate,
  getEnrolledInTemplateSuccess,
  getEnrolledInTemplateError,
  getAddToListSuccess,
  getAddToListError,
  addToTemplateSuccess,
  addToTemplateError,
  deleteTemplateSuccess,
  deleteTemplateError,
  saveWorkStatTemplateSuccess,
  saveWorkStatTemplateError,
  unAssignTemplateSuccess,
  unAssignTemplateError,
} from './actions';

import {
  makeSelectPageIndex,
  makeSelectSearchQuery,
  makeSelectSortList,
  makeSelectWorkStatusTemplateID,
  makeSelectRequester,
  makeSelectAddToTemplateRequester,
  makeSelectAddToID,
  makeSelectSaveTemplateData,
  makeSelectIsNewTemplate,
  makeSelectUnassignID,
} from './selectors';

let username;
let token;

const pageSize = 20;

/* eslint quote-props: ["error", "consistent"] */

/**
 * Retrieve Template List request/response handler
 */
export function* getTemplateLists() {
  // Get the value of seach query
  const search = yield select(makeSelectSearchQuery('templateList'));

  // Get the sort value
  const sortBy = yield select(makeSelectSortList('templateList'));

  // Get the enrolled list for the template
  // based on the request (employee, workgroup or deparment)
  const requester = yield select(makeSelectRequester());

  // Retrieve Template ID
  const templateID = yield select(makeSelectWorkStatusTemplateID());

  // API URL (from app/constants.js)
  const requestURL = API_WORKSTATUS;

  // Get Page Index
  let pageIndex = 1;
  const PageIndex = yield select(makeSelectPageIndex('templateList'));

  if (PageIndex !== false) {
    pageIndex = PageIndex;
  }

  const sortExpression = (sortBy === 'Name') ? 'ASC' : 'DESC';
  let Name;
  if (search) Name = search;
  const data = {
    'SortFilter': {
      'PageIndex': pageIndex,
      'PageSize': pageSize,
      'SortBy': sortBy,
      'SortExpression': sortExpression,
    },
    Name,
  };

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
    const resp = apirequest.GetWorkStatusTemplateListingsResult[0];

    if (resp.ResponseCode === 200) {
      const object = resp.ObjectList; // Returned ObjectList
      const pages = resp.PageDetails; // Returned PageDetails

      yield fork(getFormLoad);
      yield delay(500);
      yield put(getWorkStatusTemplateListSuccess(object, pages));

      let cat = 'Employee';
      if (requester) cat = requester;

      if (!templateID && object.length > 0) {
        yield put(getEnrolledInTemplate(cat, object[0].WorkStatusTemplateID));
      } else {
        yield put(getEnrolledInTemplate(cat, templateID));
      }
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getWorkStatusTemplateListError(resp));
      }
    }
  } catch (err) {
    yield put(getWorkStatusTemplateListError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Retrieve Work Status Form Load (Work Name and Type) request/response handler
 */
export function* getFormLoad() {
  // API URL (from app/constants.js)
  const requestURL = API_WORKSTATUSFORMLOAD;

  /* eslint quote-props: ["error", "consistent"] */
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
    const resp = apirequest.WorkStatusFormLoadResult[0];

    if (resp.ResponseCode === 200) {
      yield delay(300);
      yield put(getWorkFormLoadSuccess(resp.ObjectList[0]));
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getWorkFormLoadError(resp));
      }
    }
  } catch (err) {
    yield put(getWorkFormLoadError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Enrolled in Template request/response handler
 */
export function* getEnrolledList() {
  // Get the value of seach query
  const search = yield select(makeSelectSearchQuery('enrolledList'));

  // Get the enrolled list for the template
  // based on the request (employee, workgroup or deparment)
  const requester = yield select(makeSelectRequester());

  // Retrieve Shift Template ID
  const templateID = yield select(makeSelectWorkStatusTemplateID());

  // Get Page Index
  let pageIndex = 1;
  const PageIndex = yield select(makeSelectPageIndex('enrolledList'));

  if (PageIndex !== false) {
    pageIndex = PageIndex;
  }

  let data;
  let requestURL;

  if (requester === 'Employee') {
    requestURL = API_EMPLISTS;
    let FirstAndLastName;
    if (search) FirstAndLastName = search;
    data = {
      'SortFilter': {
        'PageIndex': pageIndex,
        'PageSize': pageSize,
        'SortBy': 'LastName', // LastName, Mobile, CreatedDate
        'SortExpression': 'ASC',
      },
      'Includes': {
        'isShortDetails': true,
        'withAvatar': true,
        'withWorkGroup': true,
        'withWorkStatus': true,
      },
      'HasWorkStatusTemplateID': templateID,
      FirstAndLastName,
    };
  }

  if (requester === 'Workgroup') {
    requestURL = API_TEAMLIST;
    let TeamName;
    if (search) TeamName = search;

    data = {
      'SortFilter': {
        'PageIndex': pageIndex,
        'PageSize': pageSize,
        'SortBy': 'Name',
        'SortExpression': 'ASC',
      },
      'WorkStatusTemplateID': templateID,
      TeamName,
    };
  }

  if (requester === 'Department') {
    requestURL = API_DEPARTMENTLIST;
    let Name;
    if (search) Name = search;

    data = {
      'SortFilter': {
        'PageIndex': pageIndex,
        'PageSize': pageSize,
        'SortBy': 'Name',
        'SortExpression': 'ASC',
      },
      'WorkStatusTemplateID': templateID,
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

    if (requester === 'Employee') resp = apirequest.GetEmpProfilesResult[0];
    if (requester === 'Workgroup') resp = apirequest.GetTeamsOnlyResult[0];
    if (requester === 'Department') resp = apirequest.GetDepartmentResult[0];

    if (resp.ResponseCode === 200) {
      const object = resp.ObjectList; // Returned ObjectList
      const pages = resp.PageDetails; // Returned PageDetails

      yield delay(300);
      yield put(getEnrolledInTemplateSuccess(object, pages));
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getEnrolledInTemplateError(resp));
      }
    }
  } catch (err) {
    yield put(getEnrolledInTemplateError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Get List of Department/Workgroup/Employee (Not Using the Selected Template) request/response handler
 */
export function* getAddToLists() {
  // Get the value of seach query
  const search = yield select(makeSelectSearchQuery('addToList'));

  // Retrieve Shift Template ID
  const templateID = yield select(makeSelectWorkStatusTemplateID());

  // Get Page Index
  let pageIndex = 1;
  const PageIndex = yield select(makeSelectPageIndex('addToList'));

  if (PageIndex !== false) {
    pageIndex = PageIndex;
  }

  // Retrieve who request for the list
  const requestCat = yield select(makeSelectAddToTemplateRequester());

  let requestURL;
  let Name;
  let TeamName;
  let FirstAndLastName;
  let Includes;

  // API URL (from app/constants.js)
  if (requestCat === 'Department') {
    requestURL = API_DEPARTMENTLIST;
    if (search) Name = search;
  }

  if (requestCat === 'Workgroup') {
    requestURL = API_TEAMLIST;
    if (search) TeamName = search;
  }

  if (requestCat === 'Employee') {
    requestURL = API_EMPLISTS;
    Includes = {
      'isShortDetails': true,
      'withAvatar': true,
      'withWorkGroup': true,
    };
    if (search) FirstAndLastName = search;
  }

  // Default Request Body Data
  const data = {
    'SortFilter': {
      'PageIndex': pageIndex,
      'PageSize': pageSize,
    },
    Includes,
    'HasNoWorkStatusTemplateID': templateID,
    Name,
    TeamName,
    FirstAndLastName,
  };

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
    if (requestCat === 'Department') resp = apirequest.GetDepartmentResult[0];
    if (requestCat === 'Workgroup') resp = apirequest.GetTeamsOnlyResult[0];
    if (requestCat === 'Employee') resp = apirequest.GetEmpProfilesResult[0];

    if (resp.ResponseCode === 200) {
      const object = resp.ObjectList;
      const pages = resp.PageDetails;

      yield delay(500);
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
 * Add selected Department/Workgroup/Employee to Selected template request/response handler
 */
export function* addToTemplate() {
  // Retrieve Shift Template ID
  const templateID = yield select(makeSelectWorkStatusTemplateID());
  const idToAdd = yield select(makeSelectAddToID());

  // Retrieve who request for the list
  const requestCat = yield select(makeSelectAddToTemplateRequester());

  // API URL (from app/constants.js)
  let requestURL;
  if (requestCat === 'Department') requestURL = `${API_WORKSTATUSFORDEPARTMENT}${templateID}/${idToAdd}`;
  if (requestCat === 'Workgroup') requestURL = `${API_WORKSTATUSFORTEAM}${templateID}/${idToAdd}`;
  if (requestCat === 'Employee') requestURL = `${API_WORKSTATUSFOREMPLOYEE}${templateID}/${idToAdd}`;

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
    if (requestCat === 'Department') resp = apirequest.AssignWorkStatusToDepartmentResult[0];
    if (requestCat === 'Workgroup') resp = apirequest.AssignWorkStatusToTeamResult[0];
    if (requestCat === 'Employee') resp = apirequest.AssignWorkStatusToEmployeeResult[0];

    if (resp.ResponseCode === 200) {
      yield put(addToTemplateSuccess());

      // // On Success retrieve the list to be added
      // yield fork(getAddToLists);
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(addToTemplateError(resp));
      }
    }
  } catch (err) {
    yield put(addToTemplateError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Template Deletion request/response handler
 */
export function* deleteTemplate() {
  // Retrieve Shift Template ID
  const templateID = yield select(makeSelectWorkStatusTemplateID());

  // API URL (from app/constants.js)
  const requestURL = `${API_WORKSTATUSTEMPLATE}/${templateID}`;

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
    const resp = apirequest.DeleteWorkStatusTemplateResult[0];

    if (resp.ResponseCode === 200) {
      yield put(deleteTemplateSuccess());
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(deleteTemplateError(resp));
      }
    }
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    yield put(deleteTemplateError(err));
  }
}

/**
 * Save Work Status Template request/response handler
 */
export function* saveTemplate() {
  // Retrieve Template ID
  const templateID = yield select(makeSelectWorkStatusTemplateID());

  // Retrieve template data to be saved
  const templateData = yield select(makeSelectSaveTemplateData());

  // See if we are creating or editing a template
  const isNew = yield select(makeSelectIsNewTemplate());

  let requestURL;
  let method;

  if (isNew) {
    // API URL (from app/constants.js)
    requestURL = API_WORKSTATUSTEMPLATE;
    method = 'POST';
  } else {
    // API URL (from app/constants.js)
    requestURL = `${API_WORKSTATUSTEMPLATE}/${templateID}`;
    method = 'PUT';
  }

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'token': token,
      'username': username,
    },
    body: JSON.stringify(templateData),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    let resp;
    if (isNew) {
      resp = apirequest.CreateWorkStatusTemplateResult[0];
    } else {
      resp = apirequest.UpdateWorkStatusTemplateResult[0];
    }

    if (resp.ResponseCode === 200) {
      yield put(saveWorkStatTemplateSuccess());
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(saveWorkStatTemplateError(resp));
      }
    }
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    yield put(saveWorkStatTemplateError(err));
  }
}

/**
 * Unassign Template to selected Dept/Workgroup/Employee request/response handler
 */
export function* unAssignTemplate() {
  // Get the enrolled list for the template
  // based on the request (employee, workgroup or deparment)
  const requester = yield select(makeSelectRequester());

  // Retrieve ID to unassigned
  const idToUnassign = yield select(makeSelectUnassignID());

  // API URL (from app/constants.js)
  let requestURL;
  if (requester === 'Employee') requestURL = API_WORKSTATUSFOREMPLOYEE + idToUnassign;
  if (requester === 'Department') requestURL = API_WORKSTATUSFORDEPARTMENT + idToUnassign;
  if (requester === 'Workgroup') requestURL = API_WORKSTATUSFORTEAM + idToUnassign;

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
    if (requester === 'Employee') resp = apirequest.UnassignWorkStatusToEmployeeResult[0];
    if (requester === 'Department') resp = apirequest.UnassignWorkStatusToDepartmentResult[0];
    if (requester === 'Workgroup') resp = apirequest.UnassignWorkStatusToTeamResult[0];

    if (resp.ResponseCode === 200) {
      yield delay(500);
      yield put(unAssignTemplateSuccess());
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(unAssignTemplateError(resp));
      }
    }
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    yield put(unAssignTemplateError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* workStatusSagas() {
  // Watches for actions and calls functions when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount

  // Get our stored username and token
  token = yield select(makeSelectToken());
  username = yield select(makeSelectUsername());

  yield takeLatest(GET_TEMPLATES, getTemplateLists);
  yield takeLatest(SEARCH_TEMPLATES, getTemplateLists);
  yield takeLatest(SORT_TEMPLATES, getTemplateLists);
  yield takeLatest(GET_ENROLLED, getEnrolledList);
  yield takeLatest(GOTO_PAGEENROLLED, getEnrolledList);
  yield takeLatest(SEARCH_ENROLLED, getEnrolledList);
  yield takeLatest(GET_ADDTOLIST, getAddToLists);
  yield takeLatest(SEARCH_ADDTOLIST, getAddToLists);
  yield takeLatest(ADD_TOTEMPLATE, addToTemplate);
  yield takeLatest(DELETE_TEMPLATE, deleteTemplate);
  yield takeLatest(SAVE_WORKSTATTEMPLATE, saveTemplate);
  yield takeLatest(UNASSIGN_TEMPLATE, unAssignTemplate);
}
