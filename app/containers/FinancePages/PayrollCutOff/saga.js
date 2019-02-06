/**
 * Payroll Cutoff Template Sagas
 */
import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import {
  API_DEPARTMENTLIST,
  API_TEAMLIST,
  API_EMPLISTS,
  API_PAYROLLCUTOFF,
  API_PAYROLLCUTOFFLIST,
  API_PAYROLLCUTFOREMP,
  API_PAYROLLCUTFORTEAM,
  API_PAYROLLCUTFORDEPARTMENT,
} from 'containers/App/constants';

import {
  sessionIsExpired,
} from 'containers/App/actions';

import { makeSelectToken, makeSelectUsername } from 'containers/App/selectors';

import GroupFilter from 'components/Enums/GroupFilter';

import {
  Template,
  Enrolled,
  AddToList,
  Assign,
  Unassign,
  Update,
  Save,
  Delete,
} from './constants';

import {
  getTemplateListSuccess,
  getTemplateListError,
  getEnrolledListSuccess,
  getEnrolledListError,
  getAddToListSuccess,
  getAddToListError,
  getAssignToTemplateSuccess,
  getAssignToTemplateError,
  getUnassignToTemplateError,
  getUnassignToTemplateSuccess,
  getSaveTemplateSuccess,
  getSaveTemplateError,
  getUpdateTemplateSuccess,
  getUpdateTemplateError,
  getDeleteTemplateSuccess,
  getDeleteTemplateError,
} from './actions';

import {
  makeSelectPageIndex,
  makeSelectSearch,
  makeSelectSortBy,
  makeSelectFilter,
  makeSelectID,
  makeSelectData,
} from './selectors';

let username;
let token;
const pageSize = 20;

/* eslint quote-props: ["error", "consistent"] */
/**
 * Payroll Cutoff List request/response handler
 */
export function* getTemplateList() {
  // Our API URL (from app/constants.js)
  const requestURL = API_PAYROLLCUTOFFLIST;

  // Get Page Index
  const page = yield select(makeSelectPageIndex('templateList'));

  // Get search and set value in Name var
  const search = yield select(makeSelectSearch('templateList'));
  let Name;
  if (search) Name = search;

  // Get sort by
  const sortBy = yield select(makeSelectSortBy('templateList'));
  const sortExpression = (sortBy === 'Name') ? 'ASC' : 'DESC';

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
        'SortExpression': sortExpression,
      },
      Name,
    }),
  };

  try {
    // Call our request helper ('utils/request') to connect to our API
    const apirequest = yield call(request, requestURL, options);
    const resp = apirequest.GetCutoffTemplateListingsResult[0];

    if (resp.ResponseCode === 200) {
      // Assign our response ObjectList and PageDetails in variable
      const data = resp.ObjectList;
      const pages = resp.PageDetails;

      // On success, put our retrieved data in our state tree
      yield put(getTemplateListSuccess(data, pages));
    }

    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getTemplateListError(resp));
      }
    }
  } catch (err) {
    yield put(getTemplateListError(err));
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
        'withCutoffTemplate': true,
      },
      'HasCutoffTemplateID': templateID,
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
      'CutoffTemplateID': templateID,
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
      'CutoffTemplateID': templateID,
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

      yield put(getEnrolledListSuccess(object, pages));
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getEnrolledListError(resp));
      }
    }
  } catch (err) {
    yield put(getEnrolledListError(err));
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
      'HasNoCutoffTemplateID': templateID,
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
    requestURL = API_PAYROLLCUTFOREMP + id;
  }

  if (filter === GroupFilter.Workgroup) {
    requestURL = API_PAYROLLCUTFORTEAM + id;
  }

  if (filter === GroupFilter.Department) {
    requestURL = API_PAYROLLCUTFORDEPARTMENT + id;
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
    if (filter === GroupFilter.Employee) resp = apirequest.AssignCutoffToEmployeeResult[0];
    if (filter === GroupFilter.Workgroup) resp = apirequest.AssignCutoffToTeamResult[0];
    if (filter === GroupFilter.Department) resp = apirequest.AssignCutoffToDepartmentResult[0];

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
    requestURL = API_PAYROLLCUTFOREMP + id;
  }

  if (filter === GroupFilter.Workgroup) {
    requestURL = API_PAYROLLCUTFORTEAM + id;
  }

  if (filter === GroupFilter.Department) {
    requestURL = API_PAYROLLCUTFORDEPARTMENT + id;
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
    if (filter === GroupFilter.Employee) resp = apirequest.UnassignCutoffToEmployeeResult[0];
    if (filter === GroupFilter.Workgroup) resp = apirequest.UnassignCutoffToTeamResult[0];
    if (filter === GroupFilter.Department) resp = apirequest.UnassignCutoffToDepartmentResult[0];

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
  const requestURL = `${API_PAYROLLCUTOFF}/${templateID}`;

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
    const resp = apirequest.UpdateCutoffTemplateResult[0];

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
  const requestURL = API_PAYROLLCUTOFF;

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
    const resp = apirequest.AddCutoffTemplateResult[0];

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
  const requestURL = `${API_PAYROLLCUTOFF}/${templateID}`;

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
    const resp = apirequest.DeleteCutoffTemplateResult[0];

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
export default function* prCutOffListSagas() {
  // Watches for actions and calls functions when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount

  // Get our stored username and token
  token = yield select(makeSelectToken());
  username = yield select(makeSelectUsername());

  yield takeLatest(Template.RETRIEVE, getTemplateList);
  yield takeLatest(Template.PAGING, getTemplateList);
  yield takeLatest(Enrolled.RETRIEVE, getEnrolledList);
  yield takeLatest(Enrolled.PAGING, getEnrolledList);
  yield takeLatest(AddToList.RETRIEVE, getAddToList);
  yield takeLatest(AddToList.PAGING, getAddToList);
  yield takeLatest(Assign.SUBMIT, getAssignToTemplate);
  yield takeLatest(Unassign.SUBMIT, getUnassignFromTemplate);
  yield takeLatest(Save.SUBMIT, getSaveTemplate);
  yield takeLatest(Update.SUBMIT, getUpdateTemplate);
  yield takeLatest(Delete.SUBMIT, getDeleteTemplate);
}
