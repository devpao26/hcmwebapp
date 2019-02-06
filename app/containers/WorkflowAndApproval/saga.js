/**
 * Gets the Lists and Details for Workflow and Approval
 * Supports Oath and Form based requests
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import {
    API_WORKFLOWFORMLIST,
    API_WORKFLOWTEMPLATELIST,
    API_WORKFLOWTEMPLATE,
    API_EMPLISTS,
    API_DEPARTMENTLIST,
    API_TEAMLIST,
    API_ASSIGNWORKFLOW,
    API_ENTITYWORKFLOW,
    API_WORKFLOW_TEMPLATESTEP,
} from 'containers/App/constants';

import {
    sessionIsExpired,
} from 'containers/App/actions';

import {
    makeSelectToken,
    makeSelectUsername,
    makeSelectUserInfo,
} from 'containers/App/selectors';

/**
 * Local Dependencies
 */

import {
    WFLOW_PROCSLIST,
    WFLOW_TEMPLATELIST,
    WFLOW_PROCESSTEMPLATE,
    WFLOW_EMPWGDP_LIST,
    WFLOW_ENTITY,
    WFLOW_TEMPLATE_STEP,
} from './constants';

import {
    makeSelectProcsItem,
    makeSelectTempsProcessDetail,
    makeSelectTempsProcessType,
    makeSelectDataRequest,
    makeSelectDataPageDetail,
    makeSelectTempsItem,
    makeSelectRequestType,
    makeSelectRequestor,
    makeSelectProcsPageDetail,
    makeSelectGetSelectedItem,
    makeSelectTempsPageDetail,
} from './selectors';

import {
    retrieveDataProcsSuccess,
    retrieveDataProcsError,
    retrieveDataTempsSuccess,
    retrieveDataTempsError,
    processTemplateSuccess,
    processTemplateError,
    getListSuccess,
    getListError,
    processEntitySuccess,
    processEntityError,
    processTempStepSuccess,
    processTempStepError,
} from './actions';

// Load Global Shared Variables
let username;
let token;


/**
 * Processes List request/response handler
 */
export function* getProcessesListInfo() {

    const requestURL = API_WORKFLOWFORMLIST;

    const PageFilter = yield select(makeSelectProcsPageDetail());

    const headers = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token': token,
            'username': username
        },
        body: PageFilter
    };

    try {
        // Call our request helper (see 'utils/request')
        const getprocslistrsp = yield call(request, requestURL, headers);
        // console.log(getphotolistrsp);
        const resp = getprocslistrsp.GetWorkFlowFormsResult[0];

        if (resp.ResponseCode === 200) {

            // On success, put our retrieved data in our state tree under listinfo key
            const listData = resp.ObjectList;
            const listPageInfo = resp.PageDetails;
            yield put(retrieveDataProcsSuccess(listData, listPageInfo));

        } else {
            if (resp.ErrorCode === 401) {
                yield put(sessionIsExpired());
            } else {
                const errData = resp;
                // Failure triggered via Response code other than 200
                yield put(retrieveDataProcsError(errData));
            }
        }

    } catch (error) {
        yield put(retrieveDataProcsError(error));
    }

}

/**
 * Template List request/response handler
 */
export function* getTemplatesListInfo() {

    const requestURL = API_WORKFLOWTEMPLATELIST;
    const ProcsItem = yield select(makeSelectProcsItem());
    let PageDetail = yield select(makeSelectTempsPageDetail());
    // const PageIndex = yield select(makeSelectPageIndex('empList'));
    if (PageDetail === false) {
        PageDetail = JSON.stringify({
            "SortFilter": {
                "SortBy": "LastModDate",
                "SortExpression": "DESC",
                "PageSize": 20,
                "PageIndex": 1
            },
            "WorkFlowFormID": ProcsItem.WorkFlowFormID,
        });
    }


    const headers = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token': token,
            'username': username
        },
        body: PageDetail,
    };
    // console.log(headers);
    try {
        // Call our request helper (see 'utils/request')
        const gettempslistrsp = yield call(request, requestURL, headers);
        // console.log(gettempslistrsp);
        const resp = gettempslistrsp.GetWorkFlowProcTemplateListingsResult[0];

        if (resp.ResponseCode === 200) {

            // On success, put our retrieved data in our state tree under listinfo key
            const listData = resp.ObjectList;
            const listPageInfo = resp.PageDetails;
            yield put(retrieveDataTempsSuccess(listData, listPageInfo));

        } else {
            if (resp.ErrorCode === 401) {
                yield put(sessionIsExpired());
            } else {
                const errData = resp;
                // Failure triggered via Response code other than 200
                yield put(retrieveDataTempsError(errData));
            }
        }

    } catch (error) {
        yield put(retrieveDataTempsError(error));
    }

}

/**
 * Delete Template Step
 */
