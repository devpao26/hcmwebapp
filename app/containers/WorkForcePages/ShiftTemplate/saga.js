/**
 * ShiftTemplate Sagas
 */
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';

// Import Request (fetch api)
import request from 'utils/request';

import { makeSelectToken, makeSelectUsername } from 'containers/App/selectors';

import { sessionIsExpired } from 'containers/App/actions';

import {
  API_SHIFTFORMLOAD,
  API_SHIFTTEMPLATES,
  API_DEPARTMENTLIST,
  API_TEAMLIST,
  API_EMPLISTS,
  API_SHIFTSCHEDULE,
  API_SHIFTFORDEPARTMENT,
  API_SHIFTFORTEAM,
  API_SHIFTFOREMPLOYEE,
} from 'containers/App/constants';

import {
  GET_TEMPLATES,
  SEARCH_TEMPLATES,
  SORT_TEMPLATES,
  GET_ENROLLED,
  GOTO_PAGEENROLLED,
  SEARCH_ENROLLED,
  GET_FLEXIREFS,
  SAVE_SHIFTTEMPLATE,
  DELETE_SHIFTTEMPLATE,
  GET_ADDTOLIST,
  SEARCH_ADDTOLIST,
  ADD_TOTEMPLATE,
  UNASSIGN_TEMPLATE,
} from './constants';

import {
  getShiftTemplateListsSuccess,
  getShiftTemplateListsError,
  getEnrolledInTemplateSuccess,
  getEnrolledInTemplateError,
  getEnrolledInTemplate,
  getFlexiRefsSuccess,
  getFlexiRefsError,
  saveShiftTemplateSuccess,
  saveShiftTemplateError,
  deleteShiftTemplateSuccess,
  deleteShiftTemplateError,
  getAddToListSuccess,
  getAddToListError,
  addToTemplateSuccess,
  addToTemplateError,
  unAssignTemplateSuccess,
  unAssignTemplateError,
} from './actions';

import {
  makeSelectPageIndex,
  makeSelectSearchQuery,
  makeSelectSortList,
  makeSelectShiftTemplateID,
  makeSelectRequester,
  makeSelectSaveShiftTemplateData,
  makeSelectIsNewShiftTemplate,
  makeSelectAddToTemplateRequester,
  makeSelectAddToID,
  makeSelectUnassignID,
} from './selectors';

let username;
let token;
// let requester;
// let shiftTemplateId;
const pageSize = 20;

/* eslint quote-props: ["error", "consistent"] */
/**
 * Get Shift Template List request/response handler
 */
export function* getTemplateList() {
  // Get the value of seach query
  const search = yield select(makeSelectSearchQuery('templateList'));

  // Get the sort value
  const sortBy = yield select(makeSelectSortList('templateList'));

  // Get the enrolled list for the template
  // based on the request (employee, workgroup or deparment)
  const requester = yield select(makeSelectRequester());

  // Retrieve Shift Template ID
  const shiftTemplateID = yield select(makeSelectShiftTemplateID());

  // API URL (from app/constants.js)
  const requestURL = API_SHIFTTEMPLATES;

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
    const resp = apirequest.GetShiftTemplateListingsResult[0];

    if (resp.ResponseCode === 200) {
      const object = resp.ObjectList; // Returned ObjectList
      const pages = resp.PageDetails; // Returned PageDetails

      yield delay(500);
      yield put(getShiftTemplateListsSuccess(object, pages));

      const cat = (!requester) ? 'Employee' : requester;

      if (!shiftTemplateID && object.length > 0) {
        yield put(getEnrolledInTemplate(cat, object[0].ShiftTemplateID));
      } else {
        yield put(getEnrolledInTemplate(cat, shiftTemplateID));
      }
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getShiftTemplateListsError(resp));
      }
    }
  } catch (err) {
    yield put(getShiftTemplateListsError(err));
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
  const shiftTemplateID = yield select(makeSelectShiftTemplateID());

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
        'withShiftSchedule': true,
      },
      'HasShiftTemplateID': shiftTemplateID,
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
      'ShiftTemplateID': shiftTemplateID,
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
      'ShiftTemplateID': shiftTemplateID,
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
 * Flexi Ref request/response handler
 */
