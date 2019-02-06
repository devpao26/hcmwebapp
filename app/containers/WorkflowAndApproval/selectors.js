/**
 * Workflow and Approval Pages selectors
 */

import { createSelector } from 'reselect';

const selectWFlowPage = (state) => state.get('wflowapproval');

/**
 * Processes List Selectors
 */

const makeSelectProcsItem = () => createSelector(
    selectWFlowPage,
    (substate) => substate.getIn(['wflowProcesses', 'procsSelItem'])
);

const makeSelectProcsList = () => createSelector(
    selectWFlowPage,
    (substate) => substate.getIn(['wflowProcesses', 'procsdata'])
);

const makeSelectProcsListLoading = () => createSelector(
    selectWFlowPage,
    (substate) => substate.getIn(['wflowProcesses', 'procsloading'])
);

const makeSelectProcsListError = () => createSelector(
    selectWFlowPage,
    (substate) => substate.getIn(['wflowProcesses', 'procserror'])
);

const makeSelectProcsPageDetail = () => createSelector(
    selectWFlowPage,
    (substate) => substate.getIn(['wflowProcesses', 'pages'])
);


/**
 * Templates List Selectors
 */

const makeSelectTempsItem = () => createSelector(
    selectWFlowPage,
    (substate) => substate.getIn(['wflowTemplates', 'tempsSelItem'])
);

const makeSelectTempsList = () => createSelector(
    selectWFlowPage,
    (substate) => substate.getIn(['wflowTemplates', 'tempsdata'])
);

const makeSelectTempsListLoading = () => createSelector(
    selectWFlowPage,
    (substate) => substate.getIn(['wflowTemplates', 'tempsloading'])
);

const makeSelectTempsListError = () => createSelector(
    selectWFlowPage,
    (substate) => substate.getIn(['wflowTemplates', 'tempserror'])
);

const makeSelectTempsPageDetail = () => createSelector(
    selectWFlowPage,
    (substate) => substate.getIn(['wflowTemplates', 'pages'])
);


/**
 * Processing Templates 
 */

const makeSelectTempsProcessLoading = () => createSelector(
    selectWFlowPage,
    (substate) => substate.getIn(['wflowTemplateAct', 'loading'])
);

const makeSelectTempsProcessError = () => createSelector(
    selectWFlowPage,
    (substate) => substate.getIn(['wflowTemplateAct', 'error'])
);

const makeSelectTempsProcessResponse = () => createSelector(
    selectWFlowPage,
    (substate) => substate.getIn(['wflowTemplateAct', 'response'])
);

const makeSelectTempsProcessDetail = () => createSelector(
    selectWFlowPage,
    (substate) => substate.getIn(['wflowTemplateAct', 'detail'])
);

const makeSelectTempsProcessType = () => createSelector(
    selectWFlowPage,
    (substate) => substate.getIn(['wflowTemplateAct', 'requestType'])
);

/**
 * Employee, WorkGroup and Department Listings Selector : Reused for each of their separated instances
 * @param item Option for the following reducer types : wflowEmpWGDeptReqs or wflowProcessEntity
 */

const makeSelectDataRequest = (item) => createSelector(
    selectWFlowPage,
    (substate) => substate.getIn([item, 'detailreqs'])
);

const makeSelectRequestType =(item) => createSelector(
    selectWFlowPage,
    (substate) => substate.getIn([item, 'requestType'])
);

const makeSelectRequestor =(item) => createSelector(
    selectWFlowPage,
    (substate) => substate.getIn([item, 'requestor'])
);

const makeSelectDataRequestLoading = (item) => createSelector(
    selectWFlowPage,
    (substate) => substate.getIn([item, 'loading'])
);

const makeSelectDataRequestError = (item) => createSelector(
    selectWFlowPage,
    (substate) => substate.getIn([item, 'error'])
);

const makeSelectDataResponse = (item) => createSelector(
    selectWFlowPage,
    (substate) => substate.getIn([item, 'response'])
);

const makeSelectDataPageDetail = (item) => createSelector(
    selectWFlowPage,
    (substate) => substate.getIn([item, 'pages'])
);

const makeSelectGetDataItems = (item) => createSelector(
    selectWFlowPage,
    (substate) => substate.getIn([item, 'items'])
);

const makeSelectGetSelectedItem = (item) => createSelector(
    selectWFlowPage,
    (substate) => substate.getIn([item, 'selectedItem'])
);

export {
    selectWFlowPage,
    makeSelectProcsItem,
    makeSelectProcsList,
    makeSelectProcsListLoading,
    makeSelectProcsListError,
    makeSelectProcsPageDetail,

    makeSelectTempsItem,
    makeSelectTempsList,
    makeSelectTempsListLoading,
    makeSelectTempsListError,
    makeSelectTempsPageDetail,

    makeSelectTempsProcessLoading,
    makeSelectTempsProcessError,
    makeSelectTempsProcessResponse,
    makeSelectTempsProcessDetail,
    makeSelectTempsProcessType,

    makeSelectDataRequest,
    makeSelectDataRequestLoading,
    makeSelectDataRequestError,
    makeSelectDataResponse,
    makeSelectDataPageDetail,
    makeSelectGetDataItems,
    makeSelectRequestType,
    makeSelectRequestor,
    makeSelectGetSelectedItem
};