export function* processTemplateStep() {
    let requestURL;

    let requestType = yield select(makeSelectRequestType('wflowTempStep'));
    let dataForBody = yield select(makeSelectDataRequest('wflowTempStep'));
    let selectedStep = yield select(makeSelectGetSelectedItem('wflowTempStep'));

    let methodRqs;

    switch (requestType) {
        case 1: { // Update Step Approvers
            methodRqs = 'PUT';
            requestURL = API_WORKFLOW_TEMPLATESTEP;
        } break;
        default: {// Delete Step
            methodRqs = 'DELETE';
            requestURL = API_WORKFLOW_TEMPLATESTEP + "/" + selectedStep.WorkFlowProcTemplateID + "/" + selectedStep.No;
        } break;
    }

    const headers = {
        method: methodRqs,
        headers: {
            'Content-Type': 'application/json',
            'token': token,
            'username': username
        }, body: dataForBody
    };
    // console.log(dataForBody);

    try {
        // Call our request helper (see 'utils/request')
        const getsteprsp = yield call(request, requestURL, headers);
        // console.log(getsteprsp);
        let resp;
        switch (requestType) {
            case 1: { resp = getsteprsp.UpdateWorkFlowProcTemplateGroupByStepResult[0]; } break;// Update Step Approver Results
            default: { resp = getsteprsp.DeleteWorkFlowProcTemplateGroupByStepResult[0]; } break;// Delete of Step Result
        }
        if (resp.ResponseCode === 200) {

            // On success, put our retrieved data in state
            yield put(processTempStepSuccess(resp));

        } else {

            if (resp.ErrorCode === 401) {
                yield put(sessionIsExpired());
            } else {
                const errData = resp;
                // Failure triggered via Response code other than 200
                yield put(processTempStepError(errData));
            }
        }

    } catch (error) {
        yield put(processTempStepError(error));
    }
}

/**
 * Processes Creation, Update, Delete of Template request/response handler
 */
export function* processTemplate() {

    let requestURL;
    let procsItem = yield select(makeSelectTempsProcessDetail());
    let reqsType = yield select(makeSelectTempsProcessType());
    let methodRqs;
    switch (reqsType) {
        case 1:
            methodRqs = 'POST'; // Create
            requestURL = API_WORKFLOWTEMPLATE;
            break;
        case 2:
            methodRqs = 'PUT'; // Update
            const getTempSelectedID = yield select(makeSelectTempsItem());
            requestURL = API_WORKFLOWTEMPLATE + '/' + getTempSelectedID.WorkFlowProcTemplateID;
            break;
        case 3:
            methodRqs = 'DELETE'; // Delete Template
            let getTempSelID = yield select(makeSelectTempsItem());
            requestURL = API_WORKFLOWTEMPLATE + '/' + getTempSelID.WorkFlowProcTemplateID;
            break;
        default:
            methodRqs = 'GET';
            break;
    }

    const headers = {
        method: methodRqs,
        headers: {
            'Content-Type': 'application/json',
            'token': token,
            'username': username
        },
        body: procsItem,
    };
    // console.log(headers);
    try {
        // Call our request helper (see 'utils/request')
        const getprocesstemprsp = yield call(request, requestURL, headers);
        // console.log(getprocesstemprsp);
        let resp;

        switch (reqsType) {
            case 1:
                resp = getprocesstemprsp.AddWorkFlowProcTemplateResult[0];
                break;
            case 2:
                resp = getprocesstemprsp.UpdateWorkFlowProcTemplateResult[0];
                break;
            default:// Delete
                resp = getprocesstemprsp.DeleteWorkFlowProcTemplateResult[0];
                break;
        }
        // console.log(resp);
        if (resp.ResponseCode === 200) {

            yield put(processTemplateSuccess(resp));

        } else {
            if (resp.ErrorCode === 401) {
                yield put(sessionIsExpired());
            } else {
                const errData = resp;
                // Failure triggered via Response code other than 200
                yield put(processTemplateError(errData));
            }
        }

    } catch (error) {
        yield put(processTemplateError(error));
    }

}



/**
 * Template List for Employee, Workgroup, Department request/response handler
 */
export function* getWflowLists() {

    let requestType = yield select(makeSelectRequestType('wflowEmpWGDeptReqs'));
    let PageDetail = yield select(makeSelectDataPageDetail('wflowEmpWGDeptReqs'));
    let dataForBody = yield select(makeSelectDataRequest('wflowEmpWGDeptReqs'));
    // console.log("Details:" + dataForBody);wflowEmpWGDeptReqs
    let requestURL;
    switch (requestType) {
        case 1: { requestURL = API_TEAMLIST; } break;// Workgroup
        case 2: { requestURL = API_DEPARTMENTLIST; } break; // Department
        default: { requestURL = API_EMPLISTS; } break;// Employee
    }

    const headers = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token': token,
            'username': username
        },
        body: dataForBody,
    };

    try {
        // Call our request helper (see 'utils/request')
        const getlistrsp = yield call(request, requestURL, headers);
        // console.log(getlistrsp);
        let resp;
        switch (requestType) {
            case 1: { resp = getlistrsp.GetTeamsOnlyResult[0]; } break;// Workgroup
            case 2: { resp = getlistrsp.GetDepartmentResult[0]; } break;// Department
            default: { resp = getlistrsp.GetEmpProfilesResult[0]; } break;// Employee
        }
        if (resp.ResponseCode === 200) {

            // On success, put our retrieved data in our state tree under listinfo key
            const listData = resp.ObjectList;
            const listPageInfo = resp.PageDetails;
            yield put(getListSuccess(listData, listPageInfo));

        } else {

            if (resp.ErrorCode === 401) {
                yield put(sessionIsExpired());
            } else {
                const errData = resp;
                // Failure triggered via Response code other than 200
                yield put(getListError(errData));
            }
        }

    } catch (error) {
        yield put(getListError(error));
    }

}