export function* getFlexiRef() {
  const requestURL = API_SHIFTFORMLOAD;

  // Declare request headers defaults
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
    const resp = apirequest.ShiftFormLoadResult[0];

    if (resp.ResponseCode === 200) {
      yield put(getFlexiRefsSuccess(resp));
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(getFlexiRefsError(resp));
      }
    }
  } catch (err) {
    yield put(getFlexiRefsError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Save New Shift Template request/response handler
 */
export function* saveShiftTemplate() {
  // Retrieve Shift Template ID
  const shiftTemplateID = yield select(makeSelectShiftTemplateID());

  // Retrieve Shift Data
  const shiftTemplateData = yield select(makeSelectSaveShiftTemplateData());

  // Check if we are sending a new template or just updating
  const isNew = yield select(makeSelectIsNewShiftTemplate());

  let requestURL;
  let options;
  if (isNew) {
    requestURL = API_SHIFTSCHEDULE;
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': token,
        'username': username,
      },
      body: JSON.stringify(shiftTemplateData),
    };
  } else {
    requestURL = `${API_SHIFTSCHEDULE}/${shiftTemplateID}`;
    options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'token': token,
        'username': username,
      },
      body: JSON.stringify(shiftTemplateData),
    };
  }

  try {
    const apirequest = yield call(request, requestURL, options);

    let resp;
    if (isNew) {
      resp = apirequest.CreateShiftTemplateResult[0];
    } else {
      resp = apirequest.UpdateShiftTemplateResult[0];
    }

    if (resp.ResponseCode === 200) {
      const data = resp.ObjectList;

      yield put(saveShiftTemplateSuccess(data));
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(saveShiftTemplateError(resp));
      }
    }
  } catch (err) {
    yield put(saveShiftTemplateError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

/**
 * Template Deletion request/response handler
 */
export function* deleteShiftTemplate() {
  // Retrieve Shift Template ID
  const shiftTemplateID = yield select(makeSelectShiftTemplateID());

  const requestURL = `${API_SHIFTSCHEDULE}/${shiftTemplateID}`;

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
    const resp = apirequest.DeleteShiftTemplateResult[0];

    if (resp.ResponseCode === 200) {
      yield put(deleteShiftTemplateSuccess());
    }
    if (resp.ErrorCode !== 0) {
      if (resp.ErrorCode === 401) {
        yield put(sessionIsExpired());
      } else {
        yield put(deleteShiftTemplateError(resp));
      }
    }
  } catch (err) {
    yield put(deleteShiftTemplateError(err));
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
  const shiftTemplateID = yield select(makeSelectShiftTemplateID());

  // Get Page Index
  let pageIndex = 1;
  const PageIndex = yield select(makeSelectPageIndex('addToList'));

  if (PageIndex !== false) {
    pageIndex = PageIndex;
  }

  // Retrieve who request for the list
  const requestCat = yield select(makeSelectAddToTemplateRequester());

  // API URL (from app/constants.js)
  let requestURL;
  let Name;
  let TeamName;
  let FirstAndLastName;
  let Includes;
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
      Includes,
      'HasNoShiftTemplateID': shiftTemplateID,
      Name,
      TeamName,
      FirstAndLastName,
    }),
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
  const shiftTemplateID = yield select(makeSelectShiftTemplateID());
  const idToAdd = yield select(makeSelectAddToID());

  // Retrieve who request for the list
  const requestCat = yield select(makeSelectAddToTemplateRequester());

  let requestURL;
  if (requestCat === 'Department') requestURL = `${API_SHIFTFORDEPARTMENT}${shiftTemplateID}/${idToAdd}`;
  if (requestCat === 'Workgroup') requestURL = `${API_SHIFTFORTEAM}${shiftTemplateID}/${idToAdd}`;
  if (requestCat === 'Employee') requestURL = `${API_SHIFTFOREMPLOYEE}${shiftTemplateID}/${idToAdd}`;

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
    if (requestCat === 'Department') resp = apirequest.AssignShiftScheduleToDepartmentResult[0];
    if (requestCat === 'Workgroup') resp = apirequest.AssignShiftScheduleToTeamResult[0];
    if (requestCat === 'Employee') resp = apirequest.AssignShiftScheduleToEmployeeResult[0];

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
  if (requester === 'Employee') requestURL = API_SHIFTFOREMPLOYEE + idToUnassign;
  if (requester === 'Department') requestURL = API_SHIFTFORDEPARTMENT + idToUnassign;
  if (requester === 'Workgroup') requestURL = API_SHIFTFORTEAM + idToUnassign;

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
    if (requester === 'Employee') resp = apirequest.UnassignShiftScheduleToEmployeeResult[0];
    if (requester === 'Department') resp = apirequest.UnassignShiftScheduleToDepartmentResult[0];
    if (requester === 'Workgroup') resp = apirequest.UnassignShiftScheduleToTeamResult[0];

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
    yield put(unAssignTemplateError(err));
    console.error(err); // eslint-disable-line no-console
  }
}

// Individual exports for shift template
export default function* shifTemplateSagas() {
  // Get our stored username and token
  token = yield select(makeSelectToken());
  username = yield select(makeSelectUsername());

  yield takeLatest(GET_TEMPLATES, getTemplateList);
  yield takeLatest(SEARCH_TEMPLATES, getTemplateList);
  yield takeLatest(SORT_TEMPLATES, getTemplateList);
  yield takeLatest(GET_ENROLLED, getEnrolledList);
  yield takeLatest(GOTO_PAGEENROLLED, getEnrolledList);
  yield takeLatest(SEARCH_ENROLLED, getEnrolledList);
  yield takeLatest(GET_FLEXIREFS, getFlexiRef);
  yield takeLatest(SAVE_SHIFTTEMPLATE, saveShiftTemplate);
  yield takeLatest(DELETE_SHIFTTEMPLATE, deleteShiftTemplate);
  yield takeLatest(GET_ADDTOLIST, getAddToLists);
  yield takeLatest(SEARCH_ADDTOLIST, getAddToLists);
  yield takeLatest(ADD_TOTEMPLATE, addToTemplate);
  yield takeLatest(UNASSIGN_TEMPLATE, unAssignTemplate);
}