export function* processWflowEntity() {

    let requestType = yield select(makeSelectRequestType('wflowProcessEntity'));
    let dataForBody = yield select(makeSelectDataRequest('wflowProcessEntity'));
    let requestor = yield select(makeSelectRequestor('wflowProcessEntity'));



    // console.log("Details:" + dataForBody);wflowEmpWGDeptReqs
    let requestURL;
    switch (requestor) { // Determines the API Function needed to be performed
        case 1: { requestURL = API_TEAMLIST; } break; // Workgroup
        case 2: { requestURL = API_DEPARTMENTLIST; } break; // Department
        default: { requestURL = API_EMPLISTS; } break;// Employee
    }
    let method;
    // FIXME: Make this as Enumerator Example {1: POST}
    switch (requestType) {
        case 1: { method = 'POST'; } break;// POST : Insert or Process
        case 2: { method = 'PUT'; requestURL = API_ASSIGNWORKFLOW; } break; // PUT : Assign
        case 3: {
            method = 'DELETE';
            let selTempItem = yield select(makeSelectTempsItem()); // Retrieve Selected Template ID
            let getSelEntity = yield select(makeSelectGetSelectedItem('wflowProcessEntity')); // Retrieve Selected Entity Info
            let requestorType;
            switch (requestor) {
                case 1: { requestorType = "teamID=" + getSelEntity.TeamID; } break; // Workgroup
                case 2: { requestorType = "deptID=" + getSelEntity.DeptID; } break; // Department
                default: { requestorType = "compID={compID}"; } break;// TODO: Company
            }
            requestURL = API_ENTITYWORKFLOW + "/" + selTempItem.WorkFlowProcTemplateID + "?" + requestorType;
            // console.log(selTempItem.WorkFlowProcTemplateID + "?" + requestorType);
        } break;// DELETE
        default: { method = 'GET'; } break;// GET : Retrieve
    }


    const headers = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'token': token,
            'username': username
        },
        body: dataForBody,
    };
    // console.log(headers);
    // console.log(JSON.stringify(requestURL));
    try {
        // Call our request helper (see 'utils/request')
        const getlistrsp = yield call(request, requestURL, headers);
        // console.log(getlistrsp);

        let resp;
        switch (requestType) {
            case 1: { resp = requestor === 1 ? getlistrsp.GetTeamsOnlyResult[0] : (requestor === 2 ? getlistrsp.GetDepartmentResult[0] : ""); } break;// POST
            case 2: { resp = (requestor === 1 || 2) ? getlistrsp.AssignWorkFlowResult[0] : ""; } break;// PUT
            case 3: { resp = (requestor === 1 || 2) ? getlistrsp.UnassignWorkFlowByEntityResult[0] : getlistrsp; } break;// DELETE TODO: Add the Rightful response node 
            default: { resp = getlistrsp } break;// GET
        }

        if (resp.ResponseCode === 200) {
            // On success, put our retrieved data in our state tree under listinfo key
            const listData = resp.ObjectList ? resp.ObjectList : resp;
            const listPageInfo = resp.ObjectList ? resp.PageDetails : dataForBody;
            // console.log(listData);
            yield put(processEntitySuccess(listData, listPageInfo));

        } else {

            if (resp.ErrorCode === 401) {
                yield put(sessionIsExpired());
            } else {
                const errData = resp;
                // Failure triggered via Response code other than 200
                yield put(processEntityError(errData));
            }
        }

    } catch (error) {
        yield put(processEntityError(error));
    }

}

/**
 * Root saga manages watcher lifecycle
 */
export default function* wflistData() {
    // Watches for WFLOW_PROCSLIST, WFLOW_TEMPLATELIST actions and calls getRepos when one comes in.
    // By using `takeLatest` only the result of the latest API call is applied.
    // It returns task descriptor (just like fork) so we can continue execution
    // It will be cancelled automatically on component unmount

    // Get stored username and token in global state
    username = yield select(makeSelectUsername());
    token = yield select(makeSelectToken());

    yield takeLatest(WFLOW_PROCSLIST, getProcessesListInfo);
    yield takeLatest(WFLOW_TEMPLATELIST, getTemplatesListInfo);
    yield takeLatest(WFLOW_PROCESSTEMPLATE, processTemplate);
    yield takeLatest(WFLOW_EMPWGDP_LIST, getWflowLists);
    yield takeLatest(WFLOW_ENTITY, processWflowEntity);
    yield takeLatest(WFLOW_TEMPLATE_STEP, processTemplateStep);

}